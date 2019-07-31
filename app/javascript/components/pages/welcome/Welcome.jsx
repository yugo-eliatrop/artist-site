import React, { useState } from "react";

import FirstScreen from "../../shared/firstScreen/FirstScreen";
import MainMenu from "../../shared/menu/MainMenu";

const Welcome = props => {
  const [menuIsVisible, toggleMenu] = useState(false);
  return (
    <div>
      <FirstScreen openMenu={() => toggleMenu(true)} />
      {menuIsVisible && <MainMenu {...props} close={() => toggleMenu(false)} />}
    </div>
  );
};

export default Welcome;
