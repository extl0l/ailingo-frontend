import { useState, useEffect } from "react";

const useKeyPress = (targetKey: string): boolean => {
	const [keyPressed, setKeyPressed] = useState(false);

	const downHandler = ({ key }: KeyboardEvent) => {
		if (key === targetKey) setKeyPressed(true);
	};

	const upHandler = ({ key }: KeyboardEvent) => {
		if (key === targetKey) setKeyPressed(false);
	};

	useEffect(() => {
		window.addEventListener("keydown", downHandler);
		window.addEventListener("keyup", upHandler);

		return () => {
			window.removeEventListener("keydown", downHandler);
			window.removeEventListener("keyup", upHandler);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [targetKey]);

	return keyPressed;
};

export default useKeyPress;
