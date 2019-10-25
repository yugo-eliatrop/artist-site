import React, { useState } from "react";
import CSSModules from "react-css-modules";

import PageWrapper from "../../shared/page/Wrapper";
import ImageViewer from "../../shared/album/image/View";
import styles from "./Album.module.scss";

const Album = props => {
  const { album } = props;

  const [currentPhoto, setCurrentPhoto] = useState(null);

  return (
    <PageWrapper {...props}>
      {currentPhoto && <ImageViewer url={currentPhoto} close={() => setCurrentPhoto(null)} />}
      <div className="row" styleName="wrapper">
        <div styleName="header">
          <span>{album.name}</span>
        </div>
      </div>
      <div styleName="overview-wrapper">
        <div className="card-columns">
          {
            album.images.map(img =>
              <div key={img.id} className="card">
                <img
                  styleName="photo"
                  src={img.file.url}
                  alt="Photo"
                  onClick={() => setCurrentPhoto(img.file.url)}
                />
              </div>
            )
          }
        </div>
      </div>
    </PageWrapper>
  );
};

export default CSSModules(Album, styles, { allowMultiple: true });
