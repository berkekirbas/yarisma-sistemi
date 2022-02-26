/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/input/input';
import icon from '../../../assets/icon.png';

function WelcomePage() {
  const navigate = useNavigate();

  const [firstUser, setFirstUser] = useState('');
  const [secondUser, setSecondUser] = useState('');
  const [thirdUser, setThirdUser] = useState('');
  const [userCount, setUserCount] = useState(2);

  function firstUserSetter(event: React.FormEvent<HTMLInputElement>) {
    event.preventDefault();
    setFirstUser(event.currentTarget.value);
  }

  function secondUserSetter(event: React.FormEvent<HTMLInputElement>) {
    event.preventDefault();
    setSecondUser(event.currentTarget.value);
  }

  function thirdUserSetter(event: React.FormEvent<HTMLInputElement>) {
    event.preventDefault();
    setThirdUser(event.currentTarget.value);
  }

  function toDirect() {
    navigate('/game', {
      state: {
        firstUserName: firstUser,
        secondUserName: secondUser,
        thirdUserName: thirdUser,
        totalUser: userCount,
      },
    });
  }

  function onChangeUserCount(event: React.FormEvent<HTMLInputElement>) {
    setUserCount(parseInt(event.currentTarget.value, 10));
  }

  return (
    <div>
      <div className="container">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1>Berke Kırbaş ve Ahmet Furkan Akçakaya tarafından hazırlanmıştır</h1>
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
          {userCount === 3 ? (
            <Input
              type="text"
              name="third_user"
              placeholder="Oyuncu 3 - Yeşil Takım"
              required
              value={thirdUser}
              onChange={thirdUserSetter}
            />
          ) : null}
        </div>
        <div className="container">
          <div className="wrapper">
            <input
              type="radio"
              name="select"
              id="option-1"
              onChange={onChangeUserCount}
              value={2}
            />
            <input
              type="radio"
              name="select"
              onChange={onChangeUserCount}
              id="option-2"
              value={3}
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="option-1" className="option option-1">
              <span>2 Oyuncu</span>
            </label>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="option-2" className="option option-2">
              <span>3 Oyuncu</span>
            </label>
          </div>
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
