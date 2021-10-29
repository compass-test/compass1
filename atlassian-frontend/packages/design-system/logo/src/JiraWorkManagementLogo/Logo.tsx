import React, { Component } from 'react';

import { uid } from 'react-uid';

import { DefaultProps, Props } from '../constants';
import Wrapper from '../Wrapper';

const svg = (iconGradientStart: string, iconGradientStop: string) => {
  const id = uid({ iconGradientStart: iconGradientStop });
  return `<canvas height="32" width="303" aria-hidden="true"></canvas>
  <svg
  fill="none"
  height="32"
  viewBox="0 0 303 32"
  width="303"
  xmlns="http://www.w3.org/2000/svg"
>
  <linearGradient
    id="${id}"
    gradientUnits="userSpaceOnUse"
    x1="7.94848"
    x2="14.7792"
    y1="19.536"
    y2="11.1249"
  >
    <stop offset="0" stop-color="${iconGradientStart}" ${
    iconGradientStart === 'inherit' ? 'stop-opacity="0.4"' : ''
  } />
    <stop offset="100%" stop-color="${iconGradientStop}" />
  </linearGradient>
  <path
    d="m12.3893 6.29721-3.42568 13.18669c4.35918 1.2052 7.83828-.3558 9.17088-5.4802l1.9988-7.69729z"
    fill="url(#${id})"
  />
  <path fill="currentColor" d="m7.75657 24.1237 3.42573-13.1866c-4.3623-1.19602-7.8383.3649-9.17087 5.4985l-2.01143 7.6881z" />
  <g fill="inherit">
    <path
      clip-rule="evenodd"
      d="m122.757 5v19.1237h2.379v-6.305l6.085 6.305h3.234l-6.776-6.8448 6.499-6.6485h-3.095l-5.947 6.3296v-11.96zm-84.0053.55058c-.2088-.0757-.4319-.1066-.654-.09058-.222-.0155-.4448.01575-.6533.09164-.2086.07589-.398.19465-.5553.34821-.1574.15356-.2791.33835-.3569.54183s-.1098.4209-.0939.63752c0 .42944.1748.84129.486 1.14495s.7333.47425 1.1734.47425.8622-.17059 1.1734-.47425.4861-.71551.4861-1.14495c.0164-.21674-.0153-.43438-.0929-.6381s-.1993-.38872-.3568-.5424c-.1574-.15367-.347-.27241-.5558-.34812zm.5089 5.07982h-2.3792v13.4933h2.3792zm-5.6979-4.22587h-2.4891l.0094 12.49357c0 1.7695-.726 2.9962-2.8286 2.9962-.88.0065-1.7534-.1496-2.574-.46v2.349c.9621.3182 1.9731.4727 2.9889.457 3.4288 0 4.8934-2.2387 4.8934-5.5047zm11.6158 17.71917h-2.3225v-13.4933h2.3225v2.3736c.8015-1.5916 2.1843-2.7232 4.8966-2.5637v2.2693c-3.0423-.3067-4.8966.5919-4.8966 3.4531zm11.3678.2791c2.1309 0 3.7903-.9169 4.6734-2.6987l.0032 2.4196h2.3791v-13.4933h-2.3791v2.3828c-.8329-1.7541-2.3823-2.6435-4.4-2.6435-3.872 0-5.808 3.2108-5.808 7.0166 0 3.9682 1.8543 7.0165 5.5314 7.0165zm4.6734-6.4768c0 2.9961-1.9077 4.3179-4.0385 4.3179-2.4609 0-3.7872-1.6192-3.7966-4.8576 0-3.1311 1.3829-4.8576 4.0637-4.8576 2.0303 0 3.7714 1.3217 3.7714 4.3178zm8.6023-11.52147h2.5709l4.7143 15.43457 5.1731-15.43457h2.9291l5.1732 15.43457 4.73-15.43457h2.4891l-5.7105 17.71917h-3.1806l-5.0286-15.1401-5.0285 15.1401h-3.0989zm34.376 3.96517c-4.148 0-6.5808 2.941-6.5808 6.989s2.4608 7.0533 6.5808 7.0533c4.121 0 6.528-3.0053 6.528-7.0533s-2.379-6.989-6.528-6.989zm0 11.8742c-2.957 0-4.2582-2.3215-4.2582-4.8852h.0031c0-2.5638 1.3231-4.83 4.2551-4.83 2.933 0 4.205 2.2662 4.205 4.83 0 2.5637-1.247 4.8852-4.205 4.8852zm11.617 1.8798h-2.323v-13.4933h2.323v2.3736c.801-1.5916 2.184-2.7232 4.896-2.5637v2.2693c-3.042-.3067-4.896.5919-4.896 3.4531zm28.734-16.2533v16.2533h-2.492v-17.71917h4.315l4.121 10.17217 1.687 4.8852 1.688-4.8852 4.149-10.17217h4.01v17.71917h-2.489v-16.07543l-2.131 6.39703-4.007 9.6784h-2.408l-3.953-9.6784zm26.165 16.5324c2.131 0 3.79-.9169 4.673-2.6987l.003 2.4196h2.38v-13.4933h-2.38v2.3828c-.833-1.7541-2.382-2.6435-4.4-2.6435-3.872 0-5.808 3.2108-5.808 7.0166 0 3.9682 1.855 7.0165 5.532 7.0165zm4.673-6.4768c0 2.9961-1.907 4.3179-4.038 4.3179-2.461 0-3.787-1.6192-3.797-4.8576 0-3.1311 1.383-4.8576 4.064-4.8576 2.03 0 3.771 1.3217 3.771 4.3178zm17.729 6.1977h-2.379v-8.142c0-2.4288-.996-3.5082-3.262-3.5082-2.2 0-3.734 1.4321-3.734 4.1584v7.4918h-2.379v-13.4933h2.379v2.2141c.423-.7665 1.055-1.4041 1.826-1.8424s1.651-.6603 2.543-.6416c3.18 0 5.006 2.1467 5.006 5.8574zm8.021.2791c2.131 0 3.79-.9169 4.673-2.6987l.003 2.4196h2.379v-13.4933h-2.379v2.3828c-.833-1.7541-2.382-2.6435-4.4-2.6435-3.872 0-5.808 3.2108-5.808 7.0166 0 3.9682 1.855 7.0165 5.532 7.0165zm4.673-6.4768c0 2.9961-1.908 4.3179-4.038 4.3179-2.461 0-3.772-1.6192-3.772-4.8668 0-3.1219 1.367-4.8484 4.039-4.8484 2.03 0 3.771 1.3217 3.771 4.3178zm15.293 3.7781c-.883 1.7818-2.542 2.6987-4.673 2.6987-3.658 0-5.475-3.0391-5.475-7.0257 0-3.8058 1.908-7.0166 5.752-7.0166 2.02 0 3.567.8894 4.4 2.6435v-2.3736h2.325v12.2667c0 3.9682-1.911 6.6393-6.861 6.6393-1.672.0477-3.339-.1995-4.921-.7299v-2.2294c1.549.5193 3.173.7927 4.811.8096 3.458 0 4.646-1.8094 4.646-4.3179zm-4.035.5398c2.128 0 4.035-1.3218 4.035-4.3179v-1.0795c0-2.9961-1.741-4.3178-3.771-4.3178-2.684 0-4.067 1.7265-4.067 4.8576.013 3.2384 1.339 4.8576 3.803 4.8576zm9.127-4.8944c0 4.14 2.266 7.0533 7.439 7.0533 1.411 0 3.152-.2147 4.281-.7943v-2.1466c-1.346.477-2.767.7199-4.199.7176-3.263 0-4.784-1.4843-5.117-3.7782h10.092v-1.0518c0-4.1002-1.71-6.989-5.972-6.989-4.202 0-6.524 2.9134-6.524 6.989zm10.095-.92h-7.719v-.0154c.251-2.346 1.521-3.9437 4.038-3.9437 2.38 0 3.542 1.4352 3.681 3.9591zm16.98 7.6942h-2.379v-8.142c0-2.4288-.996-3.5082-3.265-3.5082-2.2 0-3.731 1.4321-3.731 4.1584v7.4918h-2.379v-13.4933h2.37v2.2141c.423-.7667 1.054-1.4045 1.825-1.8428.771-.4384 1.651-.6603 2.543-.6412 2.351 0 3.954 1.1592 4.646 3.2936.776-2.0792 2.627-3.2936 4.924-3.2936 3.096 0 4.812 2.0516 4.812 5.8574v7.9058h-2.379v-7.4918c.009-2.7815-.971-4.1615-3.253-4.1615-2.2 0-3.734 1.4321-3.734 4.1584zm11.865-6.7742c0 4.14 2.266 7.0533 7.439 7.0533 1.411 0 3.152-.2147 4.287-.8035v-2.1466c-1.347.4808-2.771.7269-4.205.7268-3.263 0-4.784-1.4843-5.117-3.7782h10.095v-1.0518c0-4.1002-1.713-6.989-5.972-6.989-4.205 0-6.527 2.9134-6.527 6.989zm10.095-.92h-7.716v-.0154c.258-2.346 1.515-3.9437 4.029-3.9437 2.385 0 3.548 1.4352 3.687 3.9591zm16.98 7.6942h-2.379v-8.142c0-2.4288-1.002-3.5113-3.262-3.5113-2.2 0-3.734 1.4321-3.734 4.1584v7.4949h-2.379v-13.4933h2.379v2.2141c.423-.7667 1.055-1.4045 1.826-1.8428.771-.4384 1.651-.6603 2.543-.6412 3.18 0 5.006 2.1467 5.006 5.8574zm10.287-2.3644c-.49.1102-.99.1728-1.493.1871-1.464 0-2.184-.8096-2.187-1.9964v-7.1729h3.677v-2.1467h-3.677v-2.852h-2.323v2.852h-2.241v2.1681h2.241v7.2067c0 2.5085 1.44 4.2075 4.4 4.2075.542.0028 1.082-.0695 1.603-.2147z"
      fill-rule="evenodd"
    />
  </g>
</svg>`;
};

export class JiraWorkManagementLogo extends Component<Props> {
  static defaultProps = { ...DefaultProps, label: 'Jira Work Management' };

  render() {
    return <Wrapper {...this.props} svg={svg} />;
  }
}
