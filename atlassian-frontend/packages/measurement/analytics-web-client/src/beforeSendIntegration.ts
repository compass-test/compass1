const createIntegration = require('@segment/analytics.js-integration');

const BeforeSendIntegration = createIntegration('BeforeSend');
Object.assign(BeforeSendIntegration.prototype, {
  initialize() {
    (this as any).ready();
    (this as any).analytics.on('invoke', (msg: any) => {
      if (msg && msg.obj && msg.obj.context && msg.obj.context.page) {
        msg.obj.context.page = undefined;
        (this as any).ready();
      }
    });
  },
  loaded() {
    return true;
  },
});

export default BeforeSendIntegration;
