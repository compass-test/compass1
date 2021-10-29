const utils = require('..');

describe('replaceEntryHyperlink()', () => {
  it('should not change the node if the nodeType is not entry-hyperlink', () => {
    const obj = {
      content: [
        {
          nodeType: 'not-a-hyperlink',
          data: {
            target: {
              fields: {
                body: 'someBodyStuff',
                title: 'This is a title',
              },
            },
          },
        },
      ],
    };
    expect(utils.replaceEntryHyperlink(obj)).toMatchObject(obj);
  });

  it('should deeply traverse a nested object if a content Array exists', () => {
    const spy = jest.spyOn(utils, 'replaceEntryHyperlink');
    const obj = {
      content: [
        {
          content: [
            {
              data: 'here is some data',
            },
          ],
        },
      ],
    };
    utils.replaceEntryHyperlink(obj);
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it('should return a node with a truncated data.fields object if the nodeType is entry-hyperlink', () => {
    const expectedObj = { slug: 'this-is-a-slug', category: 'category' };
    const unexpectedObj = {
      x: '234',
      y: 500,
      z: 'hello',
    };
    const obj = {
      data: {
        target: {
          fields: {
            ...unexpectedObj,
            ...expectedObj,
          },
        },
      },
      nodeType: 'entry-hyperlink',
    };
    expect(utils.replaceEntryHyperlink(obj).data.target.fields).toEqual(
      expect.not.objectContaining(unexpectedObj),
    );
  });

  it('should return a node with a parent slug if it exists in data.fields object if the nodeType is entry-hyperlink', () => {
    let parent = { fields: { slug: 'this-is-a-parent-slug' } };
    const unnecessaryKeys = { ok: 'boomer' };
    let obj = {
      data: {
        target: {
          fields: {
            slug: 'this-is-a-slug',
            category: 'category',
            parent,
            ...unnecessaryKeys,
          },
        },
      },
      nodeType: 'entry-hyperlink',
    };
    expect(utils.replaceEntryHyperlink(obj).data.target.fields).toEqual(
      expect.objectContaining({ parent }),
    );
    expect(utils.replaceEntryHyperlink(obj).data.target.fields).toEqual(
      expect.not.objectContaining(unnecessaryKeys),
    );

    parent = { fields: {} };
    obj = {
      data: {
        target: {
          fields: {
            slug: 'this-is-a-slug',
            category: 'category',
            parent,
            ...unnecessaryKeys,
          },
        },
      },
      nodeType: 'entry-hyperlink',
    };
    expect(utils.replaceEntryHyperlink(obj).data.target.fields).toEqual(
      expect.not.objectContaining(parent),
    );
    expect(utils.replaceEntryHyperlink(obj).data.target.fields).toEqual(
      expect.not.objectContaining(unnecessaryKeys),
    );
  });
});
