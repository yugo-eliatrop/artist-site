import React from "react";
import CSSModules from "react-css-modules";

import PageWrapper from "../../shared/page/Wrapper";
import styles from "./Albums.module.scss";

const Albums = props => {
  return (
    <PageWrapper {...props}>
      <div className="row" styleName="wrapper">
        <h2>Альбомы</h2>
      </div>
    </PageWrapper>
  );
};

export default CSSModules(Albums, styles, { allowMultiple: true });
