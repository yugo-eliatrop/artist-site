import React, { useState } from "react";
// import PropTypes from "prop-types";
import CSSModules from "react-css-modules";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";

// import Routes from "../../../../libs/routes";
import styles from "./List.module.scss";

const List = props => {
  const { albums } = props;

  const [priorityIsBeingEdited, setPriorityChangingStatus] = useState(false);

  const changePriority = () => {
    setPriorityChangingStatus(false);
  };

  return (
    <div styleName="albums point" className="row">
      <div className="col-12">
        <h3 styleName="point-title">Albums settings</h3>
      </div>
      <div styleName="priority-btns">
        {
          priorityIsBeingEdited ?
            <>
              <button onClick={changePriority}>Save</button>
              <button onClick={() => setPriorityChangingStatus(false)}>Cancel</button>
            </>
            :
            <button onClick={() => setPriorityChangingStatus(true)}>Change priority</button>
        }
      </div>
      {
        albums.map((album, i) =>
          <div key={album.name} className="col-12" styleName="album">
            <div styleName="left-side">
              {
                priorityIsBeingEdited &&
                <div styleName="arrows">
                  <button disabled={i === 0}>
                    <FaArrowAltCircleUp />
                  </button>
                  <button disabled={i === albums.length - 1}>
                    <FaArrowAltCircleDown />
                  </button>
                </div>
              }
              <strong>{album.name}</strong>
            </div>
          </div>
        )
      }
    </div>
  );
};

// List.propTypes = {

// };

export default CSSModules(List, styles, { allowMultiple: true });
