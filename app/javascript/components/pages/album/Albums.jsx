import React from "react";
import CSSModules from "react-css-modules";

import PageWrapper from "../../shared/page/Wrapper";
import AlbumOverview from "../../shared/album/AlbumOverview";
import styles from "./Albums.module.scss";

const Albums = props => {
  return (
    <PageWrapper {...props}>
      <div className="row" styleName="wrapper">
        <div styleName="header">
          <span>Альбомы</span>
        </div>
      </div>
      <div styleName="overview-wrapper">
        <AlbumOverview albums={props.albums} />
      </div>
    </PageWrapper>
  );
};

export default CSSModules(Albums, styles, { allowMultiple: true });
