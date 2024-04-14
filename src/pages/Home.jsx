import React, { useState, useEffect } from 'react';

const Home = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [tabSwitchViolations, setTabSwitchViolations] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);

 

    useEffect(() => {
        setQuestions([
            {
                "question": "What is the capital of France?",
                "options": ["Paris", "London", "Berlin", "Rome"],
                "correctAnswerIndex": 0
            },
            {
                "question": "Who wrote 'To Kill a Mockingbird'?",
                "options": ["Harper Lee", "J.K. Rowling", "Stephen King", "Charles Dickens"],
                "correctAnswerIndex": 0
            },
            {
                "question": "What is the chemical symbol for water?",
                "options": ["H2O", "CO2", "O2", "N2"],
                "correctAnswerIndex": 0
            },
            {
                "question": "Which planet is known as the Red Planet?",
                "options": ["Mars", "Venus", "Jupiter", "Saturn"],
                "correctAnswerIndex": 0
            },
            {
                "question": "Who painted the Mona Lisa?",
                "options": ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
                "correctAnswerIndex": 0
            },
            {
                "question": "What is the tallest mammal?",
                "options": ["Giraffe", "Elephant", "Kangaroo", "Horse"],
                "correctAnswerIndex": 0
            },
            {
                "question": "Which country is known as the Land of the Rising Sun?",
                "options": ["Japan", "China", "South Korea", "Vietnam"],
                "correctAnswerIndex": 0
            },
            {
                "question": "Who developed the theory of relativity?",
                "options": ["Albert Einstein", "Isaac Newton", "Stephen Hawking", "Galileo Galilei"],
                "correctAnswerIndex": 0
            },
            {
                "question": "What is the largest organ in the human body?",
                "options": ["Skin", "Liver", "Heart", "Brain"],
                "correctAnswerIndex": 0
            },
            {
                "question": "Which bird is known for its ability to mimic human speech?",
                "options": ["Parrot", "Penguin", "Owl", "Eagle"],
                "correctAnswerIndex": 0
            }
        ]);
    }, []);

    useEffect(() => {
        const fullscreenChangeHandler = () => {
            setIsFullScreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', fullscreenChangeHandler);

        return () => {
            document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
        };
    }, []);

    useEffect(() => {
        const visibilityChangeHandler = () => {
            if (document.visibilityState === 'hidden') {
                setTabSwitchViolations((prevCount) => prevCount + 1);
            }
        };

        document.addEventListener('visibilitychange', visibilityChangeHandler);

        return () => {
            document.removeEventListener('visibilitychange', visibilityChangeHandler);
        };
    }, []);

    const handleStartQuiz = () => {
        document.documentElement.requestFullscreen();
    };

    const handleNextQuestion = () => {
  
        const currentQuestion = questions[currentQuestionIndex];
        console.log("current quesytion",currentQuestion);
        if (currentQuestion.correctAnswerIndex === selectedOption) {
            setScore((prevScore) => prevScore + 1);
        }

        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedOption(null);
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
        setSelectedOption(null);
    };

    const handleRestartQuiz = () => {
        setCurrentQuestionIndex(0);
        setTabSwitchViolations(0);
        setScore(0);
    };

    const handleOptionChange = (index) => {
        setSelectedOption(index);
    };
   

    const getCurrentQuestion = () => {
        return questions[currentQuestionIndex];
    };

    const getTotalQuestions = () => {
        return questions.length;
    };

    return (
        <div>
            {!isFullScreen && (
                <div>
                    <p>Please switch to full-screen mode to take the quiz.</p>
                    <button onClick={handleStartQuiz}>Start Quiz</button>
                </div>
            )}
            {isFullScreen && currentQuestionIndex < getTotalQuestions() && (
                <div>
                    <h2>Question {currentQuestionIndex + 1}</h2>
                    <p>{getCurrentQuestion().question}</p>
                    <ul>
                        {getCurrentQuestion().options.map((option, index) => (
                            <li key={index}>
                                <label>
                                    <input
                                        type="radio"
                                        name="options"
                                        value={option}
                                        checked={selectedOption === index}
                                        onChange={() => handleOptionChange(index)}
                                    />
                                    {option}
                                </label>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleNextQuestion}>Next</button>
                    {currentQuestionIndex > 0 && <button onClick={handlePreviousQuestion}>Previous</button>}
                </div>
            )}
            {currentQuestionIndex === getTotalQuestions() && (
                <div>
                    <h2>Quiz Finished!</h2>
                    <p>Your Score: {score} out of {getTotalQuestions()}</p>
                    <p>Tab Switch Violations: {tabSwitchViolations}</p>
                    <button onClick={handleRestartQuiz}>Restart Quiz</button>
                </div>
            )}
        </div>
    );
}

export default Home;
