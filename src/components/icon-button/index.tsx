import type { ReactNode } from "react";

type IconButtonProps = {
  className?: string;
  icon: ReactNode;
};

export default function IconButton(props: IconButtonProps) {
  return <button id="icon-button">{props.icon}</button>;
}
