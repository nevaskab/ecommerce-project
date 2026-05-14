import type { ReactNode } from "react";

type IconButtonProps = {
  className?: string;
  link?: string;
  icon: ReactNode;
};

export default function IconButton(props: IconButtonProps) {
  if (props.link) {
    return (
      <a href={props.link} id="icon-button">
        {props.icon}
      </a>
    );
  }
  return <button id="icon-button">{props.icon}</button>;
}
