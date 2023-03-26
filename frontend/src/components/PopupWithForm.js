import { useEffect, useContext } from 'react';
import RenderLoadingContext from '../contexts/RenderLoadingContext';

function PopupWithForm({
  name,
  ariaLable,
  title,
  buttonSubmitText,
  additionalFormClassName,
  isOpen,
  isValid,
  onClose,
  onSubmit,
  children,
}) {
  const isLoading = useContext(RenderLoadingContext);

  const handleEscClose = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

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
      className={`popup section popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
      aria-label={`${ariaLable}`}
      onClick={handlePopupOverlayClick}
    >
      <button
        type="button"
        aria-label="Закрыть"
        className="button button_type_close popup__close"
        onClick={onClose}
      />
      <div className="popup__container">
        <form
          action="some_URL"
          method="get"
          onSubmit={onSubmit}
          className={`form${additionalFormClassName ? ` ${additionalFormClassName}` : ''}`}
          name={`form_type_${name}`}
          noValidate
        >
          <h2 className="form__title">{title}</h2>

          {children}

          {!isLoading && (
            <button
              type="submit"
              className={`button button_type_submit${isValid ? '' : ' button_disabled'}`}
              disabled={!isValid}
            >
              {buttonSubmitText}
            </button>
          )}
          {isLoading && (
            <button type="submit" className="button button_type_submit" disabled>
              Сохранение...
            </button>
          )}
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
