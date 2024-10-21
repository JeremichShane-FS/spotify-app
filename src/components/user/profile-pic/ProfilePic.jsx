import { useSession } from "next-auth/react";
import Image from "next/image";

import "./ProfilePic.scss";

export default function ProfilePic() {
  const { data: session, status } = useSession();
  const defaultImage = "/images/default-profile-pic.jpg";

  if (status === "authenticated") {
    return (
      <Image
        src={session?.user?.image || defaultImage}
        alt={session?.user?.name || "User Profile Picture"}
        title={session?.user?.name || "User Profile Picture"}
        height={40}
        width={40}
        onError={e => {
          e.target.onerror = null; // Prevents infinite loop if fallback image also fails
          e.target.src = defaultImage;
        }}
        className="profile-pic"
      />
    );
  }
}
