import React from "react";
import CSSModules from "react-css-modules";
import Routes from "../../../libs/routes";

import styles from "./Wrapper.module.scss";

const Wrapper = props => {
  return (
    <div styleName="wrapper">
      <div styleName="gray-bgr">
        <div className="container">
          <div className="row" styleName="header">
            <div className="col-12">
              <h2>Admin settings</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container" styleName="body">
        {props.children}
      </div>
      <div styleName="gray-bgr">
        <div className="container">
          <div className="row" styleName="footer">
            <div className="col-12">
            <a href={Routes.root_path()} className="btn btn-secondary">Back to Main Page</a>
            {
              props.isNested &&
              <a href={Routes.admin_path()} className="btn btn-secondary">Back to Admin Settings</a>
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSSModules(Wrapper, styles, { allowMultiple: true });
