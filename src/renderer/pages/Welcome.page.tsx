/* eslint-disable react/jsx-no-bind */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/input/input';
import icon from '../../../assets/icon.png';

function WelcomePage() {
  const navigate = useNavigate();

  const [firstUser, setFirstUser] = useState('');
  const [secondUser, setSecondUser] = useState('');

  function firstUserSetter(event: React.FormEvent<HTMLInputElement>) {
    event.preventDefault();
    setFirstUser(event.currentTarget.value);
  }

  function secondUserSetter(event: React.FormEvent<HTMLInputElement>) {
    event.preventDefault();
    setSecondUser(event.currentTarget.value);
  }

  function toDirect() {
    navigate('/game', {
      state: {
        firstUserName: firstUser,
        secondUserName: secondUser,
      },
    });
  }

  return (
    <div>
      <div className="container">
        <img width="200px" alt="icon" src={icon} />
      </div>

      <h1>Berke Kırbaş - Ahmet Furkan Akçakaya tarafından yapılmıştır.</h1>
      <form onSubmit={toDirect}>
        <div className="container">
          <Input
            type="text"
            name="first_user"
            placeholder="Oyuncu 1 - Mavi Takım"
            required
            value={firstUser}
            onChange={firstUserSetter}
          />
          <Input
            type="text"
            name="second_user"
            placeholder="Oyuncu 2 - Kırmızı Takım"
            required
            value={secondUser}
            onChange={secondUserSetter}
          />
        </div>
        <div className="container">
          <button type="submit">
            <span role="img" aria-label="books">
              📚
            </span>
            Başla
          </button>
        </div>
      </form>
    </div>
  );
}

export default WelcomePage;
