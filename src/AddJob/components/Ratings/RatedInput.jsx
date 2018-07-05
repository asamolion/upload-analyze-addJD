import React, { Component } from "react";

import { deepOrange500, grey300, grey500 } from "material-ui/styles/colors";

import RatingElement from "./RatingElement";

const nameSectionStyle = {
  borderBottom: "1px solid",
  borderColor: grey300,
  position: "relative"
};

const nameStyle = {
  color: "#666",
  fontSize: "14px"
};

const closeIconStyle = {
  color: grey500,
  cursor: "pointer",
  fontSize: "16px",
  position: "absolute",
  right: "0",
  textAlign: "right"
};

const ratingSectionStyle = {
  paddingTop: "10px"
};

const controlButtonStyle = {
  color: grey500,
  cursor: "pointer",
  fontSize: "20px",
  float: "right",
  padding: "5px 10px"
};

class RatedInput extends Component {



   constructor(props) {
        super(props);

        // reset login status
      

        this.state = {
    rating: parseInt(this.props.number),
    ratingArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  };

        
        this.addRating = this.addRating.bind(this);
        this.removeRating = this.removeRating.bind(this);
        this.ratingHandler = this.ratingHandler.bind(this);
        this.controlButtonOnMouseOver = this.controlButtonOnMouseOver.bind(this);
        this.controlButtonOnMouseOut = this.controlButtonOnMouseOut.bind(this);
        this.returnInfo = this.returnInfo.bind(this);
    }

componentDidMount(){
    this.props.onRef(this);
  }
   returnInfo(){

    return this.state.rating;
   }

  addRating(evt) {
    let rating = this.state.rating + 1;
    if (rating > 10) rating = 10;
    this.setState({
      rating
    });
  };

  removeRating (evt) {
    let rating = this.state.rating - 1;
    if (rating < 1) rating = 1;
    this.setState({
      rating
    });
  };

  ratingHandler (rating) {
    this.setState({
      rating
    });
  };

  controlButtonOnMouseOver (evt) {
    evt.target.innerHTML += "_circle";
    evt.target.style.color = deepOrange500;
  };

  controlButtonOnMouseOut (evt) {
    evt.target.innerHTML = evt.target.innerHTML.split("_")[0];
    evt.target.style.color = grey500;
  };

  render() {
    return (
      <div>
        <section style={nameSectionStyle}>
          <span style={nameStyle}>{this.props.name}</span>
          <i
            style={closeIconStyle}
            className="material-icons"
            onClick={() => this.props.removeHandler(this.props.name,this.props.index)}
          >
            close
          </i>
        </section>
       
      </div>
    );
  }
}

export default RatedInput;
