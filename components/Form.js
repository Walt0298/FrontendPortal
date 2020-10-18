import React from "react";
import PropTypes from "prop-types";

const Form = ({ isLogin, errorMessage, onSubmit }) => (
  <form onSubmit={onSubmit} className="login">
    <img src="/logo.png" className="login__image" />
    <label>
      <span className="login__title">
        {isLogin ? "Iniciar sesion" : "Registrarse"}
      </span>
      {!isLogin ? (
        <>
          <div className="input">
            <img
              src="https://img.icons8.com/cotton/64/000000/business-contact.png"
              className="login__icon"
            />
            <input
              type="text"
              autoComplete="name"
              name="name"
              placeholder="Tu Nombre"
              className="login__input"
            ></input>
          </div>
          <div className="input">
            <img
              src="https://img.icons8.com/cotton/64/000000/company.png"
              className="login__icon"
            />
            <input
              type="text"
              name="company"
              placeholder="Empresa"
              required
              className="login__input"
            />
          </div>
          <div className="input">
            <img
              src="https://img.icons8.com/cotton/64/000000/gender-neutral-user--v1.png"
              className="login__icon"
            />
            <input
              type="text"
              name="photo"
              placeholder="Link a una foto tuya o un avatar"
              className="login__input"
            />
          </div>
        </>
      ) : null}
      <div className="input">
        <img
          src="https://img.icons8.com/cotton/64/000000/correspondence.png"
          className="login__icon"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="login__input"
        />
      </div>
      <div className="input">
        <img
          src="https://img.icons8.com/cotton/64/000000/key--v3.png"
          className="login__icon"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          required
          className="login__input"
        />
      </div>
    </label>

    <button type="submit" className="login__button">
      {isLogin ? "Ingresar" : "Registrar"}
    </button>

    {errorMessage && <p className="error">{errorMessage}</p>}

    <style jsx>{`
      .input {
        display: flex;
      }
      .login__icon {
        width: 64px;
      }
      .login {
        margin: auto;
        width: 400px;
      }
      .login__title {
        font-size: 40px;
        text-align: center;
        margin: 0px 10px 30px 0px;
      }
      .login__image {
        width: 300px;
        height: auto;
        margin: 0px 50px;
        animation: logo 5s;
      }
      @keyframes logo {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      .login__input {
        margin: 10px 20px;
        width: 100%;
        outline: none;
        border: 1px solid black;
      }
      .error {
        color: brown;
        margin: 1rem 0 0;
      }
      .login__button {
        background: black;
        margin: 20px;
        height: 50px;
        color: white;
        font-size: 20px;
        letter-spacing: 5px;
        border-radius: 30px;
        outline: none;
        border: none;
        cursor: pointer;
        transition: 1s;
      }
      .login__button:hover {
        background: #ff6600;
      }
    `}</style>
  </form>
);

export default Form;

Form.propTypes = {
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func,
  isLogin: PropTypes.bool,
};
