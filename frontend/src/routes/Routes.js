import React, { Fragment, Suspense, lazy } from 'react'
import {Route, Switch} from 'react-router-dom';
const Home = lazy(() => import('../pages/Home'));
const GetDetailQuestion = lazy(() => import('../pages/GetDetailQuestion'));
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function Routes() {
  return (
    <Route
      render={({ }) => (
        <Suspense fallback={<div />}>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/detail-questions/:id" component={GetDetailQuestion} />
            </Switch>
        </Suspense>
      )}
    />
  )
}

export default Routes
