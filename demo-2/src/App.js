import React from 'react';
import ReactDom from 'react-dom';

const App = () => {
  return (
    <div>
      <h3>Hello, React11111!</h3>
    </div>
  );
}

export default App;
ReactDom.render(<App />, document.getElementById('app'))