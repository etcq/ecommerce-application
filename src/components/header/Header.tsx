import './_header.scss';
import logoImg from '../../assets/images/header/logo.png';
import userImg from '../../assets/images/header/user.svg';
import bucketImg from '../../assets/images/header/shape.svg';

export default function Header(): React.JSX.Element {
  return (
    <div className="container">
      <header className="header">
        <div className="header__logo">
          <img src={logoImg} className="header__logo-img" alt="SneakHub" />
          <span className="header__logo-title">SNEAKHUB</span>
        </div>
        <ul className="nav__menu">
          <li className="nav__menu-item">
            <a href="#">Home</a>
          </li>
          <li className="nav__menu-item">
            <a href="#">Catalog</a>
          </li>
          <li className="nav__menu-item">
            <a href="#">About Us</a>
          </li>
        </ul>
        <div className="header__user">
          <div className="header__user-login">
            <img src={userImg}></img>
          </div>
          <div className="header__user-bucket">
            <img src={bucketImg}></img>
          </div>
        </div>
      </header>
    </div>
  );
}
