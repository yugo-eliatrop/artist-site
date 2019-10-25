import React from "react";
import CSSModules from "react-css-modules";

import PageWrapper from "../../shared/page/Wrapper";
import styles from "./Album.module.scss";

const Album = props => {
  const { album } = props;

  return (
    <PageWrapper {...props}>
      <div className="row" styleName="wrapper">
        <div styleName="header">
          <span>{album.name}</span>
        </div>
      </div>
      <div styleName="overview-wrapper">
        
      </div>
    </PageWrapper>
  );
};

export default CSSModules(Album, styles, { allowMultiple: true });
