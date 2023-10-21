import React from "react";

type Props = {
	children: React.ReactNode;
};

const PhoneContainer = ({ children }: Props) => {
	return <div>{children}</div>;
};

export default PhoneContainer;
