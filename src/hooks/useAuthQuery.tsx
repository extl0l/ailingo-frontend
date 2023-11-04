import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect, useState } from "react";

type Props = {
	endpoint: string;
	method: "GET" | "POST" | "PUT" | "DELETE";
};

const useAuthQuery = ({ endpoint, method = "GET" }: Props) => {
	const [token, setToken] = useState<string | null>();

	const backendURL = import.meta.env.VITE_BACKEND_URL;

	const { getToken } = useAuth();

	useEffect(() => {
		getToken().then((token) => setToken(token));
	}, []);

	const queryUrl = backendURL + endpoint;

	const config = {
		url: queryUrl,
		method,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return {
		queryFn: axios.request.bind(null, config), // Declare funciton with arguments but not trigger it yet
	};
};

export default useAuthQuery;
