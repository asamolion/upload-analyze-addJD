import React, { Component } from "react";

import TextField from "material-ui/TextField";
import { deepOrange500, grey500 } from "material-ui/styles/colors";
import MdClose from "react-icons/lib/md/close";

const root = {
  position: "relative",
  margin: "20px 0"
};

const labelStyle = {
  color: "#72C4CC",
  position: "absolute",
  top: "-30px",
  fontSize: "12px"
};

const inputStyle = {
  backgroundColor: "#F3F3F3",
  borderRadius: "25px",
  padding: "0 10px"
  // textAlign: "right"
};

const hintStyle = {
  right: "0"
};

const underlineStyle = {
  display: "none"
};

const iconStyle = {
  fontSize: "14px",
  position: "absolute",
  top: "17px",
  right: "10px",
  color: "#72C4CC",
  cursor: "pointer",
};

class InputField extends Component {
  render() {
    return (
      <div style={root}>
        <label style={labelStyle}>{this.props.labelText}</label>
        <TextField
          name={this.props.name}
          onChange={this.props.onChangeValue}
          fullWidth={true}
          className="text-field"
          inputStyle={inputStyle}
          hintStyle={hintStyle}
          underlineStyle={underlineStyle}
          hintText={this.props.hintText}
          style={{
            fontSize: "14px"
          }}
          multiLine={this.props.multiLine}
          rows={this.props.rows}
        />
        <MdClose style={iconStyle} />
      </div>
    );
  }
}

export default InputField;
