import { useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import Input from './Input';
import CurrentUserContext from '../contexts/CurrentUserContext';

import useFormWithValidation from '../hooks/useFormWithValidation';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const {
    values, handleChange, errors, isValid, resetForm,
  } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({ name: currentUser.name, about: currentUser.about, ...values });
  }

  useEffect(() => {
    resetForm({ name: currentUser.name, about: currentUser.about }, {}, true);
  }, [isOpen, currentUser]);

  return (
    isOpen && (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      ariaLable="Всплывающее окно: Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      isValid={isValid}
      onSubmit={handleSubmit}
      buttonSubmitText="Сохранить"
    >
      <div className="form__inputs-container">
        <Input
          type="text"
          placeholder="Имя пользователя"
          additionalClassName="form__input_type_popup"
          value={values.name || ''}
          error={errors.name}
          onChange={handleChange}
          name="name"
          minLength="2"
          maxLength="40"
          required
        />

        <Input
          type="text"
          placeholder="Деятельность"
          additionalClassName="form__input_type_popup"
          value={values.about || ''}
          error={errors.about}
          onChange={handleChange}
          name="about"
          minLength="2"
          maxLength="200"
          required
        />
      </div>
    </PopupWithForm>
    )
  );
}

export default EditProfilePopup;
