import { useEffect } from 'react';
import successLogo from '../images/sign-up_success.svg';
import failLogo from '../images/sign-up_fail.svg';

function InfoTooltip({ isOpen, isRegOk, onClose }) {
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
      className={`popup section ${isOpen ? 'popup_opened' : ''}`}
      aria-label={
        isRegOk ? 'Всплывающее окно: Регистрация успешна' : 'Всплывающее окно: Что-то пошло не так'
      }
      onClick={handlePopupOverlayClick}
    >
      <button
        type="button"
        aria-label="Закрыть"
        className="button button_type_close popup__close"
        onClick={onClose}
      />
      <div className="popup__container">
        <img src={isRegOk ? successLogo : failLogo} alt="Логотип" className="popup__logo" />
        <h2 className="popup__text">
          {isRegOk ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
