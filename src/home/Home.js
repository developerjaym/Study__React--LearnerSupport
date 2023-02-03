import React from "react";
import { Await, useLoaderData, useSearchParams } from "react-router-dom";
import LoadingSymbol from "../dialog/loading/LoadingSymbol";
import "./Home.css";
import SearchResult from "./search/results/SearchResult";

export default function Home() {
  let [searchParams] = useSearchParams();
  const normalize = (str) => str.toLowerCase().trim();
  const searchTerm = searchParams.has("term")
    ? normalize(searchParams.get("term"))
    : "";
  let data = useLoaderData();

  return (
    <React.Suspense fallback={<LoadingSymbol open={true} />}>
      <Await resolve={data.all} errorElement={<h1>Error loading all</h1>}>
        {(articles) => {
          articles = articles.filter(
            (article) =>
              normalize(article.title).includes(normalize(searchTerm)) ||
              normalize(
                article.posts.find((post) => post.type === "QUESTION").content
              ).includes(normalize(searchTerm)) ||
              article.tags.map(normalize).includes(normalize(searchTerm))
          );
          return (
            <div className="page page--search-results">
              <div className="search-results">
                {articles.map((article) => (
                  <SearchResult key={article.id} article={article} />
                ))}
              </div>
            </div>
          );
        }}
      </Await>
    </React.Suspense>
  );
}
