import React, { Component } from "react";

import TextField from "material-ui/TextField";

import { deepOrange500, grey500 } from "material-ui/styles/colors";

const labelStyle = {
  color: grey500,
  position: "absolute",
  top: "12px",
  fontSize: "12px"
};

const inputStyle = {
  textAlign: "right"
};

const hintStyle = {
  right: "0"
};

const underlineStyle = {
  borderColor: deepOrange500
};

class InputField extends Component {
  render() {
    return (
      <div style={{ position: "relative" }}>
        <label style={labelStyle}>{this.props.labelText}</label>
        <TextField
          name={this.props.name}
          onChange={this.props.onChangeValue}
          fullWidth={true}
          className="text-field"
          inputStyle={inputStyle}
          hintStyle={hintStyle}
          underlineFocusStyle={underlineStyle}
          hintText={this.props.hintText}
          style={{
            fontSize: "14px"
          }}
        />
      </div>
    );
  }
}

export default InputField;
