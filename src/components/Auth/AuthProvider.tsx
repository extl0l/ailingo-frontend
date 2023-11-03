import { ClerkProvider } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

type Props = {
	children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
	const navigate = useNavigate();

	const clerkPublishableKey = import.meta.env
		.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

	if (!clerkPublishableKey) {
		throw "Missing VITE_REACT_APP_CLERK_PUBLISHABLE_KEY";
	}

	return (
		<ClerkProvider
			navigate={(to) => navigate(to)}
			publishableKey={clerkPublishableKey}>
			{children}
		</ClerkProvider>
	);
};

export default AuthProvider;
