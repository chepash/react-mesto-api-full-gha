import { useContext } from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
  onDeleteBtnClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content section section_size_narrow page__content">
      <section className="profile section content__section" aria-label="Профиль автора">
        <div className="profile__avatar-overlay" onClick={onEditAvatar}>
          <img src={currentUser.avatar} alt="Картинка профиля" className="profile__avatar" />
        </div>

        <div className="profile__info">
          <p className="profile__name">{currentUser.name}</p>
          <p className="profile__about">{currentUser.about}</p>
          <button
            type="button"
            aria-label="Редактировать"
            className="button button_type_edit"
            onClick={onEditProfile}
          />
        </div>
        <button type="button" className="button button_type_add" onClick={onAddPlace} />
      </section>

      <section className="elements section content__section" aria-label="Фотографии">
        <ul className="elements__list page__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              onDeleteBtnClick={onDeleteBtnClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
