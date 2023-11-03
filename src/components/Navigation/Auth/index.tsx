import Profile from "./Profile";
import AuthHandler from "./AuthHandler";
import { useAuth } from "@clerk/clerk-react";

const User = () => {
	const { isSignedIn } = useAuth();

	return <div>{isSignedIn ? <Profile /> : <AuthHandler />}</div>;
};

export default User;
