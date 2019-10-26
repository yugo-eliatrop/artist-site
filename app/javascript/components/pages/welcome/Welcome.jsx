import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import CSSModules from "react-css-modules";

import FirstScreen from "../../shared/firstScreen/FirstScreen";
import MainMenu from "../../shared/menu/MainMenu";
import AlbumOverview from "../../shared/album/AlbumOverview";
import Footer from "../../shared/footer/Footer";
import { scrollToElem } from "../../../libs/animation";
import styles from "./Welcome.module.scss";

const Welcome = props => {
  const { main_text: { title, content }, user, albums, contacts, slides, life_time } = props;

  const [menuIsVisible, toggleMenu] = useState(false);

  const aboutBlock = useRef(null);

  return (
    <div>
      <FirstScreen
        slides={slides}
        lifeTime={life_time}
        openMenu={() => toggleMenu(true)}
        scroll={() => scrollToElem(aboutBlock.current, 500)}
      />
      {menuIsVisible && <MainMenu {...props} close={() => toggleMenu(false)} />}
      <div className="container" ref={aboutBlock}>
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
        <AlbumOverview even showSub albums={albums} />
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
