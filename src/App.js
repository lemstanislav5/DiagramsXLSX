import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import LeftContainer from './components/LeftContainer/LeftContainer';
import RightContainer from './components/RightContainer/RightContainer';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <div className="container-fluid">
            <div className="row">
              <LeftContainer />
              <RightContainer />
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}