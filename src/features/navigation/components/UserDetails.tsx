import { useAuth, useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useMemo } from "react";
import Avatar from "boring-avatars";
import IconExperiencePoints from "../assets/keyboard_double_arrow_up_FILL0_wght400_GRAD0_opsz24.svg";
import { useQuery } from "@tanstack/react-query";
import { backendClient } from "../../_shared/api/backendClient.ts";

export const UserDetails = () => {
  const clerk = useClerk();
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();

  const displayName = useMemo(() => {
    if (user) {
      return user.firstName ?? user.username ?? user.id;
    }
    return "Anonymous";
  }, [user]);

  const handleUserAvatarClick = () => {
    if (isSignedIn) {
      clerk.openUserProfile();
    } else {
      clerk.openSignIn();
    }
  };

  const queryRecentStudySessions = useQuery({
    queryKey: ["recent-study-sessions"],
    queryFn: async () => {
      const response = await backendClient.get("/me/study-sessions", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      return response.data;
    },
  });
  const studiedSetsCount = queryRecentStudySessions.data?.length;

  return (
    <div className="flex items-center gap-4 ">
      {user ? (
        <SignedInUserButton />
      ) : (
        <SignedOutUserButton onClick={handleUserAvatarClick} />
      )}
      <div className="font-medium">
        <p className="text-2xl">{displayName}</p>
        {studiedSetsCount !== undefined && (
          <p className="flex items-center text-theme-orange-light">
            <img className="-ml-1" src={IconExperiencePoints} alt="" />
            <span>
              {studiedSetsCount} set{studiedSetsCount === 1 ? "" : "s"}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

const SignedInUserButton = () => {
  return (
    <UserButton
      appearance={{
        elements: {
          userButtonTrigger: "w-16 h-16",
          avatarBox: "w-16 h-16 bg-blue-500",
        },
      }}
    />
  );
};

interface AnonymousUserButtonProps {
  onClick?: () => void;
}

const SignedOutUserButton = (props: AnonymousUserButtonProps) => {
  return (
    <button
      className="w-16 h-16 rounded-full overflow-hidden"
      onClick={props.onClick}
    >
      <Avatar
        size={64}
        variant="beam"
        name="Anonymous"
        colors={["#60B99A", "#F1EFA5", "#D3CE3D", "#F77825", "#554236"]}
        square
      />
    </button>
  );
};
