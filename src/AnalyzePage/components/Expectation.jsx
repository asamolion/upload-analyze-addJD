import React, { Component } from "react";

import { grey500 } from "material-ui/styles/colors";
import Checkbox from "material-ui/Checkbox";
import MenuItem from "material-ui/MenuItem";

import Dropdown from "./Dropdown";

const checkBoxStyles = {
  margin: "5px 20px",
  height: "48px"
};

const checkboxLableStyles = {
  color: grey500
};

function getSalary(start,end){

  if(!start || !end){
    console.log("there was no salary start or end");
    return undefined;
  }
var string = '';
      switch(start + end){

      case 50000:
        string = "$0 - $50,000+";
        break;
       
      case 150000:
        string = "$50,000 - $100,000";
        break;
        
      case 350000:
        string = "$100,000 - $250,000";
        break;
        
      case 250000:
        string = "$250k+";
        break;
         




    }

    return string;
}

class Expecation extends Component {


  constructor(props) {
        super(props);

        // reset login status
      

        this.state = {
              dataSource: [],
        };
        this.autoCompleteUpdateHandler = this.autoCompleteUpdateHandler.bind(this);
    }

  autoCompleteUpdateHandler(value) {
    this.setState({
      dataSource: [value, value + value, value + value + value],
      currentAddition: value
    });
  }
  render() {
    const formData = this.props.formData;
    return (
      <div className="row">
        <div className="col-md-10">
          <div className="col-md-8">
            <Dropdown startValue={getSalary(formData.Preference.SalaryStart,formData.Preference.SalaryEnd)}>
              <MenuItem value={undefined} primaryText="Salary Range" />
              <MenuItem value={"$0 - $50,000"} primaryText="$0 - $50,000" />
              <MenuItem value={"$50,000 - $100,000"} primaryText="$50,000 - $100,000" />
              <MenuItem value={"$100,000 - $250,000"} primaryText="$100,000 - $250,000" />
               <MenuItem value={"$250k+"} primaryText="$250k+" />
            </Dropdown>
          </div>
          <div className="col-md-4">
            <Checkbox
            checked={formData.Preference.Relocation}
              label="Accept Relocation"
              style={checkBoxStyles}
              labelStyle={checkboxLableStyles}
            />
          </div>
          <div className="col-md-8">
            <Dropdown startValue={formData.Preference.PreferredLocation}>
              <MenuItem value={undefined} primaryText="Preferred location" />
              <MenuItem value={"California"} primaryText="California" />
              <MenuItem value={"New York"} primaryText="New York" />
              <MenuItem value={"Washington"} primaryText="Washington" />
              <MenuItem value={"Seattle"} primaryText="Seattle" />
            </Dropdown>
          </div>
          <div className="col-md-4">
            <Checkbox
              checked={formData.Preference.Travel}
              label="Willing to Travel"
              style={checkBoxStyles}
              labelStyle={checkboxLableStyles}
            />
          </div>
          <div className="col-md-8">
            <Dropdown>
              <MenuItem value={undefined} primaryText="Visa Status" />
              <MenuItem value={true} primaryText="Require sponsorship" />
              <MenuItem
                value={false}
                primaryText="do NOT require sponsorship"
              />
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
}

export default Expecation;
