import React, { useState, useEffect } from "react";
import { useTransition, animated } from "react-spring";

const imageSets = {
	pour: ["./pour/pour1.png", "./pour/pour2.png", "./pour/pour3.png"],
	qwerty: [
		"./qwerty/qwerty1.png",
		"./qwerty/qwerty2.png",
		"./qwerty/qwerty3.png",
	],
};

const fadeDuration = 3000;

function ImageTransition({ images }) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	console.log("Loading images:", images);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
		}, fadeDuration * 2);
		return () => clearInterval(interval);
	}, [images]);

	const transitions = useTransition(currentImageIndex, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		config: {
			duration: fadeDuration,
		},
	});

	return (
		<header style={{ position: "relative", width: "100%", height: "400px" }}>
			{transitions((style, item) => (
				<animated.img
					src={images[item]}
					alt={""} // removed the redundancy in alt text as per eslint warning
					style={{
						border: "2px solid red",
						...style,
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						zIndex: 0,
					}}
				/>
			))}
		</header>
	);
}

function App() {
	return (
		<div className="App">
			<h1>Test Content</h1>
			<ImageTransition images={imageSets.pour} />
			<ImageTransition images={imageSets.qwerty} />
			{/* Add more <ImageTransition /> components for other image sets as needed */}
		</div>
	);
}

export default App;
