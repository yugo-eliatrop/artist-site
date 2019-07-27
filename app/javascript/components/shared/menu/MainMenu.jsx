import React, { Component } from "react";
import CSSModules from "react-css-modules";
import { FaInstagram, FaVk } from "react-icons/fa";

import styles from "./MainMenu.module.scss";

class MainMenu extends Component {
  render () {
    return (
      <div styleName="wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12" styleName="row">
              <div styleName="gold">LOGO</div>
              <div>X</div>
            </div>
            <div className="col-12" styleName="row">
              <div>
                <ul>
                  <li>Main</li>
                  <li>Album</li>
                  <li>Point3</li>
                  <li>Point4</li>
                </ul>
              </div>
              <div>
                <p>Something</p>
                <p>Something</p>
                <p>Something</p>
              </div>
            </div>
            <div className="col-12" styleName="row">
              <hr/>
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
  }
}

export default CSSModules(MainMenu, styles, { allowMultiple: true });
