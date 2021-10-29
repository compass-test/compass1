import React from 'react';

function DashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={14}
      height={2}
      viewBox="0 0 14 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path stroke="#7A869A" strokeWidth={2} d="M0 1h14" />
    </svg>
  );
}

const MemoDashIcon = React.memo(DashIcon);
export default MemoDashIcon;
