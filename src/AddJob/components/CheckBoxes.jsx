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

  constructor(props) {
      super(props);
      this.state = {
        formData: {
         
          Comissions: false,
          OvertimePay: false,
          Bonuses: false,
          TravelMealHousingAllowance: false,
          HealthBenefits: false,
          Wellness: false,

        }
      }

      this.handleChange = this.handleChange.bind(this);
      this.returnInfo = this.returnInfo.bind(this);
    }

    componentDidMount(){
    this.props.onRef(this);
  }
  handleChange(event){
    const {formData} = this.state;

    console.log("checking checkbox", event.target.name, event.target.value);

    formData[event.target.name] = !formData[event.target.name];

    this.setState({formData});
  }

  returnInfo(){
    return this.state.formData;
  }
 
  render() {
    return (
      <div>
        <div className="row">
       

           <div className="col-md-4">
             <Checkbox
              name="OvertimePay"
              onCheck={this.handleChange}
              label="Overtime"
              style={checkBoxStyles}
              labelStyle={checkboxLableStyles}
            />
          </div>
          <div className="col-md-4">
            <Checkbox
              label="Commissions"
               name="Commissions"
              onCheck={this.handleChange}
              style={checkBoxStyles}
              labelStyle={checkboxLableStyles}
            />
          </div>
           <div className="col-md-4">
            <Checkbox
              label="Bonuses"
              name="Bonuses"
              onCheck={this.handleChange}

              style={checkBoxStyles}
              labelStyle={checkboxLableStyles}
            />
          </div>
          
          
        </div>
        <div className="row">
       
          <div className="col-md-4">
            <Checkbox
              label="Health"
              name="HealthBenefits"
              onCheck={this.handleChange}
              style={checkBoxStyles}
              labelStyle={checkboxLableStyles}
            />
          </div>
          <div className="col-md-4">
            <Checkbox
              label="Wellness"
              name="Wellness"
              onCheck={this.handleChange}
              style={checkBoxStyles}
              labelStyle={checkboxLableStyles}
            />
          </div>
          
          <div className="col-md-4">
            <Checkbox
              name="TravelMealHousingAllowance"
              onCheck={this.handleChange}
              label="Travel / Meal / Housing Allowance"
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
