import { useEffect } from 'react';

function ImagePopup({ onClose, isOpen, card }) {
  function handleEscClose(e) {
    if (e.key === 'Escape') {
      onClose();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [isOpen]);

  function handlePopupOverlayClick(e) {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }

  return (
    <section
      className={`popup section popup_type_image ${isOpen ? 'popup_opened' : ''}`}
      aria-label="Всплывающее окно: Просмотр карточки"
      onClick={handlePopupOverlayClick}
    >
      <button
        type="button"
        aria-label="Закрыть"
        className="button button_type_close popup__close"
        onClick={onClose}
      />
      <figure className="popup__image-container">
        <img className="popup__image" src={card.link} alt={card.name} />
        <figcaption className="popup__image-caption">{card.name}</figcaption>
      </figure>
    </section>
  );
}

export default ImagePopup;
