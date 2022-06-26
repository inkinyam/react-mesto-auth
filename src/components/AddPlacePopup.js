import React from "react";
import PopupWithForm from "./PopupWithForm.js";

const AddPlacePopup = ({isOpen, onClose, onAddPlace}) => {
  /* создаем ref для инпутов*/
  const cardName = React.useRef();
  const cardLink = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({
          cardName: cardName.current.value,
          link: cardLink.current.value
        });
        
    /*закрываем и очищаем форму*/    
    onClose();
    cardName.current.value='';
    cardLink.current.value='';
  }

  return (
    <PopupWithForm  name = 'add' 
      title   = 'Новое место'
      btnText = 'Сохранить'
      isOpen  = {isOpen}
      onClose = {onClose}
      onSubmit = {handleSubmit}>
      
      <input ref={cardName} type="text" className="popup__item popup__item_el_name" id="add-form__name" name="popup_title" placeholder="Название места" minLength="2" maxLength="30" required />
      <span className="popup__span-error add-form__name-error"></span>

      <input ref={cardLink} type="url" className="popup__item popup__item_el_link" id="add-form__link"  name="popup_sutitle" placeholder="Ссылка на картинку" required />
      <span className="popup__span-error add-form__link-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;