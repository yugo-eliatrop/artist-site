import React from "react";
import CSSModules from "react-css-modules";

import usePopupAnimation from "../../usePopupAnimation";
import styles from "./View.module.scss";

const View = props => {
  const [wrapper, close] = usePopupAnimation(props.close);

  const handleClick = event => {
    event.preventDefault();
    if (event.target === wrapper.current)
      close();
  };

  return (
    <div styleName="wrapper" ref={wrapper} style={{ display: "none" }} onClick={handleClick}>
      <div styleName="img-wrapper">
        <img src={props.url} alt="Photo"/>
      </div>
    </div>
  );
};

export default CSSModules(View, styles, { allowMultiple: true });
