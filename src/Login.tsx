import { useAuth } from "@workos-inc/authkit-react";

export default function Login() {
  const { signIn } = useAuth();
  return (
    <button className="btn" onClick={signIn}>
      Sign in
    </button>
  );
}
