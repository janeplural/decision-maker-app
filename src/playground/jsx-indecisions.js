console.log('app.js is running');

const app = {
  title: 'this is the title',
  subtitle: 'this is the subtitle',
  options: [],
};

const onFormSubmit = (e) => {
  e.preventDefault();

  const option = e.target.option.value;
  if (option) {
    app.options.push(option);
    e.target.option.value = '';
  }
  renderApp();
};

// remove all button above list
// on click -> wipe options array -> rerender
const onRemoveAllOptions = () => {
  app.options = [];
  renderApp();
};

const onMakeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length);
  const option = app.options[randomNum];
  console.log(option);
};

const appRoot = document.getElementById('app');

const renderApp = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{app.options.length > 0 ? 'Here are your options' : 'There are no options'}</p>
      <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
      <button onClick={onRemoveAllOptions}>Remove All</button>
      <ol>
      {
        /* map over app.options getting back an array of lis (set key and text) */
        app.options.map((option, i) => <li key={i}>{option}</li>)
      }
        <form onSubmit={onFormSubmit}>
          <input type="text" name="option"/>
          <button>Add Option</button>
        </form>
      </ol>
    </div>
  );
  ReactDOM.render(template, appRoot);
}

renderApp();

// commands for local
// live-server public
// babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch