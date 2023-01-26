import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import Dialog from "../../dialog/Dialog";
import Author from "./author/Author";
import Comment from "./comment/Comment";
import CommentForm from "./comment/form/CommentForm";
import CreateAnswerForm from "../post/create/form/CreateAnswerForm";
import "./Post.css";
import { datasource } from "../../utility/datasource";

export default function Post({ post, onAnswerCreated }) {
  const [isFormOpen, setFormOpen] = useState(false);
  const [postState, setPostState] = useState(post);
  const [isAnswerFormOpen, setAnswerFormOpen] = useState(false);
  const selectAsAnswer = () => {
    datasource.selectAnswer(post.id);
    setPostState({ ...postState, selected: true });
  };
  const deselectAsAnswer = () => {
    datasource.deselectAnswer(post.id);
    setPostState({ ...postState, selected: false });
  };
  return (
    <section className={`post ${post.upvotes < 0 ? "post--downvoted" : ""}`}>
      <div className="post__upvotes">
        <div className="upvotes--up">▲</div>
        <div className="upvotes__total">{post.upvotes}</div>
        <div className="upvotes--down">▼</div>
        {post.selected ? <div className="selected">✅</div> : <></>}
      </div>
      <div className="post__body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
      {post.type === "QUESTION" ? (
        <button
          className="button action"
          onClick={(e) => {
            setAnswerFormOpen(true);
          }}
        >
          +Answer
        </button>
      ) : post.selected ? (
        <button className="button action" onClick={(e) => deselectAsAnswer()}>
          ✓Deselect
        </button>
      ) : (
        <button className="button action" onClick={(e) => selectAsAnswer()}>
          ✓Select As Best Answer
        </button>
      )}
      <Author author={post.author} postType={post.type} />
      <div className="post__comments">
        {post.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
        <button className="button" onClick={(e) => setFormOpen(true)}>
          +Add Comment
        </button>
      </div>
      <Dialog
        key={`add-comment-${post.id}`}
        open={isFormOpen}
        title={"Add Comment"}
        onCancel={() => setFormOpen(false)}
      >
        <CommentForm
          onSubmit={(result) => console.log("Got a result", result)}
        />
      </Dialog>
      <Dialog
        key={`create-answer-${post.id}`}
        open={isAnswerFormOpen}
        title="Answer"
        onCancel={() => setAnswerFormOpen(false)}
      >
        <CreateAnswerForm
          onSubmit={(val) => {
            setAnswerFormOpen(false);
            onAnswerCreated(val);
          }}
        />
      </Dialog>
    </section>
  );
}
