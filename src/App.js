import React from 'react';
import './App.css';
// import AutoComplete from './AutoComplete';
import AutoCompleteAlt from './AutoCompleteAlt';
import AutoComplete from './AutoComplete';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


// exampleFunction = () => {
//   const res = await fetch("https://coding-challenge.echoandapex.com/locations?q=pdx")
//   const json = await res.json()
//   const predictionsList = new DocumentFragment()
//   json.predictions.forEach(prediction => {
//     const item = document.createElement("p")
//     item.innerHTML = prediction.name
//     predictionsList.appendChild(item)
//   })
//   document.body.appendChild(predictionsList)
// })()




function App() {
  return (
    <div className="App">
          <Router>
      <div>
        <nav>
          <ul className="navigation-container">
              <Link className="navigation" to="/">Design 1</Link>
              <Link className="navigation" to="/design2">Design 2</Link>
          </ul>
        </nav>
        <Switch>
          <Route path="/design2">
            <AutoCompleteAlt />
          </Route>
          <Route path="/">
            <AutoComplete />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;
