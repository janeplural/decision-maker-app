class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleMinus = this.handleMinus.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      count: 0
    }
  }
  componentDidMount() {
    // fetching data
    try {
      const json = localStorage.getItem('count');
      const count = parseInt(json, 10);

      if (!ifNaN(count)) {
        this.setState(() => ({count}));
      }
    } catch (e) {
      // do nothing
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      // saving data
      localStorage.setItem('count', this.state.count);
    }
  }
  handleAdd() {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  }
  handleMinus() {
    if (this.state.count > 0) {
      this.setState((prevState) => ({ count: prevState.count - 1 }));
    }
  }
  handleReset() {
    this.setState(() => ({ count: 0 }));    
  }

  render() {
    return (
    <div>
      <h1>Count: {this.state.count}</h1>
      <button onClick={this.handleAdd}>+ 1</button>
      <button onClick={this.handleMinus}>- 1</button>
      <button onClick={this.handleReset}>Reset</button>
    </div>
    );
  }
}

ReactDOM.render(<Counter />, document.getElementById('app'));