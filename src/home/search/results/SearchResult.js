import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useNavigate } from "react-router-dom";
import remarkGfm from "remark-gfm";
import Card from "../../../card/Card";
import "./SearchResult.css";

export default function SearchResult({ article }) {
  const navigate = useNavigate();
  return (
    <Card
      title={article.title}
      subtitle={`Asked on ${new Date(
        article.timestamp
      ).toLocaleDateString()} by ${
        article.posts.find((post) => post.type === "QUESTION").author.username
      }`}
    >
      <div className="markdown-container preview">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {article.posts.find((post) => post.type === "QUESTION").content}
        </ReactMarkdown>
      </div>
      <button
        className="button"
        onClick={(e) => navigate(`/question/${article.id}`)}
      >
        Visit
      </button>
    </Card>
  );
}
