import "./Comment.css";

export default function Comment({ comment }) {
  return (
    <div className="comment">
      <div className="comment__body">{comment.content}</div>
      <div className="comment__metadata">
        <a className="comment__author">{comment.author.username}</a>
      </div>
    </div>
  );
}
