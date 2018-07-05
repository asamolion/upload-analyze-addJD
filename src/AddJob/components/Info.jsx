import React, { Component } from "react";

import MenuItem from "material-ui/MenuItem";
import { grey500 } from "material-ui/styles/colors";
import InputField from "./InputField";
import Dropdown from "./Dropdown";
import Checkbox from "material-ui/Checkbox";
import { TextValidator, ValidatorForm, SelectValidator} from 'react-material-ui-form-validator';
import Section from "./Section";
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

const rowStyle = {
  padding: "40px 0",
  borderBottom: "1px solid #e9e9e9"
};

class Info extends Component {


  constructor(props) {

        console.log("checking props",props);
    super(props);

    this.state = {
      formData: {
        FirstName: '',
        LastName: '',
        PhoneNumber: '',
        Email: '',
        CompanyName: '',
        CompanySize: '',
        JobPosition: '',
        CompanyLocation: '',
        Education: 0,
        EmploymentType: 0,
        WorkExperience: 0,
        BaseSalary: 0,
        Summary: '',
        KeyPoints: '',

      },

    }

    console.log("checking Formmingngng",this.state.formData);

    this.handleChange = this.handleChange.bind(this);
    this.handleEducationChange = this.handleEducationChange.bind(this);
    this.handleEmploymentChange = this.handleEmploymentChange.bind(this);
    this.handleSalaryChange = this.handleSalaryChange.bind(this);
    this.handleWorkExperienceChange = this.handleWorkExperienceChange.bind(this);
    this.returnInfo = this.returnInfo.bind(this);
    this.getSalary = this.getSalary.bind(this);
    this.getEducation = this.getEducation.bind(this);
    this.getWorkExperience = this.getWorkExperience.bind(this);
    this.getEmploymentType = this.getEmploymentType.bind(this);

  }

 handleChange(event,index,value) {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;

       
        console.log("checking new formData ", formData); 
        this.setState({ formData });

    }

    handleEducationChange(event,index,value){
      const { formData } = this.state;
      formData["Education"] = value;
      console.log("checking new FormData", formData);
      this.setState({ formData });
    }
        handleSalaryChange(event,index,value){
      const { formData } = this.state;
      formData["BaseSalary"] = value;
      console.log("checking new FormData", formData);
      this.setState({ formData });
    }
        handleWorkExperienceChange(event,index,value){
      const { formData } = this.state;
      formData["WorkExperience"] = value;
      console.log("checking new FormData", formData);
      this.setState({ formData });
    }
    handleEmploymentChange(event,index,value){
      const { formData } = this.state;
      formData["EmploymentType"] = value;
      console.log("checking new FormData", formData);
      this.setState({ formData });
    }

   componentDidMount(){
    this.props.onRef(this);
  }

  getEducation(value){
     switch (value) {
      case 0:
        return 'Nothing';
      case 1:
        return 'High School Diploma';
      case 2:
        return 'Bachelors Degree';
      case 3:
        return 'Masters Degree';
      case 4:
        return 'Doctorate';
      case 5:
        return 'PHD';
    }

     
  }

  getSalary(value){
     switch (value) {
      case 0:
        return 'Nothing';
      case 1:
        return '$0-$50,000';
      case 2:
        return '$50,000 - $100,000';
      case 3:
        return '$100,000 - $250,000';
      case 4:
        return '$250k+';
    
    }

     
  }

  getWorkExperience(value){
     switch (value) {
      case 0:
        return 'Nothing';
      case 1:
        return '0 - 2 Years';
      case 2:
        return '2 - 5 Years';
      case 3:
        return '5 - 10 Years';
      case 4:
        return '10+ Years';
    
    }

     
  }

    getEmploymentType(value){
     switch (value) {
      case 0:
        return 'Nothing';
      case 1:
        return 'Full-time (Contactor)';
      case 2:
        return '2 - 5 Years';
      case 3:
        return 'Part-time';
      case 4:
        return 'Part-time (Contactor)';
      case 5:
        return 'Intern';
    
    }

     
  }

  returnInfo(){
      console.log("got to returnInfo");

      var formData = {};

      formData = this.state.formData;
      
      formData["Education"] = this.getEducation(formData["Education"]);
      formData["BaseSalary"] = this.getSalary(formData["BaseSalary"]);
      formData["WorkExperience"] = this.getWorkExperience(this.state.formData["WorkExperience"]);
      formData["EmploymentType"] = this.getEmploymentType(this.state.formData["EmploymentType"]);

      return formData;

    }
 
  render() {

    const { formData, submitted } = this.state;
    return (
      <div>
        <div className="row" style={{marginBottom:"10px",marginTop:"50px",padding: "40px 0",}}>
          <div style={colStyle} className="col-md-6">
            <Section  containerSize={"100%"} >
                                <TextValidator
                                floatingLabelText="First Name"
                                onChange={this.handleChange}
                              
                                name="FirstName"
                                
                                value={formData.FirstName}
                                validators={['required', 'isString']}
                                errorMessages={['this field is required', 'Please enter your first name']}/>

                                <TextValidator
                                floatingLabelText="Last Name"
                                value={formData.LastName}
                                onChange={this.handleChange}
                                name="LastName"
                                
                                validators={['required', 'isString']}
                                errorMessages={['this field is required', 'Please enter your last name']}/>
                                <TextValidator
                                floatingLabelText="Phone Number"
                                
                                onChange={this.handleChange}
                                name="PhoneNumber"
                                value={formData.PhoneNumber}
                                validators={['required', 'isNumber','minStringLength:10','maxStringLength:10']}
                                errorMessages={['this field is required', 'Phone Number is not valid', 'Please enter a 10 digit phone number','Please enter a 10 digit phone number']}/>
                                <TextValidator
                                floatingLabelText="Email"
                                
                                onChange={this.handleChange}
                                name="Email"
                                 value={formData.Email}
                                validators={['required', 'isEmail']}
                                errorMessages={['this field is required', 'email is not valid']}/>

                                <SelectValidator

                                     name="WorkExperience"
                                      style={{marginTop:"25px", }}   
                                      labelStyle={{color:"rgba(0, 0, 0, 0.3) ",fontWeight: "700"}}
                                      value={formData.WorkExperience} onChange={this.handleWorkExperienceChange} 
                                       
                                       validators={['minNumber:1']}
                                errorMessages={['this field is required']}
                                                      SelectProps={{ native: true}}>
                                    <MenuItem value={0} primaryText="Work Experience needed" />
                                    <MenuItem value={1} primaryText="0 - 2 Years" />
                                    <MenuItem value={2} primaryText="2 - 5 Years" />
                                    <MenuItem value={3} primaryText="5 - 10 Years" />
                                    <MenuItem value={4} primaryText="10+ Years" />
                                   
                              </SelectValidator>

                               <SelectValidator
                                name="Education"
                                style={{marginTop:"25px", }} 
                                labelStyle={{color:"rgba(0, 0, 0, 0.3) ",fontWeight: "700"}}
                                value={formData.Education} onChange={this.handleEducationChange} 
                                
                                validators={['minNumber:1']}
                                errorMessages={['this field is required']}
                                SelectProps={{ native: true}}>

                              <MenuItem value={0} primaryText="Highest Education Completed" />
                              <MenuItem value={1} primaryText="High School Diploma" />
                              <MenuItem value={2} primaryText="Bachelors Degree" />
                              <MenuItem value={3} primaryText="Masters Degree" />
                              <MenuItem value={4} primaryText="Doctorate" />
                              <MenuItem value={5} primaryText="PHD" />
                  
                            </SelectValidator>

              </Section>
          </div>

          <div style={colStyle} className="col-md-6">
            <Section  containerSize={"100%"} >
             <TextValidator
                                floatingLabelText="Company Name"
                                onChange={this.handleChange}
                              
                                name="CompanyName"
                                
                                value={formData.CompanyName}
                                validators={['required', 'isString']}
                                errorMessages={['this field is required', 'please enter a valid company name']}/>

                                <TextValidator
                                floatingLabelText="Company Size"
                              

                                onChange={this.handleChange}
                                name="CompanySize"
                                value={formData.CompanySize}
                                validators={['required', 'isNumber','minNumber:1']}
                                errorMessages={['this field is required', 'Please enter a number','Please enter a number greater than zero']}/>
               <TextValidator
                                  floatingLabelText="Job Position"
                                  onChange={this.handleChange}
                                
                                  name="JobPosition"
                                  
                                  value={formData.JobPosition}
                                  validators={['required', 'isString']}
                                  errorMessages={['this field is required', 'please enter a valid job position']}/>

                                    <TextValidator
                                  floatingLabelText="Company Location"
                                  onChange={this.handleChange}
                                 
                                  name="CompanyLocation"
                                   
                                  value={formData.CompanyLocation}
                                  validators={['required', 'isString']}
                                  errorMessages={['this field is required', 'please enter a valid location']}/>
                                <SelectValidator
                                  name="EmploymentType"
                                                         
                                  value={formData.EmploymentType} onChange={this.handleEmploymentChange} 
                                    style={{marginTop:"25px",}}
                                    labelStyle={{color:"rgba(0, 0, 0, 0.3) ",fontWeight: "700"}}                        
                                  validators={['minNumber:1']}
                                  errorMessages={['this field is required']}
                                  SelectProps={{ native: true}}>
                                  <MenuItem value={0} primaryText="Employment Type" />
                                  <MenuItem value={1} primaryText="Full-time" />
                                  <MenuItem value={2} primaryText="Full-time (Contactor)" />
                                  <MenuItem value={3} primaryText="Part-time" />
                                  <MenuItem value={4} primaryText="Part-time (Contactor)" />
                                  <MenuItem value={5} primaryText="Intern" />
                                </SelectValidator>

                                <SelectValidator
                                    name="BaseSalary"
                                    style={{marginTop:"25px",}}
                                      value={formData.BaseSalary} onChange={this.handleSalaryChange} 
                                      labelStyle={{color:"rgba(0, 0, 0, 0.3) ",fontWeight: "700"}} 
                                     validators={['minNumber:1']}
                                errorMessages={['this field is required']}
                                SelectProps={{ native: true}}>
                                      <MenuItem value={0} primaryText="Salary Range" />
                                      <MenuItem value={1} primaryText="$0-$50,000" />
                                      <MenuItem value={2} primaryText="$50,000 - $100,000" />
                                      <MenuItem value={3} primaryText="$100,000 - $250,000" />
                                      <MenuItem value={4} primaryText="$250k+" />
                               </SelectValidator>

            

            </Section>
          </div>
          
        </div>
        
       
    

      

        <div className="row" style={{marginBottom:"20px"}}>
          <div style={colStyle} className="col-md-12">
            <Section  containerSize={"100%"} >
            <TextValidator
                                floatingLabelText="Summary"
                                onChange={this.handleChange}
                                style={{width:"85%"}}
                               rows={3} multiLine={true}
                                name="Summary"
                                hintText="Please Describe the role"
                                value={formData.Summary}
                                validators={['required', 'isString','minStringLength:10']}
                                errorMessages={['this field is required', 'Please enter a valid description','Please enter at least 100 characters']}/>
            </Section>
          </div>
          
        </div>

        <div className="row" style={{marginBottom:"20px"}}>
          <div style={colStyle} className="col-md-12">
            <Section  containerSize={"100%"} >
            <TextValidator
                                floatingLabelText="Key Responsibilities"
                                onChange={this.handleChange}
                                style={{width:"85%"}}
                               rows={3} multiLine={true}
                                name="KeyPoints"
                                hintText="List of Responsibilities for this role"
                                value={formData.KeyPoints}
                                validators={['required', 'isString','minStringLength:10']}
                                errorMessages={['this field is required', 'Please enter a valid description','Please enter at least 100 characters']}/>
            </Section>
          </div>
          
        </div>

       
       

        
        </div>
     
    );
  }
}

export default Info;
