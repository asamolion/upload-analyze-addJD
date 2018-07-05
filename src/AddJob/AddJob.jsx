import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from 'axios';
import { grey500 } from "material-ui/styles/colors";
// Custom Components
import Header from "./components/Header";
import Progress from "./components/Progress/Progress";
import Section from "./components/Section";
import Info from "./components/Info";
import CheckBoxes from "./components/CheckBoxes";
import EducationContainer from "./components/Education/EducationContainer";
import EmploymentContainer from "./components/Employment/EmploymentContainer";
import RatedInputContainer from "./components/Ratings/RatedInputContainer";
import Expectation from "./components/Expectation";
import AttributeContainer from "./components/Attributes/AttributeContainer";
import Checkbox from "material-ui/Checkbox";
import MenuItem from "material-ui/MenuItem";
import { TextValidator, ValidatorForm, SelectValidator} from 'react-material-ui-form-validator';
import RaisedButton from 'material-ui/RaisedButton';
import { BounceLoader } from 'react-spinners';

const checkBoxStyles = {
  margin: "5px 20px",
  height: "48px"
};

const checkboxLableStyles = {
  color: grey500
};

// Material-UI
import { deepOrange500 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import Paper from 'material-ui/Paper';
import { history } from '../_helpers';
import Background from '../_constants/images/analyze.png';

// Font



const colStyle = {
  boxSizing: "border-box",
  
  diplay: "flex",
  marginTop: "25px",
};
const col2Style = {
  boxSizing: "border-box",
  marginLeft: "70px",
  paddingRight:"50px",
  marginTop: "15px",
  diplay: "flex",
  width:"71%",
};

const styles = {
paperStyle: {
    marginLeft:"10%",
     position: 'relative',
     marginTop:"10%",
     zIndex: "10",
     
      display: 'inline-block',
      backgroundColor: 'white',
      
       borderStyle: "solid",
    
      borderColor: "white",
      borderWidth: "2px",
      
 },
};


// Theme
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});

class AddJob extends React.Component {

    constructor(props) {

        console.log("checking props",props);
    super(props);
    

    this.state = {
      
      submitButtonDisabled: false,
      loading:false,

    }

    console.log("checking Formmingngng",this.state.formData);

  
    this.handleSubmit = this.handleSubmit.bind(this);
   
    this.convertToArray = this.convertToArray.bind(this);
    this.handleFormErrors = this.handleFormErrors.bind(this);
    this.makePost = this.makePost.bind(this);
    this.goBack = this.goBack.bind(this);

  }

    convertToArray(langs){
    var newLangs = [];

    langs.map((item, index) => {

        

         newLangs.push(item.Name);
          });

    return newLangs;
  }

 makePost(obj){

       axios.post('/submitJD', obj)
      .then(res => {
        
        console.log("checking result from submit JD response", res.data);
         this.setState({loading: false, submitButtonDisabled:false});
         history.push('/submit');
         
      

        
       
      })
 }

  handleSubmit(){

    var obj = {};
    this.setState({loading: true, submitButtonDisabled:true});


    var skills = this.convertToArray(this.SkillsContainer.returnInfo());
    var info = this.InfoContainer.returnInfo();
    var langs = this.convertToArray(this.LanguagesContainer.returnInfo());
    var checks = this.CheckBoxesContainer.returnInfo();


    console.log("pre flat check", skills, info, langs, checks);

    // info.map((item, index) => {
    //      obj.push(item);
    // });

    // checks.map((item, index) => {
    //      obj.push(item);
    // });

    for(var key in info) {
    obj[key] = info[key]
}
for(var key in checks) {
    obj[key] = checks[key]
}
    obj["Language"] = JSON.stringify(langs);
    obj["RequiredSkills"] = JSON.stringify(skills);

  this.makePost(obj);








    
  }

  goBack(event){
    event.preventDefault();

    history.push('/');
  }


handleFormErrors(errors){
  console.log("there were errors in the form ",errors);
}



  render() {

    console.log("about to render ");
    return (
     <div style={{ }}>
      <MuiThemeProvider muiTheme={muiTheme}>
      <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => this.handleFormErrors(errors)}>
       <Section style={{marginBottom:"5%",marginTop:"2.5%",marginLeft:"10%",}} containerSize={"85%"}>

             <a> <h4 onClick={this.goBack} style={{color:"#38ACB7"}}> &larr; Job Description </h4>  </a>
          </Section>
        <Section containerSize={"85%"} style={{background: "url(" + Background + ") no-repeat", marginTop:"-5px",marginBottom:"5%" }} >
           
           <Paper style={styles.paperStyle} zDepth={5}> 
          
            
            
             
            
         
            

             
              <Section style={{marginLeft:"5%"}} containerSize={"85%"} heading="">

                <Info onRef={ref => (this.InfoContainer = ref)} />
              </Section>

              
              <Section containerSize={"80%"} heading="Required Skills">

                <RatedInputContainer onRef={ref => (this.SkillsContainer = ref)} dataType="Skills" formData={[]} defaultValues={["Python", "Java"]} />
              </Section>
              <Section containerSize={"80%"} heading="Required Languages">
                <RatedInputContainer  onRef={ref => (this.LanguagesContainer = ref)} dataType="Languages" formData={[]} defaultValues={["English", "Spanish"]} />
              </Section>
              <Section containerSize={"80%"} heading="Compensation">
                <CheckBoxes onRef={ref => (this.CheckBoxesContainer = ref)}/>
              </Section>

              <Section style={{marginBottom:"5%",marginTop:"5%",marginLeft: "25%",}}>
                <div className="col-md-1 col-md-offset-2" >
                <div style={{ position:"fixed",
                  top: "90%",
                  left: "45%"}} >
                                    <BounceLoader
                                    color={'#F5A623'} 
                                    loading={this.state.loading}
                                    size={120} />
                                      </div>
                    
                        <RaisedButton  disabled={this.state.submitButtonDisabled} label="Submit" type="submit"  Rounded={true} style={{borderRadius: "5px", }} primary={true}  />
                       
                  
                </div>
            </Section>
              
           
          
           
         

        
         </Paper>
        </Section>

        </ValidatorForm>
      </MuiThemeProvider>
      </div>
      
    );
  }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}


const connectedAddJob = connect(mapStateToProps)(AddJob);
export  { connectedAddJob as AddJob };
