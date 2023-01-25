import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useNavigate } from "react-router-dom";
import remarkGfm from "remark-gfm";
import Dialog from "../../../../dialog/Dialog";
import { datasource } from "../../../../utility/datasource";
import "./CreatePostForm.css";

export default function CreateQuestionForm() {
  const example = `
# GFM

## Autolink literals
    
www.example.com, https://example.com, and contact@example.com.
    
## Footnote
    
A note[^1]
    
[^1]: Big note.
    
## Strikethrough
    
~one~ or ~~two~~ tildes.
    
## Table
    
| a | b  |  c |  d  |
| - | :- | -: | :-: |
    
## Tasklist
    
* [ ] to do
* [x] done    `;
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const [value, setValue] = useState({});
  const navigate = useNavigate();
  const onSubmit = (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target));
    setPreviewOpen(true);
    setValue(formData);
    datasource.addArticle(formData)
    navigate("/")
  };
  return (
    <>
      <form className="form" onSubmit={onSubmit}>
        <span className="form__title">Create a Question</span>
        <label className="form__label">
          <span className="label__text">Title</span>
          <input className="form__input" name="title" />
        </label>
        <label className="form__label">
          <span className="label__text">Question</span>
          <textarea
            name="content"
            className="form__input form__input--tall"
            defaultValue={example}
          />
        </label>
        <button type="submit" className="button button--submit">
          Preview
        </button>
      </form>
      <Dialog
        open={isPreviewOpen}
        onCancel={() => setPreviewOpen(false)}
        title="Preview"
      >
        <div className="markdown-container">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{value.content}</ReactMarkdown>
        </div>
        <button
          className="button button--submit"
          onClick={(e) => console.log("submit?")}
        >
          Submit
        </button>
      </Dialog>
    </>
  );
}
