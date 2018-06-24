import React, { Component } from "react";

import MenuItem from "material-ui/MenuItem";
import { grey500 } from "material-ui/styles/colors";
import InputField from "./InputField";
import Dropdown from "./Dropdown";
import Checkbox from "material-ui/Checkbox";

const checkBoxStyles = {
  margin: "5px 10px",
  height: "48px"
};

const checkboxLableStyles = {
  color: grey500
};

const colStyle = {
  boxSizing: "border-box",
  paddingLeft: "0"
};

class CheckBoxes extends Component {
 
  render() {
    return (
      <div>
        <div className="row">
       

           <div className="col-md-4">
            <Checkbox
              label="Option"
              style={checkBoxStyles}
              labelStyle={checkboxLableStyles}
            />
          </div>
          <div className="col-md-4">
            <Checkbox
              label="Commissions"
              style={checkBoxStyles}
              labelStyle={checkboxLableStyles}
            />
          </div>
          
          
        </div>
        <div className="row">
       

           <div className="col-md-4">
            <Checkbox
              label="Bonuses"
              style={checkBoxStyles}
              labelStyle={checkboxLableStyles}
            />
          </div>
          <div className="col-md-8">
            <Checkbox
              label="Travel / Meal / Housing Allowance"
              style={checkBoxStyles}
              labelStyle={checkboxLableStyles}
            />
          </div>
          
          
        </div>
        <div className="row">
       

           <div className="col-md-4">
            <Checkbox
              label="Health"
              style={checkBoxStyles}
              labelStyle={checkboxLableStyles}
            />
          </div>
          <div className="col-md-4">
            <Checkbox
              label="Wellness"
              style={checkBoxStyles}
              labelStyle={checkboxLableStyles}
            />
          </div>
          <div className="col-md-4">
            <Checkbox
              label="Overtime"
              style={checkBoxStyles}
              labelStyle={checkboxLableStyles}
            />
          </div>
         
          
        </div>
       
       

        
        </div>
     
    );
  }
}

export default CheckBoxes;
