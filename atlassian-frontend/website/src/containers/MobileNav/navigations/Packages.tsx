import * as fs from '../../../utils/fs';
import renderNav from '../../DesktopNav/utils/renderNav';
import {
  standardGroups,
  packagesList,
  PackagesNavProps,
} from '../../DesktopNav/navigations/Packages';

export default function PackagesNav(
  props: PackagesNavProps & { onClick: () => void },
) {
  const { packages, pathname, onClick } = props;
  const dirs = fs.getDirectories(packages.children);

  return [
    renderNav([{ items: [packagesList] }, ...standardGroups(dirs, pathname)], {
      pathname,
      onClick,
    }),
  ];
}
