# Diwali Wishes Static Website

A vibrant, interactive Diwali wishes website featuring personalized greetings, 3D animated crackers, fireworks, and festive design.

## Features
- Landing page asks for your name and displays a personalized Diwali greeting.
- Realistic 3D cracker and blast animations using Three.js.
- Colorful 2D fireworks using HTML5 Canvas.
- Festive, responsive design with Diwali icons and emojis.
- Random good wishes for each visitor.
- Footer credit: "created by VijayGiduthuri".
- Dockerized for easy deployment (Nginx, port 80).

## Technologies Used
- **HTML5**: Structure and layout.
- **CSS3**: Modern, responsive, and festive styling.
- **JavaScript**: Interactive logic and animations.
- **Three.js**: 3D cracker and blast effects.
- **Nginx (Docker)**: Static file serving and containerization.

## How to Run Locally
1. Clone or download this repository.
2. Open `index.html` in your browser to view the site locally.

## How to Run with Docker
1. Build the Docker image:
   ```sh
   docker build -t diwali-wishes .
   ```
2. Run the container (exposes on port 80):
   ```sh
   docker run -d -p 80:80 --name diwali-wishes diwali-wishes
   ```
3. Visit [http://localhost:80](http://localhost:80) in your browser.

## Folder Structure
```
.
├── index.html
├── style.css
├── script.js
├── diwali3d.js
├── Dockerfile
└── README.md
```

## Credits
- Created by VijayGiduthuri
- Fireworks and cracker effects inspired by open-source Three.js and Canvas demos.

## License
This project is for educational and festive use. Feel free to customize and share Diwali joy!
