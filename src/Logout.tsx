import { useAuth0 } from "@auth0/auth0-react";

export function Logout() {
  const { logout } = useAuth0();

  return (
    <button
      className="btn btn-blue"
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log out
    </button>
  );
}
