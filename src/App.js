import React, { useState, useEffect } from "react";
import { useTransition, animated } from "react-spring";

const globalStyles = {
	container: {
		padding: "20px",
		fontFamily: "Arial, sans-serif",
	},
	title: {
		fontSize: "1.8em",
		fontWeight: "bold",
		marginBottom: "20px",
	},
	description: {
		fontSize: "1.1em",
		maxWidth: "800px",
		margin: "0 auto 30px",
		lineHeight: "1.5",
	},
	link: {
		color: "#0077cc",
		textDecoration: "none",
	},
};

const imageGroups = {
	//put your numbered image files in arrays here
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
	latte: [
		`${process.env.PUBLIC_URL}/latte/latte1.png`,
		`${process.env.PUBLIC_URL}/latte/latte2.png`,
		`${process.env.PUBLIC_URL}/latte/latte3.png`,
		`${process.env.PUBLIC_URL}/latte/latte4.png`,
		`${process.env.PUBLIC_URL}/latte/latte5.png`,
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
		<div
			className="App"
			style={globalStyles.container}>
			<PreloadImages />
			<h1>Fade and Flow Animations</h1>
			<h2>
				The following image collections were each created and ordered using
				Midjourney AI in only a few minutes. Please visit{" "}
				<a
					href="https://www.youtube.com/watch?v=1T798gp0cPI&ab_channel=RhysSmoker"
					target="_blank"
					rel="noopener noreferrer">
					my tutorial
				</a>{" "}
				to learn how to QUICKLY generate a series of images that fade and flow
				together in a fun way when animated. And if you'd like to try it out
				yourself, please feel free to copy{" "}
				<a
					href="https://github.com/MERN-ing-the-midnight-oil/fade-and-flow"
					target="_blank"
					rel="noopener noreferrer">
					the code
				</a>{" "}
				I wrote to display them here.
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
				<AnimatedImage
					group="latte"
					positionTop="1200px"
				/>
			</header>
		</div>
	);
}

export default App;
