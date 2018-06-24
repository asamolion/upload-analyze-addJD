import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


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

// Theme
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});

class AddJob extends React.Component {
  render() {

    console.log("about to render ");
    return (
     <div style={{ maxHeight: "1200px",  overflowY: "scroll",}}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={{maxWidth: "1100px", maxHeight: "1200px",  overflowY: "scroll",}}>
           <div class="row">
            
            <div style={colStyle} className="col-md-1">
             <div style={{ width: "100%" }}>
                <div style={{ "border": "1px solid orange","marginLeft":"20px","marginTop":"10px", "borderRadius": "500px", "width": "100px", "color": "orange", "padding": "30px 10px 10px 10px","lineHeight": "15px", "fontWeight": "bold", "height": "100px", "display": "flex", "alignitems": "center", "textAlign": "center" }}>
                  Upload Logo
              </div>
              </div>
            </div>
             
             <div style={col2Style} className="col-md-8">

            

             
              <Section heading="">

                <Info />
              </Section>
              
              <Section heading="Required Skills">
                <RatedInputContainer defaultValues={["Python", "Java"]} />
              </Section>
              <Section heading="Language">
                <RatedInputContainer defaultValues={["English", "Spanish"]} />
              </Section>
              <Section heading="Compensation">
                <CheckBoxes/>
              </Section>
              
            </div>

            <div style={colStyle} className="col-md-1">
             <div style={{ width: "100%" }}>
                <div style={{ "display": "none","marginLeft":"20px","marginTop":"10px", "borderRadius": "500px", "width": "100px", "color": "orange", "padding": "30px 10px 10px 10px","lineHeight": "15px", "fontWeight": "bold", "height": "100px", "display": "flex", "alignitems": "center", "textAlign": "center" }}>
                  
              </div>
              </div>
            </div>


         </div>
        </div>
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
