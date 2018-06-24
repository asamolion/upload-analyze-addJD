import React, { Component } from "react";

import { grey400 } from "material-ui/styles/colors";
import MenuItem from "material-ui/MenuItem";

import Dropdown from "../Dropdown";
import InputField from "../InputField";

const dottedContainer = {
  position: "relative",
  border: "1px dashed #ccc",
  padding: "10px 10px 40px",
  margin: "10px 0",
  overflow: "hidden"
};

const iconStyle = {
  color: grey400,
  cursor: "pointer",
  display: "block",
  position: "absolute",
  top: "-5px",
  right: "-5px"
};

const dropdownContainerStyles = {
  height: "48px"
};

class EmploymentInput extends Component {
  render() {
    return (
      <div style={dottedContainer} className="col-12">
        {this.props.number > 0 ? (
          <i
            style={iconStyle}
            className="material-icons"
            onClick={this.props.closeHandler}
          >
            cancel
          </i>
        ) : null}

        <div className="col-6">
          <InputField labelText="Employer" hintText={this.props.data.Employer} />
        </div>
        <div className="col-6">
          
           <InputField labelText="Duration" hintText={this.props.data.Length} />
          
        </div>
        <div className="col-6">
          <InputField labelText="Job Position" hintText={this.props.data.Title} />
        </div>
        <div className="col-6">
          <InputField labelText="Startdate" hintText={((new Date(this.props.data.StartDate)).getFullYear()).toString()} />
        </div>
      </div>
    );
  }
}

export default EmploymentInput;
