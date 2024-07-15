(()=>{"use strict";var e={d:(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{T:()=>f});var t={baseUrl:"https://nomoreparties.co/v1/wff-cohort-18",headers:{authorization:"bd5bec3d-633a-49cb-9f54-22ded73cd96e","Content-Type":"application/json"}},r=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},n=function(e){var t=e.userId,r=e.dataCard,n=e.confirmDeleteCard,o=e.likeCard,a=e.openPopupImage,c=f.querySelector(".places__item").cloneNode(!0),i=c.querySelector(".card__image"),u=c.querySelector(".card__delete-button"),l=c.querySelector(".card__like-button"),s=c.querySelector(".card__counter-like");return c.id=r._id,c.querySelector(".card__title").textContent=r.name,i.src=r.link,i.alt=r.name,s.textContent=r.likes.length,r.likes.some((function(e){return e._id===t}))&&l.classList.add("card__like-button_is-active"),r.owner._id===t?u.addEventListener("click",(function(e){n(r._id)})):u.remove(),l.addEventListener("click",(function(e){o(e,r._id,s)})),i.addEventListener("click",(function(){a(r.name,r.link)})),c},o=function(e,n,o){e.target.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(t.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:t.headers}).then(r)}(n).then((function(t){e.target.classList.remove("card__like-button_is-active"),o.textContent=t.likes.length})).catch((function(e){console.log("ошибка удаления лайка:",e)})):function(e){return fetch("".concat(t.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:t.headers}).then(r)}(n).then((function(t){e.target.classList.add("card__like-button_is-active"),o.textContent=t.likes.length})).catch((function(e){console.log("ошибка удобавления лайка:",e)}))};function a(e){e.classList.add("popup_is-opened"),document.body.style.overflow="hidden",document.addEventListener("keydown",i)}function c(e){e.classList.remove("popup_is-opened"),document.body.style.overflow="",document.removeEventListener("keydown",i)}function i(e){"Escape"===e.code&&c(document.querySelector(".popup_is-opened"))}var u=function(e,t,r){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(r.inputErrorClass),n.classList.remove(r.errorClass),n.textContent=""},l=function(e,t,r){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(r.inactiveButtonClass),t.removeAttribute("disabled",!1)):(t.classList.add(r.inactiveButtonClass),t.setAttribute("disabled",!0))},s=function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);r.textContent="",l(r,n,t.inactiveButtonClass),r.forEach((function(r){u(e,r,t.inputErrorClass,t.errorClass),r.setCustomValidity(""),r.classList.remove(t.inputErrorClass)}))};function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}var p,f=document.querySelector("#card-template").content,_=document.querySelector(".content").querySelector(".places__list"),m=document.querySelector(".profile__title"),y=document.querySelector(".profile__description"),v=document.querySelector(".profile__image"),h=document.querySelector(".popup_type_avatar"),b=document.querySelectorAll(".popup"),S=document.querySelector(".popup_type_edit"),C=S.querySelector(".popup__form"),g=C.querySelector(".popup__input_type_name"),q=C.querySelector(".popup__input_type_description"),E=document.querySelector(".popup_type_new-card"),k=E.querySelector(".popup__form"),L=k.querySelector(".popup__input_type_card-name"),x=k.querySelector(".popup__input_type_url"),A=document.querySelector(".popup_type_image"),I=document.querySelector(".popup__image"),w=document.querySelector(".popup__caption"),P=document.querySelector(".profile__edit-button"),U=document.querySelector(".profile__add-button"),O=document.forms["edit-profile"],j=document.forms["new-place"],D=document.forms["edit-avatar"],T=document.querySelector(".popup_type_alert"),B=T.querySelector(".popup__button-alert"),M={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",errorVisible:".popup__error_visible",inputErrorVisible:".popup__input_type_error",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},V=function(e,t){t.textContent=e?"Сохранение...":"Сохранить"},N=function(e){a(T),T.dataset.cardId=e};B.addEventListener("click",(function(){var e;(e=T.dataset.cardId,fetch("".concat(t.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:t.headers}).then(r)).then((function(e){console.log(e),document.getElementById(T.dataset.cardId).remove(),c(T)})).catch((function(e){console.log(e)}))})),C.addEventListener("submit",(function(e){var n;e.preventDefault(),V(!0,O.querySelector(".popup__button")),(n={name:O.name.value,about:O.description.value},fetch("".concat(t.baseUrl,"/users/me"),{method:"PATCH",headers:t.headers,body:JSON.stringify({name:n.name,about:n.about})}).then(r)).then((function(e){m.textContent=e.name,y.textContent=e.about,c(S)})).catch((function(e){console.log("ошибка изменения данных пользователя:",e)}))})),P.addEventListener("click",(function(){C.reset(),g.value=m.textContent,q.value=y.textContent,a(S),s(C,M)})),k.addEventListener("submit",(function(e){var a;e.preventDefault(),V(!0,j.querySelector(".popup__button")),(a={name:L.value,link:x.value},fetch("".concat(t.baseUrl,"/cards"),{method:"POST",headers:t.headers,body:JSON.stringify(a)}).then(r)).then((function(e){var t=n({userId:p,dataCard:e,confirmDeleteCard:N,likeCard:o,openPopupImage:J});_.prepend(t),k.reset(),c(E)})).catch((function(e){console.log("ошибка добавления карточки:",e)}))})),U.addEventListener("click",(function(){k.reset(),a(E),s(k,M)})),D.addEventListener("submit",(function(e){var n;e.preventDefault(),V(!0,D.querySelector(".popup__button")),(n={link:D.link.value},fetch("".concat(t.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:t.headers,body:JSON.stringify({avatar:n.link})}).then(r)).then((function(e){v.style.backgroundImage="url(".concat(e.avatar,")"),c(h)})).catch((function(e){console.log("ошибка добавления аватара:",e)}))})),v.addEventListener("click",(function(){D.reset(),s(D,M),a(h)}));var J=function(e,t){I.src=t,I.alt=e,w.textContent=e,a(A)};b.forEach((function(e){e.addEventListener("click",(function(t){(t.target===e||t.target.classList.contains("popup__close"))&&c(document.querySelector(".popup_is-opened"))}))})),Promise.all([fetch("".concat(t.baseUrl,"/cards"),{headers:t.headers}).then(r),fetch("".concat(t.baseUrl,"/users/me"),{headers:t.headers}).then(r)]).then((function(e){var t,r,a=(r=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a,c,i=[],u=!0,l=!1;try{if(a=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=a.call(r)).done)&&(i.push(n.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=r.return&&(c=r.return(),Object(c)!==c))return}finally{if(l)throw o}}return i}}(t,r)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?d(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=a[0],i=a[1];m.textContent=i.name,y.textContent=i.about,v.src=i.avatar,v.style.backgroundImage="url(".concat(i.avatar,")"),p=i._id,c.forEach((function(e){var t=n({userId:p,dataCard:e,confirmDeleteCard:N,likeCard:o,openPopupImage:J});_.append(t)}))})).catch((function(e){console.log("ошибка передачи карточки:",e)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);l(r,n,t),r.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?u(e,t,r):function(e,t,r,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),t.validity.valueMissing?o.textContent="Вы пропустили это поле":o.textContent=r,o.classList.add(n.errorClass)}(e,t,t.validationMessage,r)}(e,o,t),l(r,n,t)}))}))}(t,e)}))}(M)})();
//# sourceMappingURL=main.js.map