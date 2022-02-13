import { useNavigate } from 'react-router-dom';
import Input from '../components/input/input';
import icon from '../../../assets/icon.svg';

function WelcomePage() {
  const navigate = useNavigate();

  function toDirect() {
    navigate('/game');
  }

  return (
    <div>
      <div className="container">
        <img width="200px" alt="icon" src={icon} />
      </div>

      <h1>Berke Kırbaş - Ahmet Furkan Akçakaya tarafından yapılmıştır.</h1>
      <form>
        <div className="container">
          <Input type="text" name="first_user" placeholder="Oyuncu 1" />
          <Input type="text" name="second_user" placeholder="Oyuncu 2" />
        </div>
        <div className="container">
          <button onClick={toDirect} type="button">
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
