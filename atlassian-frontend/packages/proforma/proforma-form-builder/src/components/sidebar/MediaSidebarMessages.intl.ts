import { defineMessages } from 'react-intl';

export enum MediaSidebarMessages {
  Heading = 'Heading',
  SubHeading = 'SubHeading',
  ImageUrl = 'ImageUrl',
  ImageUrlPlaceholder = 'ImageUrlPlaceholder',
  EarlyAccessFeature = 'EarlyAccessFeature',
  IsInEarlyAccess = 'IsInEarlyAccess',
  ImageHosting = 'ImageHosting',
  ImageHostingDesc = 'ImageHostingDesc',
  Accessible = 'Accessible',
  AccessibleDesc = 'AccessibleDesc',
  ExcludedFromPdf = 'ExcludedFromPdf',
  ExcludedFromPdfDesc = 'ExcludedFromPdfDesc',
  ClickingAnImage = 'ClickingAnImage',
  ClickingAnImageDesc = 'ClickingAnImageDesc',
  ToObtainUrl = 'ToObtainUrl',
  RightClick = 'RightClick',
  OnTheImage = 'OnTheImage',
  CopyImageLocation = 'CopyImageLocation',
  PasteLocation = 'PasteLocation',
  ImageUrlErrorMessage = 'ImageUrlErrorMessage',
}

export const IntlMediaSidebarMessages = defineMessages({
  [MediaSidebarMessages.Heading]: {
    id: 'form-builder.MediaSidebar.Heading',
    defaultMessage: 'Image',
  },
  [MediaSidebarMessages.SubHeading]: {
    id: 'form-builder.MediaSidebar.SubHeading',
    defaultMessage: 'Add an image to your forms.',
  },
  [MediaSidebarMessages.ImageUrl]: {
    id: 'form-builder.MediaSidebar.ImageUrl',
    defaultMessage: 'Image URL',
  },
  [MediaSidebarMessages.ImageUrlPlaceholder]: {
    id: 'form-builder.MediaSidebar.ImageUrlPlaceholder',
    defaultMessage: 'Enter a URL for the image to be displayed',
  },
  [MediaSidebarMessages.EarlyAccessFeature]: {
    id: 'form-builder.MediaSidebar.EarlyAccessFeature',
    defaultMessage: 'Early Access Feature',
  },
  [MediaSidebarMessages.IsInEarlyAccess]: {
    id: 'form-builder.MediaSidebar.IsInEarlyAccess',
    defaultMessage:
      'Support for images within forms is in Early Access. It has the following limitations:',
  },
  [MediaSidebarMessages.ImageHosting]: {
    id: 'form-builder.MediaSidebar.ImageHosting',
    defaultMessage: 'Image Hosting:',
  },
  [MediaSidebarMessages.ImageHostingDesc]: {
    id: 'form-builder.MediaSidebar.ImageHostingDesc',
    defaultMessage:
      'It is not possible to upload an image directly into the form, the image must already exist on another page/site.',
  },
  [MediaSidebarMessages.Accessible]: {
    id: 'form-builder.MediaSidebar.Accessible',
    defaultMessage: 'Accessible:',
  },
  [MediaSidebarMessages.AccessibleDesc]: {
    id: 'form-builder.MediaSidebar.AccessibleDesc',
    defaultMessage:
      'Please ensure that the image is accessible to everyone that will fill out your form. e.g. it is not saved on a Confluence page only you can access. A simple way to check this is to try loading the image URL in your browser incognito mode.',
  },
  [MediaSidebarMessages.ExcludedFromPdf]: {
    id: 'form-builder.MediaSidebar.ExcludedFromPdf',
    defaultMessage: 'Excluded from PDFs:',
  },
  [MediaSidebarMessages.ExcludedFromPdfDesc]: {
    id: 'form-builder.MediaSidebar.ExcludedFromPdfDesc',
    defaultMessage:
      'Images are not included in any PDFs generated from the form.',
  },
  [MediaSidebarMessages.ClickingAnImage]: {
    id: 'form-builder.MediaSidebar.ClickingAnImage',
    defaultMessage: 'Clicking an image:',
  },
  [MediaSidebarMessages.ClickingAnImageDesc]: {
    id: 'form-builder.MediaSidebar.ClickingAnImageDesc',
    defaultMessage:
      'When viewing a form, clicking on an image will display it full screen. This does not affect the contents of the form, as the image can simply be closed; however, it may seem like strange behaviour to a user.',
  },
  [MediaSidebarMessages.ToObtainUrl]: {
    id: 'form-builder.MediaSidebar.ToObtainUrl',
    defaultMessage: 'To obtain the URL for an image',
  },
  [MediaSidebarMessages.RightClick]: {
    id: 'form-builder.MediaSidebar.RightClick',
    defaultMessage: 'right-click',
  },
  [MediaSidebarMessages.OnTheImage]: {
    id: 'form-builder.MediaSidebar.OnTheImage',
    defaultMessage: 'on the image in your browser and select',
  },
  [MediaSidebarMessages.CopyImageLocation]: {
    id: 'form-builder.MediaSidebar.CopyImageLocation',
    defaultMessage: 'copy image location.',
  },
  [MediaSidebarMessages.PasteLocation]: {
    id: 'form-builder.MediaSidebar.PasteLocation',
    defaultMessage: 'Paste this location into the field above.',
  },
  [MediaSidebarMessages.ImageUrlErrorMessage]: {
    id: 'form-builder.MediaSidebar.ImageUrlErrorMessage',
    defaultMessage: 'Image URL must start with http:// or https://',
  },
});
