import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { datasource } from "../utility/datasource";
import "./Article.css";
import ArticleHeader from "./header/ArticleHeader";
import Post from "./post/Post";

export default function Article() {
  const loadedArticle = useLoaderData();
  const [article, setArticle] = useState(loadedArticle);
  const onAnswerCreated = (answer) => {
    answer = datasource.addAnswer(article.id, answer);
    setArticle({
      ...article,
      answers: [...article.answers],
    });
  };
  return (
    <article className="article">
      <ArticleHeader article={article} />
      <Post
        key="question"
        post={article.question}
        onAnswerCreated={onAnswerCreated}
      />
      {article.answers.map((answer) => (
        <Post key={"answer" + answer.id} post={answer} />
      ))}
    </article>
  );
}
