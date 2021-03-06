/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Howl } from 'howler';

import KEYBOARD_KEYS from '../utils/keyboard_keys';
import { getAssetPath } from '../utils/assetGetter';

function GamePage() {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const location: any = useLocation();

  const correctAnswer = new Howl({
    src: [`${getAssetPath('correct_answer.mp3')}`],
  });

  const wrongAnswer = new Howl({
    src: [`${getAssetPath('wrong_answer.mp3')}`],
  });

  const redTeamAudio = new Howl({
    src: [`${getAssetPath('red_team.mp3')}`],
  });

  const blueTeamAudio = new Howl({
    src: [`${getAssetPath('blue_team.mp3')}`],
  });

  const greenTeamAudio = new Howl({
    src: [`${getAssetPath('green_team.mp3')}`],
  });

  const [gameStatus, setGameStatus] = useState(false);

  const [timerStatus, setTimerStatus] = useState(false);
  const [timer, setTimer] = useState(0);

  const [redTeam, setRedTeam] = useState(false);
  const [redTeamPoint, setRedTeamPoint] = useState(0);

  const [blueTeam, setBlueTeam] = useState(false);
  const [blueTeamPoint, setBlueTeamPoint] = useState(0);

  const [greenTeam, setGreenTeam] = useState(false);
  const [greenTeamPoint, setGreenTeamPoint] = useState(0);

  const [isFirstStart, setFirstStart] = useState(true);

  const [disableBlue, setDisableBlue] = useState(true);
  const [disableRed, setDisableRed] = useState(true);
  const [disableGreen, setDisableGreen] = useState(true);

  const [gameOverForRed, setGameOverForRed] = useState(false);
  const [gameOverForBlue, setGameOverForBlue] = useState(false);
  const [gameOverForGreen, setGameOverForGreen] = useState(false);

  const [redTeamWrongCount, setRedTeamWrongCount] = useState(0);
  const [blueTeamWrongCount, setBlueTeamWrongCount] = useState(0);
  const [greenTeamWrongCount, setGreenTeamWrongCount] = useState(0);

  const [redTeamWonTheGame, setRedTeamWonTheGame] = useState(false);
  const [blueTeamWonTheGame, setBlueTeamWonTheGame] = useState(false);
  const [greenTeamWonTheGame, setGreenTeamWonTheGame] = useState(false);

  const [timerForAnswer, setTimerForAnswer] = useState(0);
  const [isTimerStartedForAnswer, setIsTimerForAnswer] = useState(false);

  const [aUserAnswered, setAUserAnswered] = useState(false);

  function handleKeys(event: KeyboardEvent) {
    if (event.key === KEYBOARD_KEYS.KIRMIZI_TAKIM) {
      document.removeEventListener('keydown', handleKeys, false);
      redTeamAudio.play();
      setTimerStatus(false);
      setTimerForAnswer(15);
      setIsTimerForAnswer(true);
      setRedTeam(true);
      setDisableRed(false);
      return;
    }
    if (event.key === KEYBOARD_KEYS.MAVI_TAKIM) {
      document.removeEventListener('keydown', handleKeys, false);
      blueTeamAudio.play();
      setTimerStatus(false);
      setTimerForAnswer(15);
      setIsTimerForAnswer(true);
      setBlueTeam(true);
      setDisableBlue(false);
      // eslint-disable-next-line no-useless-return
      return;
    }
    if (
      event.key === KEYBOARD_KEYS.YESIL_TAKIM &&
      location.state.totalUser === 3
    ) {
      document.removeEventListener('keydown', handleKeys, false);
      greenTeamAudio.play();
      setTimerStatus(false);
      setTimerForAnswer(15);
      setIsTimerForAnswer(true);
      setGreenTeam(true);
      setDisableGreen(false);
      // eslint-disable-next-line no-useless-return
      return;
    }
  }

  function startGame() {
    setGameStatus(true);
    setTimer(5);
    setTimerStatus(true);
  }

  function addPointToBlueTeam() {
    setBlueTeamPoint(blueTeamPoint + 1);
    setBlueTeam(false);
    setDisableBlue(true);
    correctAnswer.play();
    setTimerForAnswer(0);
    setIsTimerForAnswer(false);
    setAUserAnswered(true);
  }

  function addPointToRedTeam() {
    setRedTeamPoint(redTeamPoint + 1);
    setRedTeam(false);
    setDisableRed(true);
    correctAnswer.play();
    setTimerForAnswer(0);
    setIsTimerForAnswer(false);
    setAUserAnswered(true);
  }

  function addPointToGreenTeam() {
    setGreenTeamPoint(greenTeamPoint + 1);
    setGreenTeam(false);
    setDisableGreen(true);
    correctAnswer.play();
    setTimerForAnswer(0);
    setIsTimerForAnswer(false);
    setAUserAnswered(true);
  }

  function continueGame() {
    setBlueTeam(false);
    setRedTeam(false);
    setGreenTeam(false);
    setDisableBlue(true);
    setDisableRed(true);
    setDisableGreen(true);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    setAUserAnswered(false);

    document.addEventListener('keydown', handleKeys);
    setIsTimerForAnswer(false);
    setTimerStatus(true);
  }

  function startTimerAgain() {
    setBlueTeam(false);
    setRedTeam(false);
    setGreenTeam(false);
    setDisableBlue(true);
    setDisableRed(true);
    setDisableGreen(true);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    document.addEventListener('keydown', handleKeys);
    setIsTimerForAnswer(false);
    setAUserAnswered(false);
    setTimer(30);
    setTimerStatus(true);
  }

  function gameEnder() {
    setTimerStatus(false);
    setTimer(0);
    setIsTimerForAnswer(false);
    setTimerForAnswer(0);
    navigate('/');
  }

  function replay() {
    navigate('/');
  }

  function removePointToBlue() {
    setBlueTeamWrongCount(blueTeamWrongCount + 1);
    setBlueTeam(false);
    setDisableBlue(true);
    wrongAnswer.play();
    setAUserAnswered(true);
    setIsTimerForAnswer(false);
  }

  function removePointToRed() {
    setRedTeamWrongCount(redTeamWrongCount + 1);
    setRedTeam(false);
    setDisableRed(true);
    wrongAnswer.play();
    setAUserAnswered(true);
    setIsTimerForAnswer(false);
  }

  function removePointToGreen() {
    setGreenTeamWrongCount(greenTeamWrongCount + 1);
    setGreenTeam(false);
    setDisableGreen(true);
    wrongAnswer.play();
    setAUserAnswered(true);
    setIsTimerForAnswer(false);
  }

  /**
   * Buradaki UseEffectin kullan??m amac?? kullan??c??lar??n ??st a??amaya ge??ti??i ya da elendi??inin belirenme sisteminin ??al????mas?? i??indir.
   */

  useEffect(() => {
    if (blueTeamWrongCount === 2) {
      setTimerStatus(false);
      setGameStatus(false);
      setGameOverForBlue(true);
    }
    if (redTeamWrongCount === 2) {
      setTimerStatus(false);
      setGameStatus(false);
      setGameOverForRed(true);
    }
    if (greenTeamWrongCount === 2) {
      setTimerStatus(false);
      setGameStatus(false);
      setGameOverForGreen(true);
    }
  }, [blueTeamWrongCount, redTeamWrongCount, greenTeamWrongCount]);

  useEffect(() => {
    if (blueTeamPoint === 2) {
      setTimerStatus(false);
      setGameStatus(false);
      setBlueTeamWonTheGame(true);
    }
    if (redTeamPoint === 2) {
      setTimerStatus(false);
      setGameStatus(false);
      setRedTeamWonTheGame(true);
    }
    if (greenTeamPoint === 2) {
      setTimerStatus(false);
      setGameStatus(false);
      setGreenTeamWonTheGame(true);
    }
  }, [blueTeamPoint, redTeamPoint, greenTeamPoint]);

  useEffect(() => {
    if (timerForAnswer > 0 && isTimerStartedForAnswer === true) {
      setTimeout(() => {
        setTimerForAnswer(timerForAnswer - 1);
      }, 1000);
    }
    if (isTimerStartedForAnswer === true) {
      setTimerStatus(false);
    }

    if (timerForAnswer === 0 && isTimerStartedForAnswer === true) {
      setIsTimerForAnswer(false);
      setTimerForAnswer(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerForAnswer, isTimerStartedForAnswer]);

  /**
   * Buradaki UseEffectin kullan??m sebebi saya?? sisteminin ??al????abilmesi i??indir.
   */
  useEffect(() => {
    if (timer > 0 && timerStatus === true) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
    if (timer === 0 && timerStatus === true && isFirstStart === false) {
      setTimerStatus(false);
      setTimer(0);
    }
    if (timer === 0 && timerStatus === true && isFirstStart === true) {
      setTimerStatus(false);
      setFirstStart(false);
      setTimer(30);
      setTimerStatus(true);
      document.addEventListener('keydown', handleKeys);
    }

    /* if (
      timer === 0 &&
      timerStatus === false &&
      isFirstStart === false &&
      (redTeam === false || blueTeam === false || greenTeam === false) &&
      noAnswer === true
    ) {
      setTimeout(() => {
        setTimer(5);
        setTimerStatus(true);
        setNoAnswer(false);
      }, 3000);
    }

    if (
      timer === 0 &&
      timerStatus === false &&
      isFirstStart === false &&
      (redTeam === false || blueTeam === false || greenTeam === false) &&
      noAnswer === false
    ) {
      setTimer(30);
      setTimerStatus(true);
      setNoAnswer(true);
    } */

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerStatus, timer, aUserAnswered]);

  function buttonHandler() {
    if (isFirstStart) {
      startGame();
      return;
    }
    if (timerStatus === false) {
      startTimerAgain();
      document.addEventListener('keydown', handleKeys);
      return;
    }
    continueGame();
  }

  return (
    <main>
      <div>
        <div>
          {blueTeamWonTheGame || redTeamWonTheGame || greenTeamWonTheGame ? (
            <div>
              <h1 className="container">
                {location.state.totalUser === 3 ? (
                  <>
                    {(blueTeamWonTheGame &&
                      `Mavi Tak??m - ${location.state.firstUserName} Bu Turu Ge??ti`) ||
                      (redTeamWonTheGame &&
                        `K??rm??z?? Tak??m - ${location.state.secondUserName} Bu Turu Ge??ti`) ||
                      (greenTeamWonTheGame &&
                        `Ye??il Tak??m - ${location.state.thirdUserName} Bu Turu Ge??ti`)}
                  </>
                ) : (
                  <>
                    {(blueTeamWonTheGame &&
                      `Mavi Tak??m - ${location.state.firstUserName} Bu Turu Ge??ti`) ||
                      (redTeamWonTheGame &&
                        `K??rm??z?? Tak??m - ${location.state.secondUserName} Bu Turu Ge??ti`)}{' '}
                  </>
                )}
              </h1>
              <div className="container">
                <button type="button" onClick={replay}>
                  S??radaki Tur ????in Yeniden Ba??la
                </button>
              </div>
            </div>
          ) : (
            <div>
              {gameOverForBlue || gameOverForRed || gameOverForGreen ? (
                <div>
                  <h1 className="container">
                    {location.state.totalUser === 3 ? (
                      <>
                        {(gameOverForBlue &&
                          `Mavi Tak??m - ${location.state.firstUserName} Oyunu Kaybetti`) ||
                          (gameOverForRed &&
                            `K??rm??z?? Tak??m - ${location.state.secondUserName} Oyunu Kaybetti`) ||
                          (gameOverForGreen &&
                            `Ye??il Tak??m - ${location.state.thirdUserName} Oyunu Kaybetti`)}
                      </>
                    ) : (
                      <>
                        {(gameOverForBlue &&
                          `Mavi Tak??m - ${location.state.firstUserName} Oyunu Kaybetti`) ||
                          (gameOverForRed &&
                            `K??rm??z?? Tak??m - ${location.state.secondUserName} Oyunu Kaybetti`)}
                      </>
                    )}
                  </h1>
                  <div className="container">
                    <button type="button" onClick={replay}>
                      S??radaki Tur ????in Yeniden Ba??la
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div>
                    <div className="container">
                      {gameStatus ? (
                        <button type="button" onClick={gameEnder}>
                          Oyunu Kapat ve ????k
                        </button>
                      ) : null}
                    </div>
                    <div className="container">
                      <h1>
                        {gameStatus ? (
                          <div className="container">
                            {timerStatus ? (
                              <span>{timer}</span>
                            ) : (
                              <>
                                <div>
                                  {aUserAnswered ? (
                                    'Yar????maya Devam Etmek ????in Devam Et Butonuna Bas??n'
                                  ) : (
                                    <>
                                      {location.state.totalUser === 3 ? (
                                        <span>
                                          {timerForAnswer ? (
                                            <div className="container">
                                              {(redTeam && `K??rm??z?? `) ||
                                                (blueTeam && `Mavi `) ||
                                                (greenTeam && `Ye??il `)}
                                              Tak??m??n Cevab?? bekleniyor
                                            </div>
                                          ) : null}
                                          <div className="container">
                                            <h3>
                                              {isTimerStartedForAnswer ? (
                                                <>{timerForAnswer}</>
                                              ) : (
                                                'Yar????maya Devam Etmek i??in Devam Et Butonuna Bas??n'
                                              )}
                                            </h3>
                                          </div>
                                        </span>
                                      ) : (
                                        <span>
                                          {timerForAnswer ? (
                                            <div className="container">
                                              {(redTeam && `K??rm??z?? `) ||
                                                (blueTeam && `Mavi `)}
                                              Tak??m??n Cevab?? bekleniyor
                                            </div>
                                          ) : null}
                                          <div className="container">
                                            <h3>
                                              {isTimerStartedForAnswer ? (
                                                <>{timerForAnswer}</>
                                              ) : (
                                                'Yar????maya Devam Etmek ????in Devam Et Butonuna Bas??n'
                                              )}
                                            </h3>
                                          </div>
                                        </span>
                                      )}
                                    </>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        ) : (
                          <span>
                            Ho??geldiniz. L??tfen Oyunu Ba??latmak i??in Ba??lat
                            tu??una bas??n
                          </span>
                        )}
                      </h1>
                    </div>
                    <div className="container">
                      <button
                        type="button"
                        onClick={buttonHandler}
                        className="ml-16"
                        disabled={timerStatus || isTimerStartedForAnswer}
                      >
                        {isFirstStart ? 'Oyunu Ba??lat' : 'Devam Et'}
                      </button>
                    </div>
                    <div className="container">
                      <button
                        type="button"
                        onClick={addPointToBlueTeam}
                        disabled={disableBlue || aUserAnswered}
                      >
                        Mavi Tak??ma Puan ver
                      </button>
                      <button
                        type="button"
                        className="ml-16"
                        onClick={addPointToRedTeam}
                        disabled={disableRed || aUserAnswered}
                      >
                        K??rm??z?? Tak??ma Puan ver
                      </button>
                      {location.state.totalUser === 3 ? (
                        <button
                          type="button"
                          className="ml-16"
                          onClick={addPointToGreenTeam}
                          disabled={disableGreen || aUserAnswered}
                        >
                          Ye??il Tak??ma Puan ver
                        </button>
                      ) : null}
                    </div>

                    <div className="container">
                      <button
                        type="button"
                        disabled={disableBlue || aUserAnswered}
                        onClick={removePointToBlue}
                      >
                        Mavi Tak??m??n Puan??n?? Azalt
                      </button>

                      <button
                        type="button"
                        disabled={disableRed || aUserAnswered}
                        onClick={removePointToRed}
                        className="ml-16"
                      >
                        K??rm??z?? Tak??m??n Puan??n?? Azalt
                      </button>
                      {location.state.totalUser === 3 ? (
                        <button
                          type="button"
                          disabled={disableGreen || aUserAnswered}
                          onClick={removePointToGreen}
                          className={
                            location.state.totalUser === 3 ? `ml-16` : ''
                          }
                        >
                          Ye??il Tak??m??n Puan??n?? Azalt
                        </button>
                      ) : null}
                    </div>

                    <div className="container">
                      <h1>Skor Tablosu</h1>
                    </div>

                    <div>
                      <div className="container">
                        <h3>Mavi Tak??m - {location.state.firstUserName}</h3>
                      </div>
                      <div className="container">
                        <h3>
                          Do??ru: {blueTeamPoint} - Yanl????: {blueTeamWrongCount}
                        </h3>
                      </div>
                    </div>

                    <hr />

                    <div>
                      <div className="container">
                        <h3>K??rm??z?? Tak??m - {location.state.secondUserName}</h3>
                      </div>
                      <div className="container">
                        <h3>
                          Do??ru: {redTeamPoint} - Yanl????: {redTeamWrongCount}
                        </h3>
                      </div>
                    </div>

                    {location.state.totalUser === 3 ? <hr /> : null}

                    {location.state.totalUser === 3 ? (
                      <div className="container">
                        <div>
                          <div className="container">
                            <h3>
                              Ye??il Tak??m - {location.state.thirdUserName}
                            </h3>
                          </div>
                          <div className="container">
                            <h3>
                              Do??ru: {greenTeamPoint} - Yanl????:{' '}
                              {greenTeamWrongCount}
                            </h3>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default GamePage;
