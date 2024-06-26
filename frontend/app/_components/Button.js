import React from "react";
import "./Button.css";
import { Link } from "next/link";
function Button({ text, classSize, url }) {
  return (
    <>
      <a href={url}>
        {" "}
        <button className={classSize}>{text}</button>
      </a>
    </>
  );
}
export default Button;
