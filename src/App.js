import React, { useState, useEffect } from "react";
import Figure from "./components/Figure";
import Header from "./components/Header";
import Popup from "./components/Popup";
import Word from "./components/Word";
import WrongLetters from "./components/WrongLetters";
import Notification from "./components/Notification";
import { showNotification as show} from "./helpers/helpers";

const words = ["application", "programming", "interface", "wizard"];
let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
	const [playable, setPlayable] = useState(true);
	const [correctLetters, setCorrectLetters] = useState([]);
	const [wrongLetters, setWrongLetters] = useState([]);
	const [showNotification, setShowNotification] = useState(false);

	useEffect(() => {
		const handleKeyDown = (event) => {
			const { key, keyCode } = event;

			if (playable && keyCode >= 65 && keyCode <= 90) {
				const letter = key.toLowerCase();

				if (selectedWord.includes(letter)) {
					if (!correctLetters.includes(letter)) {
						setCorrectLetters((currentLetters) => [...currentLetters, letter]);
					} else {
						show(setShowNotification)
					}
				} else {
					if (!wrongLetters.includes(letter)) {
						setWrongLetters((wrongLetters) => [...wrongLetters, letter]);
					} else {
						show(setShowNotification)
					}
				}
			}
		};
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [correctLetters, wrongLetters , playable]);

	return (
		<>
			<Header />
			<div className="game-container">
				<Figure wrongLetters={ wrongLetters}/>
				<WrongLetters wrongLetters={wrongLetters} />
				<Word correctLetters={correctLetters} selectedWord={selectedWord} />
			</div>
				<Popup />
				<Notification showNotification={showNotification} />
		</>
	);
}

export default App;
