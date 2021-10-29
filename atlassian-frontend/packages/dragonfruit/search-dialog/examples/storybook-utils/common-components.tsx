import React, { useState, FunctionComponent } from 'react';
import { IntlProvider } from 'react-intl';
import { action } from '@storybook/addon-actions';
import {
  AppSwitcher,
  Help,
  Notifications,
  PrimaryDropdownButton,
  Profile,
  Settings,
  Create,
} from '@atlaskit/atlassian-navigation';
import Avatar from '@atlaskit/avatar';
import Badge from '@atlaskit/badge';
import Drawer from '@atlaskit/drawer';
import Popup, { PopupProps } from '@atlaskit/popup';
import styled from 'styled-components';
import { LinkComponentProps } from '@atlassian/search-dialog';

export const intlDecorator = (story: () => any) => {
  return <IntlProvider locale="en">{story()}</IntlProvider>;
};

export const universalStyleDecorator = (story: () => any) => {
  return <div style={{ boxSizing: 'border-box' }}>{story()}</div>;
};

export const DefaultCreate = () => (
  <Create onClick={action('create clicked')} text="Create" />
);

// @atlaskit/button@14 passes ref to the given
// CustomComponent which causes errors to be thrown
// eslint-disable-next-line react/prefer-stateless-function
export class LoggingLinkComponent extends React.Component<LinkComponentProps> {
  render() {
    return (
      <a
        {...this.props}
        role="none"
        onClick={(e) => {
          e.preventDefault();
          action(`Link clicked: ${this.props.href}`)(e);
          (this.props as any)?.onClick?.(e);
        }}
      >
        {this.props.children}
      </a>
    );
  }
}

const badge = () => <Badge appearance="important">3</Badge>;

export const NotificationsDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Notifications badge={badge} onClick={onClick} tooltip="Notifications" />
      <Drawer isOpen={isOpen} onClose={onClose}>
        notifications drawer
      </Drawer>
    </>
  );
};

export const AppSwitcherDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <AppSwitcher onClick={onClick} tooltip="Switch to..." />
      <Drawer isOpen={isOpen} onClose={onClose}>
        app switcher drawer
      </Drawer>
    </>
  );
};

const HelpContent = () => <></>;

export const HelpDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => {
    setIsOpen(!isOpen);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Popup
      content={HelpContent}
      isOpen={isOpen}
      onClose={onClose}
      placement="bottom-end"
      trigger={(triggerProps) => (
        <Help onClick={onClick} tooltip="Help" {...triggerProps} />
      )}
    />
  );
};

const avatarUrl =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2MBERISGBUYLxoaL2NCOEJjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY//AABEIAWgB4AMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAAAwECBAUGB//EAD0QAAICAQQABQIDBQUGBwAAAAABAhEDBBIhMQUTIkFRYZIUMnEGIzOB0UJTcnOTNFRigoOhFSRDUmORwf/EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EACQRAQEAAgIBBQEAAwEAAAAAAAABAhEDEiEEFDFBURMiYXEy/9oADAMBAAIRAxEAPwD5+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAEASABAEgAQBIAEASABBIAABBIAEEgQASBBKAwSkA3HDcLapC0kG36DvKIcGhbadCmvoRQxxKsabFAJoBs9KkomgoD0KCiQErStBRZEpBsuqlBQzaQ0GxcVKCixNBsdVKAvRLgGx0LILuJUabNIAkAJAEgAQBIAEASABAEgAQBIAEASABAEgAQBIAEASAAAAAAAAAAAAAAAAAAAAAAAAEEkAAAAABZFS0QOJSH4+ELjEfjg/ci1vjEclG2avKtcIVkxkTJr1Z5MoMlFopRpGOSAAASAABgEomIzy+BWqk2pRO10N8svtVEXJp1ZyGrHOAKA+xddkbRihwMWO5D/ACkoiuRzFl20XiuPoOjBOVEZYqP5Sey+rLmVdCBmXlizbH4cvJ8gAAbMAAAAAAAAAAAAQSAAEEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEEkAASQSABBJAAEgAGC0SCUJUhsHyasfJki6Zrxc0Z5OjBsxVQZMSl0GNcDYfmSZyW6rrxnhgy4q9hPkJ9HYywhe27J0+mh5i3dFzl0m8W3CnglFW1wK2noNdp4Qxyp39DkTxrtG2GfZhnx6ZWqIGuL+Cu002yuAguTVFcKxWOFsa00icq0xx0mTVC7B2yF2To10W2lYjV0I4XdMZu3LkTJ+ouugCW9oXuRSabYyKSgm/cVPZGTE+zLKNM7eHZkW1q+Dl6pJZHRphltjy4eNs4ABq5gAAAAAAAAAAAqsllQAwSQSBAAAAAAAAAAAAAAAAAAAACACQIJAAAAAAIAAkCCQAIJoKA9AldBRIlSAkgshKiUasLYmEUx8aXRGTfCNMJjJ5NqszxZefqjRzWeXRMtJWdylfJpx5LVmaGLjs16fFuTXuLKRUtK1GTJmVcV9DK4OLpo6EsaxOrsIxWS7QsctDKbYoYN6sn8NDb9TVt28IXNqJfeo6srgoOhcx0nbEzLlRSmCQMlFoSkWTJS4KJ1IRol2G9RXJaStWImxwsl3n9iFNy4vgQwTL6suzraeUceFu+UjmZpbpMPNlVXwLbscx0WWe4qAAWxAE7SGqAaoAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEEgAQAAAAAAAABIBBIABrICESJcAAAjBZIrQyHwFOGQ7HRxsnHXwM9jHKunGKy4omMrKy5JhwyarbTjV+4yLcJXF8i45IqJEJ+oysaStHqk7Y3C+Wl2ZZZX0hulbeW2/YixTTmxrZuX5jDNN9nZeXTQw+qVz+EcjPK5vb0LFeU8MzVMVNDplGjeVhYQ4sFEdRDRfZHVVdFNvI2iK4sNhWXEDNM3SgngcvdGGZeLPIsgkqzVhRZAACASiCUAjZiwLNhi12uxWoxeW6HaaXl47vsTqJ75Ez5a2eGdgDAtgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAJAEAGgCQABAC7LCORUkkvBWG1aLJGTx7ULEegAE1YBKGY1bIjFtF4KmTa1xjTBFmUh2N5aMK3hTCy7iLaGEpsfiVyRnRpw+xOR4nbPoSltLwV0XyR2ow22kKsrRDZCdsrQ2rkiKcR0+iIJPsuJpJE3yNyxS6EPsqIXSImqJiWlG1Q9loqTfltIxzR0Z40sTb7MUkXjWeUZyrGSjRXazZz2KElqAe09VS2ONugotj7FTk8nSe2G0RN2y8hchReXwowJILYaAAQBJAgACQIAAkAAAAAAAAAAAAAAAAACAJAD0AAAMASAhoIkABQJi6ZACNdybRX3AslYH8hKy6g2+huKC4NMcaM8s9NpgTjxUuSXA0bCJQoy7Npj4IXDH4+Su0ZjQrfCpFZIo1wNnEXtYpRYpQ/ELUOTRjjwGVGOK8JNMvObZRcMlsyaFspjdMZIqkUQnzyKUmmOkvSIfBUTkltyFS7LPI0qKpNsuIXwx3To1xxfIrSw/eo6E4KGOXyZ55aaYRz9Q6jSMeXHthZvnDeZdY9sFEvCozjC+XyN00FKdPoS2O00kpHRbqOWfK2bT0rijPsZ0m7jwZ5oiZtLhGbYG2hyiyZRVFbT1IYuQySFsqM8lSCQLZaQQSwBKAAAAAkAAAgACQIAAkCCQAAAAAAASgSAUM9AKJAR6AAAjAAAwCQosopiOTYSsdCFRJxYt3NGmOFvijPLORvjgpjRoomOBpdF3DkwuUreYl2HZMlXQQ4ZK0bRiVIkBbGhGNyJnhpF8C9XJolHa9rJuWqvqx7K9hkY1DcMlFVwaseCL0tv5JuQmLnbrB2PyYNr4IWEfaDVZyUq5NSwfQnNipLgO0LrVNPjWbh9CNbg8qaSNmnWzFOXwxGqufLHjfJZTw59F8cSdvJZcGu2WjsNRaZvrfi+pzoyLx1Dg/oZZS1rLpfItknZytZPdkN2q1Vx6VnLnJttm3FjZ8seXKFExbiwaKnS5a0wzP5Ge5kjwaU+CLGuOS5FFbJvgk9lZIiJKjVJmafZpizzigMmgKZaVIL1YUNOiwLuJWhp0ACgAkASQAAAAAEkEgAAAASBNBQl6CACaBSALKJKhYj0rQUMUaCg2NKUFF6Cg2fVRLkdijcqKJGzR490rrojK6jTCeWvDijHEq7Y+OPlUiKqkjXp8e6DOLPJ24YluPpM8o89Gxqk/oJnD4M5WljHJckqA5w9RbymzTsjrSKJj3QxwoEkmGz6pgnaaNeaNqE101yIxzUZJ0aHPzEo9GVq4S4u+DZjjWnSZMcCjFNtMu4Pb+hNpxjzvkXGVsnOn5jROKA/ojI8oZlSlFIhKiLI2YxKFSg1wZ9UlupdDG3vZXNjbVl43ynJz59lJSdjskGJkmjpjCxaLKyfIW+hcnyVIWysvIhxNMolNts1xumOU2ztFaHOBRrk02z0qPS9KKKFoa+hWrkUslclXwTFtMkJcaIWHcm/YtJuS4KSk0qHKVLcK6K7S6mXStorekahcY0RKI7rig22LsNRnZFDnAjaiu0Z2UqiNqG0Q0PZEtUQNaKNDLSoEkDTQAABAAAAuFAXiiW0iYY9xfyJDcMTZDFuRllnpvjx7c7y2vYsoOjdLTNyLfhm+osj+qv5MEsborsN2bBKKqjPsdlTPcTcNEuHAbR2wNg+xdSlE6Gk4xPq0ZFDk36XDJxtdGXJl4a8ePkzGn8G3BPbF2Ij6SbOXLy654Wnkt/QhtKKFyLwW4RzymEbLuNIso0WnzFEbXpjydix+RCGjaM6lOmMjLm0J9xkKCk0xzT4t8HQk09JHIl3wcuLTNmly7cMsUuU+jLJUEsScdwrGnzwaPMUo0y2PDcW10Z9v1eiKIobKDRRxaDY0q0RJtlnFjPLTgOUrGDOk+KM7xHSnhTFrT7nRrORncHP8oqsDclwdb8LUS0MMIU32iv6l/NysmlcYdGR4qPTZYwnCmuDmZ9Ol0Vjy7TeNyHGmUceTZPFQl4zomTn66Vi4qNUVfJd42gUR7Gi9lkPG0zVhgt3qL6iMNlwVMXbyfRoxaOD0cXxu7ObnxKEqZo0+plF7W3VFdRFzVr2CWynlj4Y1jTYyKpUCg0NhF2XcmcxUULI2tI0KJOzgjsrozSi/go4fRmtwRVwQ+ybgybX8ENGiUORUolys7iVRSSodVFJKy5UWE0UGtUUaLRYqFFkuTTj0yyK7FctCYbZAo3/hY1+YVkw7EKZyr/AI2EjIIohkEFONOPhKjVCb4QjFDhMfBeo5s3Vg141uRrwOUXSqkZ8K2q2XyZf3bUPfs5r5reRbWOMo+xy5QSbNDlJrl2VcLZrJcSyx2z7OOiNhpcOCuwfZn0JjA6WJfu9qMkYj4tqq9iMrteM0dGMbpvn2IlChUW96ZfJOzPTRDLY3TKRdlk+Qpw9SLfmQlyr3LY8iszsaSjLCuzNKJsm3MVLEysbpNjJQyMWkXWNovGHBdyTpSNmqEXtuikIGzHD0GOWSpGdI36NWn+hnjDmqNenxvcqVmWV34XrSkoV2rL49FkyVtg6fu+Ds6XRwilkyrnuvg43i/7TY9JlePCuvc6uP0vjeTmz9Rq+DH4RqK/Kn/MVLTzxrbKLv8AQX4Z+1D1GqhinF1N0eqjGMqbSNL6WfSZ6m/bycsfyN0+kyZpfu117no8/h+DN2kn8oVnePw7RylFcRRM9Le3m+DvqZZ4jlLw3P8A2nEr/wCFZm301+pwtV+1WolkajwrpHW/ZvxqeszSxZbfwaX0sR7mrZ9JlxqpQtfQ5+SFp8HtJRTVM4/iXh3DnjX68GXJwdZvFrx83a6rymbC2xDxO+jsTwinp79iceVeWDlSxMo8dM6ksFCJ4foaTkZ3BkhGnYylKNMu8ZEoND7DqzvA91xHwwvypblRfFUZKwz5N0qi+B9qWmTy7ZdQ2qmNxr1Dc8VUWh9imLNFWW2kpV0TuVfULtVwEoJoW4JOrLrp2xLxyyTW18fJcxVePwica7Ey23SNuyMV6vU/qZZVOT2rj5Knhlnx6m6RKLsXJUaZRoRNFyubKEtFGuRrKNcmuLLSkVyOhNpVZRIBXyvGaO8x8Fr3LkTD84+EPV9CLJFy2skRsBURsC6yxbMUvSkOxO5GbE+TXiSObN1YHufpSsJ5FHG37lJcIpuXTM8Zut4pinJRSaNMY2rYhSuRoi/SbV0YTwXN5FOo9A5UueS0pKmZ3O5qKV2xaicpMfLVjg3Hc/clI07NsEvoKo5e26z0oVkN2lJxCUaLTosrKqLsZQ6JExVvkIwuXAJD9PDdIm3SpGnTYN8l8IZlx7W+OBuO8fsG5yi0+Tm7eW2mGUAhDhjdtNpjMeMq5J0TDHyaoqqGRwpItt5Rllls9aUhDk6PhcVLO7/s1Ri4hFyk6SHeDazFlzZOatql+h0elx7Z7Zc9/wANR35RTTXyeJ8c/ZzL+JeTD6lI9tF2uCdt9nrx5tfP/B/AdVDxHDklGoxlbPfXsirLPZjTbo5Wv8Qik4wZHJnqL4uO53UbJa7GnTYrVRx6/TSxd2eflKUndmnRauWKavo5ZzXfl25ekkx8OVk/ZLNLV9ehs9J4R4Fg8NuUfVJ+7OhgzLLFNGhcnZ37R59x61XaJzNKLTHt0Ys89263wTlDxcSlJyf1JeJGDNrXh1Eoxpxbs16bVwzce55HLxZY2162N3NqZMH0MuTFVnVdGPUQuToywzKzbnPGKnA3OAmeM6cc06YZIptdGuWOiHDg1mTO4k4o8jdQv3F1yiVChyju4fQu3kpHN3qq9yyfJOrweXmVdModbeeVoLdZMFt3Fb2SsvklGULEvx8olDfB0+RMNNkx4m2rV9jIttemy6nJLl8Bfhz8sxvlkl0IkrZpnzdCemGLjyKeMpKFGuuExU0mazJPWMr74CmaY4k5GjPo6wqcVfyHaDra56/Ma4RbSERhc4po6OCEU0TnlpWGLjIbDsUhsDaueHY3ybsDswY/zG/CqRzcjpwPvkz6qPrTguPcemMnteDbXq+TPC6ro1tjgvccpcUUi1TVFbr3Nm8ul3zwEMa7JjVWG74Ercrfp5ua2y5dcMasdmDBllGVro6kM0ckeDi5set3E2M8oUV2I0SQujOUtF+WvYrKDQ+NJjHGMkPZaZYw3OjfpsNcszKNSNuJvaRnl4VjF8lKvoxsIKcdyESTqh2mbjaZlKq0ueD1dFowS9jRkpxsrFcdCy+RKiKVUXji9O59FZzhhg5SdHG1fieTN6INwh8I04+K8heb8NPiGshHG8WN232ziYdbPS598GTNtR+rEbKTbR6XFxzjmonPHbuYf2mzQit9tF5/tRknzBNL6nnU+GiyVGrKcWLsT/aDU5ZJOVIdDM80VJu2zgSXNnV0WWPlpe5jyzcdXBJjdNxJFqkVlNJcHM6NJXi+XR5dqdxOhpf2kx5JbZKmmeZ1090+GZMcfWrZ2Yf+XDzcWOWT38vFMMobt6SZxPFfGlHG44338Hn5yafEgaTXqL2xnDpOPJKbcpPk04s0sc04ujHBpPge31RGUl+XZhfGnf02qjnVP8xbNC2cXR5vKzxk+k+Tuuccvqj0zzObj/nluCzyySjyROHBplArKPBEyTYwyxWVcKXJvWPgrkw3EuZp6sFEuSxwcvgmb8qLbOfn1Ep8Xx8HTx4XLynRWfI8mRybIin2V+oyLtHZ8Lisp8fUtHDkaT9mXxYVOfPsaZPbwjLPPXiM875LcVBUvYz5Jcj8j4Mk2Riwypc5CJMZNipJnRjGGVWhkfTL9sz3Q3E3JlUobj9ORHYhSwT3HNx41uTOnPC54o179nNndujCac2enWSScTo6fwzdtc20i+n0TXvZ1cGmlHDcuzHPl14jXGR8/ovAoWienXmT6Nj2ao5GZIvk0Y+TLKN8K2YpcGjFjnldRTbE6bFuV+x19Kljimo+o5c+SY/Drw8ssPD6fr4F6jw3jdB9HYS8yPCp3ZWWPhoxnqcttOu48y3LHLaxkVabNGp0koZ25J0zLK4t0duOXabiZuTyvGW0ZizyhO0xCdxLdIdk+2krsYZrLG/cq1yYsORx5Ruw5Fl679zi5OPr5h2DbwQm0OcaRTY/gy2NKQbczbisyKLjI0YpOyM/Jxqq0WgkmyEc/X66eGdY3wRx8dzvgW6dPvplM2aGnx3J8+yOPDxjPtaVGbLqcmoe6cnZ0Y+lyl81M3TNZrZ6jJW7hexjlMlxp2zNlk9/0O/GSTUVbpqU4yXJl1WbYqLx9MLMGo3ZJl4zbHm5Ljj4Ox547bY5ZoP3OesM6LxwZH0XqObHl5PxrnkVi46t4p8SFPBkvmxctPOxan2MuTl3uR6HTeJY8mP1y5F6nxDHFNRkjheTkj1YuUZruyJw4720vrOWTVjZk1m6fZKzx+Tn7Jd0S3Nexr0jl9xnvddKOZSklZbNm8tpHNhOUWmXyZnOhdGnub1b4NOmjRGa9zFppx8tJ9mlLkix18OfaHSfCaN2i1csdbuvgxRXBO9rpGWeEymq6tO/HWYJ1UqY1OM43F2ecU5XZ2PDFJ4230cHLwTCbhWabEqKZeIdpfqNOT4lqVKWyL4Rlxcdzy0ll12ZSqMeflmJxstLmRb01werjj1mi0oopIq5c0i754H48EK3S7HllJ8pyuvgyNQgq79xcpLkmcuBE5+xzyb8sMqiczPN8FpSETkb44scqiTFykwlIXORtIxtEmWx5djtCbCytJ7Ohg1FzSk+DuYtbicIw9vk8pGTT4NWHJNK74MOTilbYclevlDy4xmpWpLgdgzNyqTpfBxfD9bknBLLyl0bd6izz+Tj1XZjlt4ywTAvHG5K/ZHsPM0tDk16eDk6SRlgrdI2Y8q08OVcn0Z5tMI62lcVFRkujbDLDdS6PP49TJv9TXjz0ly7OLk4668Mo7WPKvYd+b9Tm6XJc+TqYYpys488bK6JfCmTFHLGpqzi+I6NY5p4k69z0GTgQ8aySd9Mvi5bhTs28xHjh9lnzSOr4p4Zth5uFddo48FKMue7PSxzmc3Ge7PDTJOEKYaXO8eZfBGWbmqYpUnYWS+F+XoFOOSNx6CqOVotTtyqLl6WdmrfB5vLhcMtKK2WxuOFMvCHJeqZjcgnLCWTC1B0zzurx5Mc3GaPTYzN4jpo5sEpf2oo39Py9bqovy8tJSXQ3DwlfZROpNP2GJqz0l4eTciTRnyQ4HOVlJ88Ci8pLCqqFBHAl6mi1NS56LTmukPbPWN+UbV8IIuPuiI9jIxXbYHJFbipdA1GXSLSjFgkkhK6xVwi64E5cEZc1yabSRVv3DZZYSl/h8aiuCktLjfFDVJ7iz55Hup/njfpjnoo+wqekpcHQb6If6DmVZ5enwrnQwSi1do2wTfYxwUi+z00Fuxx8PT4TDmNEXTCMlFMpvtkujejXJNqju6F1pYpHAwy3ZFGuzqQ1PkY1H46Of1GFyx1EXKW6adfnWLC0n6mcGcpTtj9VqJZ5tsSpcUXwcf88Qqktv1IvmiRmDC5T3VwjXK6m6WV0vjwqlKRacvYZldKkZZyo5t3KsMqrkmIk7ZM5ciZyNscXPlUTlQmUi9OQlvlm0jG1EmLbJk+SprImggCUhpTCNvg6EcW3Ao1y+Rfh+neWdtcL3OpDSvJmSrgw5M5G/HjsrEqUYm1tqCZfU6WOKMXH+ZlealRyX/J1f8AlzM2HDFpRRWTjHHshHvtjZY7dlapHX2c/WERSjwRllvlfwRkfq4ITLk+2dpuJ0zXjl0YU6NGGXBnnFYV0sOVRaOrpNSvdnBjIfhy1Lk5c+Pbqxzd7JnW7hhiy8nLWXcaMOT1ROXLj01mW3Syz9DXyjheIaTZ+8h17o7GolxFim1JU1aK4s7hdnZt5zdK+bQ6GJShucv5GvV6SMYvJHr6mC/5Ho45TKbiZRJKM00dTw/WK9uR8fJyqcnReNx+guTCZzVVK9WoramnYVycvwvX8+Tllx7NnXpHkcmGWGWqe0pcGXxHURwaWVv1SVI2NUjHrdDHWpeqmg47O07IeUjK3JvtsmM+eTu5vAYfhpeVO8tcHBzYJ6fI45OGevhyY5/Cd2Gb+Sbt2ITcfqXbdWW0mW05Z0KWRF3ByXIvaroE5bW85p8DVfbYt4eLKNST5YHLZ8tCyJJ3yRHLbroW6SDvkWlTI2Tddhu9NEJ7ohCPIlb2vQb4x4ZMnuVC1C5Ar/hiqRKVPkJRUEiHK6A/+pdrlEp2hak75ByUemPRbgnwU+i7KZsjT6L6acVJNoemOWe1scZ48im0aJylJWyuWbn0qRW3RNXhj91F88kPnoG65Ig7fCGtbHB5JqJ1NsY41GK6E6bFsW6SpvoZLIl2cfLn2uoxtJzcLlGDLLk06nNu4+phyuvc048XPnkrNiZMluynTOmRhkbHJtxtGOUuS+SQlmmMZ0EAQ2Wi1YmK5KpmjT4nNoV8Knl1NPlhhwRXvXJt0evji3Ta9uDntQxw9SsVLJDy2o2jlynZ043q6E/EPMTUubZmtyZz1OW7g6Gme6Iv5zFW7UZfSjNN8GybxyjTkjJNqnVFxFZZlUWn2THFJw3exsxqBkJUxYE0Tw2RnxwXjLky42Pi+TLKNZW7G5Ua8G67MWmbm0jp46jFfLOTl8OrDy0ZJbscflFFJ0VTbJ6OdoXqsbyadxj2cWeOeOVS4O/Zl12nWXDcV6kdPp+TV61Nn25S+hbcU2uDp9go82dvyIvFtO0zo6LxLJjmlN7o/U5jdFo+xGeEzmqt7BPzIKUemrRKTXZxvDvEdlYsr9Ps/g7MZwkvTJM8jk48sMtJ+Eo8/wDtTCKzYppU2uT0Si2cL9qIbpYl70bekt/ozy8vOxk26HxTbSK48ajyMStnq1eGKZSUVSFqO7ll5QCC5oS6lVQrIueBm6nRR8sCvlTsZHnhkbOSVFpgUidyjwNint3IRLsbila2iXL5Mi+eQ4Tsu4pREynzSE0+E5ZbkvkquFyNhFPlis8k+IjK/GyMuZ7uCjc1y+iVD5GJ8VRTnu6iNZI8jMen9Lb/AJEKKiuBkcrcUn7CtPqIuuyW+SthW4lvtaK3OjdpNPGnOSXHRlx4JyaUE2zsRx7cUYPjg5+fk1NRNu2bJOzHkk2dTLplSaZnlpo3dmGGUZZSuPnbUjPKW43a3DUzEsM5TpI7cLNOXKUpp+yKStdnVyY448aVK6OVqJXNpexpjdsrNEzdsqDINoyS+ijLPooxxGS0TdpZbad/QwxHY57WLKbXjdOhqMkcjjjhal7tlVo8vx/3Msp7pKXwdPQaptNSMMt4zw6cb2OweGLylKTSZd6eOH8rHQz3BR+o54Hlxbor9Tly5L9uiYvNZM+9cKhTk/kgk7tODtUr1McrUNpOCMX32apKPktpE5XTSTbntcgXcaRFD2nQiPjYuKbGwhKyMl4xu8PrzKZ1vKTpp/8A0cSCcXx2dvSwlHFHf/aOPmdXGmajGHD5+Cm80PHHJcV2Zp4pQdNcnPG1Ngtw/FjTMsIz8vck6NG541H9BfAhGs0OLI+FtkzlajTS089suvk7cp75Jls2COfFta5+Tbj57hdZfA19x5mRO6kO1OlyYMrUlwKceDullngTau/k04dZOD9MmjHJUEQuMpO3i8ZzQVNqX6mDW6vJrMm/J2jMm0nZSM22KceON3C8LSdExdk0mirVLgtRlV7kLh2VTtA0wNFeoskmytqv0JjLmxBfoi18lJT5KjHaLNbnwTCO2VkRlSGRaq30IRdzbiZ5va+Bra+RMpLcB5VeWWTjwUxwlOyzaaYQbj0xp+UURdF5FKYFQnuGqNIU1SQ1MKeKG6GYYyyTSgmyto6fhOnv941wZcufTHZ1s0mn8jEt352MffI+l7isy4s8rtcrumpqJRjC7MLnz2PyPfGmZckGl+htxxnkRq5JtcGKWVxdR4s05XaMkoN5or2bOzBhfk3UTflfyOTK22ztz0/nY+OGhD8LbVvg1485Plnnj2cZhR0cmhcBM9O0jaZysbx2Mb6IoZKFSoijSMriqiy7IBAPg2LVM6OgpYpN1Zy4dnS0STml8mPJ8NuK+W7G/Uvg7mjj5em3PlN9HLzaOWKKkk+Tq4ISekxxlw6PM5b48PQxeFonokg9V5S0JNM7/gmKGohODvczgROt4Jn8rVxV0nwZcvw6OO+dI13huTTZKl13Zmjp7PVeLYfP0zku4c/yOFBJ9GGPJbG94yseCMRuxeyLbS8I26FchMCsUf30bO+42sb9kjlww1NfJ2ox/dRXukc3LlttjNKYcaSb97HeXGSW6KZEcbjKx8FaTox8jKly24sb3I5ueSlle3hUb9fk24JWcbFNuffBcmxi14oPs1RVEYkqQ5RVmd8r3orV6VZ9JJP8y5R5hpwk0/Y9lw0kc7xHwuOoqWNqMjq4OaY+KzmTzm1MXOodDc2OeDI4S4aM8tzZ6CrltPLKu4ltwPlAQk7BP0kDo4bxbrAFx4aLyZVU1yTwB7LXLJvsH3wHTAkPkvt4REqSsvuTgCpC32S5cEEME1HbCUGmmFD3zBAJCopsZsIuqobFWJpjC30Vv0jJJx4RSUaiAsVTtBTBRaQPJbSGz+F4LlHp9BCtNj4rg8/ocXnaqEfqesjBR4S4Rw+rvxBsnJ70ZpP/ANxtywpmHU+lnFj86VL4Jk0xWRqis5NGeU+aOnHFNpGoxONyXuLwLndJdG3I92Exy4R043wxsOx5KnLngnzXLizK5UiYbpNUGgvnlUlZlnJXwa9SqivlmTY/gvFNKljjLmuRcsS9jZHG/gYtPasvvpPRy3hZV4n8HVenpi5wSXCKnKj+bm7GmdzQ6WtLHM126OXKNyR6uOKtFhxxXEY9/JHNn4XxYeWrRS87DU+WuDR71wYNFJxy0zocJt1weZl8ut8+aojaMmvUFHsbeZ1USNGBuM1KPaKRg37cGrBiVrjgnLKaaY43bt6TVTWg83JJtue3n4OfNKOaWzp8mjO0tLiwwVK3JisGK5pP3ZxzU8uzSUMwRudD82meOSSJhDYr9zO3wvTRjw8p0bY8Irpdrir7M2pzSjN7eDGy/Jt18Je5bHJ7mr4OZh1O2a3t8m+GSN98h5+02DW4vNwSS7OEo+XOvg77zRlFq/Y8/knuyyf1NMBPDo4sqcLsZHOm+GctSaVWPwW5URlgqXbs45Wkyz9SE6f8tDYumY34RZquF4/p3HMs1cS4ONLo7n7QavHkjHFCpNPk4a5uz1+DfSbKVak1RTrhjVFOP1Fzg/dmq6rSCU5Q4RKjXsFOXsBaqYK+SfLb6J/LwWvgSpFVCuyHHmy7+jIoFeC5KxijSDp8lnK1wAkKcbfBDi0MbpA2BaUUS8UUcm+Ei8FKwOTaei0ZUVk1ZG6xK+F3KytXKmLcnZZPb+YZdlpdcEeUmrIclZV5HfAJtjVo35OphNfJ66HrSl8njMUqab6s9hpsinhhJdNHF6qfFZ5f6WyLdIw6uFeo3t+ox6ySqjjnzsYuRnlyZJv3NedUY5PmqOzBOQedqG0W58chNUIdykbyM7WuKg4F8W2MTNBN8DYY5NWuhU55Gf1yVDFp6QRgl2Og3Ii5KkK8pssuFRphB1yhWTG17Edl6In0ZpHShpty5F5NHVfUqZyIuLnRgty/U9DptXHyYxSvijj6nBLBTa7L+HZYvMoZHUWVn/lNjHxXWwzhLI5R9vc6UX5mOP1Ofh0zx5J45dS5TOliiowVeyOK/LTK+Hg5PB51edjr53Ivl/DwXpz43+k0cQD2/wCX+3ke4v49bpXoHpksmqwJr2eRIus2ghxHU4P9RHjwIvp5ftpPV38e0Wo0DpvVYP8AVReGp0HmJvV4El/8sTxAGfs5+qnrcvx9Aya/QOaf4zTv/qx/qKyazQSyutZp6/zYnhAF7LH9P32X49y/E9NiyS8vV4Gv8xP/APRP/iOmyJueqwX/AI0eMAfs8f0e+y/Hq82uwebHbqMVJe00Mh4lhUk/xOL70eQAd9Jjfsve5fj2M/EsEZT26nC7/wCNGVavT/7xi+9HmAHPSYz7Hvcvx6r8Zpv94xfejTpdbpFk9Wqwr9ciPGAK+jxv2J63KfT6Jh8T0MW71umX/Vj/AFJyeK6FQk1rdO3Xtlj/AFPnQGfsMf0e9y/Ho8uo00sjfnY39d6M8s+HfxlhX+JHEA65xSF7zL8d5ajCo8Zsf3IX+Ixt85YfcjigH84fvcvx3XqcK6y4/uRHn4f73H9yOGAfyh++y/Hc8/Dd+dD7kD1GL+9h9yOGAfyg99l+O0s+L++h9yLfiMX99D7kcMA/lB77L8d1ajDXObH9yCWow1xlx/cjhAH8ofv8vx3fxGGv4uP7kVWfDf8AFh9yOIAfyhe+y/HdWfBf8XH9yL/iMG3jNj+5HnwD+UOevyn07ss+F/8ArY/uRaOfTpfxsf3I4AB/KD3+X47stRg3fxcf3IrkzYWv4uP7kcQA/lC99l+Oy8uGr82H3IPPw1/Eh9yOMAfzhe9y/HaWox1Xmwr/ABI9B4V4xplhjizanDHbwnKaR4UDPk9POSatL3mX4+lS8U8P/wB+03+tH+ph1HiGjatazA+f7xf1PBgYT0GM+xPW5T6eu1Gs0rXGpwv9JozYtRpnJuefFx/xo80BtPSyfZX1mV+noM2pwNusuP7kJxZ8W53lh9yOKBc4JPtPub+O/h1GBSd5sa/5katNqtKoSUtRiX6zR5YBX08v2c9VZ9PUPVaZx/2jFf8AjQzBrNMnzqMK/wCdHkwJvpZfs/eZfj3MddotvOrwX/mIXm1uja41WD/UR4oCfaY/qve5fj2kPENKo/7Tg/1EWlrtG1H/AM1g/wBRHiQFfR437Hvcvx7TXavRT27dVglS9siME8mkjLHOGoxXfPrR5oC8fTSTW031eX497l8T0m7A1q9O6XP7xcf9zfDxTw/y+dfpb/zo/wBT5mBnfRY272d9ZlfoAAHc4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/9k=';

const ProfileContent = () => <></>;

export const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Popup
      content={ProfileContent}
      isOpen={isOpen}
      onClose={onClose}
      placement="bottom-end"
      trigger={(triggerProps) => (
        <Profile
          icon={<Avatar src={avatarUrl} />}
          onClick={onClick}
          tooltip="Your profile and settings"
          {...triggerProps}
        />
      )}
    />
  );
};

export const SettingsDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Settings onClick={onClick} tooltip="Settings" />
      <Drawer isOpen={isOpen} onClose={onClose}>
        settings drawer
      </Drawer>
    </>
  );
};

type PrimaryDropdownProps = {
  content: PopupProps['content'];
  text: string;
};

export const PrimaryDropdown = (props: PrimaryDropdownProps) => {
  const { content, text } = props;
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowDown') {
      setIsOpen(true);
    }
  };

  return (
    <Popup
      content={content}
      isOpen={isOpen}
      onClose={onClose}
      placement="bottom-start"
      trigger={(triggerProps) => (
        <PrimaryDropdownButton
          onClick={onClick}
          onKeyDown={onKeyDown}
          {...triggerProps}
        >
          {text}
        </PrimaryDropdownButton>
      )}
    />
  );
};

const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const SearchDialogContainer: FunctionComponent<{}> = ({ children }) => (
  <NavigationContainer>{children}</NavigationContainer>
);

export const onNavigate = (
  href: string,
  event: React.MouseEvent | KeyboardEvent,
) => {
  event.preventDefault();
  action(`onNavigate Called: ${href}`)(event);
};
