import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// import AllQuote from "./pages/AllQuotes";
// import NewQuote from "./pages/NewQuote";
// import QuoteDetail from "./pages/QuoteDetail";
import Layout from "./components/layout/Layout";
// import NotFound from "./pages/NotFound";
import LoadingSpinner from "./components/ui/LoadingSpinner";

const NewQuote = React.lazy(() => import("./pages/NewQuote"));
const AllQuote = React.lazy(() => import("./pages/AllQuotes"));
const QuoteDetail = React.lazy(() => import("./pages/QuoteDetail"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" exact>
            <AllQuote />
          </Route>
          <Route path="/quotes/:quoteId">
            <QuoteDetail />
          </Route>
          <Route path="/new-quote">
            <NewQuote />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
