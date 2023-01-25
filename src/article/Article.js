import { useLoaderData } from "react-router-dom";
import "./Article.css";
import ArticleHeader from "./header/ArticleHeader";
import Post from "./post/Post";

export default function Article() {
  const article = useLoaderData();
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
