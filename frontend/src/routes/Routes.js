import React, { Fragment, Suspense, lazy } from 'react'
import {Route, Switch} from 'react-router-dom';
const Home = lazy(() => import('../pages/Home'));
const GetDetailQuestion = lazy(() => import('../pages/GetDetailQuestion'));
const UpdateQuestion = lazy(() => import('../pages/UpdateQuestion'));
const CreateQuestion = lazy(() => import('../pages/CreateQuestion'));
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function Routes() {
  return (
    <Route
      render={({ }) => (
        <Suspense fallback={<div />}>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/detail-questions/:id" component={GetDetailQuestion} />
            <Route exact={true} path="/questions/:id" component={UpdateQuestion} />
            <Route exact={true} path="/create/question" component={CreateQuestion} />
            </Switch>
        </Suspense>
      )}
    />
  )
}

export default Routes
