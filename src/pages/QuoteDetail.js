import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import React, { Fragment, useEffect } from "react";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import { getSingleQuote } from "../lib/api";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../components/ui/LoadingSpinner";
const QuoteDetail = () => {
  const params = useParams();
  const match = useRouteMatch();

  const { quoteId } = params; //lean for passed as params to useEffect

  const { sendRequest, status, data: loadedQuote, error } = useHttp(getSingleQuote, true);
  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <p className="centered">{error}</p>;
  }
  if (status === "completed" && !loadedQuote.text) {
    return <p>Quote Not Found!</p>;
  }

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            see comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        {/* <Route path={`/quotes/${params.quoteId}/comments`}> */}
        <Comments />
      </Route>
    </Fragment>
  );
};
export default QuoteDetail;
