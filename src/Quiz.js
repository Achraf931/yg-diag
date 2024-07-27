import React, { useEffect, useState } from 'react';
import AnswerList from './components/AnswerList';
import Question from './components/Question';
import SubQuestion from './components/SubQuestion';
import ResultPage from './components/ResultPage';
import Loader from './components/Loader';
import Button from './components/Button';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [currentResponse, setCurrentResponse] = useState({});
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [isChangingQuestion, setIsChangingQuestion] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);

  const getQueryParams = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  };

  const animationDuration = 200;
  const lang = getQueryParams("lang") || "en";
  const api_url = `https://the-trivia-api.com/api/questions?limit=7&language=${lang}`;

  const fetchNewQuestion = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(api_url);
      const data = await res.json();
      const datas = [{
        "category": "Geography",
        "id": "645cb0e67d263fd50970438d",
        "correctAnswer": "Indochina",
        "incorrectAnswers": [
          "Malay",
          "Malacca",
          "Sunda"
        ],
        "question": "Cambodia, Laos, and Vietnam are located on what peninsula?",
        "subQuestions": [
          {
            "question": "Le matin",
            "correctAnswer": "Réponse correcte matin",
            "incorrectAnswers": ["Mauvaise réponse 1", "Mauvaise réponse 2", "Mauvaise réponse 3"]
          },
          {
            "question": "Le midi",
            "correctAnswer": "Réponse correcte midi",
            "incorrectAnswers": ["Mauvaise réponse 1", "Mauvaise réponse 2", "Mauvaise réponse 3"]
          },
          {
            "question": "Le soir",
            "correctAnswer": "Réponse correcte soir",
            "incorrectAnswers": ["Mauvaise réponse 1", "Mauvaise réponse 2", "Mauvaise réponse 3"]
          }
        ],
        "tags": [
          "countries",
          "peninsulas",
          "southeast_asia",
          "asia",
          "geography"
        ],
        "type": "Multiple Choice",
        "difficulty": "medium",
        "regions": [],
        "isNiche": false
      }, ...data];
      setQuestions(datas);
      setCurrentQuestion(datas[0]);
      setShowQuestion(true);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartQuiz = () => {
    if (consentChecked) {
      setQuizStarted(true);
      fetchNewQuestion();
    } else {
      alert("Vous devez cocher la case pour commencer le questionnaire.");
    }
  };

  const handleSelectAnswer = (answer) => {
    setIsChangingQuestion(true);
    setTimeout(() => {
      setCurrentResponse({ ...currentResponse, [currentQuestion.question]: answer });
      setResponses([...responses, { question: currentQuestion.question, answer }]);
      setCurrentIndex(currentIndex + 1);
      setCurrentQuestion(questions[currentIndex + 1]);
      setIsChangingQuestion(false);
    }, animationDuration);
  };

  const handlePreviousQuestion = () => {
    setIsChangingQuestion(true);
    setTimeout(() => {
      if (currentIndex === 0) {
        setQuizStarted(false);
        setCurrentIndex(0);
        setResponses([]);
      } else {
        setCurrentIndex(currentIndex - 1);
        setCurrentQuestion(questions[currentIndex - 1]);
        setResponses(responses.slice(0, -1));
      }
      setIsChangingQuestion(false);
    }, animationDuration);
  };

  const handleClickTry = () => {
    setIsLoading(true);
    setResponses([]);
    setCurrentIndex(0);
    fetchNewQuestion();
  };

  const handleCheckboxChange = (e) => {
    setConsentChecked(e.target.checked);
  };

  const handleCircleClick = (index) => {
    setIsChangingQuestion(true);
    setTimeout(() => {
      if (index < currentIndex) {
        setCurrentIndex(index);
        setCurrentQuestion(questions[index]);
      }
      setIsChangingQuestion(false);
    }, animationDuration);
  };

  const handleResetQuiz = () => {
    setQuizStarted(false);
    setCurrentIndex(0);
    setQuestions([]);
    setResponses([]);
    setCurrentQuestion(null);
    setConsentChecked(false);
  };

  useEffect(() => {
    if (quizStarted) {
      fetchNewQuestion();
    }
  }, [quizStarted]);

  const answers = currentQuestion ? [currentQuestion.correctAnswer, ...currentQuestion.incorrectAnswers] : [];

  return (
    <div className="w-full md:max-w-lg">
      {!quizStarted ? (
        <div className="flex flex-col gap-4 px-4 pb-4">
          <div>
            <h1 className="text-secondary uppercase text-2xl">Diagnostic soin expert</h1>
            <p className="text-xl mt-2">Trouvez la routine soin adaptée à votre peau en moins de 2 minutes</p>
          </div>

          <p className="text-[13px]">
            Dans le cadre de votre diagnostic, vous serez amené à renseigner votre couleur et type de peau. Ces informations sont sensibles. Leur traitement par Yves Rocher nécessite le recueil préalable de votre consentement.
          </p>

          <label className="flex items-center gap-4 py-2 px-4 border border-solid border-[#F4F4F4] text-xs rounded-lg font-medium cursor-pointer">
            <input
              type="checkbox"
              className="accent-secondary"
              checked={ consentChecked }
              onChange={ handleCheckboxChange }
            />
            Je consens à ce que mes données de peau soient traitées pour recevoir les résultats de mon diagnostic avec des recommandations personnalisées de produits.
          </label>

          <Button
            customStyle={ `w-full rounded text-white` }
            disabled={ !consentChecked }
            onClickButton={ handleStartQuiz }
          >
            C'est parti
          </Button>
        </div>
      ) : questions.length === 0 || isLoading ? (
        <Loader/>
      ) : currentIndex === questions.length ? (
        <ResultPage
          responses={ responses }
          onClickTry={ handleClickTry }
        />
      ) : (
        <div>
          <div className="flex items-center justify-between py-[10px] px-4 border-b border-solid border-[#CCCCCC]">
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={ handlePreviousQuestion }
              style={ { cursor: 'pointer' } }
            >
              <path d="M25.7142 29.7559L18.2857 21.6906L25.7142 13.6252" stroke="black" strokeWidth="3"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h2 className="text-xl">Diagnostic de peau</h2>
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={ handleResetQuiz } style={ { cursor: 'pointer' } }>
              <path fillRule="evenodd" clipRule="evenodd"
                    d="M30.8255 12.8407C31.2811 13.2963 31.2811 14.035 30.8255 14.4906L23.401 21.9152L30.8257 29.3399C31.2813 29.7955 31.2813 30.5342 30.8257 30.9898C30.37 31.4454 29.6314 31.4454 29.1757 30.9898L21.751 23.5651L14.3263 30.9898C13.8707 31.4454 13.132 31.4454 12.6764 30.9898C12.2208 30.5342 12.2208 29.7955 12.6764 29.3399L20.1011 21.9152L12.6766 14.4906C12.221 14.035 12.221 13.2963 12.6766 12.8407C13.1322 12.3851 13.8709 12.3851 14.3265 12.8407L21.751 20.2653L29.1756 12.8407C29.6312 12.3851 30.3699 12.3851 30.8255 12.8407Z"
                    fill="black"/>
            </svg>
          </div>
          <div className="flex items-center justify-center mt-4 mb-6 w-full">
            <span className="mr-5 hidden">{ currentIndex + 1 }/{ questions.length }</span>
            <div className="w-52 flex justify-between items-center">
              { questions.map((_, index) => (
                <div key={ index }
                     className={ `flex items-center ${ index !== questions.length - 1 ? 'flex-grow' : '' }` }>
                  <div
                    className={ `w-4 h-4 rounded-full border border-secondary ${ index <= currentIndex && 'bg-secondary' }` }
                    onClick={ () => handleCircleClick(index) }
                    style={ { cursor: index <= currentIndex ? 'pointer' : 'default' }}
                  ></div>
                  { index !== questions.length - 1 && (
                    <div
                      className={ `border-b-2 border-secondary h-1 flex-1` }
                    ></div>
                  ) }
                </div>
              )) }
            </div>
          </div>
          { showQuestion && (
            <div className={`question-container ${isChangingQuestion ? 'fade-out' : 'fade-in'}`}>
              { currentQuestion.subQuestions ? (
                <SubQuestion
                  question={ currentQuestion }
                  onSelectAnswer={ handleSelectAnswer }
                  currentResponse={ currentResponse[currentQuestion.question] }
                />
              ) : (
                <div className="px-4">
                  <Question current={ currentQuestion }/>
                  <AnswerList
                    answers={ answers }
                    selected={ currentResponse[currentQuestion.question] }
                    onSelectAnswer={ handleSelectAnswer }
                  />
                </div>
              ) }
            </div>
          )}
        </div>
      ) }
    </div>
  );
};

export default Quiz;
