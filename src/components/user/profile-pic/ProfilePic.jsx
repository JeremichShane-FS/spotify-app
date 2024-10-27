import { useSession } from "next-auth/react";
import Image from "next/image";

import "./ProfilePic.scss";

const FallbackInitials = ({ name }) => {
  const initials =
    name
      ?.split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase() || "?";

  return <div className="profile-pic-fallback">{initials}</div>;
};

export default function ProfilePic() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    if (!session?.user?.image) {
      return <FallbackInitials name={session?.user?.name} />;
    }

    return (
      <div className="profile-pic-wrapper">
        <Image
          src={session.user.image}
          alt={session.user.name || "User Profile Picture"}
          title={session.user.name || "User Profile Picture"}
          height={40}
          width={40}
          className="profile-pic"
        />
      </div>
    );
  }

  return null;
}
