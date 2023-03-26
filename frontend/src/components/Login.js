import { useContext } from 'react';

import Input from './Input';
import RenderLoadingContext from '../contexts/RenderLoadingContext';
import useFormWithValidation from '../hooks/useFormWithValidation';

function Login({ handleLogin }) {
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  } = useFormWithValidation();

  const isLoading = useContext(RenderLoadingContext);

  function handleSubmit(e) {
    e.preventDefault();

    if (!isValid) {
      return;
    }

    handleLogin(values, resetForm);
  }

  return (
    <main className="content section section_size_narrow">
      <form
        action="some_URL"
        method="get"
        onSubmit={handleSubmit}
        className="form form_type_account"
        name="form_type_login"
        noValidate
      >
        <h2 className="form__title form__title_type_account">Вход</h2>

        <div className="form__inputs-container form__inputs-container_type_account">
          <Input
            type="email"
            placeholder="Email"
            value={values.email || ''}
            error={errors.email}
            onChange={handleChange}
            name="email"
            additionalClassName="form__input_type_account"
            additionalErrorClassName="form__error_type_account"
            minLength="2"
            maxLength="40"
            required
          />

          <Input
            type="password"
            placeholder="Пароль"
            value={values.password || ''}
            error={errors.password}
            onChange={handleChange}
            name="password"
            additionalClassName="form__input_type_account"
            additionalErrorClassName="form__error_type_account"
            minLength="2"
            maxLength="200"
            required
          />
        </div>

        {!isLoading && (
          <button
            type="submit"
            className="button button_type_submit button_color_white"
            disabled={!isValid}
          >
            Войти
          </button>
        )}
        {isLoading && (
          <button type="submit" className="button button_type_submit button_color_white" disabled>
            Авторизация...
          </button>
        )}
      </form>
    </main>
  );
}

export default Login;
