import React, { useState, useCallback } from "react";
// import PropTypes from "prop-types";
import CSSModules from "react-css-modules";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";

// import Routes from "../../../../libs/routes";
import styles from "./List.module.scss";

const List = props => {
  const convertAlbums = useCallback(() => {
    let obj = {};
    props.albums.forEach(album => { obj[album.id] = album; });
    obj["count"] = props.albums.length;
    return obj;
  }, [props.albums]);

  const albums = convertAlbums();

  const [priorityIsBeingEdited, setPriorityChangingStatus] = useState(false);
  const [priority, setPriority] = useState(props.albums.map(album => album.id));

  const changePriority = () => {
    setPriorityChangingStatus(false);
  };

  const up = id => {

  };

  const down = id => {

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
        priority.map((id, i) =>
          <div key={albums[id].name} className="col-12" styleName="album">
            <div styleName="panel">
              <div styleName="left-side">
                {
                  priorityIsBeingEdited &&
                  <div styleName="arrows">
                    <button onClick={() => up(id)} disabled={i === 0}>
                      <FaArrowAltCircleUp />
                    </button>
                    <button onClick={() => down(id)} disabled={i === albums.count - 1}>
                      <FaArrowAltCircleDown />
                    </button>
                  </div>
                }
                <strong>{albums[id].name}</strong>
              </div>
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
