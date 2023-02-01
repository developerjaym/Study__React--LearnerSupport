import { useState } from "react";
import "./SignUpForm.css";

export default function SignUpForm({onSubmit}) {
    const [passwords, setPasswords] = useState(['', ''])
    const onFormSubmitted = async event => {
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(event.target));
        onSubmit(formData);
        event.target.reset()
    }
    return (
        <form className="form" onSubmit={onFormSubmitted}>
            <label className="form__label">
                <span className="label__text">Desired Username</span>
                <input minLength={5} className="form__input" name="username" autoComplete="new-username" required/>
            </label>
            <label className="form__label">
                <span className="label__text">Email</span>
                <input className="form__input" name="email" type="email" autoComplete="email" required/>
            </label>
            <label className="form__label">
                <span className="label__text">Password (6+ characters)</span>
                <input minLength={6} className="form__input" name="password" type="password" autoComplete="new-password" required onChange={e => setPasswords(passwords => {
                    passwords[0] = e.target.value;
                    return [...passwords];
                })}/>
            </label>
            <label className="form__label">
                <span className="label__text">Confirm Password</span>
                <input className="form__input" name="password" type="password" autoComplete="confirm-password" required onChange={e => setPasswords(passwords => {
                    passwords[1] = e.target.value;
                    return [...passwords];
                })}/>
            </label>
            <button type="submit" className="button button--submit" disabled={passwords[0] !== passwords[1]} title={`${passwords[0] !== passwords[1] ? 'Passwords do not match' : 'Submit form'}`}>Submit</button>
        </form>
    )
}