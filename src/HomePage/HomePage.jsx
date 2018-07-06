import React from "react";
import { connect } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import axios from "axios";
import RaisedButton from "material-ui/RaisedButton";
import Divider from "material-ui/Divider";
import { orange500, blue500, orange700 } from "material-ui/styles/colors";
import MenuItem from "material-ui/MenuItem";
import Checkbox from "material-ui/Checkbox";
import LinkedinSDK from "react-linkedin-sdk";
import "../_constants/stylesheets/filepicker.css";
import "dropzone/dist/min/dropzone.min.css";
import "../_constants/stylesheets/tooltip.css";
import { Icon } from "semantic-ui-react";
import {
  TextValidator,
  ValidatorForm,
  SelectValidator
} from "react-material-ui-form-validator";

import Section from "../AnalyzePage/components/Section";
import Progress from "../AnalyzePage/components/Progress/Progress";
import { BounceLoader } from "react-spinners";
import { history } from "../_helpers";
import Background from "../_constants/images/bluebackground.png";

import Paper from "material-ui/Paper";

import { userActions } from "../_actions";
import DropzoneComponent from "react-dropzone-component";

import FaLinkedinSquare from "react-icons/lib/fa/linkedin-square";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#72C4CC",
    primary2Color: orange700,
    accent1Color: orange700
  },
  appBar: {
    height: 50
  }
});

const styles = {
  bgi: {
    backgroundImage: "url(" + Background + ")",
    backgroundSize: "cover",
    height: "500px",
    zIndex: "-100",
    position: "relative"
  },
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
  },
  errorStyle: {
    color: orange500
  },
  textFieldRootStyle: {
    backgroundColor: "rgba(255,255,255,0.2)",
    height: "50px",
    margin: "25px 0"
  },
  textFieldInputStyle: {
    backgroundColor: "#F3F3F3",
    color: "black",
    padding: "0 10px 0",
    borderRadius: "25px"
  },
  textFieldUnderlineStyle: { display: "none" },
  floatingLabelStyle: {
    top: "30px",
    left: "10px"
  },
  floatingLabelFocusStyle: {
    color: blue500
  },
  selectFloatingLabelStyle: {
    top: "33px",
    left: "10px",
    fontSize: 21,
    maxWidth: "100%",
    marginTop: "20px",
    fontWeight: 700,
    borderRadius: 25
  },
  selectIconStyle: {
    top: 0
  },
  form1Style: {
    marginTop: "5%"
  },
  form2Style: {
    marginTop: "5%",
    marginLeft: "95px"
  },

  formInputStyle: {
    margin: "5px"
  },
  dropDown1: {
    borderRadius: "25px",
    marginBottom: "0px !important"
  },
  dropDown: {
    borderRadius: "25px",
    marginBottom: "-2 px !important"
  },
  checkbox1: {
    marginTop: "30px"
  },
  checkbox2: {
    marginTop: "30px",
    color: orange500
  },
  checkboxLabelStyle: {
    position: "relative",
    top: "3px",
    fontSize: "16px",
    fontWeight: "300",
    color: "#72C4CC"
  },
  checkboxIconStyle: {
    color: "#287784",
    fontSize: "30px"
  },
  dividerRow: {
    marginTop: "15%"
  },
  dropZone: {
    width: "100%",
    height: "00%",
    border: "1px solid orange",
    borderRadius: "5px",
    backgroundColor: "white"
  },
  iconStyles: {
    marginRight: 24
  },
  holder: {
    border: "none",
    borderRadius: "20px",
    backgroundColor: "#F6F6F6",
    minHeight: "160px",
    padding: "5px",
    textAlign: "center"
  },
  linkedInLink: {
    margin: "45px"
  },
  toolTipPaper: {
    height: 100,
    width: 100,
    margin: 20,
    textAlign: "center",
    display: "inline-block"
  },
  toolTipPopOver: {
    backgroundColor: "transparent",
    maxHeight: "60px",
    padding: "5px",
    textAlign: "center"
  },
  orStyle: {
    fontSize: "18px",
    color: "#ACACAC",
    marginTop: "7%",
    marginLeft: "2.5%",
    textAlign: "center"
  },
  linkedInIcon: {
    position: "relative",

    display: "inline-block",

    margin: "2.0em 0 1.5em 0",
    paddingLeftt: "45px"
  },
  linkStyle: {
    color: "black",
    marginBottom: "22px"
  },
  popOver: {
    margin: "5px",
    textAlign: "center",
    display: "inline-block"
  },
  analyzeButton: {
    margin: "0 auto",
    minWidth: "150px",
    position: "relative",
    left: "-20px",
    borderRadius: "25px"
  },
  analyzeButtonOverlay: {
    borderRadius: "25px"
  },
  singleField: {}
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleSalarySelect = this.handleSalarySelect.bind(this);
    this.handleCurrentStatusSelect = this.handleCurrentStatusSelect.bind(this);
    this.handleLocationSelect = this.handleLocationSelect.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.handleToolTipClick = this.handleToolTipClick.bind(this);
    this.handleToolTopClose = this.handleToolTopClose.bind(this);
    this.linkedInImport = this.linkedInImport.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addedFileCallback = this.addedFileCallback.bind(this);
    this.fileUploadedSuccess = this.fileUploadedSuccess.bind(this);
    this.removedFileCallback = this.removedFileCallback.bind(this);
    this.handleFormErrors = this.handleFormErrors.bind(this);
    this.responseLinkedin = this.responseLinkedin.bind(this);
    this.handleAnalyze = this.handleAnalyze.bind(this);
    this.onFileDrop = this.onFileDrop.bind(this);

    this.componentConfig = {
      iconFiletypes: [".pdf", ".doc", ".txt"],
      showFiletypeIcon: true,
      postUrl: "/uploadHandler"
    };

    this.djsConfig = {
      addRemoveLinks: true,
      params: {
        name: "testfile"
      },
      maxFiles: 1,
      dictDefaultMessage: "Drag and drop resume to upload",
      acceptedFiles: ".pdf,.doc,.docx,.txt"
    };

    this.eventHandlers = {
      // This one receives the dropzone object as the first parameter
      // and can be used to additional work with the dropzone.js
      // object
      init: null,
      // All of these receive the event as first parameter:
      drop: this.onFileDrop(),
      dragstart: null,
      dragend: null,
      dragenter: null,
      dragover: null,
      dragleave: null,
      // All of these receive the file as first parameter:
      addedfile: file => {
        this.addedFileCallback(file);
      },
      removedfile: file => {
        this.removedFileCallback(file);
      },
      thumbnail: null,
      error: null,
      processing: null,
      uploadprogress: null,
      sending: null,
      success: response => {
        this.fileUploadedSuccess(response);
      },
      complete: null,
      canceled: null,
      maxfilesreached: null,
      maxfilesexceeded: null,
      // All of these receive a list of files as first parameter
      // and are only called if the uploadMultiple option
      // in djsConfig is true:
      processingmultiple: null,
      sendingmultiple: null,
      successmultiple: null,
      completemultiple: null,
      canceledmultiple: null,
      // Special Events
      totaluploadprogress: null,
      reset: null,
      queuecomplete: null
    };

    this.state = {
      global_resumeID: "",
      global_fileput: false,
      isLinkedInLoggedIn: false,
      loading: false,
      salaryFloating: "Salary range",
      locationFloating: "Preferred Location",
      currentStatusFloating: "Current Status",
      stepIndex: 0,
      salary: -1,
      currentStatus: -1,
      preferredLocation: -1,
      relocationChecked: false,
      travelChecked: false,
      files: [],
      toolTipOpen: false,
      analyzeButtonDisabled: true,
      formData: {
        Name: "",
        Email: "",
        Mobile: "",
        salary: "",
        currentStatus: "",
        Location: "",
        relocationChecked: false,
        travelChecked: false
      },
      submitted: false
    };
  }
  onFileDrop() {
    this.setState({ loading: true });
  }

  componentDidMount() {
    this.props.dispatch(userActions.getAll());
    console.log("checking state", this.state);
  }

  handleDeleteUser(id) {
    return e => this.props.dispatch(userActions.delete(id));
  }

  handleSalarySelect(event, index, value) {
    const { formData } = this.state;

    if (value) {
      formData["salary"] = this.getSalary(value);
      //console.log("checking salary", formData[salary]);
      this.setState({ formData, salary: value });

      console.log("checking formdata salary", this.state.formData.salary);
      this.setState({ salaryFloating: " " });
    }
  }

  handleLocationSelect(event, index, value) {
    const { formData } = this.state;

    if (value) {
      formData["Location"] = this.getPreferredLocation(value);
      //console.log("checking preferredLocation", formData[preferredLocation]);

      this.setState({ formData, preferredLocation: value });
      this.setState({ locationFloating: " " });
    }
  }

  handleCurrentStatusSelect(event, index, value) {
    const { formData } = this.state;

    if (value) {
      formData["currentStatus"] = this.getCurrentStatus(value);
      console.log("checking currentStatus", formData["currentStatus"]);
      this.setState({ formData, currentStatus: value });
      this.setState({ currentStatusFloating: " " });
    }
  }

  responseLinkedin(response) {
    console.log("heres response from linkedIN:", JSON.stringify(response));
    this.setState({ loading: true });

    var obj = {};

    obj["Response"] = response;

    if (this.state.global_fileput) {
      console.log("there is a resume file");
      obj["ResumeID"] = this.state.global_resumeID;
    } else {
      obj["ResumeID"] = undefined;
    }

    axios.post("/linkedIn", obj).then(res => {
      console.log("checking result from linkedIN response", res.data);
      this.setState({
        loading: false,
        analyzeButtonDisabled: false,
        isLinkedInLoggedIn: true,
        global_resumeID: res.data
      });
      console.log("checking state global_resumeID", this.state.global_resumeID);
    });
  }

  handleNext() {
    console.log(this.state.stepIndex);
    if (this.state.stepIndex < 2) {
      this.setState({ stepIndex: this.state.stepIndex + 1 });
    }
  }

  handlePrev() {
    const { stepIndex } = this.state.stepIndex;
    if (stepIndex > 0) {
      this.setState({ stepIndex: this.state.stepIndex - 1 });
    }
  }

  relocationUpdateCheck(event) {
    const { formData } = this.state;
    formData[event.target.name] = !formData[event.target.name];

    this.setState({ formData });
  }

  travelUpdateCheck(event) {
    const { formData } = this.state;

    formData[event.target.name] = !formData[event.target.name];

    this.setState({ formData });
  }

  onDrop(acceptedFiles, rejectedFiles) {
    // do stuff with files...

    this.setState({ files: acceptedFiles });
  }

  handleToolTipClick(event) {
    event.preventDefault();
    this.setState({
      toolTipOpen: true,
      anchorEl: event.currentTarget
    });
  }

  handleToolTopClose() {
    this.setState({
      toolTipOpen: false
    });
  }

  linkedInImport() {
    console.log("imported resume");
    this.setState({ analyzeButtonDisabled: false });
  }

  handleChange(event) {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;

    if (
      event.target.name == "travelChecked" ||
      event.target.value == "relocationChecked"
    ) {
      formData[event.target.name] = !formData[event.target.name];
    }
    console.log("checking ", event.target.name, event.target.value);
    console.log("checking new formData ", formData);
    this.setState({ formData });
  }

  handleAnalyze() {
    const formData = this.state.formData;
    axios.post("analyze", { formData }).then(res => {
      console.log(
        "checking the data on client side for the GET request to analyze"
      );
      console.log(res.data);
      this.setState({ loading: false });

      this.props.dispatch(userActions.addComment(res.data));
      history.push("/analyze");
    });
  }
  handleSubmit(event) {
    event.preventDefault();

    const formData = this.state.formData;
    this.setState({ loading: true });
    this.setState({ analyzeButtonDisabled: true });

    axios.post("/contact", { formData }).then(res => {
      console.log(res);
      console.log(res.data);
      //this.setState({loading:false});
      //history.push('/analyze');
      this.handleAnalyze();
    });
  }

  addedFileCallback(file) {
    console.log("checking file", file);
    this.setState({ loading: true });
  }

  fileUploadedSuccess(response) {
    if (response.accepted) {
      console.log("checking result from uploadhandler response", response);

      axios
        .get("/getResumeID")

        .then(res => {
          console.log("checking result for getting back ResumeID", res.data);

          this.setState({
            loading: false,
            analyzeButtonDisabled: false,
            global_fileput: true,
            global_resumeID: res.data
          });
        });
    }
  }

  removedFileCallback(file) {
    this.setState({ analyzeButtonDisabled: true });
  }

  handleFormErrors(errors) {
    console.log("there were errors in the form ", errors);
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return "Upload file";
      case 1:
        return "Analyze and Review?";
      case 2:
        return "Submit file";
      default:
        return "You're a long way from home sonny jim!";
    }
  }

  getPreferredLocation(value) {
    switch (value) {
      case 0:
        return "Preferred Location";
      case 1:
        return "California";
      case 2:
        return "New York";
      case 3:
        return "Washington";
      case 4:
        return "Seattle";
    }
  }

  getSalary(value) {
    switch (value) {
      case 0:
        return "Salary Range";
      case 1:
        return "$0 - $50,000";
      case 2:
        return "$50,000 - $100,000";
      case 3:
        return "$100,000 - $250,0000";
      case 4:
        return "$250k+";
    }
  }

  getCurrentStatus(value) {
    switch (value) {
      case 0:
        return "Current Status";
      case 1:
        return "Part Time";
      case 2:
        return "Full Time";
      case 3:
        return "Contract";
      case 4:
        return "Unemployed";
    }
  }

  render() {
    const isLinkedInLoggedIn = this.state.isLinkedInLoggedIn;
    let linkedInApi;
    if (!isLinkedInLoggedIn) {
      linkedInApi = (
        <div style={styles.holder}>
          <div className="row">
            <FaLinkedinSquare
              style={styles.linkedInIcon}
              color="#0077B5"
              size={50}
            />
          </div>

          <div className="row" style={styles.linkStyle}>
            <LinkedinSDK
              clientId="863aiqifi703ql"
              callBack={this.responseLinkedin}
              fields=":(public-profile-url,positions)"
              className={"linkedin-sdk-button"}
              textButton={"Login with Linkedin"}
              buttonType={"button"}
              icon={<Icon />}
            />
          </div>
        </div>
      );
    } else {
      linkedInApi = (
        <div style={styles.holder}>
          <div className="row">
            <FaLinkedinSquare
              style={styles.linkedInIcon}
              color="#0077B5"
              size={50}
            />
          </div>

          <div className="row" style={styles.linkStyle} />
        </div>
      );
    }
    const { user, users } = this.props;
    const { stepIndex } = this.state;
    const { formData, submitted } = this.state;

    const contentStyle = { margin: "0 16px" };

    return (
      <div style={{}}>
        <div className="sweet-loading">
          <Section containerSize={1}>
            <Progress analyze={false} />
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
              <Section containerSize={1}>
                <h3 style={{ marginTop: "30px", color: "#72C4CC" }}>
                  {" "}
                  Please fill in the following{" "}
                </h3>
              </Section>

              <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => this.handleFormErrors(errors)}
              >
                <Section
                  style={{ marginBottom: "5%", margin: "0 auto" }}
                  containerSize={1}
                >
                  <MuiThemeProvider muiTheme={muiTheme}>
                    <div className="row" style={{ marginLeft: "5px" }}>
                      <div className="col-md-5" style={styles.form1Style}>
                        <TextValidator
                          floatingLabelText="Name"
                          onChange={this.handleChange}
                          floatingLabelStyle={styles.floatingLabelStyle}
                          fullWidth={true}
                          name="Name"
                          style={styles.textFieldRootStyle}
                          inputStyle={styles.textFieldInputStyle}
                          underlineStyle={styles.textFieldUnderlineStyle}
                          value={formData.Name}
                          validators={["required", "isString"]}
                          errorMessages={[
                            "this field is required",
                            "please enter a valid name"
                          ]}
                        />
                        <TextValidator
                          floatingLabelText="Phone Number"
                          floatingLabelStyle={styles.floatingLabelStyle}
                          onChange={this.handleChange}
                          style={styles.textFieldRootStyle}
                          inputStyle={styles.textFieldInputStyle}
                          underlineStyle={styles.textFieldUnderlineStyle}
                          fullWidth={true}
                          name="Mobile"
                          value={formData.Mobile}
                          validators={[
                            "required",
                            "isNumber",
                            "minStringLength:10",
                            "maxStringLength:10"
                          ]}
                          errorMessages={[
                            "this field is required",
                            "Phone Number is not valid",
                            "Please enter a 10 digit phone number",
                            "Please enter a 10 digit phone number"
                          ]}
                        />
                        <TextValidator
                          floatingLabelText="Email"
                          floatingLabelStyle={styles.floatingLabelStyle}
                          onChange={this.handleChange}
                          style={styles.textFieldRootStyle}
                          inputStyle={styles.textFieldInputStyle}
                          underlineStyle={styles.textFieldUnderlineStyle}
                          fullWidth={true}
                          name="Email"
                          value={formData.Email}
                          validators={["required", "isEmail"]}
                          errorMessages={[
                            "this field is required",
                            "email is not valid"
                          ]}
                        />
                        <Checkbox
                          checkedIcon={
                            <i
                              style={styles.checkboxIconStyle}
                              className="material-icons"
                            >
                              done
                            </i>
                          }
                          name="relocationChecked"
                          label="Accept relocation"
                          checked={formData.relocationChecked}
                          onCheck={this.relocationUpdateCheck.bind(this)}
                          style={styles.checkbox1}
                          labelStyle={styles.checkboxLabelStyle}
                        />
                      </div>

                      <div
                        className="col-md-5 col-md-offset-1"
                        style={styles.form2Style}
                      >
                        <SelectValidator
                          name="salaryselect"
                          floatingLabelText={this.state.salaryFloating}
                          value={this.state.salary}
                          onChange={this.handleSalarySelect}
                          floatingLabelStyle={styles.selectFloatingLabelStyle}
                          style={styles.textFieldRootStyle}
                          inputStyle={styles.textFieldInputStyle}
                          underlineStyle={styles.textFieldUnderlineStyle}
                          iconStyle={styles.selectIconStyle}
                          fullWidth={true}
                          validators={["minNumber:1"]}
                          errorMessages={["this field is required"]}
                          SelectProps={{ native: true }}
                        >
                          <MenuItem value={0} primaryText="Salary Range" />
                          <MenuItem value={1} primaryText="$0-$50,000" />
                          <MenuItem
                            value={2}
                            primaryText="$50,000 - $100,000"
                          />
                          <MenuItem
                            value={3}
                            primaryText="$100,000 - $250,000"
                          />
                          <MenuItem value={4} primaryText="$250k+" />
                        </SelectValidator>

                        <SelectValidator
                          name="currentstatusselect"
                          floatingLabelText={this.state.currentStatusFloating}
                          value={this.state.currentStatus}
                          onChange={this.handleCurrentStatusSelect}
                          floatingLabelStyle={styles.selectFloatingLabelStyle}
                          style={styles.textFieldRootStyle}
                          inputStyle={styles.textFieldInputStyle}
                          underlineStyle={styles.textFieldUnderlineStyle}
                          iconStyle={styles.selectIconStyle}
                          fullWidth={true}
                          validators={["minNumber:1"]}
                          errorMessages={["this field is required"]}
                        >
                          <MenuItem value={0} primaryText="Current Status" />
                          <MenuItem value={1} primaryText="Part Time" />
                          <MenuItem value={2} primaryText="Full Time" />
                          <MenuItem value={3} primaryText="Contract" />
                          <MenuItem value={4} primaryText="Unemployed" />
                        </SelectValidator>

                        <SelectValidator
                          name="preferredlocationselect"
                          floatingLabelText={this.state.locationFloating}
                          value={this.state.preferredLocation}
                          onChange={this.handleLocationSelect}
                          floatingLabelStyle={styles.selectFloatingLabelStyle}
                          style={styles.textFieldRootStyle}
                          inputStyle={styles.textFieldInputStyle}
                          underlineStyle={styles.textFieldUnderlineStyle}
                          iconStyle={styles.selectIconStyle}
                          fullWidth={true}
                          validators={["minNumber:1"]}
                          errorMessages={["this field is required"]}
                        >
                          <MenuItem
                            value={0}
                            primaryText="Preferred Location"
                          />
                          <MenuItem value={1} primaryText="California" />
                          <MenuItem value={2} primaryText="New York" />
                          <MenuItem value={3} primaryText="Washington" />
                          <MenuItem value={4} primaryText="Seattle" />
                        </SelectValidator>

                        <Checkbox
                          checkedIcon={
                            <i
                              style={styles.checkboxIconStyle}
                              className="material-icons"
                            >
                              done
                            </i>
                          }
                          name="travelChecked"
                          label="Willing to travel"
                          checked={formData.travelChecked}
                          onCheck={this.travelUpdateCheck.bind(this)}
                          style={styles.checkbox2}
                          labelStyle={styles.checkboxLabelStyle}
                        />
                      </div>
                    </div>
                  </MuiThemeProvider>
                </Section>

                <div
                  className="row"
                  style={{ paddingBottom: "50px" }}
                  id="question mark button goes here"
                />

                <Section style={{ marginBottom: "5%" }} containerSize={1}>
                  <div className="col-md-12 ">
                    <MuiThemeProvider muiTheme={muiTheme}>
                      <div
                        style={{
                          position: "fixed",
                          top: "50%",
                          left: "45%"
                        }}
                      >
                        <BounceLoader
                          color={"#F5A623"}
                          loading={this.state.loading}
                          size={120}
                        />
                      </div>

                      <Divider />
                    </MuiThemeProvider>
                  </div>
                </Section>
                <Section style={{ marginBottom: "5%" }} containerSize={1}>
                  <div className="col-md-5 ">
                    <DropzoneComponent
                      config={this.componentConfig}
                      eventHandlers={this.eventHandlers}
                      djsConfig={this.djsConfig}
                    />
                  </div>
                  <div className="col-md-1 " style={styles.orStyle}>
                    OR
                  </div>
                  <div className="col-md-5" style={{ marginLeft: "2.5%" }}>
                    {linkedInApi}
                  </div>
                </Section>

                <Section style={{ marginBottom: "5%" }} containerSize={1}>
                  <div className="col-md-1 col-md-offset-5">
                    <MuiThemeProvider muiTheme={muiTheme}>
                      <RaisedButton
                        className="rounded-button"
                        label="Analyze"
                        type="submit"
                        disabled={this.state.analyzeButtonDisabled}
                        Rounded={true}
                        style={styles.analyzeButton}
                        overlayStyle={styles.analyzeButtonOverlay}
                        primary={true}
                      />
                    </MuiThemeProvider>
                  </div>
                </Section>
              </ValidatorForm>
            </Paper>
          </Section>

          <Section containerSize={1} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

function CommentBoxDispatch(dispatch) {
  return {
    addComment: function(comment) {
      console.log("checking comment", comment);
      dispatch({
        type: "add_form",
        comment: comment
      });
    },
    setComments: function(data) {
      dispatch({
        type: "set_comments",
        data: data
      });
    }
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
