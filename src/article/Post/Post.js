import { useState } from "react";
import Dialog from "../../dialog/Dialog";
import Author from "./author/Author";
import Comment from "./comment/Comment";
import CommentForm from "./comment/form/CommentForm";
import "./Post.css";

export default function Post({ post }) {
  const [isFormOpen, setFormOpen] = useState(false);
  return (
    <section className={`post ${post.upvotes < 0 ? "post--downvoted" : ""}`}>
      <div className="post__upvotes">
        <div className="upvotes--up">▲</div>
        <div className="upvotes__total">{post.upvotes}</div>
        <div className="upvotes--down">▼</div>
        {post.selected ? <div className="selected">✅</div> : <></>}
      </div>
      <div className="post__body">
        {post.content}
        {/* TODO use markdown */}
      </div>
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
        key={post.id}
        open={isFormOpen}
        title={"Add Comment"}
        onCancel={() => setFormOpen(false)}
      >
        <CommentForm
          onSubmission={(result) => console.log("Got a result", result)}
        />
      </Dialog>
    </section>
  );
}
