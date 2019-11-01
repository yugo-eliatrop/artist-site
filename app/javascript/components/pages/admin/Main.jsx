import React from "react";
// import PropTypes from "prop-types";

import TextSettings from "./text/Text";
import ContactsSettings from "./contacts/Contacts";
import AlbumList from "./album/List";
import ApplicationSettings from "./ApplicationSettings";
import Wrapper from "./Wrapper";
import Routes from "../../../libs/routes";

const Main = props => {
  const { texts, contacts, csrf_token, albums, signup_is_open, logo } = props;

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
      <ul className="nav nav-tabs" id="tab" role="tablist">
        <li className="nav-item">
          <a className="nav-link active" id="app-tab" data-toggle="tab" href="#app" role="tab" aria-controls="app" aria-selected="true">
            Application
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="text-tab" data-toggle="tab" href="#text" role="tab" aria-controls="text" aria-selected="false">
            Texts
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="contacts-tab" data-toggle="tab" href="#contacts" role="tab" aria-controls="contacts" aria-selected="false">
            Contacts
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="albums-tab" data-toggle="tab" href="#albums" role="tab" aria-controls="albums" aria-selected="false">
            Albums
          </a>
        </li>
      </ul>
      <div className="tab-content" id="tabContent">
        <div className="tab-pane fade show active" id="app" role="tabpanel" aria-labelledby="app-tab">
          <ApplicationSettings signUpIsOpen={signup_is_open} logo={logo} csrf_token={csrf_token} />
        </div>
        <div className="tab-pane fade" id="text" role="tabpanel" aria-labelledby="text-tab">
          <TextSettings texts={texts} handleSubmit={handleSubmit} />
        </div>
        <div className="tab-pane fade" id="contacts" role="tabpanel" aria-labelledby="contacts-tab">
          <ContactsSettings contacts={contacts} handleSubmit={handleSubmit} />
        </div>
        <div className="tab-pane fade" id="albums" role="tabpanel" aria-labelledby="albums-tab">
          <AlbumList albums={albums} csrf_token={csrf_token} />
        </div>
      </div>
    </Wrapper>
  );
};

// Main.propTypes = {

// };

export default Main;
