import { useAuth } from "@clerk/clerk-react";
import { SignedInScreen } from "./auth/SignedInScreen";
import SignedOutScreen from "./auth/SignedOutScreen";

export const HomePage = () => {
	const { isSignedIn } = useAuth();

	return isSignedIn ? <SignedInScreen /> : <SignedOutScreen />;
};
