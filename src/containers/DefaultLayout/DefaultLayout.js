import React, { Component, Suspense, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppFooter,
  AppHeader,
  AppBreadcrumb2 as AppBreadcrumb,
} from '@coreui/react';
// routes config
import routes from '../../routes';

const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  constructor(props){
    super(props);
    this.state={
        data_username:'Username'
    }

    this.signIn=this.signIn.bind(this);
    this.refreshCompontent = this.refreshCompontent.bind(this);
  }

  signOut(e) {
    this.userData = "";
    localStorage.clear();
    e.preventDefault()

    this.props.history.push('/login');
    // window.location.reload();
  }

  signIn(e) {
    e.preventDefault();
    this.userData = localStorage.getItem("userData");
    console.log("Hello this is working");
  }

  refreshCompontent = (value) => {
      localStorage.setItem('com_update', true);
      this.forceUpdate();
 }


  render() {
    return (
      <div className="app">
        <AppHeader fixed className="border-bottom-0">
          <Suspense  fallback={this.loading()}>


          <DefaultHeader className="top-navbar" onLogout={e=>this.signOut(e)} onChangeHeaderOfficeId={e=>this.refreshCompontent(e)}/>

          </Suspense>
        </AppHeader>
        <div className="app-body">
          <main className="main mt-xs-4">
            {/* <AppBreadcrumb appRoutes={routes} router={router}/> */}
            <Container fluid className="pt-2">
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (

                      <Route
                        key={idx}

                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props } userSignIn={e=>this.signIn(e)}
                          />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/login" />
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
        {/* <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter> */}
      </div>
    );
  }
}

export default DefaultLayout;
