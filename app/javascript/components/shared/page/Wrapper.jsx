import React from "react";
import CSSModules from "react-css-modules";

import styles from "./Wrapper.module.scss";

const Wrapper = ({ children, header }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12" styleName="header">
          <h3>{header}</h3>
        </div>
      </div>
      {children}
    </div>
  );
};

export default CSSModules(Wrapper, styles, { allowMultiple: true });
