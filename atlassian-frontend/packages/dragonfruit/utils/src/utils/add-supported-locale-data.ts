import { addLocaleData } from 'react-intl';
import cs from 'react-intl/locale-data/cs';
import da from 'react-intl/locale-data/da';
import de from 'react-intl/locale-data/de';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import et from 'react-intl/locale-data/et';
import fi from 'react-intl/locale-data/fi';
import fr from 'react-intl/locale-data/fr';
import hu from 'react-intl/locale-data/hu';
import is from 'react-intl/locale-data/is';
import it from 'react-intl/locale-data/it';
import ja from 'react-intl/locale-data/ja';
import ko from 'react-intl/locale-data/ko';
import nb from 'react-intl/locale-data/nb';
import nl from 'react-intl/locale-data/nl';
import pl from 'react-intl/locale-data/pl';
import pt from 'react-intl/locale-data/pt';
import ro from 'react-intl/locale-data/ro';
import ru from 'react-intl/locale-data/ru';
import sk from 'react-intl/locale-data/sk';
import sv from 'react-intl/locale-data/sv';
import zh from 'react-intl/locale-data/zh';

let hasAlreadyAdded = false;

export default () => {
  if (hasAlreadyAdded) {
    return;
  }
  addLocaleData([
    ...en,
    ...de,
    ...es,
    ...fr,
    ...ja,
    ...ko,
    ...pt,
    ...ru,
    ...pl,
    ...it,
    ...fi,
    ...ro,
    ...nb,
    ...nl,
    ...hu,
    ...is,
    ...sk,
    ...pl,
    ...et,
    ...cs,
    ...sv,
    ...da,
    ...zh,
  ]);
  hasAlreadyAdded = true;
};
