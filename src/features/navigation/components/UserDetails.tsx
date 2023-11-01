import {useClerk, UserButton, useUser} from '@clerk/clerk-react';
import {useMemo} from 'react';
import Avatar from 'boring-avatars';
import IconExperiencePoints
  from '../assets/keyboard_double_arrow_up_FILL0_wght400_GRAD0_opsz24.svg';

export const UserDetails = () => {
  const clerk = useClerk();
  const {user, isSignedIn} = useUser();

  const displayName = useMemo(() => {
    if (user) {
      return user.firstName ?? user.username ?? user.id;
    }
    return 'Anonymous';
  }, [user]);

  const handleUserAvatarClick = () => {
    if (isSignedIn) {
      clerk.openUserProfile();
    } else {
      clerk.openSignIn();
    }
  };

  return (
      <div className="flex items-center gap-4">
        {user
            ? <SignedInUserButton/>
            : <SignedOutUserButton onClick={handleUserAvatarClick}/>}
        <div className="font-medium">
          <p className="text-2xl">
            {displayName}
          </p>
          <p className="flex items-center text-theme-orange-light">
            <img className="-ml-1" src={IconExperiencePoints} alt=""/>
            <span>5921 XP</span>
          </p>
        </div>
      </div>
  );
};

const SignedInUserButton = () => {
  return (
      <UserButton
          appearance={{
            elements: {
              userButtonTrigger: 'w-16 h-16',
              avatarBox: 'w-16 h-16 bg-blue-500',
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
          onClick={props.onClick}>
        <Avatar
            size={64}
            variant="beam"
            name="Anonymous"
            colors={['#60B99A', '#F1EFA5', '#D3CE3D', '#F77825', '#554236']}
            square
        />
      </button>
  );
};

