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
	aquarium: [
		`${process.env.PUBLIC_URL}/aquarium/aquarium1.png`,
		`${process.env.PUBLIC_URL}/aquarium/aquarium2.png`,
		`${process.env.PUBLIC_URL}/aquarium/aquarium3.png`,
		`${process.env.PUBLIC_URL}/aquarium/aquarium4.png`,
		`${process.env.PUBLIC_URL}/aquarium/aquarium5.png`,
	],
};

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

function AnimatedImage({ group, positionTop, fadeDuration }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [direction, setDirection] = useState("forward"); // New state for direction

	useEffect(() => {
		const interval = setInterval(() => {
			if (direction === "forward") {
				if (currentIndex < imageGroups[group].length - 1) {
					setCurrentIndex((prev) => prev + 1);
				} else {
					setDirection("backward");
					setCurrentIndex((prev) => prev - 1);
				}
			} else {
				if (currentIndex > 0) {
					setCurrentIndex((prev) => prev - 1);
				} else {
					setDirection("forward");
					setCurrentIndex((prev) => prev + 1);
				}
			}
		}, fadeDuration * 2);

		return () => clearInterval(interval);
	}, [group, currentIndex, direction]);

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
function ImageGroup({
	group,
	top,
	fadeDuration,
	handleFadeDurationChange,
	toggle,
	setToggle,
}) {
	const buttonStyle = {
		position: "absolute",
		left: "10px",
		zIndex: 20,
		backgroundColor: "#fff",
		border: "1px solid #ddd",
		borderRadius: "4px",
		padding: "5px 10px",
		cursor: "pointer",
	};

	return (
		<div>
			<div style={{ ...buttonStyle, top }}>
				<button
					onClick={() =>
						setToggle((prev) => ({ ...prev, [group]: !prev[group] }))
					}>
					{toggle[group] ? `Hide this series: ` : `Show this series: `}
				</button>
				<span>Animation speed: </span>
				<input
					type="range"
					min="100"
					max="5000"
					value={fadeDuration}
					onChange={(e) => handleFadeDurationChange(e.target.value)}
				/>
				<span>{fadeDuration} ms</span>
			</div>
			{toggle[group] ? (
				<AnimatedImage
					group={group}
					positionTop={top}
					fadeDuration={fadeDuration}
				/>
			) : (
				<div style={{ position: "absolute", top, left: "200px" }}>{group}</div>
			)}
		</div>
	);
}

function App() {
	const [fadeDuration, setFadeDuration] = useState(2000); // Moved inside App component
	const [toggles, setToggles] = useState({
		pour: true,
		qwerty: true,
		stein: true,
		latte: true,
	});

	const handleFadeDurationChange = (duration) => {
		// Moved inside App component
		setFadeDuration(duration);
	};

	const buttonStyle = {
		position: "absolute",
		left: "10px",
		zIndex: 20,
		backgroundColor: "#fff",
		border: "1px solid #ddd",
		borderRadius: "4px",
		padding: "5px 10px",
		cursor: "pointer",
	};

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
			<header style={{ position: "relative", width: "100%", height: "1600px" }}>
				{Object.keys(imageGroups).map((group, index) => (
					<ImageGroup
						key={group}
						group={group}
						top={`${400 * index}px`}
						fadeDuration={fadeDuration}
						handleFadeDurationChange={handleFadeDurationChange}
						toggle={toggles}
						setToggle={setToggles}
					/>
				))}
			</header>
		</div>
	);
}

export default App;
