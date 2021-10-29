import {
  RPCServer,
  RPCClient,
  RPCMethodName,
  RPCMethodImplementaion,
  RPCMethod,
} from '../lib/rpc';
import {
  MessageChannelTransportMaster,
  MessageChannelTransportSlave,
} from '../transport/MessageTransport';
import { TransportEventTypes } from '../transport/types';

const nextTick = async () => await Promise.resolve();

function createRPCMethod<
  N extends RPCMethodName,
  I extends RPCMethodImplementaion
>(name: N, fn: I): RPCMethod<N, I> {
  return [name, fn];
}

describe('RPC Methods', () => {
  let rpcServer: RPCServer;
  let rpcClient: RPCClient;
  let messageTransportMaster: MessageChannelTransportMaster;
  let messageTransportSlave: MessageChannelTransportSlave;
  const RPC_METHOD_WITH_ARGS = 'RPC_METHOD_WITH_ARGS';
  const RPC_METHOD_WITH_NO_ARGS = 'RPC_METHOD_NO_ARGS';
  const RPC_METHOD_THAT_REJECTS = 'RPC_METHOD_THAT_REJECTS';
  const RPC_METHOD_THAT_THROWS = 'RPC_METHOD_THAT_THROWS';
  const RPC_CLIENT_TIME_OUT = 500;

  beforeEach(() => {
    jest.useFakeTimers();

    const iframe = document.createElement('iframe');
    messageTransportMaster = new MessageChannelTransportMaster(iframe);
    messageTransportSlave = new MessageChannelTransportSlave();
    const rpcMethodWithArgs = createRPCMethod(RPC_METHOD_WITH_ARGS, (...args) =>
      Promise.resolve(`Result with args - ${args}`),
    );
    const rpcMethodWithNoArgs = createRPCMethod(RPC_METHOD_WITH_NO_ARGS, () =>
      Promise.resolve('Result with no args'),
    );
    const rpcMethodThatRejects = createRPCMethod(RPC_METHOD_THAT_REJECTS, () =>
      Promise.reject('Something went wrong'),
    );
    const rpcMethodThatThrows = createRPCMethod(RPC_METHOD_THAT_THROWS, () => {
      throw new Error('Something went wrong');
    });
    rpcServer = new RPCServer(messageTransportMaster, [
      rpcMethodWithArgs,
      rpcMethodWithNoArgs,
      rpcMethodThatRejects,
      rpcMethodThatThrows,
    ]);
    rpcClient = new RPCClient(messageTransportSlave, {
      timeout: RPC_CLIENT_TIME_OUT,
    });
  });

  describe('RPC Server', () => {
    it('should send the __RPC_METHODS when the Server is started', () => {
      jest.spyOn(messageTransportMaster, 'send');
      rpcServer.start();
      expect(messageTransportMaster.send).toHaveBeenCalledWith(
        '__RPC_METHODS',
        {
          methods: [
            RPC_METHOD_WITH_ARGS,
            RPC_METHOD_WITH_NO_ARGS,
            RPC_METHOD_THAT_REJECTS,
            RPC_METHOD_THAT_THROWS,
          ],
        },
      );
    });

    it('should call onMethodCall on __RPC_INVOKE from the message transport master', async () => {
      jest.spyOn(rpcServer, 'onMethodCall');
      rpcServer.start();
      const MOCK_UUID = 'RPC_METHOD_NAME1_UUID';
      const RPC_METHOD_ARGS = ['foo', 1, undefined];
      // @ts-ignore
      messageTransportMaster.onMessage({
        data: {
          type: TransportEventTypes.Message,
          payload: {
            type: '__RPC_INVOKE',
            payload: {
              data: {
                uuid: MOCK_UUID,
                name: RPC_METHOD_WITH_ARGS,
                args: RPC_METHOD_ARGS,
              },
            },
          },
        },
      });

      expect(rpcServer.onMethodCall).toHaveBeenCalledWith(
        MOCK_UUID,
        RPC_METHOD_WITH_ARGS,
        RPC_METHOD_ARGS,
      );
    });

    it('should send an __RPC_RESULT event to the message transport from onMethodCall for implemented methods', async () => {
      jest.spyOn(messageTransportMaster, 'send');
      const MOCK_UUID = 'RPC_METHOD_WITH_ARGS_UUID';
      const RPC_METHOD_ARGS = ['foo', 1, undefined];

      rpcServer.onMethodCall(MOCK_UUID, RPC_METHOD_WITH_ARGS, RPC_METHOD_ARGS);
      await nextTick();

      expect(messageTransportMaster.send).toHaveBeenCalledWith('__RPC_RESULT', {
        data: {
          uuid: MOCK_UUID,
          result: `Result with args - ${RPC_METHOD_ARGS}`,
        },
      });
    });

    it('should send an __RPC_ERROR of NOT_IMPLEMENTED to the message transport from onMethodCall for not implemented methods', async () => {
      jest.spyOn(messageTransportMaster, 'send');
      const MOCK_UUID = 'NOT_IMPLEMENTED_UUID';
      const NOT_IMPLEMENTED_METHOD_NAME = 'NOT_IMPLEMENTED';

      rpcServer.onMethodCall(MOCK_UUID, NOT_IMPLEMENTED_METHOD_NAME, []);

      expect(messageTransportMaster.send).toHaveBeenCalledWith('__RPC_ERROR', {
        data: {
          uuid: MOCK_UUID,
          error: 'NOT_IMPLEMENTED',
        },
      });
    });

    it('should send an __RPC_ERROR of METHOD_ERROR to the message transport from onMethodCall when a method rejects', async () => {
      jest.spyOn(messageTransportMaster, 'send');
      const MOCK_UUID = 'METHOD_ERROR_PROMISE_REJECT_UUID';

      rpcServer.onMethodCall(MOCK_UUID, RPC_METHOD_THAT_REJECTS, []);
      await nextTick();

      expect(messageTransportMaster.send).toHaveBeenCalledWith('__RPC_ERROR', {
        data: {
          uuid: MOCK_UUID,
          error: 'METHOD_PROMISE_REJECTED',
        },
      });
    });

    it('should send an __RPC_ERROR of METHOD_ERROR to the message transport from onMethodCall when a method throws an error', async () => {
      jest.spyOn(messageTransportMaster, 'send');
      const MOCK_UUID = 'METHOD_ERROR_THROWN_ERROR_UUID';

      rpcServer.onMethodCall(MOCK_UUID, RPC_METHOD_THAT_THROWS, []);

      expect(messageTransportMaster.send).toHaveBeenLastCalledWith(
        '__RPC_ERROR',
        {
          data: {
            uuid: MOCK_UUID,
            error: 'METHOD_THREW_ERROR',
          },
        },
      );
    });
  });

  describe('RPC Client', () => {
    it('calling invoke on rpcClient should trigger client.send with an array of args', async () => {
      jest.spyOn(messageTransportSlave, 'send');
      const RPC_METHOD_ARGS = ['foo'];
      rpcClient.invoke(RPC_METHOD_WITH_ARGS, RPC_METHOD_ARGS);
      const expectedPayload = {
        data: {
          uuid: expect.any(String),
          name: RPC_METHOD_WITH_ARGS,
          args: RPC_METHOD_ARGS,
        },
      };
      expect(messageTransportSlave.send).toHaveBeenCalledWith(
        '__RPC_INVOKE',
        expectedPayload,
      );
    });

    it('calling invoke on rpcClient should trigger client.send when sent an empty array for args', async () => {
      jest.spyOn(messageTransportSlave, 'send');
      const RPC_METHOD_ARGS: any[] = [];
      rpcClient.invoke(RPC_METHOD_WITH_NO_ARGS, RPC_METHOD_ARGS);
      const expectedPayload = {
        data: {
          uuid: expect.any(String),
          name: RPC_METHOD_WITH_NO_ARGS,
          args: RPC_METHOD_ARGS,
        },
      };
      expect(messageTransportSlave.send).toHaveBeenCalledWith(
        '__RPC_INVOKE',
        expectedPayload,
      );
    });

    it('calling invoke on rpcClient should call subscribeToResult and call client appropriately on __RPC_RESULT', async () => {
      const MOCK_UUID = 'RPC_RESULT_UUID';
      const RPC_METHOD_ARGS: any[] = [];
      const EXPECTED_RPC_RESULT = 'EXPECTED_RPC_RESULT';
      jest.spyOn(messageTransportSlave, 'on');
      jest.spyOn(messageTransportSlave, 'off');
      rpcClient.generateUuid = jest.fn(() => MOCK_UUID);
      const subscribeToResultPromise = rpcClient.invoke(
        RPC_METHOD_WITH_NO_ARGS,
        RPC_METHOD_ARGS,
      );
      expect(messageTransportSlave.on).toHaveBeenCalledTimes(2);
      expect(messageTransportSlave.on).toHaveBeenNthCalledWith(
        1,
        '__RPC_RESULT',
        expect.any(Function),
      );
      expect(messageTransportSlave.on).toHaveBeenNthCalledWith(
        2,
        '__RPC_ERROR',
        expect.any(Function),
      );
      // @ts-ignore
      messageTransportSlave.onMessage({
        data: {
          type: TransportEventTypes.Message,
          payload: {
            type: '__RPC_RESULT',
            payload: {
              data: {
                uuid: MOCK_UUID,
                result: EXPECTED_RPC_RESULT,
              },
            },
          },
        },
      });
      expect(messageTransportSlave.off).toHaveBeenCalledTimes(2);
      expect(messageTransportSlave.off).toHaveBeenNthCalledWith(
        1,
        '__RPC_RESULT',
        expect.any(Function),
      );
      expect(messageTransportSlave.off).toHaveBeenNthCalledWith(
        2,
        '__RPC_ERROR',
        expect.any(Function),
      );
      await expect(subscribeToResultPromise).resolves.toBe(EXPECTED_RPC_RESULT);
    });

    it('calling invoke on rpcClient should call subscribeToResult and call client appropriately on __RPC_ERROR', async () => {
      const MOCK_UUID = 'RPC_ERROR_UUID';
      const RPC_METHOD_ARGS: any[] = [];
      const EXPECTED_RPC_ERROR = new Error('EXPECTED_RPC_ERROR');
      jest.spyOn(messageTransportSlave, 'on');
      jest.spyOn(messageTransportSlave, 'off');
      rpcClient.generateUuid = jest.fn(() => MOCK_UUID);
      const subscribeToResultPromise = rpcClient.invoke(
        RPC_METHOD_WITH_NO_ARGS,
        RPC_METHOD_ARGS,
      );
      expect(messageTransportSlave.on).toHaveBeenCalledTimes(2);
      expect(messageTransportSlave.on).toHaveBeenNthCalledWith(
        1,
        '__RPC_RESULT',
        expect.any(Function),
      );
      expect(messageTransportSlave.on).toHaveBeenNthCalledWith(
        2,
        '__RPC_ERROR',
        expect.any(Function),
      );
      // @ts-ignore
      messageTransportSlave.onMessage({
        data: {
          type: TransportEventTypes.Message,
          payload: {
            type: '__RPC_ERROR',
            payload: {
              data: {
                uuid: MOCK_UUID,
                error: 'EXPECTED_RPC_ERROR',
              },
            },
          },
        },
      });
      expect(messageTransportSlave.off).toHaveBeenCalledTimes(2);
      expect(messageTransportSlave.off).toHaveBeenNthCalledWith(
        1,
        '__RPC_RESULT',
        expect.any(Function),
      );
      expect(messageTransportSlave.off).toHaveBeenNthCalledWith(
        2,
        '__RPC_ERROR',
        expect.any(Function),
      );

      await expect(subscribeToResultPromise).rejects.toEqual(
        EXPECTED_RPC_ERROR,
      );
    });

    it('rpcClient invoke call should time out when not given response', async () => {
      const RPC_METHOD_ARGS: any[] = [];
      const EXPECTED_RPC_ERROR = new Error('METHOD_TIMED_OUT');
      jest.spyOn(messageTransportSlave, 'off');
      const subscribeToResultPromise = rpcClient.invoke(
        RPC_METHOD_WITH_NO_ARGS,
        RPC_METHOD_ARGS,
      );

      jest.runAllTimers();
      await expect(subscribeToResultPromise).rejects.toEqual(
        EXPECTED_RPC_ERROR,
      );

      // ensure event handlers are removed
      expect(messageTransportSlave.off).toHaveBeenCalledTimes(2);
      expect(messageTransportSlave.off).toHaveBeenNthCalledWith(
        1,
        '__RPC_RESULT',
        expect.any(Function),
      );
      expect(messageTransportSlave.off).toHaveBeenNthCalledWith(
        2,
        '__RPC_ERROR',
        expect.any(Function),
      );
    });
  });
});
