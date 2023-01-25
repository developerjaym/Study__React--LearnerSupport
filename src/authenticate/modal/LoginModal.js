import Dialog from "../../dialog/Dialog";
import LoginForm from "../form/login/LoginForm";

export default function LoginModal({ open, onSuccess, onCancel }) {
  return (
    <Dialog title="Login" open={open} onCancel={onCancel}>
      <LoginForm onSubmit={onSuccess}/>
    </Dialog>
  );
}