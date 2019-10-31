import React from "react";
import PropTypes from "prop-types";
import CSSModules from "react-css-modules";
import { FaBars } from "react-icons/fa";

import styles from "./FirstScreen.module.scss";
import Slider from "./Slider";

const FirstScreen = props => {
  return (
    <div styleName="wrapper">
      <Slider slides={props.slides} lifeTime={props.lifeTime} />
      <span styleName="menu-item logo-top">{props.logo}</span>
      <FaBars styleName="menu-item" onClick={props.openMenu} />
      <div styleName="scroll-button" onClick={props.scroll}>
        <span>explore</span>
      </div>
    </div>
  );
};

FirstScreen.propTypes = {
  lifeTime: PropTypes.number,
  slides: PropTypes.arrayOf(PropTypes.string),
  openMenu: PropTypes.func.isRequired
};

export default CSSModules(FirstScreen, styles, { allowMultiple: true });
// export default FirstScreen;