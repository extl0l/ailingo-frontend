import { useAuth } from "@clerk/clerk-react";

const Profile = () => {
	const { signOut } = useAuth();

	return (
		<div>
			Profile <div onClick={() => signOut()}>logout</div>
		</div>
	);
};

export default Profile;
