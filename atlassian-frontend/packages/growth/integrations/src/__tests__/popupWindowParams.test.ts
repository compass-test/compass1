import popupWindowParams from '../popupWindowParams';

describe('popupWindowParams', () => {
  it('generates parameters string coorrecty', () => {
    const urlParams = popupWindowParams(100, 100);
    expect(urlParams).toBe(
      'toolbar=0,menubar=0,location=0,status=0,scrollbars=1,resizable=0,chrome=yes,width=0,height=0,left=512,top=256',
    );
  });
});
