import React, { Component } from "react";

import MenuItem from "material-ui/MenuItem";

import InputField from "./InputField";
import Dropdown from "./Dropdown";

const colStyle = {
  boxSizing: "border-box",
 
};
function getCurrentStatus(status){

}
class Info extends Component {

 
  render() {
    const formData = this.props.formData;
    console.log("checking form data on analyze page", formData);
    return (
      <div>
        <div className="row">
          <div style={colStyle} className="col-md-4">
            <InputField hintText={formData.Personal.Name} labelText="Name" />
          </div>
          <div style={colStyle} className="col-md-4">
            <InputField hintText="English" labelText="Language" />
          </div>
          <div style={colStyle} className="col-md-4">
            <InputField hintText={formData.Personal.Mobile} labelText="Phone Number" />
          </div>
        </div>
        <div className="row">
         <div style={colStyle} className="col-md-4">
            <InputField hintText={formData.Personal.Email} labelText="Email" />
          </div>
          <div style={colStyle} className="col-md-4">
            <InputField
              hintText="SF"
              labelText="Current Location"/>
          </div>
          <div style={colStyle} className="col-md-4">
            <Dropdown startValue={formData.Preference.JobStatus}>
              <MenuItem value={undefined} primaryText="Current Status" />
              <MenuItem value={"Part Time"} primaryText="Part Time" />
              <MenuItem value={"Full Time"} primaryText="Full Time" />
              <MenuItem value={"Contract"} primaryText="Contract" />
              <MenuItem value={"Unemployed"} primaryText="Unemployed" />
              <MenuItem value={"Intern"} primaryText="Intern" />
            </Dropdown>
          </div>
        </div>
       
     </div>
    );
  }
}

export default Info;
