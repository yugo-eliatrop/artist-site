import React from "react";
import CSSModules from "react-css-modules";
import { FaBars } from "react-icons/fa";

import styles from "./FirstScreen.module.scss";
import Slider from "./Slider";

const FirstScreen = props => {
  return (
    <div styleName="wrapper">
      <Slider slides={props.slides} />
      <span styleName="menu-item">LOGO</span>
      <FaBars styleName="menu-item" onClick={props.openMenu} />
      <div styleName="scroll-button">
        <span>explore</span>
      </div>
    </div>
  );
};

export default CSSModules(FirstScreen, styles, { allowMultiple: true });
// export default FirstScreen;