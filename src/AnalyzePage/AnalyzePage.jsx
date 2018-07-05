import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import axios from "axios";

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
import RaisedButton from "material-ui/RaisedButton";

import { BounceLoader } from "react-spinners";

// Font
import Paper from "material-ui/Paper";
import { history } from "../_helpers";
import Background from "../_constants/images/analyze.png";

// Theme
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});

const styles = {
  paperStyle: {
    position: "relative",
    marginTop: "10%",
    zIndex: "10",
    width: "100%",
    display: "inline-block",
    backgroundColor: "white",
    borderStyle: "solid",
    borderColor: "white",
    borderWidth: "2px"
  }
};

class AnalyzePage extends React.Component {
  constructor(props) {
    console.log("checking props", props);
    super(props);

    this.state = {
      formData: this.props.data,
      analyzeButtonDisabled: false,
      loading: false
    };

    console.log("checking Formmingngng", this.state.formData);

    this.handleAnalyze = this.handleAnalyze.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.convertLanguages = this.convertLanguages.bind(this);
  }

  convertLanguages(langs) {
    var newLangs = [];
    var emptyLang = {};

    langs.map((item, index) => {
      emptyLang = {
        LanguageType: item.Name,
        Level: item.Level
      };

      newLangs.push(emptyLang);
    });

    return newLangs;
  }

  getInfo() {
    this.setState({ loading: true, analyzeButtonDisabled: true });

    var data = {
      ResumeID: this.props.data["ResumeID"],
      Personal: this.InfoContainer.returnInfo(),
      Education: this.EducationContainer.returnInfo(),
      Employment: this.EmploymentContainer.returnInfo(),
      Skills: this.SkillsContainer.returnInfo(),
      Languages: this.convertLanguages(this.LanguagesContainer.returnInfo()),
      Patents: this.PatentsContainer.returnInfo(),
      Publications: this.PublicationsContainer.returnInfo(),
      Licenses: this.LicensesContainer.returnInfo()
    };
    console.log("checking FINAL DATA", data);

    if (this.props.data["ResumeID"] != "") {
      axios
        .post("/submitResult", { data })

        .then(res => {
          console.log(res);
          console.log(res.data);
          this.setState({ loading: false });
          history.push("/submit");
        });
    } else {
      history.goBack();
    }
  }

  handleAnalyze() {
    console.log(this.props.data);

    this.props.dispatch(userActions.addComment(this.props.data));
  }
  render() {
    return (
      <div style={{}}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Section containerSize={100}>
            <Progress analyze={true} />
          </Section>

          <Section
            containerSize={1}
            style={{
              background: "url(" + Background + ") no-repeat",
              backgroundSize: "cover",
              marginBottom: "5%"
            }}
          >
            <Paper style={styles.paperStyle} zDepth={5}>
              <Section
                containerSize={100}
                style={{
                  marginTop: "30px",
                  marginBottom: "30px",
                  color: "#72C4CC"
                }}
              />
              <Section containerSize={100} heading="Personal Information">
                <Info
                  onRef={ref => (this.InfoContainer = ref)}
                  formData={this.props.data["Personal"]}
                />
              </Section>
              <Section containerSize={100} heading="Education">
                <EducationContainer
                  onRef={ref => (this.EducationContainer = ref)}
                  formData={this.props.data["Education"]}
                />
              </Section>
              <Section containerSize={100} heading="Employment History">
                <EmploymentContainer
                  onRef={ref => (this.EmploymentContainer = ref)}
                  formData={this.props.data["Employment"]}
                />
              </Section>
              <Section containerSize={100} heading="Key Skills">
                <RatedInputContainer
                  onRef={ref => (this.SkillsContainer = ref)}
                  dataType="Skills"
                  formData={this.props.data["Skills"]}
                  defaultValues={["Python", "Java"]}
                />
              </Section>
              <Section containerSize={100} heading="Language">
                <RatedInputContainer
                  onRef={ref => (this.LanguagesContainer = ref)}
                  dataType="Languages"
                  formData={[]}
                  defaultValues={["English", "Spanish"]}
                />
              </Section>
              <Section containerSize={100} heading="Expectation">
                <Expectation
                  onRef={ref => (this.PreferenceContainer = ref)}
                  formData={this.props.data["Preference"]}
                />
              </Section>
              <Section containerSize={100} heading="Patent">
                <AttributeContainer
                  onRef={ref => (this.PatentsContainer = ref)}
                  formData={this.props.data["Patents"]}
                  labels={[
                    {
                      name: "Name",
                      labelText: "Patent Name",
                      hintText: "Patent Name"
                    },
                    {
                      name: "Date",
                      labelText: "Date",
                      hintText: "MM/DD/YYYY"
                    }
                  ]}
                />
              </Section>
              <Section containerSize={100} heading="Publication">
                <AttributeContainer
                  onRef={ref => (this.PublicationsContainer = ref)}
                  formData={this.props.data["Publications"]}
                  labels={[
                    {
                      name: "Name",
                      labelText: "Conference / Journal Name",
                      hintText: "Conference / Journal Name"
                    },
                    {
                      name: "Date",
                      labelText: "Date",
                      hintText: "MM/DD/YYYY"
                    }
                  ]}
                />
              </Section>
              <Section
                style={{ marginBottom: "5%" }}
                containerSize={100}
                heading="License and Certification"
              >
                <AttributeContainer
                  onRef={ref => (this.LicensesContainer = ref)}
                  formData={this.props.data["Licenses"]}
                  labels={[
                    {
                      name: "Name",
                      labelText: "License / Certifcation Name",
                      hintText: "License / Certifcation Name"
                    },
                    {
                      name: "Date",
                      labelText: "Date",
                      hintText: "MM/DD/YYYY"
                    }
                  ]}
                />
              </Section>

              <Section style={{ marginBottom: "5%", marginLeft: "25%" }}>
                <div className="col-md-1 col-md-offset-2">
                  <div
                    style={{
                      position: "fixed",
                      top: "90%",
                      left: "35%"
                    }}
                  >
                    <BounceLoader
                      color={"#F5A623"}
                      loading={this.state.loading}
                      size={120}
                    />
                  </div>

                  <RaisedButton
                    onClick={this.getInfo}
                    label="Submit"
                    type="submit"
                    Rounded={true}
                    style={{ borderRadius: "5px" }}
                    primary={true}
                  />
                </div>
              </Section>
            </Paper>
          </Section>
        </MuiThemeProvider>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  const emptyData = {
    ResumeID: "",
    Education: [{}],
    Employment: [{}],
    Personal: {
      Name: "",
      Email: "",
      Mobile: "",
      NativeTongue: "",
      Status: undefined,
      Location: ""
    },
    Preference: {
      JobStatus: undefined,
      PreferredLocation: undefined,
      Relocation: false,
      SalaryEnd: 0,
      SalaryStart: 0,
      Travel: false
    },
    Skills: [],
    Patents: [{}],
    Publications: [{}],
    Licenses: [{}]
  };

  const data = state.addForm["data"][0] ? state.addForm["data"][0] : emptyData;
  console.log("checking the mapStateToProps in analyze", data);
  return {
    loggingIn,
    data
  };
}

const connectedAnalyzePage = connect(mapStateToProps)(AnalyzePage);
export { connectedAnalyzePage as AnalyzePage };
