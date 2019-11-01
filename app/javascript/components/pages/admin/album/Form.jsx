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
  const [isDeleting, setDeleting] = useState(false);
  const filesField = useRef(null);

  const uploadFiles = event => {
    event.preventDefault();
    if (event.target["files[]"].value === "")
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

  const destroyAlbum = () => {
    let body = new FormData();
    body.append("authenticity_token", csrf_token);
    fetch(Routes.album_path(album.id), { method: "DELETE", body })
      .then(response => response.ok && window.location.replace(Routes.admin_path()));
  };

  return (
    <Wrapper isNested>
      <div className="row" styleName="point">
        <div className="col-12">
          <h3 styleName="point-title">Edit Album</h3>
        </div>
        <div className="col-md-6">
          <form onSubmit={updateAlbum}>
            <p>Album Name</p>
            <input type="text" name="name" styleName="input" className="form-control" defaultValue={album.name} required minLength="3" />
            <p>Album Description</p>
            <textarea type="text" name="description" className="form-control" defaultValue={album.description} />
            <button styleName="button" className="btn btn-primary" type="submit">Submit</button>
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
                  <button className="btn btn-primary" type="submit">Upload</button>
                </form>
                {errors && <p>Some files were not uploaded</p>}
              </>
          }
        </div>
      </div>
      {album.images && album.images[0] && <ImageList album={album} csrf_token={csrf_token} />}
      <div className="col-12" styleName="delete">
        <a href={Routes.admin_path()}>Back to admin dashboard</a>
        <button className="btn btn-danger" onClick={() => setDeleting(true)}>Delete Album</button>
      </div>
      {
        isDeleting &&
        <div className="col-12 alert alert-danger" styleName="delete-confirm">
          <p>Are you sure about album deleting?</p>
          <div styleName="btns">
            <button className="btn btn-danger" onClick={destroyAlbum}>Yes, delete album</button>
            <button className="btn btn-secondary" onClick={() => setDeleting(false)}>Cancel</button>
          </div>
        </div>
      }
    </Wrapper>
  );
};

// Form.propTypes = {

// };

export default CSSModules(Form, styles, { allowMultiple: true });
