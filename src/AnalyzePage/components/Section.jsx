import React, { Component } from "react";

const containerStyle = {
  maxWidth: "75%",
  marginBottom: "5%",
};
const containerStyle2 = {
  maxWidth: "85%",
  marginBottom: "5%",
};

const headingStyle = {
  fontSize: "20px",
  fontWeight: "700",
  color: "#666",
  marginBottom: "30px"
};

function getContainerStyle(size){
  if (size){
    return containerStyle2;
  }
  else return containerStyle;
}

class Section extends Component {
  render() {
    return (
      <section style={getContainerStyle(this.props.containerSize)} className="container">
        {this.props.heading ? (
          <h1 style={headingStyle}>{this.props.heading}</h1>
        ) : null}

        <div>{this.props.children}</div>
      </section>
    );
  }
}

export default Section;
