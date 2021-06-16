// @flow
import React, { Suspense, PureComponent, Fragment } from "react";
import { Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import Loader from "../components/loader";

import { history } from "store";

import routes from "./routes";
import PublicRoute from "./Public";

class Routes extends PureComponent<RoutesProps> {
  render() {
    return (
      <Fragment>
        <ConnectedRouter history={history}>
          <Suspense fallback={<Loader />}>
            <Switch>
              {routes.map((route, i) => {
                return <PublicRoute key={i} {...route} />;
              })}
            </Switch>
          </Suspense>
        </ConnectedRouter>
      </Fragment>
    );
  }
}

export default Routes;
