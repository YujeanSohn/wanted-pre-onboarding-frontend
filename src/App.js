import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./routes/Home";
import Todos from "./routes/Todos";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/todo">
          <Todos/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
