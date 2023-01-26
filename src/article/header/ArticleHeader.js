import { useNavigate } from "react-router-dom";
import "./ArticleHeader.css";

export default function ArticleHeader({ article }) {
  const navigate = useNavigate();
  return (
    <header className="article__header">
      <h2 className="article__title">{article.title}</h2>
      <div className="article__metadata">
        <div className="article__date">
          Asked on {new Date(article.timestamp).toLocaleDateString()}
        </div>
        <div className="article__tags">
          {article.tags.map((tag) => (
            <div key={tag} className="tag" onClick={e => navigate(`/?term=${tag}`)}>
              {tag}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
