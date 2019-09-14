import React from "react";
import PropTypes from "prop-types";
import CSSModules from "react-css-modules";
import { FaInstagram, FaPhone, FaEnvelope, FaTimes } from "react-icons/fa";
import Routes from "../../../libs/routes";

import usePopupAnimation from "../usePopupAnimation";
import styles from "./MainMenu.module.scss";

const MainMenu = props => {
  const { albums = [{ name: "", id: 0 }], contacts: { instagram, phone, email } } = props;
  const [wrapper, close] = usePopupAnimation(props.close);
  return (
    <div styleName="wrapper" ref={wrapper} style={{ opacity: 0 }}>
      <div className="container">
        <div className="row">
          <div className="col-12" styleName="row">
            <div styleName="gold">LOGO</div>
            <div styleName="close-button">
              <FaTimes onClick={close} />
            </div>
          </div>
          <div className="col-12" styleName="row">
            <div>
              <ul>
                <li><a href={Routes.root_path()}>Main</a></li>
                <li><a href={Routes.albums_path()}>Albums</a></li>
                <li><a href="#">About</a></li>
              </ul>
            </div>
            <div>
              {
                albums.map(album =>
                  <p key={album.id}>
                    <a href={Routes.album_path(album.id)}>
                      {album.name}
                    </a>
                  </p>
                )
              }
            </div>
          </div>
          <div className="col-12" styleName="row">
            <hr />
          </div>
          <div className="col-12" styleName="row">
            <div styleName="address-point">
              <FaInstagram />
              <a href={instagram.link}>
                {instagram.title}
              </a>
            </div>
            <div styleName="address-point">
              <FaPhone />
              <span>{phone.link}</span>
            </div>
            <div styleName="address-point">
              <FaEnvelope />
              <span>{email.link}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Contact = PropTypes.shape({
  link: PropTypes.string.isRequired,
  title: PropTypes.string
});

MainMenu.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })),
  close: PropTypes.func.isRequired,
  contacts: PropTypes.shape({
    instagram: Contact,
    phone: Contact,
    email: Contact
  }).isRequired
};

export default CSSModules(MainMenu, styles, { allowMultiple: true });
