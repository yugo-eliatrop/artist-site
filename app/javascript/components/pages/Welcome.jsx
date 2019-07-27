import React, { Component, Fragment } from "react";

import FirstScreen from "../shared/FirstScreen";
import MainMenu from "../shared/menu/MainMenu";

class Welcome extends Component {
  render () {
    return (
      <Fragment>
        <FirstScreen />
        <MainMenu />
      </Fragment>
    );
  }
}

export default Welcome;
