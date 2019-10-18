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
        <div className="col-md-6">
          <p>Album Name</p>
          <input type="text" defaultValue={album ? album.name : ""} />
          <p>Album Description</p>
          <textarea type="text" defaultValue={album ? album.description : ""} />
        </div>
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <input name="file" type="file" />
            <input name="album_id" value={album.id} hidden readOnly />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

// Form.propTypes = {

// };

export default CSSModules(Form, styles, { allowMultiple: true });
