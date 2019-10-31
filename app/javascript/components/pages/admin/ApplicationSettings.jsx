import React, { useState } from "react";
import CSSModules from "react-css-modules";
// import PropTypes from "prop-types";
import Routes from "../../../libs/routes";

import styles from "./Wrapper.module.scss";

const ApplicationSettings = props => {
  const { csrf_token, logo } = props;

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

  const changeLogo = event => {
    event.preventDefault();
    let data = new FormData(event.target);
    data.append("authenticity_token", csrf_token);
    fetch(Routes.change_logo_path(), { method: "POST", body: data });
    // TO DO add errors and error handler
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
        {signUpIsOpen && <div className="alert alert-danger">You have opened signup</div>}
      </div>
      <div className="col-12">
        <form onSubmit={changeLogo}>
          <label htmlFor="logo">Logo</label>
          <div className="input-group mb-3">
            <input
              className="form-control"
              style={{ width: "auto" }}
              type="text"
              id="logo"
              name="logo"
              defaultValue={logo}
              minLength="1"
              maxLength="30"
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="submit">Update</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// ApplicationSettings.propTypes = {

// };

export default CSSModules(ApplicationSettings, styles, { allowMultiple: true });
