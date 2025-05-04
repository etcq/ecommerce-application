import './_login-menu.scss';

export default function LoginMenu(): React.JSX.Element {
  return (
    <div className="login-menu hidden">
      <div className="login-menu__title">
        <h3>Login please</h3>
      </div>
      <button type="button" className="login-menu__login">
        Login
      </button>
      <button type="button" className="login-menu__register">
        Register
      </button>
    </div>
  );
}
