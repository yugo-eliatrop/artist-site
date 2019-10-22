import React from "react";
import PropTypes from "prop-types";
import CSSModules from "react-css-modules";

import styles from "./Text.module.scss";

const Text = props => {
  const { texts, handleSubmit } = props;

  return (
    <div styleName="texts point" className="row">
      <div className="col-12">
        <h3 styleName="point-title">Text settings</h3>
      </div>
      {
        texts.map(text =>
          <div key={text.id} className="col-12 col-md-6">
            <form onSubmit={handleSubmit}>
              <h4>{text.key}</h4>
              <p>Title:</p>
              <input name="title" className="form-control" type="text" defaultValue={text.title} />
              <p>Text:</p>
              <textarea name="content" className="form-control" defaultValue={text.content} />
              <input name="key" hidden type="text" readOnly value={text.key} />
              <input name="type" hidden type="text" readOnly value="text" />
              <input name="id" hidden type="number" readOnly value={text.id} />
              <button type="submit" styleName="button" className="btn btn-primary">Update</button>
            </form>
          </div>
        )
      }
    </div>
  );
};

Text.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  texts: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired
  })).isRequired
};

export default CSSModules(Text, styles, { allowMultiple: true });
