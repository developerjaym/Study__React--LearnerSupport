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
      posts: [...article.posts],
    });
  };
  return (
    <article className="article">
      <ArticleHeader article={article} />
      <Post
        key="question"
        articleId={article.id}
        post={article.posts.find(post => post.type==='QUESTION')}
        onAnswerCreated={onAnswerCreated}
      />
      {article.posts.filter(post => post.type === 'ANSWER').map((answer) => (
        <Post key={"answer" + answer.id} post={answer} articleId={article.id}/>
      ))}
    </article>
  );
}
