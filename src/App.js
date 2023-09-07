import React, { useState, useEffect } from "react";
import { useTransition, animated } from "react-spring";
//    "react-spring": "^9.7.2",

// const animationImageCount = 26;
// const images = Array.from(
// 	{ length: animationImageCount },
// 	(_, index) => `${process.env.PUBLIC_URL}/pour${index + 1}.png`
// );
const images = [
	`${process.env.PUBLIC_URL}/pour1.png`,
	`${process.env.PUBLIC_URL}/pour2.png`,
	`${process.env.PUBLIC_URL}/pour3.png`,
];
const fadeDuration = 3000;

function PreloadImages() {
	return (
		<div style={{ display: "none" }}>
			{images.map((src, index) => (
				<img
					key={index}
					src={src}
					alt="preload"
				/>
			))}
		</div>
	);
}

function App() {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
		}, fadeDuration * 2);
		return () => clearInterval(interval);
	}, []);

	const transitions = useTransition(currentImageIndex, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		config: {
			duration: fadeDuration,
		},
	});

	return (
		<div className="App">
			<h1>Test Content</h1>
			<header style={{ position: "relative", width: "100%", height: "400px" }}>
				{transitions((style, item) => (
					<animated.img
						src={images[item]}
						alt={`image-${item}`}
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
			</header>
		</div>
	);
}

export default App;
