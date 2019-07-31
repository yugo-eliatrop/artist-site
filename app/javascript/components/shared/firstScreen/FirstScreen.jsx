import React from "react";
import CSSModules from "react-css-modules";
import { FaBars } from "react-icons/fa";

import styles from "./FirstScreen.module.scss";

const FirstScreen = props => {
  return (
    <div styleName="wrapper">
      <span>LOGO</span>
      <FaBars onClick={props.openMenu} />
    </div>
  );
};

export default CSSModules(FirstScreen, styles, { allowMultiple: true });
// export default FirstScreen;