import React from "react";
// import PropTypes from "prop-types";
import CSSModules from "react-css-modules";
import Routes from "../../../../libs/routes";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import usePriority from "../../../shared/usePriority";
import styles from "./Form.module.scss";

const ImageList = props => {
  const { csrf_token, album } = props;

  const [
    priority,
    priorityIsBeingEdited,
    startPriorityChanging,
    cancelPriorityChanging,
    up,
    down,
    changePriority
  ] = usePriority(Routes.change_priority_images_path(), csrf_token, album.images);

  const images = (() => {
    let obj = {};
    album.images.forEach(img => { obj[img.id] = img; });
    obj["count"] = album.images.length;
    return obj;
  })();

  return (
    <div className="row" styleName="point">
      <div className="col-12">
        <h3 styleName="point-title">Images Priority</h3>
      </div>
      <div className="col-12">
        {
          priorityIsBeingEdited ?
            <>
              <button className="btn btn-primary" styleName="priority-btn" onClick={changePriority}>Save</button>
              <button className="btn btn-secondary" styleName="priority-btn" onClick={cancelPriorityChanging}>Cancel</button>
            </> :
            <button className="btn btn-primary" styleName="priority-btn" onClick={startPriorityChanging}>Change priority</button>
        }
      </div>
      {
        priority.map((id, index) =>
          <div key={id} styleName="image" className="col-6 col-sm-4 col-md-3 col-lg-2">
            <img src={images[id].file.thumb.url} alt="mini-image" />
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
