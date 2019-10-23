import React from "react";
import CSSModules from "react-css-modules";

import PageWrapper from "../../shared/page/Wrapper";
import styles from "./Albums.module.scss";

const Albums = props => {
  return (
    <PageWrapper header="Albums">
      <p>Something</p>
    </PageWrapper>
  );
};

export default CSSModules(Albums, styles, { allowMultiple: true });
