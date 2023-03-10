import "./CommentForm.css";

export default function CommentForm({onSubmit, onCancel}) {
    const onFormSubmitted = event => {
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(event.target));
        onSubmit(formData);
        event.target.reset()
    }
    return (
        <form className="form" onSubmit={onFormSubmitted}>
            <label className="form__label">
                <span className="label__text">Comment</span>
                <textarea minLength={2} className="form__input" name="content" required></textarea>
            </label>
            <button type="submit" className="button button--submit">Submit</button>
        </form>
    )
}