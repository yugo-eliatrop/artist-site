import React, { useState } from "react";
import CSSModules from "react-css-modules";
import Routes from "../../../../libs/routes";

import usePopupAnimation from "../../../shared/usePopupAnimation";
import styles from "./NewForm.module.scss";

const NewForm = props => {
  const [errors, setErrors] = useState(null);
  const [wrapper, close] = usePopupAnimation(props.close);

  const handleSubmit = event => {
    event.preventDefault();
    let data = new FormData(event.target);
    data.append("authenticity_token", props.csrf_token);
    fetch(Routes.albums_path(), { method: "POST", body: data })
      .then(response => response.json().then(data => {
        if (response.ok) {
          setErrors(null);
          window.location.replace(`/albums/${data.id}/edit`);
        }
        else
          setErrors(data);
      }));
  };

  return (
    <div styleName="wrapper" ref={wrapper} style={{ display: "none" }}>
      <div styleName="form-wrapper">
        <h4>Create New Album</h4>
        <form onSubmit={handleSubmit}>
          <p>Name</p>
          {
            errors && errors.name &&
            <>{errors.name.map(error => <p key={error} styleName="error">{error}</p>)}</>
          }
          <input name="name" type="text" />
          <p>Description</p>
          <textarea name="description" type="text" />
          <div styleName="btns">
            <button className="btn btn-primary" type="submit">Create</button>
            <button className="btn btn-secondary" onClick={close} type="button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CSSModules(NewForm, styles, { allowMultiple: true });
