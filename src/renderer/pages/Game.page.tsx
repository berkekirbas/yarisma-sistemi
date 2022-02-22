/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Howl } from 'howler';

import KEYBOARD_KEYS from 'renderer/utils/keyboard_keys';
import { getAssetPath } from 'renderer/utils/assetGetter';

function GamePage() {
  const navigate = useNavigate();
  const location: any = useLocation();

  const correctAnswer = new Howl({
    src: [`${getAssetPath('correct_answer.mp3')}`],
  });

  const wrongAnswer = new Howl({
    src: [`${getAssetPath('wrong_answer.mp3')}`],
  });

  const [gameStatus, setGameStatus] = useState(false);
  const [endGame, setEndGame] = useState(false);

  const [timerStatus, setTimerStatus] = useState(false);
  const [timer, setTimer] = useState(0);

  const [redTeam, setRedTeam] = useState(false);
  const [redTeamPoint, setRedTeamPoint] = useState(0);

  const [blueTeam, setBlueTeam] = useState(false);
  const [blueTeamPoint, setBlueTeamPoint] = useState(0);

  const [greenTeam, setGreenTeam] = useState(false);
  const [greenTeamPoint, setGreenTeamPoint] = useState(0);

  const [isFirstStart, setFirstStart] = useState(true);
  const [noAnswer, setNoAnswer] = useState(true);

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

  function handleKeys(event: KeyboardEvent) {
    if (event.key === KEYBOARD_KEYS.KIRMIZI_TAKIM) {
      document.removeEventListener('keydown', handleKeys, false);
      setTimerStatus(false);
      setRedTeam(true);
      setDisableRed(false);
      return;
    }
    if (event.key === KEYBOARD_KEYS.MAVI_TAKIM) {
      document.removeEventListener('keydown', handleKeys, false);
      setTimerStatus(false);
      setBlueTeam(true);
      setDisableBlue(false);
      // eslint-disable-next-line no-useless-return
      return;
    }
    if (event.key === KEYBOARD_KEYS.YESIL_TAKIM) {
      document.removeEventListener('keydown', handleKeys, false);
      setTimerStatus(false);
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
    setTimer(5);
    setTimerStatus(true);
    setNoAnswer(false);
  }

  function addPointToRedTeam() {
    setRedTeamPoint(redTeamPoint + 1);
    setRedTeam(false);
    setDisableRed(true);
    correctAnswer.play();
    setTimer(5);
    setTimerStatus(true);
    setNoAnswer(false);
  }

  function addPointToGreenTeam() {
    setGreenTeamPoint(greenTeamPoint + 1);
    setGreenTeam(false);
    setDisableGreen(true);
    correctAnswer.play();
    setTimer(5);
    setTimerStatus(true);
    setNoAnswer(false);
  }

  function continueGame() {
    setBlueTeam(false);
    setRedTeam(false);
    setGreenTeam(false);
    setDisableBlue(true);
    setDisableRed(true);
    setDisableGreen(true);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    document.addEventListener('keydown', handleKeys);
    setTimerStatus(true);
  }

  function gameEnder() {
    setTimerStatus(false);
    setTimer(0);
    setEndGame(true);
  }

  function replay() {
    navigate('/');
  }

  function removePointToBlue() {
    setBlueTeamWrongCount(blueTeamWrongCount + 1);
    setBlueTeamPoint(blueTeamPoint - 1);
    setBlueTeam(false);
    setDisableBlue(true);
    wrongAnswer.play();
    document.addEventListener('keydown', handleKeys);
    setTimerStatus(true);
    setNoAnswer(false);
  }

  function removePointToRed() {
    setRedTeamWrongCount(redTeamWrongCount + 1);
    setRedTeamPoint(redTeamPoint - 1);
    setRedTeam(false);
    setDisableRed(true);
    wrongAnswer.play();
    document.addEventListener('keydown', handleKeys);
    setTimerStatus(true);
    setNoAnswer(false);
  }

  function removePointToGreen() {
    setGreenTeamWrongCount(greenTeamWrongCount + 1);
    setGreenTeamPoint(greenTeamPoint - 1);
    setGreenTeam(false);
    setDisableGreen(true);
    wrongAnswer.play();
    document.addEventListener('keydown', handleKeys);
    setTimerStatus(true);
    setNoAnswer(false);
  }

  /**
   * Buradaki UseEffectin kullanım amacı kullanıcıların üst aşamaya geçtiği ya da elendiğinin belirenme sisteminin çalışması içindir.
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

  /**
   * Buradaki UseEffectin kullanım sebebi sayaç sisteminin çalışabilmesi içindir.
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
      document.addEventListener('keydown', handleKeys);
    }
    if (timer === 0 && timerStatus === true && isFirstStart === true) {
      setTimerStatus(false);
      setFirstStart(false);
      setTimer(30);
      setTimerStatus(true);
      document.addEventListener('keydown', handleKeys);
    }
    if (
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
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerStatus, timer, noAnswer]);

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
                      `Mavi Takım - ${location.state.firstUserName} Bu Turu Geçti`) ||
                      (redTeamWonTheGame &&
                        `Kırmızı Takım - ${location.state.secondUserName} Bu Turu Geçti`) ||
                      (greenTeamWonTheGame &&
                        `Yeşil Takım - ${location.state.thirdUserName}`)}
                  </>
                ) : (
                  <>
                    {(blueTeamWonTheGame &&
                      `Mavi Takım - ${location.state.firstUserName} Bu Turu Geçti`) ||
                      (redTeamWonTheGame &&
                        `Kırmızı Takım - ${location.state.secondUserName} Bu Turu Geçti`)}{' '}
                  </>
                )}
              </h1>
              <div className="container">
                <button type="button" onClick={replay}>
                  Sıradaki Tur İçin Yeniden Başla
                </button>
              </div>
            </div>
          ) : (
            <div>
              {gameOverForBlue || gameOverForRed ? (
                <div>
                  <h1 className="container">
                    {location.state.totalUser === 3 ? (
                      <>
                        {(gameOverForBlue &&
                          `Mavi Takım - ${location.state.firstUserName} Oyunu Kaybetti`) ||
                          (gameOverForRed &&
                            `Kırmızı Takım - ${location.state.secondUserName} Oyunu Kaybetti`) ||
                          (gameOverForGreen &&
                            `Yeşil Takım - ${location.state.thirdUserName} Oyunu Kaybetti`)}
                      </>
                    ) : (
                      <>
                        {(gameOverForBlue &&
                          `Mavi Takım - ${location.state.firstUserName} Oyunu Kaybetti`) ||
                          (gameOverForRed &&
                            `Kırmızı Takım - ${location.state.secondUserName} Oyunu Kaybetti`)}
                      </>
                    )}
                  </h1>
                  <div className="container">
                    <button type="button" onClick={replay}>
                      Yeniden Başla
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {endGame ? (
                    <div>
                      <div className="container">
                        <h1>Oyun Bitti</h1>
                      </div>
                      <div className="container">
                        <h2>Kazanan</h2>
                      </div>
                      <div className="container">
                        {location.state.totalUser === 3 ? (
                          <>
                            {(redTeamPoint === blueTeamPoint) === greenTeam ? (
                              <h3>Oyun Berabere Bitti</h3>
                            ) : (
                              <h3>
                                {redTeamPoint > blueTeamPoint &&
                                redTeam > greenTeam ? (
                                  `Kırmızı Takım - ${location.state.secondUserName} Kazandı`
                                ) : (
                                  <>
                                    {blueTeamPoint > redTeamPoint &&
                                    blueTeam > greenTeam ? (
                                      `Mavi Takım Kazandı - ${location.state.firstUserName}`
                                    ) : (
                                      <>
                                        {greenTeam > blueTeam &&
                                        greenTeam > redTeam
                                          ? `Yeşil Takım Kazandı - ${location.state.thirdUserName}`
                                          : null}
                                      </>
                                    )}
                                  </>
                                )}
                              </h3>
                            )}
                          </>
                        ) : (
                          <>
                            {redTeamPoint === blueTeamPoint ? (
                              <h3>Oyun Berabere Bitti</h3>
                            ) : (
                              <h3>
                                {redTeamPoint > blueTeamPoint ? (
                                  `Kırmızı Takım - ${location.state.secondUserName} Kazandı`
                                ) : (
                                  <>
                                    {blueTeamPoint > redTeamPoint
                                      ? `Mavi Takım Kazandı - ${location.state.firstUserName}`
                                      : null}
                                  </>
                                )}
                              </h3>
                            )}
                          </>
                        )}
                      </div>
                      <div className="container">
                        <button type="button" onClick={replay}>
                          Yeniden Oyna
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="container">
                        {gameStatus ? (
                          <button type="button" onClick={gameEnder}>
                            Oyunu Bitir
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
                                  {location.state.totalUser === 3 ? (
                                    <span>
                                      {(redTeam === false ||
                                        blueTeam === false ||
                                        greenTeam === false) &&
                                      timer === 0 &&
                                      noAnswer === true ? (
                                        <div>Hiç Cevap gelmedi</div>
                                      ) : (
                                        <div>
                                          {(redTeam && `Kırmızı `) ||
                                            (blueTeam && `Mavi `) ||
                                            (greenTeam && `Yeşil `)}
                                          Takımın Cevabı bekleniyor
                                        </div>
                                      )}
                                    </span>
                                  ) : (
                                    <span>
                                      {(redTeam === false ||
                                        blueTeam === false) &&
                                      timer === 0 &&
                                      noAnswer === true ? (
                                        <div>Hiç Cevap gelmedi</div>
                                      ) : (
                                        <div>
                                          {(redTeam && `Kırmızı `) ||
                                            (blueTeam && `Mavi `)}
                                          Takımın Cevabı bekleniyor
                                        </div>
                                      )}
                                    </span>
                                  )}
                                </>
                              )}
                            </div>
                          ) : (
                            <span>
                              Hoşgeldiniz. Lütfen Oyunu Başlatmak için Başlat
                              tuşuna basın
                            </span>
                          )}
                        </h1>
                      </div>
                      <div className="container">
                        <button
                          type="button"
                          onClick={isFirstStart ? startGame : continueGame}
                          className="ml-16"
                          disabled={timerStatus}
                        >
                          {isFirstStart ? 'Oyunu Başlat' : 'Devam Ettir'}
                        </button>
                      </div>
                      <div className="container">
                        <button
                          type="button"
                          onClick={addPointToBlueTeam}
                          disabled={disableBlue}
                        >
                          Mavi Takıma Puan ver
                        </button>
                        {location.state.totalUser === 3 ? null : <hr />}
                        <button
                          type="button"
                          className="ml-16"
                          onClick={addPointToRedTeam}
                          disabled={disableRed}
                        >
                          Kırmızı Takıma Puan ver
                        </button>
                        {location.state.totalUser === 3 ? (
                          <button
                            type="button"
                            className="ml-16"
                            onClick={addPointToGreenTeam}
                            disabled={disableGreen}
                          >
                            Yeşil Takıma Puan ver
                          </button>
                        ) : null}
                      </div>

                      <div className="container">
                        <button
                          type="button"
                          disabled={disableBlue}
                          onClick={removePointToBlue}
                        >
                          Mavi Takımın Puanını Azalt
                        </button>
                        {location.state.totalUser === 3 ? null : <hr />}
                        <button
                          type="button"
                          disabled={disableRed}
                          onClick={removePointToRed}
                          className={
                            location.state.totalUser === 3 ? `ml-16` : ''
                          }
                        >
                          Kırmızı Takımın Puanını Azalt
                        </button>
                        {location.state.totalUser === 3 ? (
                          <button
                            type="button"
                            disabled={disableGreen}
                            onClick={removePointToGreen}
                            className={
                              location.state.totalUser === 3 ? `ml-16` : ''
                            }
                          >
                            Yeşil Takımın Puanını Azalt
                          </button>
                        ) : null}
                      </div>

                      <div className="container">
                        <h1>Skor Tablosu</h1>
                      </div>
                      <div className="container">
                        <h3>
                          Mavi Takım - {location.state.firstUserName} :{' '}
                          {blueTeamPoint}
                        </h3>
                        {location.state.totalUser === 3 ? <hr /> : <hr />}
                        <h3>
                          Kırmızı Takım - {location.state.secondUserName} :{' '}
                          {redTeamPoint}
                        </h3>
                        {location.state.totalUser === 3 ? <hr /> : null}
                        {location.state.totalUser === 3 ? (
                          <h3>
                            Yeşil Takım - {location.state.thirdUserName} :
                          </h3>
                        ) : null}
                      </div>
                    </div>
                  )}
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
