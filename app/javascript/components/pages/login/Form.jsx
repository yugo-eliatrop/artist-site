import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import CSSModules from "react-css-modules";

import Routes from "../../../libs/routes";
import { handleLine } from "../../../libs/textHandler";
import styles from "./Form.module.scss";

const LoginForm = props => {
  const { user_exists: userExists, csrf_token } = props;
  const [errors, addErrors] = useState(null);

  const handleSubmit = event => {
    event.preventDefault();
    let data = new FormData;
    data.append("authenticity_token", csrf_token);
    data.append("user[email]", handleLine(event.target.email.value));
    data.append("user[password]", event.target.password.value);
    if (userExists) {
      fetch(Routes.signin_path(), { method: "POST", body: data })
        .then(response => {
          if (response.ok)
            window.location.replace("/");
          else
            response.json().then(data => {
              response.status == 401 && addErrors(data.errors);
            });
        });
    } else {
      data.append("user[name]", handleLine(event.target.name.value));
      data.append("user[password_confirmation]", event.target.password_confirmation.value);
      fetch(Routes.users_path(), { method: "POST", body: data })
        .then(response => {
          if (response.ok)
            window.location.replace("/");
          else
            response.json().then(data => {
              response.status == 422 && addErrors(data.errors);
            });
        });
    }
  };

  return (
    <div styleName="wrapper">
      <h2>{userExists ? "Sign In" : "Sign Up"}</h2>
      <div styleName="form-wrapper">
        <form onSubmit={handleSubmit}>
          {
            userExists ||
            <Fragment>
              <p>Name</p>
              {errors && errors.name && <p styleName="error">{errors.name[0]}</p>}
              <input type="text" maxLength="50" name="name" required />
            </Fragment>
          }
          <p>Email</p>
          {errors && errors.email && <p styleName="error">{errors.email[0]}</p>}
          <input type="text" maxLength="50" name="email" required />
          <p>Password</p>
          <input type="password" name="password" required />
          {
            userExists ||
            <Fragment>
              <p>Password confirmation</p>
              {errors && errors.password_confirmation && <p styleName="error">{errors.password_confirmation[0]}</p>}
              <input type="password" name="password_confirmation" required />
            </Fragment>
          }
          <div styleName="button-wrapper">
            <button styleName="button-white" type="submit">
              {userExists ? "SignIn" : "SignUp"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  user_exists: PropTypes.bool.isRequired
};

export default CSSModules(LoginForm, styles, { allowMultiple: true });
