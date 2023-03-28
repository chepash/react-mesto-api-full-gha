import PopupWithForm from './PopupWithForm';
import useFormWithValidation from '../hooks/useFormWithValidation';
import Input from './Input';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const {
    values, handleChange, errors, isValid, resetForm,
  } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace(values);
    resetForm();
  }

  return (
    isOpen && (
    <PopupWithForm
      name="new-card"
      title="Новое место"
      ariaLable="Всплывающее окно: Добавить карточку"
      isOpen={isOpen}
      onClose={onClose}
      isValid={isValid}
      onSubmit={handleSubmit}
      buttonSubmitText="Создать"
    >
      <div className="form__inputs-container">
        <Input
          type="text"
          placeholder="Название"
          additionalClassName="form__input_type_popup"
          value={values.placeName || ''}
          error={errors.placeName}
          onChange={handleChange}
          name="placeName"
          minLength="2"
          maxLength="30"
          required
        />

        <Input
          type="url"
          placeholder="Ссылка на картинку"
          additionalClassName="form__input_type_popup"
          value={values.placeLink || ''}
          error={errors.placeLink}
          onChange={handleChange}
          name="placeLink"
          required
        />
      </div>
    </PopupWithForm>
    )
  );
}

export default AddPlacePopup;
