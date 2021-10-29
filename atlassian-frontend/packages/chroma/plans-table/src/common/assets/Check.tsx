import React from 'react';

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={14}
      height={11}
      viewBox="0 0 14 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.735 4.393a.997.997 0 00-1.727.644c-.012.265.08.524.257.72L3.877 9.7c.537.53 1.337.53 1.834.03l.364-.36c1.315-1.301 2.628-2.603 3.94-3.906l.04-.04a494.414 494.414 0 003.657-3.665 1.009 1.009 0 00-.722-1.7.997.997 0 00-.702.288 521.157 521.157 0 01-3.64 3.646l-.04.04C7.352 5.282 6.093 6.53 4.833 7.776L1.735 4.393z"
        fill="currentColor"
      />
    </svg>
  );
}

const MemoCheckIcon = React.memo(CheckIcon);
export default MemoCheckIcon;
