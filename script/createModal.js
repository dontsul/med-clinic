//функция создания модального окна
function createModalWinwow() {
  const modalBgCard = document.createElement("div");
  modalBgCard.classList.add("modalBgCard");
  modalBgCard.classList.add("hide");
  const modalBlock = document.createElement("div");
  modalBlock.classList.add("modalBlock");
  const titleCreateCard = document.createElement("h2");
  titleCreateCard.classList.add("titleCreateCard");
  titleCreateCard.textContent = "Створити візит";
  const formCreateCard = document.createElement("form");
  formCreateCard.classList.add("formCreateCard");
  formCreateCard.name = 'form';
  const selectDoctor = document.createElement("select");
  selectDoctor.classList.add("form-select");
  selectDoctor.classList.add("doctor-select");
  selectDoctor.setAttribute("aria-label", "Default select example");
  const defaultValueSelectDoctor = document.createElement("option");
  defaultValueSelectDoctor.value = "default";
  defaultValueSelectDoctor.textContent = "Оберіть лікаря";
  defaultValueSelectDoctor.classList.add("defaultValueSelectDoctor");
  const optionCardiologist = document.createElement("option");
  optionCardiologist.value = "cardiologist";
  optionCardiologist.textContent = "Кардіолог";
  optionCardiologist.classList.add("optionCardiologist");
  const optionDentist = document.createElement("option");
  optionDentist.value = "dentist";
  optionDentist.textContent = "Стоматолог";
  optionDentist.classList.add("optionDentist");
  const optionTherapist = document.createElement("option");
  optionTherapist.value = "therapist";
  optionTherapist.textContent = "Терапевт";
  selectDoctor.classList.add("elemForm");
  optionTherapist.classList.add("optionTherapist");
  selectDoctor.append(
    defaultValueSelectDoctor,
    optionCardiologist,
    optionDentist,
    optionTherapist
  );
  const closeIconWrap = document.createElement("div");
  closeIconWrap.classList.add("closeIconWrap");
  const closeIcon = document.createElement("img");
  closeIcon.setAttribute("src", "./img/icon-close.png");
  closeIcon.classList.add("closeIcon");
  closeIconWrap.append(closeIcon);

  closeIconWrap.addEventListener("click", (e) => {
    if (e.target === closeIcon) {
      const wrapperElem = document.querySelector(".wrapperElem");
      modalBgCard.classList.add("hide");
      // selectDoctor.value = "default";
      if (selectDoctor.nextElementSibling !== null) {
        selectDoctor.nextElementSibling.remove();
      }
    }
  });

  formCreateCard.append(closeIconWrap, selectDoctor);
  modalBlock.append(titleCreateCard, formCreateCard);
  modalBgCard.append(modalBlock);
  document.body.append(modalBgCard);
}
createModalWinwow();
//--------------------------------------------------------

//функция открытия модального окна
// function openModalWinwow() {
const chosenDoctor = document.querySelector(".doctor-select");
chosenDoctor.addEventListener("change", (e) => {
  if (e.target.value === "cardiologist") {
    if (e.target.nextElementSibling !== null) {
      e.target.nextElementSibling.remove();
      new CardiologistModal().renderForm();
      return;
    }
    new CardiologistModal().renderForm();
  } else if (e.target.value === "dentist") {
    if (e.target.nextElementSibling !== null) {
      e.target.nextElementSibling.remove();
      new DentistModal().renderForm();
      return;
    }
    new DentistModal().renderForm();
  } else if (e.target.value === "therapist") {
    if (e.target.nextElementSibling !== null) {
      e.target.nextElementSibling.remove();
      new TherapistModal().renderForm();
      return;
    }
    new TherapistModal().renderForm();
  } else if (e.target.value === "default") {
    if (e.target.nextElementSibling !== null) {
      e.target.nextElementSibling.remove();
      return;
    }
  }
});

// событие на на кнопку створити візит
const btnCreateCard = document.querySelector(".btn-create-card");
btnCreateCard.addEventListener("click", () => {
  document.querySelector(".modalBgCard").classList.remove("hide");



});
//--------------------------------------

// функция на закрытие модального окна
function closeModalCreateCard() {
  const modalBgCard = document.querySelector(".modalBgCard");
  modalBgCard.addEventListener("click", (e) => {
    if (e.target === modalBgCard) {
      const wrapperElem = document.querySelector(".wrapperElem");
      const selectDoctor = document.querySelector(".doctor-select");
      if (
        selectDoctor.nextElementSibling === wrapperElem &&
        wrapperElem !== null
      ) {
        wrapperElem.remove();
      }
      modalBgCard.classList.add("hide");
      
      // const btnCreateCard = document.querySelector(".btn-create-card");
      // if(btnCreateCard.classList.contains('def')) {
      //   chosenDoctor.value = 'default'
      // }

      
      // btnCreateCard.classList.remove('def');
      // chosenDoctor.childNodes.forEach((option) => {
      //   option.removeAttribute("selected");
      //   console.log(option);
      // });
    }
  });
}
closeModalCreateCard();
