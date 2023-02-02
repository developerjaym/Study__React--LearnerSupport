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
import { authentication } from "../../utility/authentication";
import LoadingSymbol from "../../dialog/loading/LoadingSymbol";

export default function Post({
  post,
  onAnswerCreated,
  articleId,
  onSelectOrDeselect,
}) {
  const [isFormOpen, setFormOpen] = useState(false);
  const [postState, setPostState] = useState(post);
  const [isAnswerFormOpen, setAnswerFormOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const countVotes = (votes) =>
    votes
      .map((vote) => vote.up)
      .reduce((pre, cur) => (cur ? pre + 1 : pre - 1), 0);
  const selectAsAnswer = async () => {
    setLoading(true);
    const result = await datasource.selectAnswer(articleId, postState.id);
    if (result) {
      setPostState({ ...postState, selected: true });
      onSelectOrDeselect();
    }
    setLoading(false);
  };
  const deselectAsAnswer = async () => {
    setLoading(true);
    const result = await datasource.deselectAnswer(articleId, postState.id);
    if (result) {
      setPostState({ ...postState, selected: false });
      onSelectOrDeselect();
    }
    setLoading(false);
  };
  const addComment = async (comment) => {
    setLoading(true);
    await datasource.addComment(articleId, postState.id, comment);
    setPostState({
      ...postState,
      comments: [...postState.comments],
    });
    setFormOpen(false);
    setLoading(false);
  };
  const onVote = (up) => async (e) => {
    setLoading(true);
    const voteResponse = await datasource.vote(articleId, postState.id, up);

    setPostState({
      ...postState,
      votes: [
        ...postState.votes.filter(
          (vote) => vote.author.username !== authentication.user.username
        ),
        voteResponse,
      ],
    });
    setLoading(false);
  };
  const disableSelect =
    !authentication.loggedIn || !datasource.isSelectable(articleId);
  const disableDeselect =
    !authentication.loggedIn ||
    !datasource.isDeselectable(articleId, postState.id);
  const disableUpvote =
    !authentication.loggedIn ||
    postState.votes
      .filter((vote) => vote.up)
      .some((vote) => vote.author.username === authentication.user.username);
  const disableDownvote =
    !authentication.loggedIn ||
    postState.votes
      .filter((vote) => !vote.up)
      .some((vote) => vote.author.username === authentication.user.username);

  return (
    <>
      <section
        className={`post ${
          countVotes(postState.votes) < 0 ? "post--downvoted" : ""
        }`}
      >
        <div className="post__upvotes">
          <button
            className="button upvotes--up"
            onClick={onVote(true)}
            disabled={disableUpvote}
          >
            ▲
          </button>
          <div className="upvotes__total">{countVotes(postState.votes)}</div>
          <button
            className="button upvotes--down"
            onClick={onVote(false)}
            disabled={disableDownvote}
          >
            ▼
          </button>
          {postState.selected ? <div className="selected">✅</div> : <></>}
        </div>
        <div className="post__body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {postState.content}
          </ReactMarkdown>
        </div>
        {postState.type === "QUESTION" ? (
          <button
            className="button action"
            onClick={(e) => {
              setAnswerFormOpen(true);
            }}
            disabled={!authentication.loggedIn}
          >
            +Add Answer
          </button>
        ) : postState.selected ? (
          <button
            className="button action"
            disabled={disableDeselect}
            onClick={(e) => deselectAsAnswer()}
          >
            ✓Deselect
          </button>
        ) : (
          <button
            className="button action"
            disabled={disableSelect}
            onClick={(e) => selectAsAnswer()}
          >
            ✓Select As Best Answer
          </button>
        )}
        <Author author={postState.author} postType={postState.type} />
        <div className="post__comments">
          {postState.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
          <button
            className="button"
            onClick={(e) => setFormOpen(true)}
            disabled={!authentication.loggedIn}
          >
            +Add Comment
          </button>
        </div>
        <Dialog
          key={`add-comment-${postState.id}`}
          open={isFormOpen}
          title={"Add Comment"}
          onCancel={() => setFormOpen(false)}
        >
          <CommentForm onSubmit={(result) => addComment(result)} />
        </Dialog>
        <Dialog
          key={`create-answer-${postState.id}`}
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
      <LoadingSymbol open={isLoading} />
    </>
  );
}
