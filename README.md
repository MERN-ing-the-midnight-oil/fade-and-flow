# Fade and Flow Animations with React and React-Spring

This repository allows you to animate sequences of images in a smooth fading transition using React and React-Spring. It works well to animate images created in series using Midjourney AI. You will need to modify the code to add your own images.

## 🚀 Getting Started

### Pre-requisites

- Node.js
- npm or yarn

### Installation

1.  **Clone the repository**:

    ```
    git clone https://github.com/MERN-ing-the-midnight-oil/fade-and-flow.git
    ```

2.  **Install the dependencies**:

         "react": "^18.2.0",
         "react-dom": "^18.2.0",
         "react-scripts": "5.0.1",
         "react-spring": "^9.7.2",

    ```

    ```

3.  **Run the app**:
    ```
    npm start
    ```

## 🖼️ Adding or Replacing Image Series

To infuse your own series of images into the animation, follow these steps:

1. **Name Your Images**:
   Ensure your images are named sequentially for the series like:image1.png, image2.png, ..., imageN.png

2. **Place Your Images**:
   Create a new folder under the `public` directory (e.g., `myImages`). Add your image series to this directory.

3. **Update `imageGroups` in `App.js`**:
   Add a new entry for your image series. For instance:

javascript
myImages: [
`${process.env.PUBLIC_URL}/myImages/image1.png`,
`${process.env.PUBLIC_URL}/myImages/image2.png`,
...
]

4.  **Render Your Animation:**
    Lastly, within the App component, you'll need to render the new sequence. Add:
    <AnimatedImage group="myImages" positionTop="Xpx" />
    Adjust positionTop as desired to position your animation.

📜 License
This project is shared under the MIT License. Feel free to contribute, distribute, and adapt as per your needs!
