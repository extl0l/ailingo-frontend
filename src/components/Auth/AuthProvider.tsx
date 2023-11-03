import { ClerkProvider } from "@clerk/clerk-react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const clerkPublishableKey = import.meta.env
    .VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

  if (!clerkPublishableKey) {
    throw "Missing VITE_REACT_APP_CLERK_PUBLISHABLE_KEY";
  }

  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      {children}
    </ClerkProvider>
  );
};

export default AuthProvider;
