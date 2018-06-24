import React, { Component } from "react";

const containerStyle = {
 marginLeft:"25px",
 marginRight:"25px",
  marginBottom: "5%",
};

const headingStyle = {
  fontSize: "20px",
  fontWeight: "700",
  color: "#666",
  marginBottom: "30px"
};

class Section extends Component {
  render() {
    return (
      <section style={containerStyle} >
        {this.props.heading ? (
          <h1 style={headingStyle}>{this.props.heading}</h1>
        ) : null}

        <div>{this.props.children}</div>
      </section>
    );
  }
}

export default Section;
