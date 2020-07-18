import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { configureStore } from '../src/store';
import { Provider } from 'react-redux'
import './App.scss';

const store = configureStore()

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Core Pages
const Login = React.lazy(() => import('./views/Core/Login'));
class App extends Component {

  render() {
    return (
      <Provider store={store}>
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
            </Switch>
          </React.Suspense>
      </HashRouter>
      </Provider>
    );
  }
}


export default App;
