import React, { useState, useCallback } from "react";
// import PropTypes from "prop-types";
import CSSModules from "react-css-modules";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

import Routes from "../../../../libs/routes";
import styles from "./List.module.scss";

const List = props => {
  const { csrf_token } = props;

  const convertAlbums = useCallback(() => {
    let obj = {};
    props.albums.forEach(album => { obj[album.id] = album; });
    obj["count"] = props.albums.length;
    return obj;
  }, [props.albums]);

  const albums = convertAlbums();
  const [priorityIsBeingEdited, setPriorityChangingStatus] = useState(false);
  const [priority, setPriority] = useState(props.albums.map(album => album.id));
  const [tempPriority, setTempPriority] = useState(null);

  const changePriority = () => {
    let data = new FormData();
    data.append("authenticity_token", csrf_token);
    priority.forEach(p => data.append("priority[]", p));
    fetch(Routes.change_priority_albums_path(), { method: "POST", body: data })
      .then(response => response.ok && setPriorityChangingStatus(false));
  };

  const startPriorityChanging = () => {
    setTempPriority(priority);
    setPriorityChangingStatus(true);
  };

  const cancelPriorityChanging = () => {
    setPriority(tempPriority);
    setPriorityChangingStatus(false);
  };

  const swap = (i, j) => {
    let newPriority = [...priority];
    newPriority[i] = priority[j];
    newPriority[j] = priority[i];
    setPriority(newPriority);
  };

  const up = id => {
    const index = priority.findIndex(p => p === id);
    if (index === 0)
      return;
    swap(index - 1, index);
  };

  const down = id => {
    const index = priority.findIndex(p => p === id);
    if (index === priority.length - 1)
      return;
    swap(index, index + 1);
  };

  return (
    <div styleName="albums point" className="row">
      <div className="col-12">
        <h3 styleName="point-title">Albums settings</h3>
      </div>
      <div styleName="btns">
        <div styleName="priority-btns">
          {
            priorityIsBeingEdited ?
              <>
                <button onClick={changePriority}>Save</button>
                <button onClick={cancelPriorityChanging}>Cancel</button>
              </>
              :
              <button onClick={startPriorityChanging}>Change priority</button>
          }
        </div>
        <a href={Routes.new_album_path()}>
          <button>Create Album</button>
        </a>
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
                      <FaChevronUp />
                    </button>
                    <button onClick={() => down(id)} disabled={i === albums.count - 1}>
                      <FaChevronDown />
                    </button>
                  </div>
                }
                <strong>{albums[id].name}</strong>
              </div>
              <a href={Routes.edit_album_path(id)}>Edit</a>
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
