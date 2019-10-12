import React from "react";
// import PropTypes from "prop-types";
import CSSModules from "react-css-modules";

import Routes from "../../../libs/routes";
import styles from "./Main.module.scss";

const Main = props => {
  const { texts, contacts, csrf_token } = props;

  const handleSubmit = event => {
    event.preventDefault();
    let data = new FormData(event.target);
    data.append("authenticity_token", csrf_token);
    fetch(Routes.admin_update_path(), { method: "POST", body: data })
      .then(response => response.ok || response.json().then(data => {
        alert("ERROR: " + JSON.stringify(data.errors));
      }));
  };

  return (
    <div styleName="wrapper">
      <div className="container">
        <div className="row" styleName="header">
          <div className="col-12">
            <h2>Admin settings</h2>
          </div>
        </div>
        <div styleName="texts point" className="row">
          <div className="col-12">
            <h3 styleName="point-title">Text settings</h3>
          </div>
          {
            texts.map(text =>
              <div key={text.id} className="col-12 col-md-6">
                <form onSubmit={handleSubmit}>
                  <h4>{text.key}</h4>
                  <p>Title:</p>
                  <input name="title" type="text" defaultValue={text.title} />
                  <p>Text:</p>
                  <textarea name="content" defaultValue={text.content} />
                  <input name="key" hidden type="text" readOnly value={text.key} />
                  <input name="type" hidden type="text" readOnly value="text" />
                  <input name="id" hidden type="number" readOnly value={text.id} />
                  <button type="submit">Update</button>
                </form>
              </div>
            )
          }
        </div>
        <div styleName="contacts point" className="row">
          <div className="col-12">
            <h3 styleName="point-title">Contact settings</h3>
          </div>
          <div className="col-12">
            <div styleName="contact-field">
              <span>Service</span>
              <span>Login</span>
              <span>Address</span>
            </div>
          </div>
          {
            contacts.map(contact =>
              <div key={contact.id} className="col-12">
                <form styleName="contact-field" onSubmit={handleSubmit}>
                  <span>{contact.service}</span>
                  <input name="login" type="text" defaultValue={contact.login || ""} />
                  <input name="address" type="text" defaultValue={contact.address} />
                  <input name="service" hidden type="text" readOnly value={contact.service} />
                  <input name="type" hidden type="text" readOnly value="contact" />
                  <input name="id" hidden type="number" readOnly value={contact.id} />
                  <button type="submit">Update</button>
                </form>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

// Main.propTypes = {

// };

export default CSSModules(Main, styles, { allowMultiple: true });
