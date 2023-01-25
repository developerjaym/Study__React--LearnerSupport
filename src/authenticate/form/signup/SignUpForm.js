import "./SignUpForm.css";

export default function SignUpForm({onSubmit}) {
    const onFormSubmitted = event => {
        // TODO replace with yup, formik
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(event.target));
        onSubmit(formData);
    }
    return (
        <form className="form" onSubmit={onFormSubmitted}>
            <label className="form__label">
                <span className="label__text">Desired Username</span>
                <input className="form__input" name="username" autoComplete="new-username"/>
            </label>
            <label className="form__label">
                <span className="label__text">Password</span>
                <input className="form__input" name="password" type="password" autoComplete="new-password"/>
            </label>
            <label className="form__label">
                <span className="label__text">Confirm Password</span>
                <input className="form__input" name="password" type="password" autoComplete="confirm-password"/>
            </label>
            <button type="submit" className="button button--submit">Submit</button>
        </form>
    )
}