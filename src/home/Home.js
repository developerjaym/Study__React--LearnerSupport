import { useLoaderData, useSearchParams } from "react-router-dom";
import "./Home.css";
import SearchResult from "./search/results/SearchResult";

export default function Home() {
  let [searchParams] = useSearchParams();
  const normalize = (str) => str.toLowerCase().trim();
  const searchTerm = searchParams.has("term")
    ? normalize(searchParams.get("term"))
    : "";
  let articles = useLoaderData()

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
}
