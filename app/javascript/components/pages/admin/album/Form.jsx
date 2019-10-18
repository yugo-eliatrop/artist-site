import React from "react";
// import PropTypes from "prop-types";
import CSSModules from "react-css-modules";

import Routes from "../../../../libs/routes";
import Wrapper from "../Wrapper";
import styles from "./Form.module.scss";

const Form = props => {
  const { album, csrf_token } = props;

  const handleSubmit = event => {
    event.preventDefault();
    let data = new FormData(event.target);
    data.append("authenticity_token", csrf_token);
    fetch(Routes.images_path(), { method: "POST", body: data })
      .then(response => response.ok || response.json().then(data => {
        alert("ERROR: " + JSON.stringify(data.errors));
      }));
  };

  return (
    <Wrapper>
      <div className="row" styleName="point">
        <div className="col-12">
          <h3 styleName="point-title">Edit Album</h3>
        </div>
        <div className="col-md-6">
          <p>Album Name</p>
          <input type="text" defaultValue={album.name} />
          <p>Album Description</p>
          <textarea type="text" defaultValue={album.description} />
        </div>
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <input name="file" type="file" />
            <input name="album_id" value={album.id} hidden readOnly />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div className="row" styleName="point">
        <div className="col-12">
          <h3 styleName="point-title">Images Priority</h3>
        </div>
        {
          album.images.map(image =>
            <div key={image.id} className="col-6 col-sm-4 col-md-3">
              <img src={image.file.thumb.url} alt="mini-image"/>
            </div>
          )
        }
      </div>
    </Wrapper>
  );
};

// Form.propTypes = {

// };

export default CSSModules(Form, styles, { allowMultiple: true });
