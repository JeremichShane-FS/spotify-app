import { SIGNUP } from "@/constants/paths";
import Link from "next/link";
import "./SignUp.scss";

export default function SignUp() {
  return (
    <Link href={SIGNUP} className="signup-button">
      Sign Up
    </Link>
  );
}
