(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e,t){e.every((function(e){return e.validity.valid}))?(t.removeAttribute("disabled"),t.classList.remove("popup__button_type_disabled")):(t.setAttribute("disabled",0),t.classList.add("popup__button_type_disabled"))}function n(e){e.classList.add("popup_is-opened"),e.querySelector(".popup__form")&&function(e){var n=e.querySelector(".popup__form");t(Array.from(n.querySelectorAll(".popup__input")),n.querySelector(".popup__button"))}(e),document.addEventListener("keydown",o),e.addEventListener("click",c)}function r(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o),e.removeEventListener("click",c)}function o(e){"Escape"===e.key&&r(document.querySelector(".popup_is-opened"))}function c(e){e.target.classList.contains("popup_is-opened")&&r(e.target)}function a(e){var t=v.cloneNode(!0),r=t.querySelector(".card__image"),o=t.querySelector(".card__title"),c=t.querySelector(".card__delete-button"),a=t.querySelector(".card__like-button"),i=t.querySelector(".card__like-count"),s=x.querySelector(".popup__image"),l=x.querySelector(".popup__caption");return o.textContent=e.name,r.src=e.link,r.alt=e.name,i.textContent=e.likes.length,e.likes.some((function(e){return e._id===u}))&&a.classList.add("card__like-button_is-active"),a.addEventListener("click",(function(t){var n=t.target.classList.contains("card__like-button_is-active");f(n?"DELETE":"PUT",i,e._id,t)})),e.owner._id!==u&&c.remove(),c.addEventListener("click",(function(t){m(e._id,t)})),r.addEventListener("click",(function(){s.src=r.src,l.textContent=o.textContent,n(x)})),t}e.d({},{Tp:()=>v,y6:()=>x,J3:()=>u});var u,i,s={baseUrl:"https://nomoreparties.co/v1/apf-cohort-202",headers:{authorization:"703cdbc7-14dc-4943-885f-99acf17a3a17","Content-Type":"application/json"}},l=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},p=function(e){return console.log("Ошибка: ".concat(e))},d=function(e){var t=e.querySelector(".button");t.dataset.defaultText=t.textContent,t.textContent="Сохранение...",t.disabled=!0},_=function(e){var t=e.querySelector(".button");t.textContent="Сохранить",t.disabled=!1},f=function(e,t,n,r){fetch("".concat(s.baseUrl,"/cards/likes/").concat(n),{method:e,headers:s.headers}).then(l).then((function(e){t.textContent=e.likes.length,r.target.classList.toggle("card__like-button_is-active")})).catch(p)},m=function(e,t){fetch("".concat(s.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:s.headers}).then(l).then((function(){t.target.closest(".card").remove()})).catch(p)},y=document.querySelector(".places__list"),v=document.querySelector("#card-template").content,h=document.querySelectorAll(".popup__close"),b=document.querySelector(".popup_type_edit"),S=b.querySelector(".popup__form"),q=b.querySelector(".popup__input_type_name"),E=b.querySelector(".popup__input_type_description"),L=document.querySelector(".popup_type_new-card"),C=L.querySelector(".popup__form"),k=L.querySelector(".popup__input_type_card-name"),g=L.querySelector(".popup__input_type_url"),x=document.querySelector(".popup_type_image"),T=document.querySelector(".popup_type_avatar"),A=T.querySelector(".popup__form"),U=T.querySelector(".popup__input_type_avatar-url"),O=document.querySelector(".profile__edit-button"),P=document.querySelector(".profile__add-button"),D=document.querySelector(".profile__title"),j=document.querySelector(".profile__description"),w=document.querySelector(".profile__image");b.classList.add("popup_is-animated"),L.classList.add("popup_is-animated"),x.classList.add("popup_is-animated"),fetch("".concat(s.baseUrl,"/users/me"),{method:"GET",headers:s.headers}).then(l).then((function(e){return e._id})).catch(p).then((function(e){u=e,function(e){fetch("".concat(s.baseUrl,"/cards"),{headers:s.headers}).then(l).then((function(t){return t.forEach((function(t){e.append(a(t))}))})).catch(p)}(y)})),function(e,t,n){fetch("".concat(s.baseUrl,"/users/me"),{method:"GET",headers:s.headers}).then(l).then((function(r){e.textContent=r.name,t.textContent=r.about,n.setAttribute("style","background-image: url('".concat(r.avatar,"');"))})).catch(p)}(D,j,w),h.forEach((function(e){e.addEventListener("click",(function(){r(e.closest(".popup"))}))})),w.addEventListener("click",(function(){n(T)})),A.addEventListener("submit",(function(e){e.preventDefault(),function(e,t,n,o){d(n),fetch("".concat(s.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:s.headers,body:JSON.stringify({avatar:e})}).then(l).then((function(){t.setAttribute("style","background-image: url('".concat(e,"');")),n.reset(),r(o)})).catch(p).finally((function(){return _(n)}))}(U.value,w,A,T)})),O.addEventListener("click",(function(){q.value=D.textContent,E.value=j.textContent,n(b)})),S.addEventListener("submit",(function(e){e.preventDefault(),function(e,t,n,o,c,a){d(a),fetch("".concat(s.baseUrl,"/users/me"),{method:"PATCH",headers:s.headers,body:JSON.stringify({name:e.value,about:t.value})}).then(l).then((function(){n.textContent=e.value,o.textContent=t.value,r(c)})).catch(p).finally((function(){return _(a)}))}(q,E,D,j,b,S)})),P.addEventListener("click",(function(){n(L)})),C.addEventListener("submit",(function(e){e.preventDefault(),function(e,t,n,o){d(n),fetch("".concat(s.baseUrl,"/cards"),{method:"POST",headers:s.headers,body:JSON.stringify(e)}).then(l).then((function(e){t.prepend(a(e)),n.reset(),console.log(e),r(o)})).catch(p).finally((function(){return _(n)}))}({name:k.value,link:g.value},y,C,L)})),i={formElements:".popup__form",inputElementList:".popup__input",buttonElement:".popup__button",inactiveButtonClass:"popup__button_type_disabled",inputErrorClass:"popup__input_type_error",errorTextClass:"popup__error",errorTextClassActive:"popup__error_active"},Array.from(document.querySelectorAll(i.formElements)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,n){var r=Array.from(e.querySelectorAll(n.inputElementList)),o=e.querySelector(n.buttonElement);r.forEach((function(c){c.addEventListener("input",(function(){!function(e,t,n){t.validity.valid?function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.textContent="",r.classList.remove(n.errorTextClassActive),r.classList.add(n.errorTextClass)}(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorTextClassActive),o.classList.remove(r.errorTextClass)}(e,t,t.validationMessage,n)}(e,c,n),t(r,o)}))}))}(e,i)}))})();