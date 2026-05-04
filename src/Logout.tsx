import { useAuth } from "@workos-inc/authkit-react";

export function Logout() {
  const { signOut } = useAuth();
  return (
    <button className="btn" onClick={signOut}>
      Log out
    </button>
  );
}
