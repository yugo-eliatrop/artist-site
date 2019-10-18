import React from "react";
// import PropTypes from "prop-types";
import CSSModules from "react-css-modules";

import Routes from "../../../../libs/routes";
import Wrapper from "../Wrapper";
import styles from "./New.module.scss";

const New = props => {
  
  return (
    <Wrapper>
      <div className="row" styleName="point">
        <div className="col-md-6">
          <p>Album Name</p>
          <input type="text"/>
          <p>Album Description</p>
          <textarea type="text"/>
        </div>
        <div className="col-md-6">

        </div>
      </div>
    </Wrapper>
  );
};

// New.propTypes = {

// };

export default CSSModules(New, styles, { allowMultiple: true });
