import { useEffect, useState } from 'react';
import KEYBOARD_KEYS from 'renderer/types/keyboard_keys';

function GamePage() {
  const [isStarted, setStatus] = useState(false);
  const [isFirstStart, setIsFirstStart] = useState(true);

  const [counterIsStarted, setCounterIsStarted] = useState(false);
  const [counter, setCounter] = useState(0);

  const [isUserClickButton, setUserIsClickedButton] = useState(false);

  const [redTeam, setRedTeam] = useState(false);
  const [blueTeam, setBlueTeam] = useState(false);

  function handleKeys(event: { key: string }) {
    if (
      event.key === KEYBOARD_KEYS.OGRETMEN_BASLATMA_BUTONU &&
      isStarted === false
    ) {
      document.removeEventListener('keydown', handleKeys, false);
      setCounter(5);
      setStatus(true);
      setCounterIsStarted(true);
    } else if (
      event.key === KEYBOARD_KEYS.OGRETMEN_BASLATMA_BUTONU &&
      isStarted === true &&
      counterIsStarted === false &&
      isUserClickButton === true
    ) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      continueGame();
    } else if (
      event.key === KEYBOARD_KEYS.OYUNCU_KIRMIZI_TAKIM_BUTONU ||
      (event.key === KEYBOARD_KEYS.OYUNCU_MAVI_TAKIM_BUTONU &&
        isStarted &&
        counterIsStarted === true)
    ) {
      setUserIsClickedButton(true);
      if (event.key === KEYBOARD_KEYS.OYUNCU_KIRMIZI_TAKIM_BUTONU) {
        setRedTeam(true);
      }
    }
  }

  function continueGame() {
    // eslint-disable-next-line no-console
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeys);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions

    if (counterIsStarted && counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    } else if (counter === 0) {
      setCounterIsStarted(false);
      document.addEventListener('keydown', handleKeys);
      if (isStarted && counter === 0 && !isFirstStart) {
        setCounter(15);
        setCounterIsStarted(true);
      }
      if (isFirstStart && isStarted && counter === 0) {
        setIsFirstStart(false);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter, counterIsStarted]);

  return (
    <div>
      {isStarted ? (
        <div className="container">
          {counterIsStarted && isFirstStart && counter > 0 ? (
            <h1>{counter}</h1>
          ) : null}

          {isFirstStart ? null : (
            <div>
              <h2>Kullanıcılardan soru için cevap bekleniyor</h2>
              <h3 className="container">{counter}</h3>
            </div>
          )}
        </div>
      ) : (
        <div className="container">
          <h4>
            Yarışma Sistemi Ana ekranına hoşgeldiniz. Oyunun başlaması için
            öğretmenin başlatma butonuna basması gerekmektedir.
          </h4>
        </div>
      )}
    </div>
  );
}

export default GamePage;
