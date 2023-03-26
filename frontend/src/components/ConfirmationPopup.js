import PopupWithForm from './PopupWithForm';

function ConfirmationPopup({
  isOpen, onClose, card, onCardDelete,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(card);
  }

  return (
    isOpen && (
    <PopupWithForm
      name="confirmation"
      title="Вы уверены?"
      ariaLable="Всплывающее окно: Подтвердить удаление карточки"
      additionalFormClassName="form_type_confirmation"
      isOpen={isOpen}
      onClose={onClose}
      isValid="true"
      onSubmit={handleSubmit}
      buttonSubmitText="Да"
    />
    )
  );
}

export default ConfirmationPopup;
