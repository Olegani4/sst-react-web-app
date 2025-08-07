import { useState, useEffect } from "react";
import { solarSystemQuestions } from "../../../utils/mockdata/mini-game-questions";

function MiniGame() {
    const [miniGameQuestions, setMiniGameQuestions] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [chosenAnswers, setChosenAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(3);
    const [timerActive, setTimerActive] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    const calculateScore = () => {
        let score = 0;
        for (let i = 0; i < chosenAnswers.length; i++) {
            if (chosenAnswers[i].isCorrect) {
                score++;
            }
        }
        setScore(score);
    }

    useEffect(() => {
        if (!gameStarted && chosenAnswers.length > 0) {
            calculateScore();
        }
    }, [gameStarted, chosenAnswers]);

    // Timer effect for smooth animation
    useEffect(() => {
        let interval = null;
        if (timerActive && timeLeft > 0) {
            interval = setInterval(() => {
                setElapsedTime(prev => prev + 0.01);
            }, 10); // Every 10ms updating
        }
        return () => clearInterval(interval);
    }, [timerActive]);

    // Updating timeLeft based on elapsedTime
    useEffect(() => {
        if (timerActive) {
            const questionTime = miniGameQuestions[currentQuestion].question_time;
            const newTimeLeft = Math.max(0, questionTime - elapsedTime);
            setTimeLeft(newTimeLeft);
            
            if (newTimeLeft <= 0) {
                handleTimeExpired();
            }
        }
    }, [elapsedTime, timerActive, currentQuestion]);

    // Starting timer when question changes
    useEffect(() => {
        if (gameStarted) {
            setTimeLeft(miniGameQuestions[currentQuestion].question_time);
            setElapsedTime(0);
            setTimerActive(true);
        }
    }, [currentQuestion, gameStarted]);

    const handleTimeExpired = () => {
        if (!timerActive) return;
        setTimerActive(false);
        setChosenAnswers(prev => [...prev, {answer: null, isCorrect: false}]);
        if (currentQuestion === miniGameQuestions.length - 1) {
            setGameStarted(false);
            setCurrentQuestion(0);
            return;
        }
        setCurrentQuestion(prev => prev + 1);
    }

    const handleAnswerClick = (answer) => {
        setTimerActive(false);
        setChosenAnswers(prev => [...prev, {answer: answer, isCorrect: answer === miniGameQuestions[currentQuestion].correctAnswer}]);
        if (currentQuestion === miniGameQuestions.length - 1) {
            setGameStarted(false);
            setCurrentQuestion(0);
            return;
        }
        setCurrentQuestion(prev => prev + 1);
    }

    const getRandomQuestions = (arr, newArrLength = 10) => {
        const randomQuestions = [];
        while (randomQuestions.length < newArrLength) {
            const randomIndex = Math.floor(Math.random() * arr.length);
            if (!randomQuestions.includes(arr[randomIndex])) {
                randomQuestions.push(arr[randomIndex]);
            }
        }
        return randomQuestions;
    }

    const startGame = () => {
        setMiniGameQuestions(getRandomQuestions(solarSystemQuestions));
        setGameStarted(true);
        setCurrentQuestion(0);
        setChosenAnswers([]);
        setTimeLeft(miniGameQuestions[currentQuestion].question_time);
        setElapsedTime(0);
        setTimerActive(true);
    }

    const resetGame = () => {
        setChosenAnswers([]);
        setGameStarted(false);
        setCurrentQuestion(0);
        setTimeLeft(miniGameQuestions[currentQuestion].question_time);
        setElapsedTime(0);
        setTimerActive(false);
    }

    return (
        <section className="mini-game" id="mini-game-section">
            <div className="mini-game__container">
                <div className="mini-game__header">
                    <h2 className="mini-game__title heading-1">Test Your Planets Knowledge</h2>
                </div>
                {!gameStarted && chosenAnswers.length === 0 && (
                <div className="mini-game__start-container">
                    <div className="mini-game__start-container-content">
                        <button className="mini-game__start-button body-large" onClick={startGame}>Start</button>
                    </div>
                </div>
                )}
                {gameStarted && (
                <div className="mini-game__content-container">
                    <div className="mini-game__timer-container">
                        <div></div>
                        <div className="mini-game__remaining-time">
                            <div className="remaining-time-timer-bar">
                                <div className="timer-bar-background">
                                    <div 
                                         className="timer-bar-fill" 
                                         style={{ width: `${((miniGameQuestions[currentQuestion].question_time - timeLeft) / miniGameQuestions[currentQuestion].question_time) * 100}%` }}
                                     ></div>
                                </div>
                            </div>
                        </div>
                        <div className="mini-game__question-counter">
                            <p className="mini-game__question-counter-text body-large">{currentQuestion + 1}/{miniGameQuestions.length}</p>
                        </div>
                    </div>
                    <div className="mini-game__question-container">
                        <div className="mini-game__question-text">
                            <p className="mini-game__question-text-text body-super-large">{miniGameQuestions[currentQuestion].question}</p>
                        </div>
                    </div>
                    <div className="mini-game__answers-container">
                        <ul className="mini-game__answers">
                            {miniGameQuestions[currentQuestion].answers.map((answer, index) => (
                                <li className="mini-game__answer" key={index}>
                                    <button className="mini-game__answer-button" onClick={() => handleAnswerClick(answer)}>
                                        <p className="mini-game__answer-text body-large">{answer}</p>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                )}
                {!gameStarted && chosenAnswers.length > 0 && (
                <div className="mini-game__score-container">
                    <div className="mini-game__score-container-content">
                        <p className="mini-game__score-text body-large">Your score: {score}/{miniGameQuestions.length}</p>
                        <button className="mini-game__score-button body-regular" onClick={resetGame}>Play again</button>
                    </div>
                </div>
                )}
            </div>
        </section>
    )
}

export default MiniGame;