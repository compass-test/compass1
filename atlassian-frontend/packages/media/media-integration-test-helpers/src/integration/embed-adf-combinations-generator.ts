type Combination = [
  string,
  {
    layout: string;
    width?: number;
    originalWidth?: number | null;
    originalHeight?: number | null;
  },
];

export const embedCombinationsWithTitle: Combination[] = [
  [
    'center layout with no width attribute',
    {
      layout: 'center',
      originalWidth: null,
      originalHeight: 331,
    },
  ],
  // FIXME These tests were flakey in the Puppeteer v10 Upgrade
  // [
  //   'wide layout, no width attribute',
  //   {
  //     layout: 'wide',
  //     originalWidth: null,
  //     originalHeight: 400,
  //   },
  // ],
  // [
  //   'full-width layout, no width attribute',
  //   {
  //     layout: 'full-width',
  //     originalWidth: null,
  //     originalHeight: 611,
  //   },
  // ],
  [
    'center layout and width = 100%',
    {
      layout: 'center',
      originalWidth: null,
      width: 100,
      originalHeight: 331,
    },
  ],
  [
    'center layout and width = 88%',
    {
      layout: 'center',
      originalWidth: null,
      width: 88,
      originalHeight: 262,
    },
  ],
  // [
  //   'center layout and width = 60%',
  //   {
  //     layout: 'center',
  //     originalWidth: null,
  //     width: 60,
  //     originalHeight: 250,
  //   },
  // ],
  // [
  //   'center layout and width = 50%',
  //   {
  //     layout: 'center',
  //     originalWidth: null,
  //     width: 50,
  //     originalHeight: 250,
  //   },
  // ],
];

export const generateEmbedCombinationAdf = ([
  condition,
  attributes,
]: Combination) => {
  return {
    version: 1,
    type: 'doc',
    content: [
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [
          {
            type: 'text',
            text: `Setup: ${condition}`,
          },
        ],
      },
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [
          {
            type: 'text',
            text: `Resource sends 'resize' message with height (like twitter)`,
          },
        ],
      },
      {
        type: 'embedCard',
        attrs: {
          ...attributes,
          url: 'https://embedCardTestUrl',
        },
      },
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [
          {
            type: 'text',
            text: `Resources don't send messages (like youtube)`,
          },
        ],
      },
      {
        type: 'embedCard',
        attrs: {
          ...attributes,
          // originalHeight stored only when `resize` message is sent
          originalHeight: undefined,
          url: 'https://embedCardTestUrl/noMessages',
        },
      },
    ],
  };
};
