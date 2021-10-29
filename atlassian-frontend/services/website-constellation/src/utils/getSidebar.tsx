import FoundationSideNav from '../components/side-nav/foundation-side-nav';
import BrandSideNav from '../components/side-nav/brand-side-nav';
import ResourceSideNav from '../components/side-nav/resource-side-nav';
import PatternSideNav from '../components/side-nav/pattern-side-nav';
import ContentSideNav from '../components/side-nav/content-side-nav';

export default function getSidebar(category: string) {
  switch (category) {
    case 'Foundations':
      return FoundationSideNav;
    case 'Brand':
      return BrandSideNav;
    case 'Resources':
      return ResourceSideNav;
    case 'Patterns':
      return PatternSideNav;
    case 'Content':
      return ContentSideNav;
  }
}
