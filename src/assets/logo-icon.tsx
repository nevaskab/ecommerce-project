import * as React from "react";

const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="none"
    viewBox="0 0 32 32"
  >
    <path
      fill={props.color || "#fff"}
      d="m5.43 9.306 3.486-1.989-1.945-3.333h18.296l-9.145 15.681-1.945-3.338-3.486 1.995 5.43 9.306L32.239 0H0z"
    ></path>
  </svg>
);

export default LogoIcon;
