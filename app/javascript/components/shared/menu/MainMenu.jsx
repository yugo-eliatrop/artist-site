import React, { Component } from "react";
import CSSModules from "react-css-modules";
import { FaInstagram, FaVk, FaTimes } from "react-icons/fa";

import { showWindow, hideWindow } from "../../../libs/animation";
import styles from "./MainMenu.module.scss";

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
  }

  componentDidMount = () => showWindow(this.wrapper.current, 150, "flex");

  close = () => {
    hideWindow(this.wrapper.current);
    setTimeout(this.props.close, 150);
  }

  render () {
    return (
      <div styleName="wrapper" ref={this.wrapper}>
        <div className="container">
          <div className="row">
            <div className="col-12" styleName="row">
              <div styleName="gold">LOGO</div>
              <div styleName="close-button">
                <FaTimes onClick={this.close} />
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
              <div>
                <p>Something</p>
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
