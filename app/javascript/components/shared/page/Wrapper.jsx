import React, { useState } from "react";
import CSSModules from "react-css-modules";
import { FaBars } from "react-icons/fa";

import Routes from "../../../libs/routes";
import MainMenu from "../menu/MainMenu";
import Footer from "../footer/Footer";
import styles from "./Wrapper.module.scss";

const Wrapper = ({ children, contacts, user, albums, logo }) => {
  const [menuIsOpen, toggleMenu] = useState(false);

  return (
    <>
      {
        menuIsOpen &&
        <MainMenu
          close={() => toggleMenu(false)}
          contacts={contacts}
          albums={albums.slice(0, 4)}
          logo={logo}
        />
      }
      <div styleName="wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12" styleName="header">
              <a href={Routes.root_path()} styleName="logo-top">{logo}</a>
              <FaBars onClick={() => toggleMenu(true)} />
            </div>
          </div>
          {children}
        </div>
        <Footer contacts={contacts} user={user} />
      </div>
    </>
  );
};

export default CSSModules(Wrapper, styles, { allowMultiple: true });
