import React, { useRef } from "react";
import PropTypes from "prop-types";
import CSSModules from "react-css-modules";

import AlbumPreview from "./AlbumPreview";
import styles from "./AlbumOverview.module.scss";

const AlbumOverview = ({ albums, even }) => {
  const wrapper = useRef(null);

  if (even && albums.length % 2 !== 0)
    albums = albums.slice(0, albums.length - 1);

  return (
    <div ref={wrapper} className="row" styleName="wrapper">
      {
        albums.map(album => <AlbumPreview key={album.id} album={album} />)
      }
    </div>
  );
};

AlbumOverview.propTypes = {
  id: PropTypes.number,
  albums: PropTypes.arrayOf(PropTypes.object),
  even: PropTypes.bool
};

export default CSSModules(AlbumOverview, styles, { allowMultiple: true });