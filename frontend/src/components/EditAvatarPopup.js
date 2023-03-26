import PopupWithForm from './PopupWithForm';
import useFormWithValidation from '../hooks/useFormWithValidation';
import Input from './Input';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const {
    values, handleChange, errors, isValid, resetForm,
  } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(values);
    resetForm();
  }

  return (
    isOpen && (
    <PopupWithForm
      name="new-avatar"
      title="Обновить аватар"
      ariaLable="Всплывающее окно: Изменить аватар"
      isOpen={isOpen}
      onClose={onClose}
      isValid={isValid}
      onSubmit={handleSubmit}
      buttonSubmitText="Сохранить"
    >
      <div className="form__inputs-container">
        <Input
          type="url"
          placeholder="Ссылка на картинку"
          additionalClassName="form__input_type_popup"
          value={values.avatarLink || ''}
          error={errors.avatarLink}
          onChange={handleChange}
          name="avatarLink"
          required
        />
      </div>
    </PopupWithForm>
    )
  );
}

export default EditAvatarPopup;
