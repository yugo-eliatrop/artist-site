import React from "react";
import PropTypes from "prop-types";
import CSSModules from "react-css-modules";

import styles from "./AlbumOverview.module.scss";

const AlbumOverview = () => {
  return (
    <div styleName="wrapper"></div>
  );
};

AlbumOverview.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object)
};

export default CSSModules(AlbumOverview, styles, { allowMultiple: true });
