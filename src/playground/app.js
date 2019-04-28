// live-server public
// babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch

class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      options: []
    };
  }
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
  handleDeleteOptions() {
    // implicity returned objects from single line arrow functions need to be wrapped in ()
    this.setState(() => ({ options: [] }));
  }
  handleDeleteOption(optionToRemove) {
    this.setState((prevState) => ({
      // non-matches will stay, only match will be removed
      // set to false because we don't want to keep optionToRemove in the array
      options: prevState.options.filter((option) => optionToRemove !== option)
    }))
  }
  handlePick() {
    const randNum = Math.floor(Math.random() * this.state.options.length);
    const pick = this.state.options[randNum];
    console.log(pick);
  }
  handleAddOption(option) {
    if (!option) {
      return 'enter valid value';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'this already exists';
    }
    this.setState((prevState) => ({ options: prevState.options.concat(option)}));
  }
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

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      { props.subtitle && <h2>{props.subtitle}</h2> }
      </div>
  );
}

Header.defaultProps = {
  title: 'Indecision'
};

const Action = (props) => {
  return (
    <div>
      <button
        onClick={props.handlePick}
        disabled={!props.hasOptions}
      >
        What should i do?
      </button>
    </div>
  );
}


const Options = (props) => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>Remove All</button>
      { props.options.length === 0 && <p>Add an option to get started</p>}
      {
        props.options.map((option, i) => (
          <Option
            key={i}
            optionText={option}
            handleDeleteOption={props.handleDeleteOption}
          />
        ))
      }
    </div>
  );
}


const Option = (props) => {
  return (
    <div>
      {props.optionText}
      <button
        onClick={(e) => {
          props.handleDeleteOption(props.optionText);
        }}
      >
        remove
      </button>
    </div>
  );
}

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    }
  }
  handleAddOption(e) {
    e.preventDefault();

    const option = e.target.option.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => ({ error }));

    if (!error) {
      e.target.option.value = '';
    }

  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));