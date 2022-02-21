/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Howl } from 'howler';

import KEYBOARD_KEYS from 'renderer/utils/keyboard_keys';

function GamePage() {
  const navigate = useNavigate();
  const location: any = useLocation();

  const sound = new Howl({
    src: ['../../../assets/correct_answer.mp3'],
  });

  const [gameStatus, setGameStatus] = useState(false);
  const [endGame, setEndGame] = useState(false);

  const [timerStatus, setTimerStatus] = useState(false);
  const [timer, setTimer] = useState(0);

  const [redTeam, setRedTeam] = useState(false);
  const [redTeamPoint, setRedTeamPoint] = useState(0);

  const [blueTeam, setBlueTeam] = useState(false);
  const [blueTeamPoint, setBlueTeamPoint] = useState(0);

  const [isFirstStart, setFirstStart] = useState(true);
  const [noAnswer, setNoAnswer] = useState(true);

  const [disableBlue, setDisableBlue] = useState(true);
  const [disableRed, setDisableRed] = useState(true);

  const [gameOverForRed, setGameOverForRed] = useState(false);
  const [gameOverForBlue, setGameOverForBlue] = useState(false);

  const [redTeamWrongCount, setRedTeamWrongCount] = useState(0);
  const [blueTeamWrongCount, setBlueTeamWrongCount] = useState(0);

  const [redTeamWonTheGame, setRedTeamWonTheGame] = useState(false);
  const [blueTeamWonTheGame, setBlueTeamWonTheGame] = useState(false);

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
    sound.play();
    setTimer(5);
    setTimerStatus(true);
    setNoAnswer(false);
  }

  function addPointToRedTeam() {
    setRedTeamPoint(redTeamPoint + 1);
    setRedTeam(false);
    setDisableRed(true);
    setTimer(5);
    setTimerStatus(true);
    setNoAnswer(false);
  }

  function continueGame() {
    setBlueTeam(false);
    setRedTeam(false);
    setDisableBlue(true);
    setDisableRed(true);
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
    document.addEventListener('keydown', handleKeys);
    setTimerStatus(true);
    setNoAnswer(false);
  }

  function removePointToRed() {
    setRedTeamWrongCount(redTeamWrongCount + 1);
    setRedTeamPoint(redTeamPoint - 1);
    setRedTeam(false);
    setDisableRed(true);
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
  }, [blueTeamWrongCount, redTeamWrongCount]);

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
  }, [blueTeamPoint, redTeamPoint]);

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
      (redTeam === false || blueTeam === false) &&
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
      (redTeam === false || blueTeam === false) &&
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
          {blueTeamWonTheGame || redTeamWonTheGame ? (
            <div>
              <h1 className="container">
                {(blueTeamWonTheGame &&
                  `Mavi Takım - ${location.state.firstUserName} Bu Turu Geçti`) ||
                  (redTeamWonTheGame &&
                    `Kırmızı Takım - ${location.state.secondUserName} Bu Turu Geçti`)}
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
                    {(gameOverForBlue &&
                      `Mavi Takım - ${location.state.firstUserName} Oyunu Kaybetti`) ||
                      (gameOverForRed &&
                        `Kırmızı Takım - ${location.state.secondUserName} Oyunu Kaybetti`)}
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
                                <span>
                                  {(redTeam === false || blueTeam === false) &&
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
                          onClick={addPointToBlueTeam}
                          disabled={disableBlue}
                        >
                          Mavi Takıma Puan ver
                        </button>
                        <button
                          type="button"
                          onClick={isFirstStart ? startGame : continueGame}
                          className="ml-16"
                          disabled={timerStatus}
                        >
                          {isFirstStart ? 'Oyunu Başlat' : 'Devam Ettir'}
                        </button>
                        <button
                          type="button"
                          className="ml-16"
                          onClick={addPointToRedTeam}
                          disabled={disableRed}
                        >
                          Kırmızı Takıma Puan ver
                        </button>
                      </div>

                      <div className="container">
                        <button
                          type="button"
                          disabled={disableBlue}
                          onClick={removePointToBlue}
                        >
                          Mavi Takımın Puanını Azalt
                        </button>
                        <hr />
                        <button
                          type="button"
                          disabled={disableRed}
                          onClick={removePointToRed}
                        >
                          Kırmızı Takımın Puanını Azalt
                        </button>
                      </div>

                      <div className="container">
                        <h1>Skor Tablosu</h1>
                      </div>
                      <div className="container">
                        <h3>
                          Mavi Takım - {location.state.firstUserName} :{' '}
                          {blueTeamPoint}
                        </h3>
                        <hr />
                        <h3>
                          Kırmızı Takım - {location.state.secondUserName} :{' '}
                          {redTeamPoint}
                        </h3>
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
