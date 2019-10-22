import React, { useEffect } from "react";
import PropTypes from "prop-types";
import CSSModules from "react-css-modules";
import Routes from "../../../libs/routes";

import styles from "./AlbumPreview.module.scss";

const AlbumPreview = ({ album: { id, name, description, images } }) => {
  
  const prevImg = (() => {
    if (!images || !images[0])
      return null;
    return images[0].file.url;
  })();

  const changeImgSize = () => {
    const imgs = document.getElementsByClassName("prev-img");
    [...imgs].forEach(img => {
      img.style.height = `${imgs[0].clientWidth}px`;
      img.style.backgroundSize = "cover";
      img.style.backgroundPositionX = "center";
    });
  };

  useEffect(() => {
    changeImgSize();
    window.onresize = changeImgSize;
    return () => { window.onresize = null; };
  }, []);

  return (
    <div styleName="wrapper" className="col-md-6">
      <div
        onClick={() => window.location.replace(Routes.album_path(id))}
        style={{ background: `url(${prevImg || "https://via.placeholder.com/640x480"})` }}
        styleName="prev-img"
        className="prev-img"
      />
      <a href={Routes.album_path(id)}><h3>{name}</h3></a>
      <a href={Routes.album_path(id)}><p styleName="paragraph">{description}</p></a>
    </div>
  );
};

AlbumPreview.propTypes = {
  album: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    preview_img: PropTypes.string
  }).isRequired
};

export default CSSModules(AlbumPreview, styles, { allowMultiple: true });
