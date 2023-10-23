import { useState } from "react";
import Profile from "./Profile";
import AuthHandler from "./AuthHandler";

const User = () => {
	const [isLoggedIn] = useState(false); //* Only for testing without clerk

	return <div>{isLoggedIn ? <Profile /> : <AuthHandler />}</div>;
};

export default User;
