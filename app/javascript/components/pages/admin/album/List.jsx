import React, { useState, useCallback } from "react";
// import PropTypes from "prop-types";
import CSSModules from "react-css-modules";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

import Routes from "../../../../libs/routes";
import usePriority from "../../../shared/usePriority";
import NewForm from "./NewForm";
import styles from "./List.module.scss";

const List = props => {
  const { csrf_token } = props;

  const [
    priority,
    priorityIsBeingEdited,
    startPriorityChanging,
    cancelPriorityChanging,
    up,
    down,
    changePriority
  ] = usePriority(Routes.change_priority_albums_path(), csrf_token, props.albums);

  const convertAlbums = useCallback(() => {
    let obj = {};
    props.albums.forEach(album => { obj[album.id] = album; });
    obj["count"] = props.albums.length;
    return obj;
  }, [props.albums]);

  const albums = convertAlbums();
  const [showNewForm, setNewFormDisplay] = useState(false);

  return (
    <>
      {showNewForm && <NewForm csrf_token={csrf_token} close={() => setNewFormDisplay(false)} />}
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
          {priorityIsBeingEdited || <button onClick={() => setNewFormDisplay(true)}>Create Album</button>}
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
    </>
  );
};

// List.propTypes = {

// };

export default CSSModules(List, styles, { allowMultiple: true });
