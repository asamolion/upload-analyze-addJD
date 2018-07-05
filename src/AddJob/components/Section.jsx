import React, { Component } from "react";

const containerStyle = {
  maxWidth: "100%",

  position:"relative",
  zIndex:"100",
 
};
const containerStyle2 = {
  maxWidth: "85%",
  
  position:"relative",
  zIndex:"100",
};

const headingStyle = {
  fontSize: "16px",
  fontWeight: "700",
  color: "rgba(0,0,0,0.3)",
  marginBottom: "50px"
};

function getContainerStyle(size){

  var containerstyle = {
    maxWidth: size,
    poisition: "relative",
    zIndex: "100",
  }
  if (size){
    return containerstyle;
  }
  else return containerStyle;
}

class Section extends Component {
  render() {
    return (
      <div style={this.props.style}>
      <section style={getContainerStyle(this.props.containerSize)} className="container">
        {this.props.heading ? (
          <h1 style={headingStyle}>{this.props.heading}</h1>
        ) : null}

        <div>{this.props.children}</div>
      </section>
      </div>
    );
  }
}

export default Section;
