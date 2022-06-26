import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js';

import ProtectedRoute from './ProtectedRoute.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import UpdateAvatarPopup from './UpdateAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js'
import Login from './Login.js';


import api from "../utils/api.js";
import { CurrentUserContext } from '../context/CurrentUserContext.js'; 


const App = () => {
  /*установка контекста для пользователя*/
  const [currentUser, getCurrentUser] = React.useState({name: '', about: '', avatar: ''});

  React.useEffect(()=>{
    api.getUserData()
      .then((userData)=>{
        getCurrentUser(userData);
      })
      .catch((err) => console.error(err));
  }, []);

  /* хуки на открытие попапов */
  const [isEditProfilePopupOpen, openEditPopup]          = React.useState(false);
  const [isAddPlacePopupOpen, openAddPopup]              = React.useState(false);
  const [isUpdateAvatarPopupOpen, openUpdateAvatarPopup] = React.useState(false);

  //const [loggedIn, handleLogin]                          = React.useState(false); //cтейт для отслеживания залогинился ли пользователь
  const loggedIn = false;

  /*хук на определение выбранной карточки*/
  const [selectedCard, setSelectedCard]                  = React.useState({name: '', link: ''});

  /*хук карточек*/ 
  const [cards, setCards] = React.useState([]);
    



  /* обработчики  */
  const handleOpenEditPopup = ()=> {
    openEditPopup(true);
  }

  const handleOpenAddPopup = ()=> {
    openAddPopup(true);
  }

  const handleOpenUpdateAvatarPopup = ()=> {
    openUpdateAvatarPopup(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  /*функция на закрытие попапов*/
  const closeAllPopups = () => {
    openEditPopup(false);
    openAddPopup(false);
    openUpdateAvatarPopup(false);
    setSelectedCard({name: '', link: ''});
  }

  /*функция обновления данных пользователя через api*/
  const handleUpdateUser = ({name, about}) => {
    api.postUserData(name, about)
      .then((userData)=>{
        getCurrentUser(userData);
      })
      .catch((err) => console.error(err));
  }

  /*функция обновления аватара пользователя через api*/
  const handleUpdateAvatar = (avatar) => {
    api.postUserPhoto(avatar)
      .then((userData)=>{
        getCurrentUser(userData);
      })
      .catch((err) => console.error(err));
  }

  /*получаем карточки с api*/ 
  React.useEffect(()=>{
    api.getCards()
      .then((cardsData)=>{
        setCards(cardsData);
      })
      .catch((err) => console.error(err));
  }, [])

  const renewCards = (newCard, id) => {
    setCards((state) => state.map((c) => c._id === id ? newCard : c));
  }

  /* обработчик нажатия кнопки лайк на карточке*/ 
  const handleCardLike = (card) => {
     const isLiked = card.likes.some(i => i._id === currentUser._id);

    /*в соответствии с вернувшимся результатом вызываем нужный метод api*/
    if (isLiked) {
      api.deleteLike(card._id, !isLiked)
        .then((newCard) => {
          renewCards(newCard, card._id)
        })
        .catch((err) => console.error(err));
    } else {
      api.putLike(card._id, isLiked)
        .then((newCard) => {
          renewCards(newCard, card._id)
        })
        .catch((err) => console.error(err));
      }
  }

  /* обработчик нажатия кнопки удаления на карточке*/ 
  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then (()=>{
        setCards((state) => state.filter((c)=>c._id !== card._id))
      })
      .catch((err) => console.error(err));
  }

  /*обработчик добавления нового фото*/

  const handleAddPlaceSubmit = ({cardName, link}) => {
    api.postCard(cardName, link)
      .then((newCard)=>{
        setCards([newCard, ...cards])
      })
      .catch((err) => console.error(err));
  }
  
/* возвращаемый объект */
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header />
          <Switch>
            <ProtectedRoute path="/main"  
                            loggedIn={loggedIn} 
                            onEditProfile     = {handleOpenEditPopup}
                            onAddPlace        = {handleOpenAddPopup} 
                            onEditAvatar      = {handleOpenUpdateAvatarPopup}
                            onCardClick       = {handleCardClick}
                            cards             = {cards}
                            onCardLikeClick   = {handleCardLike}
                            onCardDeleteClick = {handleCardDelete}
                            component={Main} />

{/*             <Route path="/sign-up">
              <Register />
            </Route> */}

            <Route path="/sign-in">
              <Login />
            </Route>
            <Route exact path="/">
              {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
        
          <Footer />
 
          <EditProfilePopup isOpen       = {isEditProfilePopupOpen} 
                            onClose      = {closeAllPopups} 
                            onUpdateUser = {handleUpdateUser} /> 


          <UpdateAvatarPopup isOpen={isUpdateAvatarPopupOpen} 
                             onClose={closeAllPopups} 
                             onUpdateAvatar={handleUpdateAvatar} />


          <AddPlacePopup isOpen = {isAddPlacePopupOpen} 
                         onClose = {closeAllPopups} 
                         onAddPlace = {handleAddPlaceSubmit}/>


          <ImagePopup card    = {selectedCard}
                      onClose = {closeAllPopups}/>
        </div>
      </div>
      </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
