import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

type Props = {
	endpoint: string;
	method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
	body?: unknown;
};

const useAuthQuery = <T>({ endpoint, method = "GET", body }: Props) => {
	const backendURL = import.meta.env.VITE_BACKEND_URL;

	const { getToken } = useAuth();

	const queryFn = async () => {
		const token = await getToken();

		const queryUrl = backendURL + endpoint;

		const config = {
			url: queryUrl,
			method,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			data: body,
		};

		return await axios.request<T>(config);
	};

	return {
		queryFn,
	};
};

export default useAuthQuery;
