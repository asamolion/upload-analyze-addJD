import React, { Component } from "react";

import MenuItem from "material-ui/MenuItem";
import { grey500 } from "material-ui/styles/colors";
import InputField from "./InputField";
import Dropdown from "./Dropdown";
import Checkbox from "material-ui/Checkbox";

const checkBoxStyles = {
  margin: "5px 20px",
  height: "48px"
};

const checkboxLableStyles = {
  color: grey500
};

const colStyle = {
  boxSizing: "border-box",
  paddingLeft: "0"
};

class Info extends Component {
 
  render() {
    return (
      <div>
        <div className="row" style={{marginBottom:"20px",marginTop:"50px"}}>
          <div style={colStyle} className="col-md-12">
            <InputField hintText="Google" labelText="Company Name" />
          </div>
          
        </div>
         <div className="row" style={{marginBottom:"20px"}}>
          <div style={colStyle} className="col-md-12">
            <InputField hintText="Software Engineer" labelText="Job Position" />
          </div>
          
        </div>
        <div className="row" style={{marginBottom:"20px"}}>
          <div style={colStyle} className="col-md-12">
            <InputField hintText="1000" labelText="Company Size" />
          </div>
          
        </div>
       
    

       <div className="row" style={{marginBottom:"20px"}}>
          <div style={colStyle} className="col-md-12">
            <InputField hintText="Mountain View, CA" labelText="Location" />
          </div>
        </div>

        <div className="row" style={{marginBottom:"20px"}}>
          <div style={colStyle} className="col-md-12">
            <InputField hintText="Please Describe the role" rows={3} multiLine={true} labelText="Summary" />
          </div>
          
        </div>

        <div className="row" style={{marginBottom:"20px"}}>
          <div style={colStyle} className="col-md-12">
            <InputField hintText="List of Responsibilities for this role" rows={3} multiLine={true} labelText="Key Responsibilities" />
          </div>
          
        </div>

       <div className="row" style={{marginBottom:"20px"}}>
         
           <div style={colStyle} className="col-md-12">
            <Dropdown>
              <MenuItem value={undefined} primaryText="Education" />
              <MenuItem value={"ft"} primaryText="High School Diploma" />
              <MenuItem value={"ftc"} primaryText="Bachelors Degree" />
              <MenuItem value={"pt"} primaryText="Masters Degree" />
              <MenuItem value={"ptc"} primaryText="Doctorate" />
              <MenuItem value={"i"} primaryText="PHD" />
              <MenuItem value={"al"} primaryText="None of the above" />
              <MenuItem value={"jla"} primaryText="Decline to answer" />
            </Dropdown>
          </div>
         
        </div>

        <div className="row" style={{marginBottom:"20px"}}>
         
           <div style={colStyle} className="col-md-12">
            <Dropdown>
              <MenuItem value={undefined} primaryText="Base Salary Range" />
              <MenuItem value={"ft"} primaryText="$0 - $50,000" />
              <MenuItem value={"ftc"} primaryText="$50 - $100,000" />
              <MenuItem value={"pt"} primaryText="$100 - $150,000" />
              <MenuItem value={"ptc"} primaryText="$150 - $250,000" />
              <MenuItem value={"i"} primaryText="$250k+" />
              
            </Dropdown>
          </div>
         
        </div>
           <div className="row" style={{marginBottom:"20px"}}>
         
           <div style={colStyle} className="col-md-12">
            <Dropdown>
              <MenuItem value={undefined} primaryText="Employment Type" />
              <MenuItem value={"ft"} primaryText="Full-time" />
              <MenuItem value={"ftc"} primaryText="Full-time (Contactor)" />
              <MenuItem value={"pt"} primaryText="Part-time" />
              <MenuItem value={"ptc"} primaryText="Part-time (Contactor)" />
              <MenuItem value={"i"} primaryText="Intern" />
              <MenuItem value={"al"} primaryText="Actively Looking" />
              <MenuItem value={"jla"} primaryText="Just look around" />
            </Dropdown>
          </div>
         
        </div>

        <div className="row" style={{marginBottom:"20px"}}>
         
           <div style={colStyle} className="col-md-12">
            <Dropdown>
              <MenuItem value={undefined} primaryText="Work Experience" />
              <MenuItem value={"ft"} primaryText="0 - 2 Years" />
              <MenuItem value={"ftc"} primaryText="2 - 5 Years" />
              <MenuItem value={"pt"} primaryText="5 - 10 Years" />
              <MenuItem value={"ptc"} primaryText="10+ Years" />
             
            </Dropdown>
          </div>
         
        </div>
       
       

        
        </div>
     
    );
  }
}

export default Info;
