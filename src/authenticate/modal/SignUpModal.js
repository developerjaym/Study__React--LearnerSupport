import Dialog from "../../dialog/Dialog";
import SignUpForm from "../form/signup/SignUpForm";

export default function SignUpModal({ open, onSuccess, onCancel }) {
  return (
    <Dialog title="Sign Up" open={open} onCancel={onCancel}>
      <SignUpForm onSubmit={onSuccess} />
    </Dialog>
  );
}