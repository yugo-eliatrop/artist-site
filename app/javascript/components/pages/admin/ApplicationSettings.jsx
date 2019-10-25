import React, { useState } from "react";
import CSSModules from "react-css-modules";
// import PropTypes from "prop-types";
import Routes from "../../../libs/routes";

import styles from "./Wrapper.module.scss";

const ApplicationSettings = props => {
  const { csrf_token } = props;

  const [signUpIsOpen, toggleSignUpStatus] = useState(props.signUpIsOpen);

  const toggleSignUp = event => {
    let data = new FormData();
    data.append("authenticity_token", csrf_token);
    data.append("open", event.target.checked);
    fetch(Routes.toggle_signup_path(), { method: "POST", body: data })
      .then(response => response.json().then(data => {
        if (response.ok)
          toggleSignUpStatus(data);
        else
          alert("ERROR: " + JSON.stringify(data.errors));
      }));
  };

  return (
    <div styleName="point" className="row">
      <div className="col-12">
        <h3 styleName="point-title">Application settings</h3>
      </div>
      <div className="col-12">
        <input
          type="checkbox"
          id="open_signup"
          defaultChecked={signUpIsOpen}
          onChange={toggleSignUp}
        />
        <label htmlFor="open_signup">Allow signup</label>
        {signUpIsOpen && <div className="alert alert-danger">You have opened signup</div> }
      </div>
    </div>
  );
};

// ApplicationSettings.propTypes = {

// };

export default CSSModules(ApplicationSettings, styles, { allowMultiple: true });
