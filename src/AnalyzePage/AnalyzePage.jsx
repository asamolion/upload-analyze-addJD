import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';



// Custom Components
import Header from "./components/Header";
import Progress from "./components/Progress/Progress";
import Section from "./components/Section";
import Info from "./components/Info";
import EducationContainer from "./components/Education/EducationContainer";
import EmploymentContainer from "./components/Employment/EmploymentContainer";
import RatedInputContainer from "./components/Ratings/RatedInputContainer";
import Expectation from "./components/Expectation";
import AttributeContainer from "./components/Attributes/AttributeContainer";

// Material-UI
import { deepOrange500 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

// Font


// Theme
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});

class AnalyzePage extends React.Component {
  render() {

    console.log("about to render ");
    return (
     <div style={{  overflowY: "scroll", maxHeight: "900px"}}>
      <MuiThemeProvider muiTheme={muiTheme}>
       
           <Section containerSize={100}>
            <Progress analyze={true} />
          </Section>
          <Section style={{marginTop: "15%", marginBottom: "15%"}} >
            <h2> Please confirm the following is correct </h2>
          </Section>
          <Section containerSize={100} heading="Personal Information">
            <Info formData={this.props.data}/>
          </Section>
          <Section containerSize={100} heading="Education">
            <EducationContainer formData={this.props.data}/>
          </Section>
          <Section containerSize={100} heading="Employment/Project">
            <EmploymentContainer formData={this.props.data}/>
          </Section>
          <Section containerSize={100} heading="Key Skills">
            <RatedInputContainer formData={this.props.data["Skills"]} defaultValues={["Python", "Java"]} />
          </Section>
          <Section containerSize={100} heading="Language">
            <RatedInputContainer formData={null} defaultValues={["English", "Spanish"]} />
          </Section>
          <Section containerSize={100} heading="Expectation">
            <Expectation formData={this.props.data} />
          </Section>
          <Section containerSize={100} heading="Patent">
            <AttributeContainer
              labels={[
                {
                  labelText: "Patent Name",
                  hintText: "Patent Name"
                },
                {
                  labelText: "Date",
                  hintText: "MM/DD/YYYY"
                }
              ]}
            />
          </Section>
          <Section containerSize={100} heading="Publication">
            <AttributeContainer
              labels={[
                {
                  labelText: "Conference / Journal Name",
                  hintText: "Conference / Journal Name"
                },
                {
                  labelText: "Date",
                  hintText: "MM/DD/YYYY"
                }
              ]}
            />
          </Section>
          <Section containerSize={100} heading="License and Certification">
            <AttributeContainer
              labels={[
                {
                  labelText: "Name",
                  hintText: "Name"
                },
                {
                  labelText: "Date",
                  hintText: "MM/DD/YYYY"
                }
              ]}
            />
          </Section>
       
      </MuiThemeProvider>
      </div>
      
    );
  }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    const data = state.addForm["data"][0];
    console.log("checking the mapStateToProps in analyze", data);
    return {
        loggingIn,
        data
    };
}


const connectedAnalyzePage = connect(mapStateToProps)(AnalyzePage);
export  { connectedAnalyzePage as AnalyzePage };
