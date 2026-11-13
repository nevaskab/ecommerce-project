import type { ReactNode } from "react";

type IconButtonProps = {
  className?: string;
  link?: string;
  icon: ReactNode;
  ariaLabel?: string;
};

export default function IconButton(props: IconButtonProps) {
  if (props.link) {
    return (
      <a href={props.link} id="icon-button" aria-label={props.ariaLabel}>
        {props.icon}
      </a>
    );
  }
  return (
    <button id="icon-button" type="button" aria-label={props.ariaLabel}>
      {props.icon}
    </button>
  );
}
