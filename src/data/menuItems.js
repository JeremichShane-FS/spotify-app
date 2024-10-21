import { handleSignOut } from "../services/auth";

export const menuItems = [
  { label: "Account", onClick: () => {} },
  { label: "Profile", onClick: () => {} },
  { label: "Settings", onClick: () => {} },
  { label: "Log out", onClick: handleSignOut },
];
