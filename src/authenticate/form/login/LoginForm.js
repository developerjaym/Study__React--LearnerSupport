import "./LoginForm.css";

export default function LoginForm({onSubmit}) {
    const onFormSubmitted = event => {
        // TODO replace with yup, formik
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(event.target));
        onSubmit(formData);
        event.target.reset()
    }
    return (
        <form className="form" onSubmit={onFormSubmitted}>
            <label className="form__label">
                <span className="label__text">Username</span>
                <input className="form__input" name="username" autoComplete="current-username" required/>
            </label>
            <label className="form__label">
                <span className="label__text">Password</span>
                <input required className="form__input" name="password" type="password" autoComplete="current-password"/>
            </label>
            <button type="submit" className="button button--submit">Submit</button>
        </form>
    )
}