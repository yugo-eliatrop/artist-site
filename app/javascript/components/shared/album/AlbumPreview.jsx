import React from "react";
import PropTypes from "prop-types";
import CSSModules from "react-css-modules";

import styles from "./AlbumOverview.module.scss";

const AlbumPreview = ({ album: { name, description } }) => {
  return (
    <div styleName="wrapper" className="col-6">
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
};

AlbumPreview.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string
};

export default CSSModules(AlbumPreview, styles, { allowMultiple: true });
