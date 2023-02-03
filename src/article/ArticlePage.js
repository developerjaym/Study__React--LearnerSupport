import React from "react";
import { Await, useLoaderData } from "react-router-dom";
import LoadingSymbol from "../dialog/loading/LoadingSymbol";
import Article from "./Article";

export default function ArticlePage() {
  const data = useLoaderData();
  return (
    <React.Suspense fallback={<LoadingSymbol open={true} />}>
      <Await resolve={data.article} errorElement={<h1>Error loading all</h1>}>
        {(article) => {
          return <Article loadedArticle={article} />;
        }}
      </Await>
    </React.Suspense>
  );
}
