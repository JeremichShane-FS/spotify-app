import { AccountSVG, LogoutSVG, ProfileSVG, SettingsSVG } from "@/components/icons";
import { handleSignOut } from "@/services/auth";

const defaultOnClick = () => {};

export const menuItems = [
  { label: "Account", defaultOnClick, icon: <AccountSVG /> },
  { label: "Profile", defaultOnClick, icon: <ProfileSVG /> },
  { label: "Settings", defaultOnClick, icon: <SettingsSVG /> },
  { label: "Log out", onClick: handleSignOut, icon: <LogoutSVG /> },
];
