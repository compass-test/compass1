import React from 'react';

import styled from 'styled-components';

export const Icon = styled.div`
  display: inline-block;
  > svg {
    height: 80px;
    width: 64px;
    margin-right: 24px;
  }
`;

/* eslint-disable max-len */
export const ProformaLogoIcon = () => (
  <Icon>
    <ProformaLogoSvg />
  </Icon>
);

export const ProformaLogoSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="60 30 165 225">
    <linearGradient
      id="proforma-ui__proforma-logo"
      gradientUnits="userSpaceOnUse"
      x1="31.506"
      y1="66.925"
      x2="199.673"
      y2="96.578"
    >
      <stop offset="0.1267" stopColor="#FFC80B" />
      <stop offset="0.2044" stopColor="#FFB913" />
      <stop offset="0.3537" stopColor="#FF9228" />
      <stop offset="0.5574" stopColor="#FF544B" />
      <stop offset="0.6534" stopColor="#FF345C" />
      <stop offset="1" stopColor="#C50D3D" />
    </linearGradient>
    <path
      d="M92.1 149.5V60.3h100.5v58.1l31.3 31.3V29H89.6c-15.9 0-28.7 12.9-28.7 28.7v60.4L92.1 149.5z"
      fill="url(#proforma-ui__proforma-logo)"
    />
    <path
      d="M192.7 133.7v89.1H92.1v-58.1l-31.3-31.3v120.7h134.4c15.9 0 28.7-12.9 28.7-28.7V165L192.7 133.7z"
      fill="#00117d"
    />
    <rect x="114.7" y="100.8" width="57.7" height="12.4" fill="#00117d" />
    <rect x="114.7" y="133.2" width="57.7" height="12.4" fill="#00117d" />
    <rect x="114.7" y="165.7" width="57.7" height="12.4" fill="#00117d" />
  </svg>
);

export const BlankFormIcon = () => (
  <Icon>
    <BlankFormSvg />
  </Icon>
);

export const BlankFormSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="60 30 165 225">
    <linearGradient
      id="proforma-ui__blank-form-logo"
      gradientUnits="userSpaceOnUse"
      x1="31.506"
      y1="66.925"
      x2="199.673"
      y2="96.578"
    >
      <stop offset="0.1267" stopColor="#FFC80B" />
      <stop offset="0.2044" stopColor="#FFB913" />
      <stop offset="0.3537" stopColor="#FF9228" />
      <stop offset="0.5574" stopColor="#FF544B" />
      <stop offset="0.6534" stopColor="#FF345C" />
      <stop offset="1" stopColor="#C50D3D" />
    </linearGradient>
    <path
      d="M92.1 149.5V60.3h100.5v58.1l31.3 31.3V29H89.6c-15.9 0-28.7 12.9-28.7 28.7v60.4L92.1 149.5z"
      fill="url(#proforma-ui__blank-form-logo)"
    />
    <path
      d="M192.7 133.7v89.1H92.1v-58.1l-31.3-31.3v120.7h134.4c15.9 0 28.7-12.9 28.7-28.7V165L192.7 133.7z"
      fill="#00117d"
    />
  </svg>
);

export const FinanceIcon = () => (
  <Icon>
    <FinanceSvg />
  </Icon>
);

export const FinanceSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="25 30 230 230">
    <linearGradient
      id="proforma-ui__finance-logo-1"
      gradientUnits="userSpaceOnUse"
      x1="274.1"
      y1="-14.5"
      x2="-105"
      y2="264.1"
    >
      <stop offset="0.1982" stopColor="#FFC80B" />
      <stop offset="0.3191" stopColor="#FFC60C" />
      <stop offset="0.3754" stopColor="#FFBE10" />
      <stop offset="0.4183" stopColor="#FFB217" />
      <stop offset="0.4544" stopColor="#FF9F21" />
      <stop offset="0.4863" stopColor="#FF882E" />
      <stop offset="0.5151" stopColor="#FF6A3E" />
      <stop offset="0.5411" stopColor="#FF4851" />
      <stop offset="0.5542" stopColor="#FF345C" />
      <stop offset="0.8044" stopColor="#C50D3D" />
    </linearGradient>
    <polygon
      points="74.1 97.1 28.1 171.8 68.5 171.8 92.8 132 "
      fill="url(#proforma-ui__finance-logo-1)"
    />
    <polygon
      points="161.6 164.4 116.5 79.5 78 79.5 140.8 196.7 "
      fill="#00117D"
    />
    <linearGradient
      id="proforma-ui__finance-logo-2"
      gradientUnits="userSpaceOnUse"
      x1="527.7"
      y1="-43"
      x2="-345"
      y2="598.2"
      gradientTransform="matrix(1 0 8.297145e-02 1 -71.2877 5.319300e-05)"
    >
      <stop offset="0.2461" stopColor="#FFC80B" />
      <stop offset="0.386" stopColor="#FF6143" />
      <stop offset="0.4545" stopColor="#FF345C" />
      <stop offset="1" stopColor="#C50D3D" />
    </linearGradient>
    <polygon
      points="239.9 82.6 170.8 132.9 195.2 132.9 141.5 214.7 178.8 216.2 230.8 132.9 249.9 132.9 "
      fill="url(#proforma-ui__finance-logo-2)"
    />
  </svg>
);

export const HRIcon = () => (
  <Icon>
    <HRSvg />
  </Icon>
);

export const HRSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="20 15 250 250">
    <linearGradient
      id="proforma-ui__hr-logo"
      gradientUnits="userSpaceOnUse"
      x1="94"
      y1="104.3"
      x2="268.2"
      y2="157.5"
    >
      <stop offset="0.1267" stopColor="#FFC80B" />
      <stop offset="0.2044" stopColor="#FFB913" />
      <stop offset="0.3537" stopColor="#FF9228" />
      <stop offset="0.5574" stopColor="#FF544B" />
      <stop offset="0.6534" stopColor="#FF345C" />
      <stop offset="1" stopColor="#C50D3D" />
    </linearGradient>
    <path
      d="M117.1 98.6c1.3-26.5 10.9-32.1 25.8-32.2 16 0.1 26 6.6 26 38.7v0.3c0 6.8-2.6 31.9-6.5 54.2l-0.2 1.2 49.1 24.3c19.2 7.9 20.4 21.7 20.4 25.8v0.3l28.7 28.7 -0.1-29c0-35.3-32-50.3-38.4-52.8l-28-13.7c0.7-5.5 3.5-28.8 3.5-39v-0.3c0-54.7-28.5-67.2-53-67.8l-2 0 -1.6 0v0c-18.8 0.6-39.9 8.2-48.5 36.6L117.1 98.6z"
      fill="url(#proforma-ui__hr-logo)"
    />
    <path
      d="M221.1 213.3h-167v-2.2c0-6.5 2.6-18.6 20.3-25.8l48.4-24.3 -0.2-1.2c-2.8-18.8-4.9-40.1-5.5-50.1L90.2 82.8c-1.2 6.5-1.9 13.9-1.9 22.3v0.3c0 10.2 3 33.3 3.8 38.9l-31.5 13.8c-12.1 5-35.1 22.4-35.1 52.8l-0.1 32.5h226L221.1 213.3z"
      fill="#00117D"
    />
  </svg>
);

export const ITIcon = () => (
  <Icon>
    <ITSvg />
  </Icon>
);

export const ITSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="30 30 220 220">
    <path
      d="M60.5 72.2h-6.1c-10.6 0-19.2 8.6-19.3 19.2 0 10.7 8.6 19.4 19.3 19.4H99L60.5 72.2z"
      fill="#00117D"
    />
    <linearGradient
      id="proforma-ui__it-logo-1"
      gradientUnits="userSpaceOnUse"
      x1="234.1"
      y1="-53.6"
      x2="49.4"
      y2="262.1"
      gradientTransform="matrix(1 0 0 1 6.7035 0)"
    >
      <stop offset="0.3675" stopColor="#FFC80B" />
      <stop offset="0.5488" stopColor="#FF6143" />
      <stop offset="0.6376" stopColor="#FF345C" />
      <stop offset="0.7137" stopColor="#F93059" />
      <stop offset="0.9277" stopColor="#C50D3D" />
    </linearGradient>
    <path
      d="M226.9 72.2H74l38.6 38.6h114.4c10.6 0 19.3-8.6 19.3-19.3v0C246.2 80.8 237.5 72.2 226.9 72.2zM226 100.6c-5 0-9-4-9-9 0-5 4-9 9-9 5 0 9 4 9 9C235 96.5 231 100.6 226 100.6z"
      fill="url(#proforma-ui__it-logo-1)"
    />
    <linearGradient
      id="proforma-ui__it-logo-2"
      gradientUnits="userSpaceOnUse"
      x1="271.3"
      y1="-22.6"
      x2="90.8"
      y2="286.1"
      gradientTransform="matrix(1 0 0 1 6.7035 0)"
    >
      <stop offset="0.3675" stopColor="#FFC80B" />
      <stop offset="0.5488" stopColor="#FF6143" />
      <stop offset="0.6376" stopColor="#FF345C" />
      <stop offset="0.7137" stopColor="#F93059" />
      <stop offset="0.9277" stopColor="#C50D3D" />
    </linearGradient>
    <path
      d="M226.9 124.2H123.8l38.6 38.6h64.5c10.6 0 19.3-8.6 19.3-19.3C246.2 132.8 237.5 124.2 226.9 124.2zM226 152.5c-5 0-9-4-9-9 0-5 4-9 9-9 5 0 9 4 9 9C235 148.4 231 152.5 226 152.5z"
      fill="url(#proforma-ui__it-logo-2)"
    />
    <path
      d="M110.3 124.2H54.4c-10.6 0-19.2 8.6-19.3 19.2 0 10.7 8.6 19.4 19.3 19.4h94.5L110.3 124.2z"
      fill="#00117D"
    />
    <linearGradient
      id="proforma-ui__it-logo-3"
      gradientUnits="userSpaceOnUse"
      x1="306.7"
      y1="13.5"
      x2="135.3"
      y2="306.7"
      gradientTransform="matrix(1 0 0 1 6.7035 0)"
    >
      <stop offset="0.3675" stopColor="#FFC80B" />
      <stop offset="0.5488" stopColor="#FF6143" />
      <stop offset="0.6376" stopColor="#FF345C" />
      <stop offset="0.7137" stopColor="#F93059" />
      <stop offset="0.9277" stopColor="#C50D3D" />
    </linearGradient>
    <path
      d="M226.9 176.2H176l38.6 38.6h12.3c10.6 0 19.3-8.6 19.3-19.3v0C246.2 184.9 237.5 176.2 226.9 176.2zM226 204.8c-5 0-9-4-9-9 0-5 4-9 9-9 5 0 9 4 9 9C235 200.8 231 204.8 226 204.8z"
      fill="url(#proforma-ui__it-logo-3)"
    />
    <path
      d="M162.5 176.2H54.4c-10.6 0-19.2 8.6-19.3 19.2 0 10.7 8.6 19.4 19.3 19.4h146.7L162.5 176.2z"
      fill="#00117D"
    />
  </svg>
);

export const LegalIcon = () => (
  <Icon>
    <LegalSvg />
  </Icon>
);

export const LegalSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="5 20 270 260">
    <path
      d="M203.4 93.2l26.6 0V61.4l-26.6 0c-24.3 0-42.9 6.4-55.5 18.9 7.7 9.3 12.8 21.1 15.2 35.2C168.8 97.4 183.1 93.2 203.4 93.2z"
      fill="#00117D"
    />
    <linearGradient
      id="proforma-ui__legal-logo-1"
      gradientUnits="userSpaceOnUse"
      x1="73.8"
      y1="26.3"
      x2="138.1"
      y2="190.2"
    >
      <stop offset="0.1267" stopColor="#FFC80B" />
      <stop offset="0.2044" stopColor="#FFB913" />
      <stop offset="0.3537" stopColor="#FF9228" />
      <stop offset="0.5574" stopColor="#FF544B" />
      <stop offset="0.6534" stopColor="#FF345C" />
      <stop offset="1" stopColor="#C50D3D" />
    </linearGradient>
    <path
      d="M154 245.6l0-108.6c0-49-25.8-74.9-74.7-74.9l-23.9 0 0 31.7 23.9 0c25.9 0 42.1 6.9 42.9 40.6 0 0.8 0 77.5 0 78.4L154 245.6z"
      fill="url(#proforma-ui__legal-logo-1)"
    />
    <path
      d="M273.4 162.2L233.3 110c-0.9-1.1-2.3-1.8-3.6-1.9 -0.3 0-0.5 0-0.8 0 -1.3 0.1-2.7 0.7-3.6 1.9L185 162.2c-1.3 1.6-1.2 3.9-0.6 5.9 2.3 7.9 22.1 21.4 44.6 21.6v0c0.1 0 0.1 0 0.2 0 0.1 0 0.1 0 0.2 0v0c22.6-0.2 42-13.4 44.6-21.6C274.7 166.1 274.8 163.8 273.4 162.2zM224 164.9h-27.6l27.6-36.5V164.9zM234.5 164.9v-36.5l27.6 36.5H234.5z"
      fill="#00117D"
    />
    <linearGradient
      id="proforma-ui__legal-logo-2"
      gradientUnits="userSpaceOnUse"
      x1="10.9"
      y1="51"
      x2="75.1"
      y2="214.9"
    >
      <stop offset="0.1267" stopColor="#FFC80B" />
      <stop offset="0.2044" stopColor="#FFB913" />
      <stop offset="0.3537" stopColor="#FF9228" />
      <stop offset="0.5574" stopColor="#FF544B" />
      <stop offset="0.6534" stopColor="#FF345C" />
      <stop offset="1" stopColor="#C50D3D" />
    </linearGradient>
    <path
      d="M100.5 163.1L60.3 111c-0.9-1.1-2.3-1.8-3.6-1.9 -0.3 0-0.5 0-0.8 0 -1.3 0.1-2.7 0.7-3.6 1.9L12 163.1c-1.3 1.6-1.2 3.9-0.6 5.9 2.3 7.9 22.1 21.4 44.6 21.6v0c0.1 0 0.1 0 0.2 0 0.1 0 0.1 0 0.2 0v0c22.6-0.2 42-13.4 44.6-21.6C101.7 167.1 101.8 164.7 100.5 163.1zM51 165.9H23.4L51 129.4V165.9zM61.5 165.9v-36.5l27.6 36.5H61.5z"
      fill="url(#proforma-ui__legal-logo-2)"
    />
  </svg>
);

export const MarketingIcon = () => (
  <Icon>
    <MarketingSvg />
  </Icon>
);

export const MarketingSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="30 50 220 220">
    <linearGradient
      id="proforma-ui__marketing-logo-1"
      gradientUnits="userSpaceOnUse"
      x1="31"
      y1="33.4"
      x2="128.5"
      y2="177.3"
    >
      <stop offset="0.1267" stopColor="#FFC80B" />
      <stop offset="0.2044" stopColor="#FFB913" />
      <stop offset="0.3537" stopColor="#FF9228" />
      <stop offset="0.5574" stopColor="#FF544B" />
      <stop offset="0.6534" stopColor="#FF345C" />
      <stop offset="1" stopColor="#C50D3D" />
    </linearGradient>
    <path
      d="M150.9 185.1H68.2V87.8h51.7l31.3-31.3H36.9v131.2c0 15.9 12.9 28.7 28.7 28.7h53.9L150.9 185.1z"
      fill="url(#proforma-ui__marketing-logo-1)"
    />
    <path
      d="M249.1 85.2c0-15.9-12.9-28.7-28.7-28.7h-53.9l-31.3 31.3h82.7v97.3h-51.7l-31.3 31.3H173v50.3l44.3-50.3h31.9V85.2z"
      fill="#00117D"
    />
  </svg>
);

export const OperationsIcon = () => (
  <Icon>
    <OperationsSvg />
  </Icon>
);

export const OperationsSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="40 40 200 200">
    <linearGradient
      id="proforma-ui__operations-logo-1"
      gradientUnits="userSpaceOnUse"
      x1="10.7"
      y1="185.7"
      x2="164.5"
      y2="57.9"
    >
      <stop offset="0" stopColor="#C50D3D" />
      <stop offset="0.2483" stopColor="#EA2651" />
      <stop offset="0.4186" stopColor="#FF345C" />
      <stop offset="0.5014" stopColor="#FF544B" />
      <stop offset="0.6773" stopColor="#FF9228" />
      <stop offset="0.8062" stopColor="#FFB913" />
      <stop offset="0.8733" stopColor="#FFC80B" />
    </linearGradient>
    <path
      d="M71.3 185l19.5-5.6c-8.4-10.7-13.4-24.2-13.4-38.8 0-34.8 28.3-63.1 63.1-63.1 16.5 0 31.4 6.3 42.7 16.7l18.5-4.8 4-21c-17.3-15.6-40.1-25.1-65.2-25.1 -53.7 0-97.4 43.7-97.4 97.4 0 23.9 8.7 45.8 23 62.7L71.3 185z"
      fill="url(#proforma-ui__operations-logo-1)"
    />
    <path
      d="M211.9 99l-18.4 3.9c8.7 11 12.5 25.3 12.5 40 0 34.8-28.3 63.1-63.1 63.1 -16.7 0-31.9-6.5-43.2-17.1L81 194.5l-5.1 19c17.5 16.6 41 26.8 67 26.8 53.7 0 97.4-43.7 97.4-97.4 0-24.6-9.2-47.1-24.3-64.3L211.9 99z"
      fill="#00117D"
    />
  </svg>
);

export const ProcurementIcon = () => (
  <Icon>
    <ProcurementSvg />
  </Icon>
);

export const ProcurementSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="10 20 255 240">
    <circle cx="93.3" cy="223.3" r="18.2" fill="#00117D" />
    <path
      d="M67.1 50.4h-39C18 50.4 9.8 58.6 9.8 68.7S18 87 28.1 87h14.1l23.4 86.9c3.5 12.9 15.2 21.8 28.5 21.8h11.6L67.1 50.4z"
      fill="#00117D"
    />
    <linearGradient
      id="proforma-ui__procurement-logo-1"
      gradientUnits="userSpaceOnUse"
      x1="316.7"
      y1="-55.6"
      x2="62.8"
      y2="247.1"
    >
      <stop offset="0.3608" stopColor="#FFC80B" />
      <stop offset="0.3961" stopColor="#FFC10F" />
      <stop offset="0.449" stopColor="#FFAC1A" />
      <stop offset="0.5129" stopColor="#FF8B2D" />
      <stop offset="0.5848" stopColor="#FF5D46" />
      <stop offset="0.6403" stopColor="#FF345C" />
      <stop offset="0.8372" stopColor="#C50D3D" />
    </linearGradient>
    <path
      d="M87.8 82.1l8.8 30.8H219l-14 51.5h-95.9l8.4 31.3h85.2c15.8 0 29.7-10.6 33.9-25.8L262 82.1H87.8z"
      fill="url(#proforma-ui__procurement-logo-1)"
    />
    <circle cx="203.1" cy="223.3" r="18.2" fill="#00117D" />
  </svg>
);

export const ProjectManagementIcon = () => (
  <Icon>
    <ProjectManagementSvg />
  </Icon>
);

export const ProjectManagementSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 40 210 260">
    <clipPath
      id="proforma-ui__project-management-1"
      clipPathUnits="userSpaceOnUse"
    >
      <path d="M 0,0 H 1878 V 2260 H 0 Z" />
    </clipPath>
    <clipPath
      id="proforma-ui__project-management-2"
      clipPathUnits="userSpaceOnUse"
    >
      <path d="M 291.648,0 C 130.574,0 0,130.582 0,291.641 V 674.699 L 317.816,992.5 V 317.809 H 1560.31 v 360 l 317.81,317.812 V 283.699 C 1878.12,127.02 1751.11,0 1594.43,0 Z" />
    </clipPath>
    <linearGradient
      id="proforma-ui__project-management-3"
      spreadMethod="pad"
      gradientTransform="matrix(-2503.76,-2358.82,-2358.82,2503.76,2376.42,1781.3)"
      gradientUnits="userSpaceOnUse"
      y2="0"
      x2="1"
      y1="0"
      x1="0"
    >
      <stop offset="0" stopOpacity="1" stopColor="#fbc50a" />
      <stop offset="0.336619" stopOpacity="1" stopColor="#fbc50a" />
      <stop offset="0.654881" stopOpacity="1" stopColor="#ee225a" />
      <stop offset="0.840186" stopOpacity="1" stopColor="#c6193d" />
      <stop offset="1" stopOpacity="1" stopColor="#c6193d" />
    </linearGradient>
    <g transform="matrix(1.3333333,0,0,-1.3333333,0,301.34667)">
      <g
        clipPath="url(#proforma-ui__project-management-1)"
        transform="scale(0.085)"
      >
        <g clipPath="url(#proforma-ui__project-management-2)">
          <path
            fill="url(#proforma-ui__project-management-3)"
            fillOpacity="1"
            fillRule="nonzero"
            stroke="none"
            d="m 269,0 v 1 h -11 v 1 h -6 v 1 h -7 v 1 h -7 v 1 h -6 v 1 h -4 v 1 h -4 v 1 h -4 v 1 h -3 v 1 h -4 v 1 h -4 v 1 h -4 v 1 h -3 v 1 h -3 v 1 h -2 v 1 h -3 v 1 h -3 v 1 h -3 v 1 h -2 v 1 h -3 v 1 h -3 v 1 h -3 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 3 h -1 v 4 h -1 v 4 h -1 v 4 H 9 v 3 H 8 v 4 H 7 v 4 H 6 v 4 H 5 v 6 H 4 v 7 H 3 v 7 H 2 v 6 H 1 v 11 H 0 v 407 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 V 318 h 1242 v 361 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 V 259 h -1 v -9 h -1 v -7 h -1 v -6 h -1 v -7 h -1 v -5 h -1 v -4 h -1 v -4 h -1 v -4 h -1 v -4 h -1 v -4 h -1 v -4 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -4 v -1 h -4 v -1 h -3 V 9 h -4 V 8 h -4 V 7 h -4 V 6 h -4 V 5 h -6 V 4 h -6 V 3 h -7 V 2 h -7 V 1 h -10 V 0"
          />
        </g>
        <path
          fill="#272d71"
          fillOpacity="1"
          fillRule="nonzero"
          stroke="none"
          d="M 0,1674.39 V 829.211 l 317.816,317.799 v 819.03 H 291.645 C 130.574,1966.04 0,1835.46 0,1674.39"
        />
        <path
          fill="#272d71"
          fillOpacity="1"
          fillRule="nonzero"
          stroke="none"
          d="m 1586.48,1966.04 h -26.16 V 832.32 l 317.8,317.81 v 524.26 c 0,161.07 -130.57,291.65 -291.64,291.65"
        />
        <path
          fill="#272d71"
          fillOpacity="1"
          fillRule="nonzero"
          stroke="none"
          d="m 945.332,1990.24 c -41.086,0 -74.391,33.31 -74.391,74.4 0,41.08 33.305,74.38 74.391,74.38 41.078,0 74.388,-33.3 74.388,-74.38 0,-41.09 -33.31,-74.4 -74.388,-74.4 z m 277.198,-32.41 h -89.29 c 0,32.35 0,70.53 0,107.04 0,107.83 -87.42,195.24 -195.244,195.24 -107.832,0 -195.242,-87.41 -195.242,-195.24 0,-39.55 0,-76.29 0,-107.04 H 655.59 c -142.891,0 -258.727,-115.83 -258.727,-258.72 v -18.68 H 1481.26 v 18.68 c 0,142.89 -115.84,258.72 -258.73,258.72"
        />
        <path
          fill="#272d71"
          fillOpacity="1"
          fillRule="nonzero"
          stroke="none"
          d="m 868.668,952.961 -164.543,194.959 -89.879,-75.84 246.91,-292.58 475.704,473.74 -82.99,83.33 -385.202,-383.609"
        />
      </g>
    </g>
  </svg>
);

export const RiskAndHazardIcon = () => (
  <Icon>
    <RiskAndHazardSvg />
  </Icon>
);

export const RiskAndHazardSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="32.5 40 220 220">
    <path
      d="M227 239l-79-138 18-33 83 147c4 7 2 15-3 20 -3 3-7 4-11 4H227z"
      fill="#00117D"
    />
    <linearGradient
      id="proforma-ui__risk-and-hazard-logo-1"
      gradientUnits="userSpaceOnUse"
      x1="162"
      y1="-9"
      x2="56"
      y2="242"
    >
      <stop offset="0.1267" stopColor="#FFC80B" />
      <stop offset="0.2044" stopColor="#FFB913" />
      <stop offset="0.3537" stopColor="#FF9228" />
      <stop offset="0.5574" stopColor="#FF544B" />
      <stop offset="0.6534" stopColor="#FF345C" />
      <stop offset="1" stopColor="#C50D3D" />
    </linearGradient>
    <path
      d="M47 197l81-147c3-5 8-8 14-8 6 0 11 3 14 8l5 10L84 197H47z"
      fill="url(#proforma-ui__risk-and-hazard-logo-1)"
    />
    <path
      d="M51 239c-4 0-8-1-11-4 -6-5-7-13-3-20l5-8 156 0 19 32H51z"
      fill="#00117D"
    />
    <rect
      x="122"
      y="146"
      transform="matrix(0.000001935165 1 -1 0.000001935165 294.3292 8.5186)"
      width="42"
      height="12"
      fill="#00117D"
    />
    <rect
      x="136"
      y="183"
      transform="matrix(0.000005065817 1 -1 0.000005065817 331.8877 46.0767)"
      width="14"
      height="12"
      fill="#00117D"
    />
  </svg>
);

/* eslint-enable max-len */
