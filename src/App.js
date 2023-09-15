import React, { useState, useEffect } from "react";
import { useTransition, animated } from "react-spring";

const imageGroups = {
	pour: [
		`${process.env.PUBLIC_URL}/pour/pour1.png`,
		`${process.env.PUBLIC_URL}/pour/pour2.png`,
		`${process.env.PUBLIC_URL}/pour/pour3.png`,
	],
	qwerty: [
		`${process.env.PUBLIC_URL}/qwerty/qwerty1.png`,
		`${process.env.PUBLIC_URL}/qwerty/qwerty2.png`,
		`${process.env.PUBLIC_URL}/qwerty/qwerty3.png`,
	],
	stein: [
		`${process.env.PUBLIC_URL}/stein/stein1.png`,
		`${process.env.PUBLIC_URL}/stein/stein2.png`,
		`${process.env.PUBLIC_URL}/stein/stein3.png`,
		`${process.env.PUBLIC_URL}/stein/stein4.png`,
	],
};

const fadeDuration = 2000;

function PreloadImages() {
	return (
		<div style={{ display: "none" }}>
			{Object.values(imageGroups)
				.flat()
				.map((src, index) => (
					<img
						key={index}
						src={src}
						alt={`preload-image-${index}`}
					/>
				))}
		</div>
	);
}

function AnimatedImage({ group, positionTop }) {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % imageGroups[group].length);
		}, fadeDuration * 2);

		return () => clearInterval(interval);
	}, [group]);

	const transitions = useTransition(currentIndex, {
		from: { opacity: 0, filter: "brightness(0.5)" },
		enter: { opacity: 1, filter: "brightness(1)" },
		leave: { opacity: 0, filter: "brightness(0.5)" },
		config: { duration: fadeDuration },
	});

	return transitions((style, item) => (
		<animated.img
			src={imageGroups[group][item]}
			alt={`${group}-image-${item}`}
			style={{
				...style,
				position: "absolute",
				top: positionTop,
				left: 0,
				right: 0,
				bottom: 0,
				zIndex: 0,
			}}
		/>
	));
}

function App() {
	return (
		<div className="App">
			<PreloadImages />
			<h1>Fade and Flow Animations</h1>
			<h2>
				I created the following animations as examples of what one can do by
				upscaling and versioning an image repeatedly using Midjourney AI. Please
				visit https://www.youtube.com/watch?v=1T798gp0cPI&ab_channel=RhysSmoker
				to watch a three minute tutorial on how to generate a series of images
				that will look great in this format.{" "}
			</h2>
			<header style={{ position: "relative", width: "100%", height: "1200px" }}>
				<AnimatedImage
					group="pour"
					positionTop="0px"
				/>
				<AnimatedImage
					group="qwerty"
					positionTop="400px"
				/>
				<AnimatedImage
					group="stein"
					positionTop="800px"
				/>
			</header>
		</div>
	);
}

export default App;
