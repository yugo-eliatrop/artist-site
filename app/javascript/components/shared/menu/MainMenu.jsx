import React from "react";
import PropTypes from "prop-types";
import CSSModules from "react-css-modules";
import { FaInstagram, FaVk, FaTimes } from "react-icons/fa";

import usePopupAnimation from "../usePopupAnimation";
import styles from "./MainMenu.module.scss";

const MainMenu = props => {
  const { albums = [{ name: "" }] } = props;
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
                <li>Main</li>
                <li>Albums</li>
                <li>About</li>
              </ul>
            </div>
            <div styleName="albums">
              {albums.map(album => <p key={album.name}>{album.name}</p>)}
            </div>
          </div>
          <div className="col-12" styleName="row">
            <hr />
          </div>
          <div className="col-12" styleName="row">
            <div>
              <p>Address</p>
            </div>
            <div>
              <FaInstagram />
              <FaVk />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MainMenu.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string
  })),
  close: PropTypes.func.isRequired
};

export default CSSModules(MainMenu, styles, { allowMultiple: true });
// export default MainMenu;