const AuthHandler = () => {
	const signinHandler = () => {};
	return (
		<>
			<button
				onClick={signinHandler}
				className="bg-theme-yellow-primary border-2 border-theme-yellow-primary text-theme-font-dark px-3.5 py-1.5 text-sm rounded-md  font-[400]">
				Sign in
			</button>
		</>
	);
};

export default AuthHandler;
