import React, { useState } from "react";
// import PropTypes from "prop-types";
import CSSModules from "react-css-modules";
import Routes from "../../../../libs/routes";
import { FaChevronLeft, FaChevronRight, FaTimes, FaSave } from "react-icons/fa";

import usePriority from "../../../shared/usePriority";
import styles from "./Form.module.scss";

const ImageList = props => {
  const { csrf_token, album } = props;
  const [imgsUnderRemoving, setImgsUnderRemoving] = useState(null);

  const [
    priority,
    priorityIsBeingEdited,
    startPriorityChanging,
    cancelPriorityChanging,
    up,
    down,
    changePriority
  ] = usePriority(Routes.change_priority_images_path(), csrf_token, album.images);

  const addUnderRemoving = id => {
    let newSet = new Set(imgsUnderRemoving);
    newSet.has(id) ? newSet.delete(id) : newSet.add(id);
    setImgsUnderRemoving(newSet);
  };

  const removeImgs = () => {
    let body = new FormData();
    body.append("authenticity_token", csrf_token);
    [...imgsUnderRemoving].forEach(id => body.append("ids[]", id));
    fetch(Routes.destroy_several_images_path(), { method: "POST", body })
      .then(response => response.ok && window.location.reload());
  };

  const renderPriorityBtns = () => {
    if (priorityIsBeingEdited)
      return (
        <>
          <button
            className="btn btn-primary"
            styleName="priority-btn"
            onClick={changePriority}
          >
            Save
          </button>
          <button
            className="btn btn-secondary"
            styleName="priority-btn"
            onClick={cancelPriorityChanging}
          >
            Cancel
          </button>
        </>
      );
    return (
      <button
        className="btn btn-primary"
        styleName="priority-btn"
        onClick={startPriorityChanging}
      >
        Change priority
      </button>
    );
  };

  const renderRemovingBtns = () => {
    if (imgsUnderRemoving)
      return (
        <>
          <button
            className="btn btn-danger"
            styleName="priority-btn"
            onClick={removeImgs}
          >
            Delete
          </button>
          <button
            className="btn btn-secondary"
            styleName="priority-btn"
            onClick={() => setImgsUnderRemoving(null)}
          >
            Cancel
          </button>
        </>
      );
    return (
      <button
        className="btn btn-danger"
        styleName="priority-btn"
        onClick={() => setImgsUnderRemoving(new Set())}
      >
        Delete images
      </button>
    );
  };

  const images = (() => {
    let obj = {};
    album.images.forEach(img => { obj[img.id] = img; });
    obj["count"] = album.images.length;
    return obj;
  })();

  return (
    <div className="row" styleName="point">
      <div className="col-12">
        <h3 styleName="point-title">Images Overwiev</h3>
      </div>
      <div className="col-12">
        {!imgsUnderRemoving && renderPriorityBtns()}
        {!priorityIsBeingEdited && renderRemovingBtns()}
      </div>
      {
        priority.map((id, index) =>
          <div key={id} styleName="image" className="col-6 col-sm-4 col-md-3 col-lg-2">
            <img src={images[id].file.thumb.url}
              alt="mini-image"
              style={{ opacity: imgsUnderRemoving && imgsUnderRemoving.has(id) ? ".1" : "1" }}
            />
            {
              imgsUnderRemoving &&
              <button
                styleName="img-remove-btn"
                className="btn btn-danger"
                onClick={() => addUnderRemoving(id)}
              >
                {imgsUnderRemoving && imgsUnderRemoving.has(id) ? <FaSave /> : <FaTimes />}
              </button>
            }
            {
              priorityIsBeingEdited &&
              <div styleName="btns-imgs">
                <button onClick={() => up(id)} disabled={index === 0}>
                  <FaChevronLeft />
                </button>
                <button onClick={() => down(id)} disabled={index === images.count - 1}>
                  <FaChevronRight />
                </button>
              </div>
            }
          </div>
        )
      }
    </div>
  );
};

// ImageList.propTypes = {

// };

export default CSSModules(ImageList, styles, { allowMultiple: true });
