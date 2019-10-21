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
  const [imgIsLoading, setImgLoadingStatus] = useState(false);
  const filesField = useRef(null);

  const uploadFiles = event => {
    event.preventDefault();
    if (event.target['files[]'].value === "")
      return;
    setImgLoadingStatus(true);
    let body = new FormData(event.target);
    body.append("authenticity_token", csrf_token);
    fetch(Routes.images_path(), { method: "POST", body })
      .then(response => response.json().then(data => {
        setImgLoadingStatus(false);
        setAlbum(data.album);
        filesField.current.value = null;
        data.errors && setErrors(data.errors);
      }));
  };

  const updateAlbum = event => {
    event.preventDefault();
    let body = new FormData(event.target);
    body.append("authenticity_token", csrf_token);
    body.append("id", album.id);
    fetch(Routes.album_path(album.id), { method: "PUT", body });
    // TO DO handler
  };

  return (
    <Wrapper>
      <div className="row" styleName="point">
        <div className="col-12">
          <h3 styleName="point-title">Edit Album</h3>
        </div>
        <div className="col-md-6">
          <form onSubmit={updateAlbum}>
            <p>Album Name</p>
            <input type="text" name="name" defaultValue={album.name} required minLength="3" />
            <p>Album Description</p>
            <textarea type="text" name="description" defaultValue={album.description} />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="col-md-6">
          <p>Upload Pictures</p>
          {
            imgIsLoading ?
              <p>Uploading...</p>
              :
              <>
                <form styleName="file-uploader" onSubmit={uploadFiles}>
                  <input name="files[]" type="file" styleName="file-input" multiple ref={filesField} />
                  <input name="album_id" value={album.id} hidden readOnly />
                  <button type="submit">Upload</button>
                </form>
                {errors && <p>Some files were not uploaded</p>}
              </>
          }
        </div>
      </div>
      <ImageList album={album} csrf_token={csrf_token} />
      <a href={Routes.admin_path()}>Back to admin dashboard</a>
    </Wrapper>
  );
};

// Form.propTypes = {

// };

export default CSSModules(Form, styles, { allowMultiple: true });
