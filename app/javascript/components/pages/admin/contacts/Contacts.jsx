import React from "react";
import PropTypes from "prop-types";
import CSSModules from "react-css-modules";

import styles from "./Contacts.module.scss";

const Contacts = props => {
  const { handleSubmit, contacts } = props;

  return (
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
              <button styleName="button" type="submit">Update</button>
            </form>
          </div>
        )
      }
    </div>
  );
};

Contacts.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.shape({
    service: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    login: PropTypes.string,
    address: PropTypes.string
  })).isRequired
};

export default CSSModules(Contacts, styles, { allowMultiple: true });
