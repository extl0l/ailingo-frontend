import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
const AddCours = () => {
	return (
		<Link to={"/courses/new"} className="relative w-11">
			<PlusCircleIcon className="w-full fill-theme-blue-tertiary z-10 absolute  left-0 top-0 -translate-y-1/2" />
			<div className="bg-theme-blue-light w-7 h-7 rounded-full absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-0"></div>
		</Link>
	);
};

export default AddCours;
