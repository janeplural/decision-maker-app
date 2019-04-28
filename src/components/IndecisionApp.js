import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';

export default class IndecisionApp extends React.Component {
  state = {
    options: []
  };
  componentDidMount() {
    // fetching data
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
  
      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) {
      // do nothing
    }

  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      // saving data
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }
  handleDeleteOptions = () => {
    // implicity returned objects from single line arrow functions need to be wrapped in ()
    this.setState(() => ({ options: [] }));
  };
  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
      // non-matches will stay, only match will be removed
      // set to false because we don't want to keep optionToRemove in the array
      options: prevState.options.filter((option) => optionToRemove !== option)
    }))
  };
  handlePick = () => {
    const randNum = Math.floor(Math.random() * this.state.options.length);
    const pick = this.state.options[randNum];
    console.log(pick);
  };
  handleAddOption = (option) => {
    if (!option) {
      return 'enter valid value';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'this already exists';
    }
    this.setState((prevState) => ({ options: prevState.options.concat(option)}));
  };
  render() {
    const subtitle = 'Put your life in the hands of a computer.';

    return (
      <div>
        <Header subtitle={subtitle} />
        <Action
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption
          handleAddOption={this.handleAddOption}
        />
      </div>
    );
  }
}