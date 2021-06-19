import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './components/HomeRoute'
import About from './components/AboutRoute'
import NotFound from './components/NotFoundRoute'
import State from './components/StateRoute'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/state/:code" component={State} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
