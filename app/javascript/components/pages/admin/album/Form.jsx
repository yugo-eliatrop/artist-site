import React, { useState, useRef } from "react";
// import PropTypes from "prop-types";
import CSSModules from "react-css-modules";
import Routes from "../../../../libs/routes";

import Wrapper from "../Wrapper";
import ImageList from "./ImageList";
import styles from "./Form.module.scss";

const Form = props => {
  const { csrf_token } = props;

  const [album, setAlbum] = useState(props.album);
  const [errors, setErrors] = useState(null);
  const filesField = useRef(null);

  const handleSubmit = event => {
    event.preventDefault();
    let body = new FormData(event.target);
    body.append("authenticity_token", csrf_token);
    fetch(Routes.images_path(), { method: "POST", body })
      .then(response => response.json().then(data => {
        setAlbum(data.album);
        filesField.current.value = null;
        data.errors && setErrors(data.errors);
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
            <input name="files[]" type="file" multiple ref={filesField} />
            <input name="album_id" value={album.id} hidden readOnly />
            <button type="submit">Submit</button>
          </form>
          {errors && <p>Some files were not uploaded</p>}
        </div>
      </div>
      <ImageList album={album} csrf_token={csrf_token} />
    </Wrapper>
  );
};

// Form.propTypes = {

// };

export default CSSModules(Form, styles, { allowMultiple: true });
