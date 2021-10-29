export const searchAppMock = {
  _links: {
    self: { href: '/rest/2/addons/boja.jira.pdf.com' },
    alternate: {
      href:
        '/apps/1218555/issue-export-to-pdf-html-word-documents?tab=overview',
      type: 'text/html',
    },
    categories: [
      { href: '/rest/2/addonCategories/2' },
      { href: '/rest/2/addonCategories/31' },
      { href: '/rest/2/addonCategories/5' },
      { href: '/rest/2/addonCategories/7' },
    ],
    logo: {
      href: '/rest/2/assets/images%2F6e0565d3-fb9c-453c-9116-d24b50eeed65.png',
    },
    pricing: [
      {
        href:
          '/rest/2/addons/boja.jira.pdf.com/pricing/{cloudOrServer}/{liveOrPending}',
        templated: true,
      },
      {
        href:
          '/apps/1218555/issue-export-to-pdf-html-word-documents?tab=pricing',
        type: 'text/html',
      },
    ],
    support: {
      href: '/apps/1218555/issue-export-to-pdf-html-word-documents?tab=support',
      type: 'text/html',
    },
    tokens: { href: '/rest/2/addons/boja.jira.pdf.com/tokens' },
    distribution: { href: '/rest/2/addons/boja.jira.pdf.com/distribution' },
    recommendations: {
      href:
        '/rest/2/addons/boja.jira.pdf.com/recommendations{?application,applicationBuild,category*,cost,filter,forThisUser,hosting*,includeHidden,includePrivate,marketingLabel*,text,withVersion,storesPersonalData,offset,limit}',
      templated: true,
    },
    reviews: [
      {
        href: '/rest/2/addons/boja.jira.pdf.com/reviews{?sort,offset,limit}',
        templated: true,
      },
      {
        href:
          '/apps/1218555/issue-export-to-pdf-html-word-documents?tab=reviews',
        type: 'text/html',
      },
    ],
    vendor: { href: '/rest/2/vendors/1215075' },
    versions: { href: '/rest/2/addons/boja.jira.pdf.com/versions' },
    watch: { href: '/rest/2/addons/boja.jira.pdf.com/watch' },
  },
  _embedded: {
    categories: [
      {
        _links: { self: { href: '/rest/2/addonCategories/2' } },
        name: 'Charts & diagramming',
      },
      {
        _links: { self: { href: '/rest/2/addonCategories/5' } },
        name: 'IT & helpdesk',
      },
      {
        _links: { self: { href: '/rest/2/addonCategories/7' } },
        name: 'Project management',
      },
      {
        _links: { self: { href: '/rest/2/addonCategories/31' } },
        name: 'Document management',
      },
    ],
    logo: {
      _links: {
        self: {
          href:
            '/rest/2/assets/images%2F6e0565d3-fb9c-453c-9116-d24b50eeed65.png',
        },
        image: {
          href:
            'https://marketplace-cdn.atlassian.com/files/images/4761c803-45da-4e8e-a052-5fc8b45fdd4e.png',
          type: 'image/png',
        },
        unscaled: {
          href:
            'https://marketplace-cdn.atlassian.com/files/images/6e0565d3-fb9c-453c-9116-d24b50eeed65.png',
          type: 'image/png',
        },
        highRes: {
          href:
            'https://marketplace-cdn.atlassian.com/files/images/6e0565d3-fb9c-453c-9116-d24b50eeed65.png',
          type: 'image/png',
        },
        smallImage: {
          href:
            'https://marketplace-cdn.atlassian.com/files/images/cf462dc1-a569-47b9-aa0f-f91879c836ba.png',
          type: 'image/png',
        },
        smallHighResImage: {
          href:
            'https://marketplace-cdn.atlassian.com/files/images/39252a73-f75e-4838-8bb6-6bb411ac118d.png',
          type: 'image/png',
        },
      },
    },
    distribution: {
      bundled: false,
      bundledCloud: false,
      downloads: 5,
      totalInstalls: 90,
      totalUsers: 4500,
    },
    reviews: { averageStars: 3.222222328186035, count: 9 },
    vendor: {
      _links: {
        self: { href: '/rest/2/vendors/1215075' },
        alternate: {
          href: '/vendors/1215075/boja-consulting-ab',
          type: 'text/html',
        },
        logo: {
          href:
            '/rest/2/assets/images%2F905fa2ec-c8ec-4e23-9e4e-4afb06dc5b69.png',
        },
      },
      _embedded: {
        logo: {
          _links: {
            self: {
              href:
                '/rest/2/assets/images%2F905fa2ec-c8ec-4e23-9e4e-4afb06dc5b69.png',
            },
            image: {
              href:
                'https://marketplace-cdn.atlassian.com/files/images/1b823a6e-4a69-4f54-b5c3-a7ee68ff3fe6.png',
              type: 'image/png',
            },
            unscaled: {
              href:
                'https://marketplace-cdn.atlassian.com/files/images/905fa2ec-c8ec-4e23-9e4e-4afb06dc5b69.png',
              type: 'image/png',
            },
            highRes: {
              href:
                'https://marketplace-cdn.atlassian.com/files/images/27bf670b-fb82-46f4-8172-c9190dfe86a3.png',
              type: 'image/png',
            },
            smallImage: {
              href:
                'https://marketplace-cdn.atlassian.com/files/images/73ec773d-d319-46a7-ad69-de96a9155887.png',
              type: 'image/png',
            },
            smallHighResImage: {
              href:
                'https://marketplace-cdn.atlassian.com/files/images/df38bc73-d3f0-44ff-aee5-5541ccb914d1.png',
              type: 'image/png',
            },
          },
        },
      },
      name: 'Boja Consulting AB',
      programs: {},
    },
  },
  name: 'Issue Export to PDF HTML Word Documents',
  key: 'boja.jira.pdf.com',
  status: 'public',
  summary:
    'Export your issue data to PDF, HTML and Word documents. Create templates with the rich text editor or download from store. Powerful and easy to use with drag & drop and support for all issue data.  Easily create templates with edit and preview mode.',
  tagLine:
    'Customizable drag & drop issue export with ready templates. Style and create your company document in built-in text editor',
  vendorLinks: {
    issueTracker: 'https://bojaconsulting.freshdesk.com',
    privacy: 'http://bojaconsulting.com/support.html',
  },
  googleAnalyticsId: 'UA-113350935-1',
  lastModified: '2020-04-22T21:03:52.927Z',
  communityEnabled: true,
  storesPersonalData: false,
};

export const searchAppsMock = {
  _links: {
    self: { href: '/rest/2/addons?application=jira&hosting=cloud&text=pdf' },
    alternate: { href: '/search?hosting=cloud&query=pdf', type: 'text/html' },
    query: {
      href:
        '/rest/2/addons{?application,applicationBuild,category*,cost,filter,forThisUser,hosting*,includeHidden,includePrivate,marketingLabel*,text,withVersion,storesPersonalData,offset,limit}',
      templated: true,
    },
    byKey: { href: '/rest/2/addons/{addonKey}', templated: true },
    banners: {
      href:
        '/rest/2/addons/listings/banners{?application,applicationBuild,category*,cost,filter,forThisUser,hosting*,includeHidden,includePrivate,marketingLabel*,text,withVersion,storesPersonalData,offset,limit}',
      templated: true,
    },
    next: [
      {
        href:
          '/rest/2/addons?application=jira&hosting=cloud&text=pdf&offset=10',
        type: 'application/json',
      },
      { href: '/search?hosting=cloud&query=pdf&offset=10', type: 'text/html' },
    ],
  },
  _embedded: {
    addons: [
      {
        _links: {
          self: { href: '/rest/2/addons/com.midori.jira.plugin.pdfview' },
          alternate: {
            href:
              '/apps/5167/better-pdf-exporter-for-jira?hosting=cloud&tab=overview',
            type: 'text/html',
          },
          categories: [
            { href: '/rest/2/addonCategories/2' },
            { href: '/rest/2/addonCategories/32' },
            { href: '/rest/2/addonCategories/20' },
            { href: '/rest/2/addonCategories/12' },
          ],
          distribution: {
            href: '/rest/2/addons/com.midori.jira.plugin.pdfview/distribution',
          },
          logo: {
            href:
              '/rest/2/assets/images%2F47a8f3cb-b230-443d-8526-175edca299f9.png',
          },
          reviews: [
            {
              href:
                '/rest/2/addons/com.midori.jira.plugin.pdfview/reviews{?sort,offset,limit}',
              templated: true,
            },
            {
              href:
                '/apps/5167/better-pdf-exporter-for-jira?hosting=cloud&tab=reviews',
              type: 'text/html',
            },
          ],
          vendor: { href: '/rest/2/vendors/103' },
          versions: {
            href: '/rest/2/addons/com.midori.jira.plugin.pdfview/versions',
          },
        },
        _embedded: {
          categories: [
            {
              _links: { self: { href: '/rest/2/addonCategories/2' } },
              name: 'Charts & diagramming',
            },
            {
              _links: { self: { href: '/rest/2/addonCategories/12' } },
              name: 'Time tracking',
            },
            {
              _links: { self: { href: '/rest/2/addonCategories/20' } },
              name: 'Reports',
            },
            {
              _links: { self: { href: '/rest/2/addonCategories/32' } },
              name: 'Documentation',
            },
          ],
          distribution: {
            bundled: false,
            bundledCloud: false,
            downloads: 52324,
            totalInstalls: 3019,
            totalUsers: 1391213,
          },
          logo: {
            _links: {
              self: {
                href:
                  '/rest/2/assets/images%2F47a8f3cb-b230-443d-8526-175edca299f9.png',
              },
              image: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/140b8fba-04d1-4a2a-82bd-91f5b001a7de.png',
                type: 'image/png',
              },
              unscaled: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/47a8f3cb-b230-443d-8526-175edca299f9.png',
                type: 'image/png',
              },
              highRes: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/47a8f3cb-b230-443d-8526-175edca299f9.png',
                type: 'image/png',
              },
              smallImage: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/fcb4d3c2-8ae5-4a86-a338-b0e6f4d2829c.png',
                type: 'image/png',
              },
              smallHighResImage: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/3bfe0bd4-dd38-43eb-9b6d-4d9c4bf9b91c.png',
                type: 'image/png',
              },
            },
          },
          reviews: { averageStars: 3.8733625411987305, count: 229 },
          vendor: {
            _links: {
              self: { href: '/rest/2/vendors/103' },
              alternate: {
                href: '/vendors/103/midori-global-consulting-kft',
                type: 'text/html',
              },
              logo: {
                href:
                  '/rest/2/assets/images%2F1c73d23d-e6a8-4ffe-9d70-c5b0c3e89c98.png',
              },
            },
            _embedded: {
              logo: {
                _links: {
                  self: {
                    href:
                      '/rest/2/assets/images%2F1c73d23d-e6a8-4ffe-9d70-c5b0c3e89c98.png',
                  },
                  image: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/b5acce21-c908-4289-9f21-956de011cb85.png',
                    type: 'image/png',
                  },
                  unscaled: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/1c73d23d-e6a8-4ffe-9d70-c5b0c3e89c98.png',
                    type: 'image/png',
                  },
                  smallImage: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/291a2f4c-28ca-40b4-b3ba-6834562e449c.png',
                    type: 'image/png',
                  },
                  smallHighResImage: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/0d8cccf4-d275-47de-b548-6aae6edab92d.png',
                    type: 'image/png',
                  },
                },
              },
            },
            name: 'Midori Global Consulting Kft.',
            programs: { topVendor: { status: 'approved' } },
          },
        },
        name: 'Better PDF Exporter for Jira',
        key: 'com.midori.jira.plugin.pdfview',
        tagLine:
          'Customizable PDF export for Jira: issue lists, dashboards, timesheets, invoices, Release Notes, story cards & custom documents',
        summary:
          'Powerful Jira PDF export for issue lists, invoices, bills, timesheets, Burn Down chart, Gantt chart, Requirement Specifications, Release Notes, story cards, custom business reports and documents! Share, print, email, archive and report issues easily.',
        status: 'public',
      },
      {
        _links: {
          self: { href: '/rest/2/addons/softwareplant.bigtemplate' },
          alternate: {
            href:
              '/apps/1215229/bigtemplate-export-to-pdf-word-excel?hosting=cloud&tab=overview',
            type: 'text/html',
          },
          categories: [
            { href: '/rest/2/addonCategories/2' },
            { href: '/rest/2/addonCategories/31' },
            { href: '/rest/2/addonCategories/4' },
            { href: '/rest/2/addonCategories/7' },
          ],
          distribution: {
            href: '/rest/2/addons/softwareplant.bigtemplate/distribution',
          },
          logo: {
            href:
              '/rest/2/assets/images%2F565419d9-2843-4f72-88fa-75781a85212f.png',
          },
          reviews: [
            {
              href:
                '/rest/2/addons/softwareplant.bigtemplate/reviews{?sort,offset,limit}',
              templated: true,
            },
            {
              href:
                '/apps/1215229/bigtemplate-export-to-pdf-word-excel?hosting=cloud&tab=reviews',
              type: 'text/html',
            },
          ],
          vendor: { href: '/rest/2/vendors/1211388' },
          versions: {
            href: '/rest/2/addons/softwareplant.bigtemplate/versions',
          },
        },
        _embedded: {
          categories: [
            {
              _links: { self: { href: '/rest/2/addonCategories/2' } },
              name: 'Charts & diagramming',
            },
            {
              _links: { self: { href: '/rest/2/addonCategories/4' } },
              name: 'Integrations',
            },
            {
              _links: { self: { href: '/rest/2/addonCategories/7' } },
              name: 'Project management',
            },
            {
              _links: { self: { href: '/rest/2/addonCategories/31' } },
              name: 'Document management',
            },
          ],
          distribution: {
            bundled: false,
            bundledCloud: false,
            downloads: 26826,
            totalInstalls: 3230,
            totalUsers: 1134150,
          },
          logo: {
            _links: {
              self: {
                href:
                  '/rest/2/assets/images%2F565419d9-2843-4f72-88fa-75781a85212f.png',
              },
              image: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/c8581b92-315a-4ec5-a891-d0ae9df5ec85.png',
                type: 'image/png',
              },
              unscaled: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/565419d9-2843-4f72-88fa-75781a85212f.png',
                type: 'image/png',
              },
              highRes: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/565419d9-2843-4f72-88fa-75781a85212f.png',
                type: 'image/png',
              },
              smallImage: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/f2915ac6-339b-4a38-9bf8-d6c7ba0350e6.png',
                type: 'image/png',
              },
              smallHighResImage: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/2eb0afab-4677-4d7e-ad8a-9b2a83587083.png',
                type: 'image/png',
              },
            },
          },
          reviews: { averageStars: 3.0250000953674316, count: 40 },
          vendor: {
            _links: {
              self: { href: '/rest/2/vendors/1211388' },
              alternate: {
                href: '/vendors/1211388/softwareplant',
                type: 'text/html',
              },
              logo: {
                href:
                  '/rest/2/assets/images%2F03e175dc-9a9f-46da-b9a4-8d7c1612457e.png',
              },
            },
            _embedded: {
              logo: {
                _links: {
                  self: {
                    href:
                      '/rest/2/assets/images%2F03e175dc-9a9f-46da-b9a4-8d7c1612457e.png',
                  },
                  image: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/fa481767-9ee1-4c69-9a60-ee2fcbe2a764.png',
                    type: 'image/png',
                  },
                  unscaled: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/03e175dc-9a9f-46da-b9a4-8d7c1612457e.png',
                    type: 'image/png',
                  },
                  highRes: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/a19a3277-811e-4aee-85bc-4bc4dc28474b.png',
                    type: 'image/png',
                  },
                  smallImage: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/1f75cf3d-2b3f-4b1d-a3a1-fbd8e8e2cc91.png',
                    type: 'image/png',
                  },
                  smallHighResImage: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/04514727-d82a-4bac-bfaf-aba6bafab713.png',
                    type: 'image/png',
                  },
                },
              },
            },
            name: 'SoftwarePlant',
            programs: { topVendor: { status: 'approved' } },
          },
        },
        name: 'BigTemplate - Export to PDF, Word, Excel',
        key: 'softwareplant.bigtemplate',
        tagLine:
          'Export Jira issues. Pdf doc xlsx csv xml mpp mpx. Export to Excel, Export to Word. Custom templates. Import Microsoft MS Project',
        summary:
          'Export issues to DOCX, DOC and PDF customizable templates. Word, Excel, XLSX, XLS, MS Project, MPP,  MPX, XML, CSV. Predefined customizable templates. Use BigTemplate alone or in tandem with BigPicture / BigGantt to export issue sets.',
        status: 'public',
      },
      {
        _links: {
          self: { href: '/rest/2/addons/com.deiser.jira.exporter' },
          alternate: {
            href:
              '/apps/1212073/exporter-export-issues-to-excel-csv-pdf?hosting=cloud&tab=overview',
            type: 'text/html',
          },
          categories: [
            { href: '/rest/2/addonCategories/2' },
            { href: '/rest/2/addonCategories/31' },
            { href: '/rest/2/addonCategories/5' },
            { href: '/rest/2/addonCategories/20' },
          ],
          distribution: {
            href: '/rest/2/addons/com.deiser.jira.exporter/distribution',
          },
          logo: {
            href:
              '/rest/2/assets/images%2F14499350-fbce-472d-9e6d-5611a7c5ac02.png',
          },
          reviews: [
            {
              href:
                '/rest/2/addons/com.deiser.jira.exporter/reviews{?sort,offset,limit}',
              templated: true,
            },
            {
              href:
                '/apps/1212073/exporter-export-issues-to-excel-csv-pdf?hosting=cloud&tab=reviews',
              type: 'text/html',
            },
          ],
          vendor: { href: '/rest/2/vendors/27570' },
          versions: {
            href: '/rest/2/addons/com.deiser.jira.exporter/versions',
          },
        },
        _embedded: {
          categories: [
            {
              _links: { self: { href: '/rest/2/addonCategories/2' } },
              name: 'Charts & diagramming',
            },
            {
              _links: { self: { href: '/rest/2/addonCategories/5' } },
              name: 'IT & helpdesk',
            },
            {
              _links: { self: { href: '/rest/2/addonCategories/20' } },
              name: 'Reports',
            },
            {
              _links: { self: { href: '/rest/2/addonCategories/31' } },
              name: 'Document management',
            },
          ],
          distribution: {
            bundled: false,
            bundledCloud: false,
            downloads: 12093,
            totalInstalls: 1568,
            totalUsers: 745847,
          },
          logo: {
            _links: {
              self: {
                href:
                  '/rest/2/assets/images%2F14499350-fbce-472d-9e6d-5611a7c5ac02.png',
              },
              image: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/3f9b1257-492e-4499-9e6b-06ef2c78899b.png',
                type: 'image/png',
              },
              unscaled: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/14499350-fbce-472d-9e6d-5611a7c5ac02.png',
                type: 'image/png',
              },
              highRes: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/14499350-fbce-472d-9e6d-5611a7c5ac02.png',
                type: 'image/png',
              },
              smallImage: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/6a60fb5b-d0e9-455f-96ea-770705e9274e.png',
                type: 'image/png',
              },
              smallHighResImage: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/fc16c9b2-374d-4636-92be-a5cb6a54ca5c.png',
                type: 'image/png',
              },
            },
          },
          reviews: { averageStars: 3.069767475128174, count: 43 },
          vendor: {
            _links: {
              self: { href: '/rest/2/vendors/27570' },
              alternate: { href: '/vendors/27570/deiser', type: 'text/html' },
              logo: {
                href:
                  '/rest/2/assets/images%2F99ac377c-f61e-4bab-817a-05d2c61e24cc.png',
              },
            },
            _embedded: {
              logo: {
                _links: {
                  self: {
                    href:
                      '/rest/2/assets/images%2F99ac377c-f61e-4bab-817a-05d2c61e24cc.png',
                  },
                  image: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/197e1ccf-93b5-4450-b909-e9e21bf5816c.png',
                    type: 'image/png',
                  },
                  unscaled: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/99ac377c-f61e-4bab-817a-05d2c61e24cc.png',
                    type: 'image/png',
                  },
                  highRes: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/91717789-a01f-41fc-8eda-bbcb4b2c9662.png',
                    type: 'image/png',
                  },
                  smallImage: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/58b32bf2-9c22-4cef-9f14-abbd23494ce7.png',
                    type: 'image/png',
                  },
                  smallHighResImage: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/94e76248-858c-4de3-bea5-5c6a5507e482.png',
                    type: 'image/png',
                  },
                },
              },
            },
            name: 'DEISER',
            programs: { topVendor: { status: 'approved' } },
          },
        },
        name: 'Exporter- Export Issues to Excel CSV PDF',
        key: 'com.deiser.jira.exporter',
        tagLine:
          'Export issues with transitions, comments, attachments (server). PDF export (server), Excel export, CSV export & bulk link to issue',
        summary:
          'Export unlimited Jira Issues to Excel (XLSX), CSV, and PDF formats with extra content such as attachments, comments, and transitions. Also, bulk links to a new or existing issue.',
        status: 'public',
      },
      {
        _links: {
          self: { href: '/rest/2/addons/boja.jira.pdf.com' },
          alternate: {
            href:
              '/apps/1218555/issue-export-to-pdf-html-word-documents?hosting=cloud&tab=overview',
            type: 'text/html',
          },
          categories: [
            { href: '/rest/2/addonCategories/2' },
            { href: '/rest/2/addonCategories/31' },
            { href: '/rest/2/addonCategories/5' },
            { href: '/rest/2/addonCategories/7' },
          ],
          distribution: {
            href: '/rest/2/addons/boja.jira.pdf.com/distribution',
          },
          logo: {
            href:
              '/rest/2/assets/images%2F6e0565d3-fb9c-453c-9116-d24b50eeed65.png',
          },
          reviews: [
            {
              href:
                '/rest/2/addons/boja.jira.pdf.com/reviews{?sort,offset,limit}',
              templated: true,
            },
            {
              href:
                '/apps/1218555/issue-export-to-pdf-html-word-documents?hosting=cloud&tab=reviews',
              type: 'text/html',
            },
          ],
          vendor: { href: '/rest/2/vendors/1215075' },
          versions: { href: '/rest/2/addons/boja.jira.pdf.com/versions' },
        },
        _embedded: {
          categories: [
            {
              _links: { self: { href: '/rest/2/addonCategories/2' } },
              name: 'Charts & diagramming',
            },
            {
              _links: { self: { href: '/rest/2/addonCategories/5' } },
              name: 'IT & helpdesk',
            },
            {
              _links: { self: { href: '/rest/2/addonCategories/7' } },
              name: 'Project management',
            },
            {
              _links: { self: { href: '/rest/2/addonCategories/31' } },
              name: 'Document management',
            },
          ],
          distribution: {
            bundled: false,
            bundledCloud: false,
            downloads: 5,
            totalInstalls: 91,
            totalUsers: 4589,
          },
          logo: {
            _links: {
              self: {
                href:
                  '/rest/2/assets/images%2F6e0565d3-fb9c-453c-9116-d24b50eeed65.png',
              },
              image: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/4761c803-45da-4e8e-a052-5fc8b45fdd4e.png',
                type: 'image/png',
              },
              unscaled: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/6e0565d3-fb9c-453c-9116-d24b50eeed65.png',
                type: 'image/png',
              },
              highRes: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/6e0565d3-fb9c-453c-9116-d24b50eeed65.png',
                type: 'image/png',
              },
              smallImage: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/cf462dc1-a569-47b9-aa0f-f91879c836ba.png',
                type: 'image/png',
              },
              smallHighResImage: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/39252a73-f75e-4838-8bb6-6bb411ac118d.png',
                type: 'image/png',
              },
            },
          },
          reviews: { averageStars: 3.222222328186035, count: 9 },
          vendor: {
            _links: {
              self: { href: '/rest/2/vendors/1215075' },
              alternate: {
                href: '/vendors/1215075/boja-consulting-ab',
                type: 'text/html',
              },
              logo: {
                href:
                  '/rest/2/assets/images%2F905fa2ec-c8ec-4e23-9e4e-4afb06dc5b69.png',
              },
            },
            _embedded: {
              logo: {
                _links: {
                  self: {
                    href:
                      '/rest/2/assets/images%2F905fa2ec-c8ec-4e23-9e4e-4afb06dc5b69.png',
                  },
                  image: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/1b823a6e-4a69-4f54-b5c3-a7ee68ff3fe6.png',
                    type: 'image/png',
                  },
                  unscaled: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/905fa2ec-c8ec-4e23-9e4e-4afb06dc5b69.png',
                    type: 'image/png',
                  },
                  highRes: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/27bf670b-fb82-46f4-8172-c9190dfe86a3.png',
                    type: 'image/png',
                  },
                  smallImage: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/73ec773d-d319-46a7-ad69-de96a9155887.png',
                    type: 'image/png',
                  },
                  smallHighResImage: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/df38bc73-d3f0-44ff-aee5-5541ccb914d1.png',
                    type: 'image/png',
                  },
                },
              },
            },
            name: 'Boja Consulting AB',
            programs: {},
          },
        },
        name: 'Issue Export to PDF HTML Word Documents',
        key: 'boja.jira.pdf.com',
        tagLine:
          'Easy issue drag & drop export with ready templates. Style and create custom templates in text editor for reports and documents',
        summary:
          'Export your issue data to PDF, HTML and Word documents. Create templates with the rich text editor or download from store. Powerful and easy to use with drag & drop and support for all issue data.  Easily create templates with edit and preview mode.',
        status: 'public',
      },
      {
        _links: {
          self: { href: '/rest/2/addons/com.aspose.pdf.exporter' },
          alternate: {
            href:
              '/apps/1221709/aspose-pdf-exporter?hosting=cloud&tab=overview',
            type: 'text/html',
          },
          categories: [
            { href: '/rest/2/addonCategories/32' },
            { href: '/rest/2/addonCategories/20' },
            { href: '/rest/2/addonCategories/45' },
          ],
          distribution: {
            href: '/rest/2/addons/com.aspose.pdf.exporter/distribution',
          },
          logo: {
            href:
              '/rest/2/assets/images%2Fe32afe2c-2420-450f-8741-3180020ece5e.png',
          },
          reviews: [
            {
              href:
                '/rest/2/addons/com.aspose.pdf.exporter/reviews{?sort,offset,limit}',
              templated: true,
            },
            {
              href:
                '/apps/1221709/aspose-pdf-exporter?hosting=cloud&tab=reviews',
              type: 'text/html',
            },
          ],
          vendor: { href: '/rest/2/vendors/1217579' },
          versions: { href: '/rest/2/addons/com.aspose.pdf.exporter/versions' },
        },
        _embedded: {
          categories: [
            {
              _links: { self: { href: '/rest/2/addonCategories/20' } },
              name: 'Reports',
            },
            {
              _links: { self: { href: '/rest/2/addonCategories/32' } },
              name: 'Documentation',
            },
            {
              _links: { self: { href: '/rest/2/addonCategories/45' } },
              name: 'Utilities',
            },
          ],
          distribution: {
            bundled: false,
            bundledCloud: false,
            downloads: 0,
            totalInstalls: 65,
            totalUsers: 1499,
          },
          logo: {
            _links: {
              self: {
                href:
                  '/rest/2/assets/images%2Fe32afe2c-2420-450f-8741-3180020ece5e.png',
              },
              image: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/557c73cf-9099-4885-a8f3-e02c759c315c.png',
                type: 'image/png',
              },
              unscaled: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/e32afe2c-2420-450f-8741-3180020ece5e.png',
                type: 'image/png',
              },
              highRes: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/4b01e37b-3eeb-4065-a5cf-d4b7d31b577f.png',
                type: 'image/png',
              },
              smallImage: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/9d3806c6-27b6-4740-9c0e-77c50b702b92.png',
                type: 'image/png',
              },
              smallHighResImage: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/f5f31665-cc1d-403c-8caa-860fa576f6eb.png',
                type: 'image/png',
              },
            },
          },
          reviews: { averageStars: 0.0, count: 0 },
          vendor: {
            _links: {
              self: { href: '/rest/2/vendors/1217579' },
              alternate: {
                href: '/vendors/1217579/aspose-cloud-marketplace',
                type: 'text/html',
              },
              logo: {
                href:
                  '/rest/2/assets/images%2F96c8a868-82ae-4caf-a5a4-b06efd8adee6.png',
              },
            },
            _embedded: {
              logo: {
                _links: {
                  self: {
                    href:
                      '/rest/2/assets/images%2F96c8a868-82ae-4caf-a5a4-b06efd8adee6.png',
                  },
                  image: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/22d5c3ac-3d6a-489a-9db8-a2d04fab2d38.png',
                    type: 'image/png',
                  },
                  unscaled: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/96c8a868-82ae-4caf-a5a4-b06efd8adee6.png',
                    type: 'image/png',
                  },
                  highRes: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/30e353ec-de1a-480a-a528-4e3075b36b4f.png',
                    type: 'image/png',
                  },
                  smallImage: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/4d588fa9-0381-4e4b-8e9c-df1f8ffd3837.png',
                    type: 'image/png',
                  },
                  smallHighResImage: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/35b8410e-a99b-4c7b-9a4a-7b9439611941.png',
                    type: 'image/png',
                  },
                },
              },
            },
            name: 'Aspose Cloud Marketplace',
            programs: {},
          },
        },
        name: 'Aspose.PDF Exporter',
        key: 'com.aspose.pdf.exporter',
        tagLine: 'Create a PDF document from any Jira objects',
        summary:
          'Aspose.PDF Exporter allows to create a PDF document from any Jira objects.\r\nWe can export to PDF:\r\n- Issues with all fields\r\n- Issues with subtasks\r\n- Comments\r\n- Linked issues',
        status: 'public',
      },
      {
        _links: {
          self: { href: '/rest/2/addons/com.xpandit.plugins.jiraxporter' },
          alternate: {
            href:
              '/apps/891368/xporter-export-issues-from-jira?hosting=cloud&tab=overview',
            type: 'text/html',
          },
          categories: [
            { href: '/rest/2/addonCategories/2' },
            { href: '/rest/2/addonCategories/32' },
            { href: '/rest/2/addonCategories/20' },
            { href: '/rest/2/addonCategories/9' },
          ],
          distribution: {
            href: '/rest/2/addons/com.xpandit.plugins.jiraxporter/distribution',
          },
          logo: {
            href:
              '/rest/2/assets/images%2Fd7e0e074-a0ec-4ed2-923c-503882bfca4c.png',
          },
          reviews: [
            {
              href:
                '/rest/2/addons/com.xpandit.plugins.jiraxporter/reviews{?sort,offset,limit}',
              templated: true,
            },
            {
              href:
                '/apps/891368/xporter-export-issues-from-jira?hosting=cloud&tab=reviews',
              type: 'text/html',
            },
          ],
          vendor: { href: '/rest/2/vendors/31085' },
          versions: {
            href: '/rest/2/addons/com.xpandit.plugins.jiraxporter/versions',
          },
        },
        _embedded: {
          categories: [
            {
              _links: { self: { href: '/rest/2/addonCategories/2' } },
              name: 'Charts & diagramming',
            },
            {
              _links: { self: { href: '/rest/2/addonCategories/9' } },
              name: 'Testing & QA',
            },
            {
              _links: { self: { href: '/rest/2/addonCategories/20' } },
              name: 'Reports',
            },
            {
              _links: { self: { href: '/rest/2/addonCategories/32' } },
              name: 'Documentation',
            },
          ],
          distribution: {
            bundled: false,
            bundledCloud: false,
            downloads: 55332,
            totalInstalls: 3218,
            totalUsers: 1879921,
          },
          logo: {
            _links: {
              self: {
                href:
                  '/rest/2/assets/images%2Fd7e0e074-a0ec-4ed2-923c-503882bfca4c.png',
              },
              image: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/5faac2a9-3ca5-44f2-9fb8-25066bf93867.png',
                type: 'image/png',
              },
              unscaled: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/d7e0e074-a0ec-4ed2-923c-503882bfca4c.png',
                type: 'image/png',
              },
              highRes: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/d7e0e074-a0ec-4ed2-923c-503882bfca4c.png',
                type: 'image/png',
              },
              smallImage: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/4c218c81-cc13-4859-a9f6-aec009c01d54.png',
                type: 'image/png',
              },
              smallHighResImage: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/29865e2b-ca14-4cce-8d75-da73a8c1be68.png',
                type: 'image/png',
              },
            },
          },
          reviews: { averageStars: 3.8590307235717773, count: 227 },
          vendor: {
            _links: {
              self: { href: '/rest/2/vendors/31085' },
              alternate: { href: '/vendors/31085/xpand-it', type: 'text/html' },
              logo: {
                href:
                  '/rest/2/assets/images%2F0c4475d6-8f97-4db2-b2de-a5e86a77dbec.png',
              },
            },
            _embedded: {
              logo: {
                _links: {
                  self: {
                    href:
                      '/rest/2/assets/images%2F0c4475d6-8f97-4db2-b2de-a5e86a77dbec.png',
                  },
                  image: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/77708fce-6dcf-4b1c-94bb-510688dfa0cc.png',
                    type: 'image/png',
                  },
                  unscaled: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/0c4475d6-8f97-4db2-b2de-a5e86a77dbec.png',
                    type: 'image/png',
                  },
                  highRes: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/0c4475d6-8f97-4db2-b2de-a5e86a77dbec.png',
                    type: 'image/png',
                  },
                  smallImage: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/331804ce-db92-4aea-8cc0-0b0eb7065330.png',
                    type: 'image/png',
                  },
                  smallHighResImage: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/802baa06-c7cd-4059-bcac-10eddd4ef243.png',
                    type: 'image/png',
                  },
                },
              },
            },
            name: 'Xpand IT',
            programs: { topVendor: { status: 'approved' } },
          },
        },
        name: 'Xporter - Export issues from Jira',
        key: 'com.xpandit.plugins.jiraxporter',
        tagLine:
          '#1 Reporting App for Jira featuring PDF Export, Excel Export and Word Export. Export to PDF, Export to Excel and Export to Word',
        summary:
          'With Xporter for Jira, you can create templates as Word and Excel Documents, and export the information in your Jira issues to Word, Excel and PDF. Features: PDF Export, Word Export, Excel Export',
        status: 'public',
      },
      {
        _links: {
          self: { href: '/rest/2/addons/amoeboids.releasenotes' },
          alternate: {
            href:
              '/apps/1215431/automated-release-notes-for-jira?hosting=cloud&tab=overview',
            type: 'text/html',
          },
          categories: [
            { href: '/rest/2/addonCategories/54' },
            { href: '/rest/2/addonCategories/3' },
            { href: '/rest/2/addonCategories/7' },
            { href: '/rest/2/addonCategories/20' },
          ],
          distribution: {
            href: '/rest/2/addons/amoeboids.releasenotes/distribution',
          },
          logo: {
            href:
              '/rest/2/assets/images%2F650652e1-5144-4e03-8872-c5cf7273525d.jpeg',
          },
          reviews: [
            {
              href:
                '/rest/2/addons/amoeboids.releasenotes/reviews{?sort,offset,limit}',
              templated: true,
            },
            {
              href:
                '/apps/1215431/automated-release-notes-for-jira?hosting=cloud&tab=reviews',
              type: 'text/html',
            },
          ],
          vendor: { href: '/rest/2/vendors/1211499' },
          versions: { href: '/rest/2/addons/amoeboids.releasenotes/versions' },
        },
        _embedded: {
          categories: [
            {
              _links: { self: { href: '/rest/2/addonCategories/3' } },
              name: 'Email',
            },
            {
              _links: { self: { href: '/rest/2/addonCategories/7' } },
              name: 'Project management',
            },
            {
              _links: { self: { href: '/rest/2/addonCategories/20' } },
              name: 'Reports',
            },
            {
              _links: { self: { href: '/rest/2/addonCategories/54' } },
              name: 'Continuous integration',
            },
          ],
          distribution: {
            bundled: false,
            bundledCloud: false,
            downloads: 3505,
            totalInstalls: 916,
            totalUsers: 166547,
          },
          logo: {
            _links: {
              self: {
                href:
                  '/rest/2/assets/images%2F650652e1-5144-4e03-8872-c5cf7273525d.jpeg',
              },
              image: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/96565af4-2fe4-421e-8143-66595fe376fe.png',
                type: 'image/png',
              },
              unscaled: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/650652e1-5144-4e03-8872-c5cf7273525d.jpeg',
                type: 'image/jpeg',
              },
              highRes: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/650652e1-5144-4e03-8872-c5cf7273525d.jpeg',
                type: 'image/jpeg',
              },
              smallImage: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/cdc3be5f-3c8c-453e-bb21-54a1cfb80f76.png',
                type: 'image/png',
              },
              smallHighResImage: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/adf8fa55-6655-4db8-b7e6-15343dfb2222.png',
                type: 'image/png',
              },
            },
          },
          reviews: { averageStars: 3.2857143878936768, count: 14 },
          vendor: {
            _links: {
              self: { href: '/rest/2/vendors/1211499' },
              alternate: {
                href: '/vendors/1211499/amoeboids-technologies-pvt-ltd',
                type: 'text/html',
              },
              logo: {
                href:
                  '/rest/2/assets/images%2F46eed997-eaf4-491e-b2a3-7339326fb880.png',
              },
            },
            _embedded: {
              logo: {
                _links: {
                  self: {
                    href:
                      '/rest/2/assets/images%2F46eed997-eaf4-491e-b2a3-7339326fb880.png',
                  },
                  image: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/bc297dbd-b17f-4b2a-a89c-110bf6a73df4.png',
                    type: 'image/png',
                  },
                  unscaled: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/46eed997-eaf4-491e-b2a3-7339326fb880.png',
                    type: 'image/png',
                  },
                  smallImage: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/fb16e886-cb36-4f78-871b-c3337941e1e2.png',
                    type: 'image/png',
                  },
                  smallHighResImage: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/a90bdddc-cbef-4c15-9c3a-b4290d086446.png',
                    type: 'image/png',
                  },
                },
              },
            },
            name: 'Amoeboids Technologies Pvt Ltd',
            programs: { topVendor: { status: 'approved' } },
          },
        },
        name: 'Automated Release Notes for Jira',
        key: 'amoeboids.releasenotes',
        tagLine:
          'Easiest way to generate release notes in multiple formats. Automate the process from custom release notes creation to distribution',
        summary:
          'Automated Release Notes is an add-on for Jira that lets you design Release notes with complete control & generate them in different formats. These release notes can then be sent to Jira as well as non-Jira users.',
        status: 'public',
      },
      {
        _links: {
          self: { href: '/rest/2/addons/com.view26.servicedesk-report.jira' },
          alternate: {
            href:
              '/apps/1217341/charts-and-reports-for-jira-servicedesk?hosting=cloud&tab=overview',
            type: 'text/html',
          },
          categories: [
            { href: '/rest/2/addonCategories/2' },
            { href: '/rest/2/addonCategories/14' },
            { href: '/rest/2/addonCategories/5' },
            { href: '/rest/2/addonCategories/20' },
          ],
          distribution: {
            href:
              '/rest/2/addons/com.view26.servicedesk-report.jira/distribution',
          },
          logo: {
            href:
              '/rest/2/assets/images%2F7f3cc015-3d71-4c3b-bc6b-06f3e7f6f8cd.png',
          },
          reviews: [
            {
              href:
                '/rest/2/addons/com.view26.servicedesk-report.jira/reviews{?sort,offset,limit}',
              templated: true,
            },
            {
              href:
                '/apps/1217341/charts-and-reports-for-jira-servicedesk?hosting=cloud&tab=reviews',
              type: 'text/html',
            },
          ],
          vendor: { href: '/rest/2/vendors/1214029' },
          versions: {
            href: '/rest/2/addons/com.view26.servicedesk-report.jira/versions',
          },
        },
        _embedded: {
          categories: [
            {
              _links: { self: { href: '/rest/2/addonCategories/2' } },
              name: 'Charts & diagramming',
            },
            {
              _links: { self: { href: '/rest/2/addonCategories/5' } },
              name: 'IT & helpdesk',
            },
            {
              _links: { self: { href: '/rest/2/addonCategories/14' } },
              name: 'Dashboard gadgets',
            },
            {
              _links: { self: { href: '/rest/2/addonCategories/20' } },
              name: 'Reports',
            },
          ],
          distribution: {
            bundled: false,
            bundledCloud: false,
            downloads: 1009,
            totalInstalls: 384,
            totalUsers: 48449,
          },
          logo: {
            _links: {
              self: {
                href:
                  '/rest/2/assets/images%2F7f3cc015-3d71-4c3b-bc6b-06f3e7f6f8cd.png',
              },
              image: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/11c11f0b-5ea2-4095-ad25-9b8af628dfc8.png',
                type: 'image/png',
              },
              unscaled: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/7f3cc015-3d71-4c3b-bc6b-06f3e7f6f8cd.png',
                type: 'image/png',
              },
              highRes: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/5d998326-38e3-4028-b25e-acea8e5a91b2.png',
                type: 'image/png',
              },
              smallImage: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/4130c511-a768-4912-8594-f8634e3e72f2.png',
                type: 'image/png',
              },
              smallHighResImage: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/5d5071c7-c426-4a06-a6b4-d9e065345c7e.png',
                type: 'image/png',
              },
            },
          },
          reviews: { averageStars: 3.3333332538604736, count: 12 },
          vendor: {
            _links: {
              self: { href: '/rest/2/vendors/1214029' },
              alternate: {
                href: '/vendors/1214029/view26-gmbh',
                type: 'text/html',
              },
              logo: {
                href:
                  '/rest/2/assets/images%2F4ab8fa3e-8955-4c80-afbc-fb62a02f818b.png',
              },
            },
            _embedded: {
              logo: {
                _links: {
                  self: {
                    href:
                      '/rest/2/assets/images%2F4ab8fa3e-8955-4c80-afbc-fb62a02f818b.png',
                  },
                  image: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/6b71438a-a2ad-4b66-a6d1-b89204286300.png',
                    type: 'image/png',
                  },
                  unscaled: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/4ab8fa3e-8955-4c80-afbc-fb62a02f818b.png',
                    type: 'image/png',
                  },
                  highRes: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/494c9aaf-5ed5-4f60-9f02-48e1a8c8bb13.png',
                    type: 'image/png',
                  },
                  smallImage: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/cd04c4cd-d061-4e9d-bd9a-772ce9b70407.png',
                    type: 'image/png',
                  },
                  smallHighResImage: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/52776835-3912-4038-b98e-cb27664f5f87.png',
                    type: 'image/png',
                  },
                },
              },
            },
            name: 'view26 GmbH',
            programs: { topVendor: { status: 'approved' } },
          },
        },
        name: 'Charts and Reports  for Jira ServiceDesk',
        key: 'com.view26.servicedesk-report.jira',
        tagLine:
          'Easily create custom charts & analytics report across Jira ServiceDesk projects and start sharing reports with your Stakeholders',
        summary:
          'Report across multiple Service Desk Projects.\r\nShare custom reports with your stakeholders with one click reporting.\r\nGet to actionable insights with powerful analysis tools.',
        status: 'public',
      },
      {
        _links: {
          self: { href: '/rest/2/addons/io.aha.connect' },
          alternate: {
            href:
              '/apps/1211698/aha-roadmaps-for-jira?hosting=cloud&tab=overview',
            type: 'text/html',
          },
          categories: [
            { href: '/rest/2/addonCategories/2' },
            { href: '/rest/2/addonCategories/7' },
            { href: '/rest/2/addonCategories/20' },
            { href: '/rest/2/addonCategories/11' },
          ],
          distribution: { href: '/rest/2/addons/io.aha.connect/distribution' },
          logo: {
            href:
              '/rest/2/assets/images%2Feab6173d-f1f5-4730-a133-6a0aa6a1518b.png',
          },
          reviews: [
            {
              href: '/rest/2/addons/io.aha.connect/reviews{?sort,offset,limit}',
              templated: true,
            },
            {
              href:
                '/apps/1211698/aha-roadmaps-for-jira?hosting=cloud&tab=reviews',
              type: 'text/html',
            },
          ],
          vendor: { href: '/rest/2/vendors/1210950' },
          versions: { href: '/rest/2/addons/io.aha.connect/versions' },
        },
        _embedded: {
          categories: [
            {
              _links: { self: { href: '/rest/2/addonCategories/2' } },
              name: 'Charts & diagramming',
            },
            {
              _links: { self: { href: '/rest/2/addonCategories/7' } },
              name: 'Project management',
            },
            {
              _links: { self: { href: '/rest/2/addonCategories/11' } },
              name: 'Workflow',
            },
            {
              _links: { self: { href: '/rest/2/addonCategories/20' } },
              name: 'Reports',
            },
          ],
          distribution: {
            bundled: false,
            bundledCloud: false,
            downloads: 10,
            totalInstalls: 3892,
            totalUsers: 368673,
          },
          logo: {
            _links: {
              self: {
                href:
                  '/rest/2/assets/images%2Feab6173d-f1f5-4730-a133-6a0aa6a1518b.png',
              },
              image: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/d6e6d997-13b3-41da-b3d4-e67c7d8480c8.png',
                type: 'image/png',
              },
              unscaled: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/eab6173d-f1f5-4730-a133-6a0aa6a1518b.png',
                type: 'image/png',
              },
              highRes: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/eab6173d-f1f5-4730-a133-6a0aa6a1518b.png',
                type: 'image/png',
              },
              smallImage: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/89b81033-e39c-43f3-a6bf-021fd71711ef.png',
                type: 'image/png',
              },
              smallHighResImage: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/c3e151ca-fe32-47bd-a0d0-b3aa4c557838.png',
                type: 'image/png',
              },
            },
          },
          reviews: { averageStars: 3.8214285373687744, count: 196 },
          vendor: {
            _links: {
              self: { href: '/rest/2/vendors/1210950' },
              alternate: {
                href: '/vendors/1210950/aha-labs-inc',
                type: 'text/html',
              },
              logo: {
                href:
                  '/rest/2/assets/images%2Fad01fc3a-e265-4454-ab45-a6a75cd71c9a.png',
              },
            },
            _embedded: {
              logo: {
                _links: {
                  self: {
                    href:
                      '/rest/2/assets/images%2Fad01fc3a-e265-4454-ab45-a6a75cd71c9a.png',
                  },
                  image: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/b94b53ab-19e6-41f2-9624-73d64efbf622.png',
                    type: 'image/png',
                  },
                  unscaled: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/ad01fc3a-e265-4454-ab45-a6a75cd71c9a.png',
                    type: 'image/png',
                  },
                  highRes: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/ad01fc3a-e265-4454-ab45-a6a75cd71c9a.png',
                    type: 'image/png',
                  },
                  smallImage: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/f02fcdbe-c139-4604-ac36-293b9ac69950.png',
                    type: 'image/png',
                  },
                  smallHighResImage: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/28c590bd-b949-4a61-a4f6-c180e5b3c762.png',
                    type: 'image/png',
                  },
                },
              },
            },
            name: 'Aha! Labs Inc',
            programs: {},
          },
        },
        name: 'Aha! roadmaps for Jira',
        key: 'io.aha.connect',
        tagLine:
          'Build products customers love — you need an Aha! account to integrate with Jira On-demand or On-prem',
        summary:
          "Aha! is the world's #1 product roadmap software. Do your product planning in Aha! and push features to Jira. Get updates in real-time. Integrate for free to get your product mojo back (works with On-demand and On-prem). You need a paid Aha! account.",
        status: 'public',
      },
      {
        _links: {
          self: { href: '/rest/2/addons/slack-standup-bot-jira' },
          alternate: {
            href:
              '/apps/1217825/stand-bot-slack-stand-up-bot-for-jira?hosting=cloud&tab=overview',
            type: 'text/html',
          },
          categories: [
            { href: '/rest/2/addonCategories/4' },
            { href: '/rest/2/addonCategories/34' },
            { href: '/rest/2/addonCategories/7' },
            { href: '/rest/2/addonCategories/24' },
          ],
          distribution: {
            href: '/rest/2/addons/slack-standup-bot-jira/distribution',
          },
          logo: {
            href:
              '/rest/2/assets/images%2Fa77f2908-ddc4-470c-bdc5-19538588e79b.png',
          },
          reviews: [
            {
              href:
                '/rest/2/addons/slack-standup-bot-jira/reviews{?sort,offset,limit}',
              templated: true,
            },
            {
              href:
                '/apps/1217825/stand-bot-slack-stand-up-bot-for-jira?hosting=cloud&tab=reviews',
              type: 'text/html',
            },
          ],
          vendor: { href: '/rest/2/vendors/1213059' },
          versions: { href: '/rest/2/addons/slack-standup-bot-jira/versions' },
        },
        _embedded: {
          categories: [
            {
              _links: { self: { href: '/rest/2/addonCategories/4' } },
              name: 'Integrations',
            },
            {
              _links: { self: { href: '/rest/2/addonCategories/7' } },
              name: 'Project management',
            },
            {
              _links: { self: { href: '/rest/2/addonCategories/24' } },
              name: 'Tasks',
            },
            {
              _links: { self: { href: '/rest/2/addonCategories/34' } },
              name: 'Messaging',
            },
          ],
          distribution: {
            bundled: false,
            bundledCloud: false,
            downloads: 79,
            totalInstalls: 107,
            totalUsers: 4528,
          },
          logo: {
            _links: {
              self: {
                href:
                  '/rest/2/assets/images%2Fa77f2908-ddc4-470c-bdc5-19538588e79b.png',
              },
              image: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/59191fbd-96fb-4dd3-880e-cf9bd901d088.png',
                type: 'image/png',
              },
              unscaled: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/a77f2908-ddc4-470c-bdc5-19538588e79b.png',
                type: 'image/png',
              },
              highRes: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/a77f2908-ddc4-470c-bdc5-19538588e79b.png',
                type: 'image/png',
              },
              smallImage: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/372619ff-1d99-47ab-8ffe-9ee83eb871ff.png',
                type: 'image/png',
              },
              smallHighResImage: {
                href:
                  'https://marketplace-cdn.atlassian.com/files/images/b9a189e8-188a-4b40-98f6-94f8aa4a9eaf.png',
                type: 'image/png',
              },
            },
          },
          reviews: { averageStars: 2.75, count: 12 },
          vendor: {
            _links: {
              self: { href: '/rest/2/vendors/1213059' },
              alternate: {
                href: '/vendors/1213059/nearsoft-inc',
                type: 'text/html',
              },
              logo: {
                href:
                  '/rest/2/assets/images%2F83cc037d-e237-4a9f-9e1e-1ddf6844f2da.png',
              },
            },
            _embedded: {
              logo: {
                _links: {
                  self: {
                    href:
                      '/rest/2/assets/images%2F83cc037d-e237-4a9f-9e1e-1ddf6844f2da.png',
                  },
                  image: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/bf3ee380-a6df-4e84-a002-83c3d6b2c983.png',
                    type: 'image/png',
                  },
                  unscaled: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/83cc037d-e237-4a9f-9e1e-1ddf6844f2da.png',
                    type: 'image/png',
                  },
                  highRes: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/ffdfac44-7082-47a1-89bf-3f216274da81.png',
                    type: 'image/png',
                  },
                  smallImage: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/8a805a85-c76d-4d11-82c2-77e28096a036.png',
                    type: 'image/png',
                  },
                  smallHighResImage: {
                    href:
                      'https://marketplace-cdn.atlassian.com/files/images/37ed8074-9bad-41fb-9640-52dfa4a8dc82.png',
                    type: 'image/png',
                  },
                },
              },
            },
            name: 'Nearsoft Inc',
            programs: {},
          },
        },
        name: 'Stand-Bot - Slack stand-up bot for Jira',
        key: 'slack-standup-bot-jira',
        tagLine:
          'Daily asynchronous stand-up meetings in Slack that connect to Jira',
        summary:
          'Daily asynchronous stand-up meetings in Slack that connect to Jira',
        status: 'public',
      },
    ],
  },
  count: 16,
};
