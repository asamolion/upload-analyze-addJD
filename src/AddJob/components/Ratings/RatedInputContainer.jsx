import React, { Component } from "react";

import { deepOrange500 } from "material-ui/styles/colors";
import AutoComplete from "material-ui/AutoComplete";
import RaisedButton from "material-ui/RaisedButton";

import RatedInput from "./RatedInput";

const col8Style = {
  marginLeft: "0"
};

class RatedInputContainer extends Component {


    constructor(props) {
        super(props);

      

          this.state = {
    dataSource: [],
    currentAddition: "",
    inputs: this.props.defaultValues.map(value => ({
      name: value
    }))
  }

  this.autoCompleteUpdateHandler = this.autoCompleteUpdateHandler.bind(this);
  this.addSkill = this.addSkill.bind(this);
  this.removeSkillHandler = this.removeSkillHandler.bind(this);
}


  autoCompleteUpdateHandler(value){
    this.setState({
      dataSource: [value, value + value, value + value + value],
      currentAddition: value
    });
  }

  addSkill(name) {
    this.setState({
      inputs: [...this.state.inputs, { name }]
    });
  };

  removeSkillHandler (name){
    this.setState({
      inputs: this.state.inputs.filter(current => current.name !== name)
    });
  };

  render() {
    return (
      <div>
        <div className="row">
          <div style={col8Style} className="col-md-12">
            {this.state.inputs.map(current => (
              <div key={current.name} className="col-md-12">
                <RatedInput
                  name={current.name}
                  removeHandler={this.removeSkillHandler}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="row">
          <AutoComplete
            name="Add"
            style={{marginLeft: "30px"}}
            dataSource={this.state.dataSource}
            onUpdateInput={this.autoCompleteUpdateHandler}
          />
          <RaisedButton
            label="Add"
            backgroundColor={deepOrange500}
            onClick={() => {
              this.addSkill(this.state.currentAddition);
            }}
            buttonStyle={{
              borderRadius: "25px"
            }}
            style={{
              borderRadius: "25px",
              margin: "10px",
              maxHeight: "32px"
            }}
            labelStyle={{
              position: "relative",
              top: "5px"
            }}
          />
        </div>
      </div>
    );
  }
}

export default RatedInputContainer;
