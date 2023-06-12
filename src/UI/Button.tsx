import React from "react";

const Button = (props: { txt: string; onClick: () => void }) => {
  return <button className={"button"} onClick={props.onClick}>{props.txt}</button>;
};

export default Button;
