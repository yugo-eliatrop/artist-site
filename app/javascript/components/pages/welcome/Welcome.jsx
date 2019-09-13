import React, { useState } from "react";
import PropTypes from "prop-types";

import FirstScreen from "../../shared/firstScreen/FirstScreen";
import MainMenu from "../../shared/menu/MainMenu";
import AlbumOverview from "../../shared/album/AlbumOverview";

const Welcome = props => {
  const [menuIsVisible, toggleMenu] = useState(false);
  return (
    <div>
      <FirstScreen openMenu={() => toggleMenu(true)} />
      {menuIsVisible && <MainMenu {...props} close={() => toggleMenu(false)} />}
      <AlbumOverview album={props.album} />
    </div>
  );
};

Welcome.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object),
  slides: PropTypes.objectOf(PropTypes.string),
  lifeTime: PropTypes.number
};

export default Welcome;
