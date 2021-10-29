# Message Transport

`MessageTransport` is an interface that both Parent and Child parts of iframe-plugin rely on for communication with the
other side. It is not directly exposed to end users, unless there is a need for maintaining compatibility with older
version of the transport - in that case it is responsibility of the consumer on the Child side to instantiate a correct
transport implementation.

## Type safe events

By default `MessageTransport` is not enforcing any specific event types, it will let you listen to and send
any event and treat it's payload as you want:

```
import { MessageChannelTransportSlave } from './MessageTransport';

const transport = new MessageChannelTransportSlave();
transport.connect();

transport.on('eventname', (payload) => {});// typeof payload === any

```

To add some type safety we need to define a map of Events and Payloads, to do that:

```
import { MessageChannelTransportSlave } from './MessageTransport';

type Events = {
    [CustomEventTypes.Ready]: MTEmptyPayload,
    [CustomEventTypes.Message]: MTPayload<CustomDefinedPayload>,
    [CustomEventTypes.AnalyticEvent]: MTPayload<CustomDefinedPayload>,
}

const transport = new MessageChannelTransportSlave<Events>();
transport.connect();

transport.on('eventname', (payload) => {});// type error, 'eventname' is not compatible with keyof Events

transport.on(CustomEventTypes.Message, (payload) => {}) // typeof payload === CustomDefinedPayload

```

here `MTEmptyPayload` helper is used to define an event with **no payload**,
while `MTPayload<T>` is to set expected payload type.

**Note:** we added some type safety, but it's important to understand few things:

- type checking happens during compilation only
- there is no runtime validation of event payload
- actual event messages are coming from external source
- we just trust sender to send a correct one
