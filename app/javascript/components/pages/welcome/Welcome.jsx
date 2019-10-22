import React, { useState } from "react";
import PropTypes from "prop-types";
import CSSModules from "react-css-modules";

import FirstScreen from "../../shared/firstScreen/FirstScreen";
import MainMenu from "../../shared/menu/MainMenu";
import AlbumOverview from "../../shared/album/AlbumOverview";
import Footer from "../../shared/footer/Footer";
import styles from "./Welcome.module.scss";

const Welcome = props => {
  const { main_text: { title, content }, user, albums, contacts, slides, life_time } = props;

  const [menuIsVisible, toggleMenu] = useState(false);

  return (
    <div>
      <FirstScreen
        slides={slides}
        lifeTime={life_time}
        openMenu={() => toggleMenu(true)}
      />
      {menuIsVisible && <MainMenu {...props} close={() => toggleMenu(false)} />}
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div styleName="intro">
              <h1>{title}</h1>
              <div styleName="p-wrapper">
                <p styleName="paragraph">{content}</p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <AlbumOverview even albums={albums} />
      </div>
      <Footer contacts={contacts} user={user} />
    </div>
  );
};

Welcome.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object),
  slides: PropTypes.arrayOf(PropTypes.string),
  life_time: PropTypes.number,
  main_text: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string
  }).isRequired,
  user: PropTypes.object
};

export default CSSModules(Welcome, styles, { allowMultiple: true });
