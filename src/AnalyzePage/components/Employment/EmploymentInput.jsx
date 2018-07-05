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

    constructor(props) {

        
    super(props);

    var data;

    this.handleChange = this.handleChange.bind(this);
    this.returnInfo = this.returnInfo.bind(this);
    this.getDate = this.getDate.bind(this);

    if(this.props.data.Employer){
       data = {
        Employer: this.props.data.Employer,
        Length: this.props.data.Length,
        Title: this.props.data.Title,
        StartDate: this.getDate(),
      }
    }

    else{
      data = {
        Employer: '',
        Length: '',
        Title: '',
        StartDate: '',
      }
    }

    this.state = {
      formData: data,

    }

    



  }

   componentDidMount(){
    this.props.onRef(this);
  }

  handleChange(event) {
    const { formData } = this.state;

    

    formData[event.target.name] = event.target.value;

    
    
    this.setState({ formData });

    }

     returnInfo(){
      
      return this.state.formData;
    }

    getDate(){

      var ret;

      this.props.data.StartDate ? ret = ((new Date(this.props.data.StartDate)).getFullYear()).toString() : ret = ((new Date()).getFullYear()).toString();
      
      return ret;
    }
  render() {
    return (
      <div style={dottedContainer} className="col-12">
        {this.props.number > 0 ? (
          <i
            style={iconStyle}
            className="material-icons"
            onClick={() => this.props.closeHandler(this.props.number)}
          >
            cancel
          </i>
        ) : null}

        <div className="col-6">
          <InputField name="Employer" onChangeValue={this.handleChange}  labelText="Employer" hintText={this.props.data.Employer} />
        </div>
        <div className="col-6">
          
           <InputField name="Length"  onChangeValue={this.handleChange} labelText="Duration" hintText={this.props.data.Length} />
          
        </div>
        <div className="col-6">
          <InputField name="Title"  onChangeValue={this.handleChange} labelText="Job Position" hintText={this.props.data.Title} />
        </div>
        <div className="col-6">
          <InputField name="StartDate" onChangeValue={this.handleChange} labelText="Startdate" hintText={this.getDate()} />
        </div>
      </div>
    );
  }
}

export default EmploymentInput;
