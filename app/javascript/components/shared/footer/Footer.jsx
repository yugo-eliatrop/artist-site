import React from "react";
import CSSModules from "react-css-modules";
import PropTypes from "prop-types";
import { FaInstagram, FaPhone, FaEnvelope } from "react-icons/fa";

import styles from "./Footer.module.scss";

const Footer = ({ contacts: { instagram, phone, email } }) => {
  return (
    <div styleName="wrapper">
      <div styleName="gold">LOGO</div>
      {
        instagram &&
        <div styleName="address-point">
          <FaInstagram />
          <a href={instagram.address}>
            {instagram.login}
          </a>
        </div>
      }
      {
        phone &&
        <div styleName="address-point">
          <FaPhone />
          <span>{phone.address}</span>
        </div>
      }
      {
        email &&
        <div styleName="address-point">
          <FaEnvelope />
          <span>{email.address}</span>
        </div>
      }
    </div>
  );
};

const Contact = PropTypes.shape({
  address: PropTypes.string.isRequired,
  login: PropTypes.string
});

Footer.propTypes = {
  contacts: PropTypes.shape({
    instagram: Contact,
    phone: Contact,
    email: Contact
  }).isRequired
};

export default CSSModules(Footer, styles, { allowMultiple: true });
