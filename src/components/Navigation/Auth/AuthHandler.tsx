import { useNavigate } from "react-router-dom";

const AuthHandler = () => {
	const navigate = useNavigate();

	const signinHandler = () => {
		navigate("/sign-in");
	};
	return (
		<>
			<button
				onClick={signinHandler}
				className="bg-theme-yellow-primary border-2 border-theme-yellow-primary text-theme-font-dark px-3.5 py-1.5  rounded-md ">
				Sign in
			</button>
		</>
	);
};

export default AuthHandler;
