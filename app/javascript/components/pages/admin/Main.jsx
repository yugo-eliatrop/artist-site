import React from "react";
// import PropTypes from "prop-types";

import TextSettings from "./text/Text";
import ContactsSettings from "./contacts/Contacts";
import AlbumList from "./album/List";
import Wrapper from "./Wrapper";
import Routes from "../../../libs/routes";

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
    <Wrapper>
      <TextSettings texts={texts} handleSubmit={handleSubmit} />
      <ContactsSettings contacts={contacts} handleSubmit={handleSubmit} />
      <AlbumList albums={albums} csrf_token={csrf_token} />
    </Wrapper>
  );
};

// Main.propTypes = {

// };

export default Main;
