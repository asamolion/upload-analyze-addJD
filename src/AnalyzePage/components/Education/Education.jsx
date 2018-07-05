import React, { Component } from "react";

import { grey400 } from "material-ui/styles/colors";

import InputField from "../InputField";

const dottedContainer = {
  position: "relative",
  border: "1px solid #72C4CC",
  borderRadius: "25px",
  padding: "40px 10px 30px",
  margin: "10px 0",
  overflow: "hidden"
};

const iconStyle = {
  color: grey400,
  cursor: "pointer",
  display: "block",
  position: "absolute",
  top: "0",
  right: "0"
};

class Education extends Component {
  constructor(props) {
    super(props);

    var data;

    this.handleChange = this.handleChange.bind(this);
    this.returnInfo = this.returnInfo.bind(this);
    this.getDate = this.getDate.bind(this);

    if (this.props.data.Institution) {
      data = {
        DegreeType: this.props.data.DegreeType,
        GraduationDate: this.getDate(),
        Institution: this.props.data.Institution,
        Major: this.props.data.Major
      };
    } else {
      data = {
        DegreeType: "",
        GraduationDate: "",
        Institution: "",
        Major: ""
      };
    }

    this.state = {
      formData: data
    };

    console.log("checking Formmingngng", this.state.formData);
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  handleChange(event) {
    const { formData } = this.state;

    formData[event.target.name] = event.target.value;

    this.setState({ formData });
  }

  returnInfo() {
    console.log("got to returnInfo in education", this.props.number);
    return this.state.formData;
  }

  getDate() {
    var ret;

    this.props.data.GraduationDate
      ? (ret = new Date(this.props.data.GraduationDate)
          .getFullYear()
          .toString())
      : (ret = new Date().getFullYear().toString());
    console.log("checking ret in getDate", ret);
    return ret;
  }
  render() {
    return (
      <div style={dottedContainer} className="col-12">
        {this.props.number > 0 ? (
          <i
            style={iconStyle}
            className="material-icons"
            onClick={this.props.closeHandler}
          >
            cancel
          </i>
        ) : null}

        <div className="col-md-6">
          <InputField
            name="Institution"
            onChangeValue={this.handleChange}
            labelText="Institution"
            hintText={this.props.data.Institution}
          />
        </div>
        <div className="col-md-6">
          <InputField
            name="Major"
            onChangeValue={this.handleChange}
            labelText="Major"
            hintText={this.props.data.Major}
          />
        </div>
        <div className="col-md-6">
          <InputField
            name="DegreeType"
            onChangeValue={this.handleChange}
            labelText="Degree"
            hintText={this.props.data.DegreeType}
          />
        </div>
        <div className="col-md-6">
          <InputField
            name="GraduationDate"
            onChangeValue={this.handleChange}
            labelText="Graduation Year"
            hintText={this.getDate()}
          />
        </div>
      </div>
    );
  }
}

export default Education;
