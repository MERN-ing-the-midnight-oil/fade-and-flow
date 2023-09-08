import React, { useState, useEffect } from "react";
import { useTransition, animated } from "react-spring";

const imagesPour = [
	`${process.env.PUBLIC_URL}/pour/pour1.png`,
	`${process.env.PUBLIC_URL}/pour/pour2.png`,
	`${process.env.PUBLIC_URL}/pour/pour3.png`,
];
const imagesQwerty = [
	`${process.env.PUBLIC_URL}/qwerty/qwerty1.png`,
	`${process.env.PUBLIC_URL}/qwerty/qwerty2.png`,
	`${process.env.PUBLIC_URL}/qwerty/qwerty3.png`,
];
const fadeDuration = 3000;

function PreloadImages() {
	return (
		<div style={{ display: "none" }}>
			{[...imagesPour, ...imagesQwerty].map((src, index) => (
				<img
					key={index}
					src={src}
					alt={`preload-image-${index}`}
				/>
			))}
		</div>
	);
}

function App() {
	const [currentImageIndexPour, setCurrentImageIndexPour] = useState(0);
	const [currentImageIndexQwerty, setCurrentImageIndexQwerty] = useState(0);

	useEffect(() => {
		const intervalPour = setInterval(() => {
			setCurrentImageIndexPour(
				(prevIndex) => (prevIndex + 1) % imagesPour.length
			);
		}, fadeDuration * 2);

		const intervalQwerty = setInterval(() => {
			setCurrentImageIndexQwerty(
				(prevIndex) => (prevIndex + 1) % imagesQwerty.length
			);
		}, fadeDuration * 2);

		return () => {
			clearInterval(intervalPour);
			clearInterval(intervalQwerty);
		};
	}, []);

	const transitionsPour = useTransition(currentImageIndexPour, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		config: {
			duration: fadeDuration,
		},
	});

	const transitionsQwerty = useTransition(currentImageIndexQwerty, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		config: {
			duration: fadeDuration,
		},
	});

	return (
		<div className="App">
			<PreloadImages />
			<h1>Test Content</h1>
			<header style={{ position: "relative", width: "100%", height: "400px" }}>
				{transitionsPour((style, item) => (
					<animated.img
						src={imagesPour[item]}
						alt={`pour-image-${item}`}
						style={{
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
				{transitionsQwerty((style, item) => (
					<animated.img
						src={imagesQwerty[item]}
						alt={`qwerty-image-${item}`}
						style={{
							...style,
							position: "absolute",
							top: "400px",
							left: 0,
							right: 0,
							bottom: 0,
							zIndex: 0,
						}}
					/>
				))}
			</header>
		</div>
	);
}

export default App;
