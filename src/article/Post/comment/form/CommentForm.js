import "./CommentForm.css";

export default function CommentForm({onSubmission, onCancel}) {
    const onSubmit = event => {
        // TODO replace with yup, formik
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(event.target));
        onSubmission(formData);
    }
    return (
        <form onSubmit={onSubmit}>
            <label className="form__label">
                <span className="label__text">Comment</span>
                <input className="form__input" name="content"/>
            </label>
            <button type="submit" className="button">Submit</button>
        </form>
    )
}