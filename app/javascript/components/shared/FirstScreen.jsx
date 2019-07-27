import React, { Component } from "react";
import CSSModules from "react-css-modules";

import styles from "./FirstScreen.module.scss";

class FirstScreen extends Component {
  render() {
    return (
      <div styleName="wrapper">
        <span>LOGO</span>
        <span>X</span>
      </div>
    );
  }
}

export default CSSModules(FirstScreen, styles, { allowMultiple: true });
// export default FirstScreen;