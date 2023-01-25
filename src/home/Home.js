import { datasource } from "../utility/datasource";
import "./Home.css";
import SearchResult from "./search/results/SearchResult";

export default function Home() {
  const articles = datasource.getAll();
  return (
    <div className="page">
      {articles.map((article) => (
        <SearchResult key={article.id} article={article}/>
      ))}
    </div>
  );
}
