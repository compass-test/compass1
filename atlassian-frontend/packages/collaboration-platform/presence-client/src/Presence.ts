import { io, Socket } from 'socket.io-client';

import { Emitter } from './emitter';
import { PresenceData, PresenceEmitEvents, PresenceOption } from './types';

type LocalStorage = {
  [k: string]: PresenceData;
};

type ParticipantJoinedEvent = {
  sessionId: string;
};

type ParticipantLeftEvent = ParticipantJoinedEvent;

type ParticipantUpdateEvent = {
  sessionId: string;
  [k: string]: any;
};

type BroadcastMessage = {
  [k: string]: any;
};

// Event send from backend service
interface PresenceSocketListenEvents {
  'participant:joined': () => void;
  'participant:left': (data: ParticipantLeftEvent) => void;
  'presence:update': (data: ParticipantUpdateEvent) => void;
  broadcast: (data: BroadcastMessage) => void;
  error: (error: any) => void;
}

// Events we sending to the backend service
interface PresenceSocketEmitEvents {
  'presence:update': (data: PresenceData) => void;
  broadcast: (data: BroadcastMessage) => void;
}

/**
 *  We offer two types of event API: presence and message
 *  The presence will keep a copy of all participant data in the memory, whereas message type will simply broadcast the messages to client.
 *
 *  The presence in memory stored as a map looks like this
 *  {
 *    [sessionId]: {
 *        ...presenceData
 *     }
 *  }
 */
export class Presence extends Emitter<PresenceEmitEvents> {
  private synchronizedState: LocalStorage;
  private socket: Socket<PresenceSocketListenEvents, PresenceSocketEmitEvents>;
  constructor(options: PresenceOption) {
    super();
    this.synchronizedState = {};

    const { presenceServerUrl, spaceKey, initialData } = options;

    const nameSpace = '/presence/session/' + spaceKey;
    const fullUrl = presenceServerUrl + nameSpace;

    // eslint-disable-next-line no-useless-catch
    try {
      this.socket = io(fullUrl, {
        withCredentials: true,
        path: '/presence/socket.io',
      });
    } catch (error) {
      throw error;
    }

    // Upon successful connection
    this.socket.on('connect', () => {
      this.synchronizedState[this.socket.id] = {
        sessionId: this.socket.id,
        ...(initialData ? initialData : {}),
      };
      this.emit('connected', {
        sessionId: this.socket.id,
      });
    });

    /**
     * Presence section
     */
    // Send out handshake data to newly joined session
    this.socket.on('participant:joined', () => {
      if (this.synchronizedState[this.socket.id]) {
        this.socket.emit(
          'presence:update',
          this.synchronizedState[this.socket.id],
        );
      }
    });

    this.socket.on('participant:left', (data) => {
      const { sessionId } = data;

      const left = this.synchronizedState[sessionId];
      this.emit('presence:left', left);
      delete this.synchronizedState[sessionId];
      this.emit('presence', this.getAllPresence());
    });

    this.socket.on('presence:update', (presence) => {
      const { sessionId } = presence;

      // Otherwise, we update synchronizedState and let product know
      if (this.synchronizedState[sessionId]) {
        Object.assign(this.synchronizedState[sessionId], presence);
      } else {
        this.synchronizedState[sessionId] = presence;
      }

      // emit an array
      this.emit('presence', this.getAllPresence());
    });

    /**
     * Message type
     */
    this.socket.on('broadcast', (msg) => {
      this.emit('broadcast', msg);
    });

    /**
     * Everything else
     */
    this.socket.on('error', (error) => {
      this.emit('error', error);
    });
  }

  // Presence type
  syncPresence(data: PresenceData) {
    if (!this.synchronizedState[this.socket.id]) {
      throw new Error('Presence client has not been initialized.');
    }
    this.socket.emit('presence:update', data);
    Object.assign(this.synchronizedState[this.socket.id], data);
  }

  // Message type
  broadcastMessage(message: BroadcastMessage) {
    if (!this.synchronizedState[this.socket.id]) {
      throw new Error('Presence client has not been initialized.');
    } else if (message === undefined) {
      throw new Error('Message can not be empty');
    }
    this.socket.emit('broadcast', message);
  }

  getPresenceBySessionId(sessionId: string): PresenceData {
    return this.synchronizedState[sessionId];
  }

  // Return array of presence that kept in the memory
  getAllPresence(): PresenceData[] {
    return Object.values(this.synchronizedState);
  }

  getMyPresence(): PresenceData {
    return this.synchronizedState[this.socket.id];
  }

  getMySessionId(): string {
    return this.socket.id;
  }

  destroy() {
    if (this.socket) {
      this.socket.close();
      (this.socket as any) = null;
    }
    this.synchronizedState = {};
  }
}
