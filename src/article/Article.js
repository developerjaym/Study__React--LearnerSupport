import "./Article.css";
import ArticleHeader from "./header/ArticleHeader";
import Post from "./Post/Post";

export default function Article({ article }) {
  return (
    <article className="article">
      <ArticleHeader article={article} />
      <Post key="question" post={article.question} />
      {article.answers.map((answer) => (
        <Post key={"answer" + answer.id} post={answer} />
      ))}
    </article>
  );
}
