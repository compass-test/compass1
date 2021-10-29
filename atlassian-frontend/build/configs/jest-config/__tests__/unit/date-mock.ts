describe('@atlaskit/jest-config', () => {
  describe('Unit test date mock', () => {
    /*
     * The date in unit tests is mocked to be Wed Aug 16 00:00:00 2017 +0000,
     * 1502841600 seconds since epoch, or 1502841600000 milliseconds since epoch,
     * the start of the UTC day of the first commit in atlassian-frontend
     */
    describe('Date.now()', () => {
      it('should return 1502841600 seconds', () => {
        const date = Date.now();
        expect(date).toEqual(1502841600 * 1000);
      });
    });
    describe('new Date()', () => {
      it('should create a date object with time of Wed, 16 Aug 2017 00:00:00 GMT', () => {
        const date = new Date();
        expect(date.toUTCString()).toEqual('Wed, 16 Aug 2017 00:00:00 GMT');
      });
    });
  });
});

export {};
