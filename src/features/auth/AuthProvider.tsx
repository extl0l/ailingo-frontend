import { ClerkProvider } from "@clerk/clerk-react";
import { PropsWithChildren } from "react";

const AuthProvider = (props: PropsWithChildren<object>) => {
  const clerkPublishableKey = import.meta.env
    .VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;
  if (!clerkPublishableKey) {
    throw "Missing VITE_REACT_APP_CLERK_PUBLISHABLE_KEY";
  }

  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      {props.children}
    </ClerkProvider>
  );
};

export default AuthProvider;
