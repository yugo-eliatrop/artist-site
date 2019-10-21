import React from "react";
import CSSModules from "react-css-modules";

import styles from "./Wrapper.module.scss";

const Wrapper = props => {
  return (
    <div styleName="wrapper">
      <div className="container">
        <div className="row" styleName="header">
          <div className="col-12">
            <h2>Admin settings</h2>
          </div>
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default CSSModules(Wrapper, styles, { allowMultiple: true });
