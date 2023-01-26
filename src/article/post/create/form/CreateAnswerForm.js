import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Dialog from "../../../../dialog/Dialog";
import "./CreatePostForm.css";

export default function CreateAnswerForm({onSubmit}) {
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
  const onReadyToPreview = (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target));
    setPreviewOpen(true);
    setValue(formData);
  };
  return (
    <>
      <form className="form" onSubmit={onReadyToPreview}>
        <label className="form__label">
          <span className="label__text">Answer</span>
          <textarea
            name="content"
            className="form__input form__input--tall"
            defaultValue={example}
            required
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
          <ReactMarkdown>{value.content}</ReactMarkdown>
        </div>
        <button
          className="button button--submit"
          onClick={(e) => onSubmit(value)}
        >
          Submit
        </button>
      </Dialog>
    </>
  );
}
