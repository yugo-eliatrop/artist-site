import React from "react";
// import PropTypes from "prop-types";
import CSSModules from "react-css-modules";

import TextSettings from "./text/Text";
import ContactsSettings from "./contacts/Contacts";
import AlbumList from "./album/List";
import Routes from "../../../libs/routes";
import styles from "./Main.module.scss";

const Main = props => {
  const { texts, contacts, csrf_token, albums } = props;

  const handleSubmit = event => {
    event.preventDefault();
    let data = new FormData(event.target);
    data.append("authenticity_token", csrf_token);
    fetch(Routes.admin_update_path(), { method: "POST", body: data })
      .then(response => response.ok || response.json().then(data => {
        alert("ERROR: " + JSON.stringify(data.errors));
      }));
  };

  return (
    <div styleName="wrapper">
      <div className="container">
        <div className="row" styleName="header">
          <div className="col-12">
            <h2>Admin settings</h2>
          </div>
        </div>
        <TextSettings texts={texts} handleSubmit={handleSubmit} />
        <ContactsSettings contacts={contacts} handleSubmit={handleSubmit} />
        <AlbumList albums={albums} />
      </div>
    </div>
  );
};

// Main.propTypes = {

// };

export default CSSModules(Main, styles, { allowMultiple: true });
