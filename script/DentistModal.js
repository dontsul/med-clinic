class DentistModal extends Modal {
  constructor(
    purpose,
    description,
    urgency,
    fullName,
    status,
    dateLastVisit,
    id,
    doctor
  ) {
    super(purpose, description, urgency, fullName, status);

    this.doctor = doctor;
    this.dateLastVisit = dateLastVisit; //дата останнього відвідування
    this.id = id;
  }

  renderForm() {
    const formCreateCard = document.querySelector(".formCreateCard");
    const wrapperElem = document.createElement("div");
    wrapperElem.classList.add("wrapperElem");
    const inputPurpose = document.createElement("input");
    inputPurpose.classList.add("form-control");
    inputPurpose.type = "text";
    inputPurpose.placeholder = "Введіть мету візиту";
    inputPurpose.classList.add("elemForm");
    inputPurpose.classList.add("inputPurpose");
    const inputDescription = document.createElement("input");
    inputDescription.classList.add("form-control");
    inputDescription.type = "text";
    inputDescription.placeholder = "Введіть опис візиту";
    inputDescription.classList.add("elemForm");
    inputDescription.classList.add("inputDescription");
    const selectUrgency = document.createElement("select");
    selectUrgency.classList.add("form-select");
    selectUrgency.setAttribute("aria-label", "Default select example");
    selectUrgency.classList.add("elemForm");
    selectUrgency.classList.add("selectUrgency");
    const optionDefaul = document.createElement("option");
    optionDefaul.value = "default";
    optionDefaul.textContent = "Терміновість";
    const optionHigh = document.createElement("option");
    optionHigh.value = "high";
    optionHigh.textContent = "Невідкладна";
    const optionNormal = document.createElement("option");
    optionNormal.value = "normal";
    optionNormal.textContent = "Пріоритетна";
    const optionLow = document.createElement("option");
    optionLow.value = "low";
    optionLow.textContent = "Звичайна";
    const inputFullName = document.createElement("input");
    inputFullName.classList.add("form-control");
    inputFullName.type = "text";
    inputFullName.placeholder = "Введіть повне ПІБ";
    inputFullName.classList.add("elemForm");
    inputFullName.classList.add("inputFullName");


    const selectStatus = document.createElement("select");
    selectStatus.classList.add("form-select");
    selectStatus.setAttribute("aria-label", "Default select example");
    selectStatus.classList.add("elemForm");
    selectStatus.classList.add("selectStatus");
    const optionDefaultStatus = document.createElement("option");
    optionDefaultStatus.value = "defaultStatus";
    optionDefaultStatus.textContent = "Статус";
    optionDefaultStatus.setAttribute('selected', '');
    optionDefaultStatus.setAttribute('disabled', '');
    optionDefaultStatus.setAttribute('hidden', '');
    const optionOpen = document.createElement("option");
    optionOpen.value = "open";
    optionOpen.textContent = "Відкрито";
    const optionDone = document.createElement("option");
    optionDone.value = "done";
    optionDone.textContent = "Завершено";

    const inputDateLastVisit = document.createElement("input");
    inputDateLastVisit.classList.add("form-control");
    inputDateLastVisit.type = "date";
    inputDateLastVisit.placeholder = "Введіть повне ПІБ";
    inputDateLastVisit.classList.add("elemForm");
    inputDateLastVisit.classList.add("inputDateLastVisit");

    const buttonSubmit = document.createElement("button");
    buttonSubmit.type = "submit";
    buttonSubmit.classList.add("btn");
    buttonSubmit.classList.add("btn-primary");
    buttonSubmit.textContent = "Створити";
    buttonSubmit.addEventListener("click", (e) => {
      e.preventDefault();

      const selectedDoctorValue =
        document.querySelector(".doctor-select").value;
      const inputDescriptionValue =
        document.querySelector(".inputDescription").value;
      const inputPurposeValue = document.querySelector(".inputPurpose").value;
      const selectUrgencyValue = document.querySelector(".selectUrgency").value;
      const inputFullNameValue = document.querySelector(".inputFullName").value;
      const inputStatusValue = document.querySelector(".selectStatus").value;
      const inputDateLastVisitValue = document.querySelector(
        ".inputDateLastVisit"
      ).value;

      fetch("https://ajax.test-danit.com/api/v2/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: inputPurposeValue,
          description: inputDescriptionValue,
          doctor: selectedDoctorValue,
          urgency: selectUrgencyValue,
          fullName: inputFullNameValue,
          status: inputStatusValue,
          dateLastVisit: inputDateLastVisitValue,
        }),
      })
        .then((res) => {
          if (res.status === 200) {
            const modalBgCard = document.querySelector(".modalBgCard");
            modalBgCard.classList.add("hide");

            const selectDoctor = document.querySelector(".doctor-select");
            // selectDoctor.value = "default";

            if (selectDoctor.nextElementSibling !== null) {
              selectDoctor.nextElementSibling.remove();
            }
          }
          return res.json();
        })
        .then((data) => {
          allCards = [...allCards, data];
          const id = data.id;
          checkPosts();
          fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then((obj) => {
              new DentistModal(
                obj.title,
                obj.description,
                obj.urgency,
                obj.fullName,
                obj.status,
                obj.dateLastVisit,
                obj.id,
                obj.doctor
              ).renderCard();
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    });

    selectUrgency.append(optionDefaul, optionHigh, optionNormal, optionLow);
    selectStatus.append(optionDefaultStatus, optionOpen, optionDone)
    wrapperElem.append(
      inputPurpose,
      inputDescription,
      selectUrgency,
      inputFullName,
      selectStatus,
      inputDateLastVisit,
      buttonSubmit
    );
    formCreateCard.append(wrapperElem);
  }
  renderCard(elem) {
    const cardsWrap = document.querySelector(".cards");

    const additionalBlock = document.createElement("div");
    additionalBlock.classList.add("hide");
    const card = document.createElement("div");
    card.classList.add("card");
    card.id = this.id;
    const titleElem = document.createElement("p");
    titleElem.textContent = this.purpose;
    const descriptionElem = document.createElement("p");
    descriptionElem.textContent = this.description;

    const doctorElem = document.createElement("p");
    if(this.doctor === "dentist") {
      doctorElem.textContent = "Стоматолог";
    }
    doctorElem.classList.add("doctorElem");
    const fullNameElem = document.createElement("p");
    fullNameElem.textContent = this.fullName;

    const statusElem = document.createElement('p');
    (this.status === 'open' ? statusElem.textContent = 'Відкрито' : statusElem.textContent = 'Завершено');

    const dateLastVisitElem = document.createElement("p");
    dateLastVisitElem.textContent = this.dateLastVisit;
    const urgencyElem = document.createElement("p");
    
    if(this.urgency === 'high') {
      urgencyElem.textContent = 'Невідкладна';
    }else if(this.urgency === 'normal') {
      urgencyElem.textContent = 'Пріорітетна';
    }else if(this.urgency === 'low'){
      urgencyElem.textContent = 'Звичайна';
    }
    // close icon elem-------------------------------------
    const closeIconWrapCard = document.createElement("div");
    closeIconWrapCard.classList.add("closeIconWrapCard");
    const closeIconCard = document.createElement("img");
    closeIconCard.setAttribute("src", "./img/icon-close.png");
    closeIconCard.classList.add("closeIconCard");
    closeIconWrapCard.title = 'Видалити';
    closeIconWrapCard.append(closeIconCard);

    closeIconWrapCard.addEventListener("click", (e) => {
      console.log(this.id);
      if (e.target === closeIconCard) {
        fetch(`https://ajax.test-danit.com/api/v2/cards/${this.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => {
          if (res.status === 200) {
            
            closeIconWrapCard.parentNode.remove();
            allCards = allCards.filter((obj) => obj.id !== this.id);
            checkPosts();

          }
        });
      }
    });
    // close icon elem-------------------------------------


    // edit icon elem---------------------------------------
    const editIconWrap = document.createElement("div");
    editIconWrap.classList.add("editIconWrap");
    const editIcon = document.createElement("img");
    editIcon.setAttribute("src", "./icon-edit.png");
    editIconWrap.classList.add("editIconWrap");
    editIconWrap.title = 'Редагувати';
    editIconWrap.append(editIcon);

    editIconWrap.addEventListener("click", (e) => {
      // console.log(e.currentTarget.parentNode.id);
      const btnCreateCard = document.querySelector(".btn-create-card");
      btnCreateCard.classList.add("def");
      const modalBgCard = document.querySelector(".modalBgCard");
      modalBgCard.classList.remove("hide");
      document.querySelector(".titleCreateCard").textContent =
        "Редагувати візит";


      allCards.forEach(card => {
        if(+card.id === +this.id) {
          const selectDoctor = document.querySelector(".doctor-select");
          selectDoctor.value = card.doctor
        }
      })

      let card = {};
      function getCard() {
        allCards.forEach((elem) => {
          if (elem.id === Number(e.currentTarget.parentNode.id)) {
            card = elem;
            return;
          }
        });
      }
      getCard();

      new DentistModal(
        card.title,
        card.description,
        card.urgency,
        card.fullName,
        card.status,
        card.dateLastVisit,
        e.currentTarget.parentNode.id,
        card.doctor
      ).renderEditForm();
    });
    // edit icon elem---------------------------------------

    // кнопка показать больше-------------------
    const btnOpenContent = document.createElement("button");
    btnOpenContent.type = "button";
    btnOpenContent.classList.add("btn");
    btnOpenContent.classList.add("btn-primary");
    btnOpenContent.textContent = "Показати більше";
    btnOpenContent.addEventListener("click", (e) => {
      e.target.previousElementSibling.classList.toggle("hide");
    });

    // кнопка показать больше-------------------
    additionalBlock.append(
      titleElem,
      descriptionElem,
      dateLastVisitElem,
      urgencyElem,
      statusElem,
    );
    card.append(
      closeIconWrapCard,
      fullNameElem,
      doctorElem,
      additionalBlock,
      btnOpenContent,
      editIconWrap
    );

    if (elem !== undefined) {
      if (elem === null) {
        cardsWrap.prepend(card);
      } else {
        elem.after(card);
      }
    } else {
      cardsWrap.append(card);
    }
  }


  renderEditForm() {
    const optionDentistValue = document.querySelector(".optionDentist");
    optionDentistValue.toggleAttribute("selected", "");

    const formCreateCard = document.querySelector(".formCreateCard");
    const wrapperElem = document.createElement("div");
    wrapperElem.classList.add("wrapperElem");
    const inputPurpose = document.createElement("input");
    inputPurpose.classList.add("form-control");
    inputPurpose.type = "text";
    inputPurpose.placeholder = "Введіть мету візиту";
    inputPurpose.classList.add("elemForm");
    inputPurpose.classList.add("inputPurpose");
    inputPurpose.value = this.purpose;
    const inputDescription = document.createElement("input");
    inputDescription.classList.add("form-control");
    inputDescription.type = "text";
    inputDescription.placeholder = "Введіть опис візиту";
    inputDescription.classList.add("elemForm");
    inputDescription.classList.add("inputDescription");
    inputDescription.value = this.description;
    const selectUrgency = document.createElement("select");
    selectUrgency.classList.add("form-select");
    selectUrgency.setAttribute("aria-label", "Default select example");
    selectUrgency.classList.add("elemForm");
    selectUrgency.classList.add("selectUrgency");
    const optionDefaul = document.createElement("option");
    optionDefaul.value = "default";
    optionDefaul.textContent = "Терміновість";
    const optionHigh = document.createElement("option");
    optionHigh.value = "high";
    optionHigh.textContent = "Невідкладна";
    const optionNormal = document.createElement("option");
    optionNormal.value = "normal";
    optionNormal.textContent = "Пріоритетна";
    const optionLow = document.createElement("option");
    optionLow.value = "low";
    optionLow.textContent = "Звичайна";
   
    if(this.urgency === 'high') {
    optionHigh.setAttribute('selected', '')
   }else if(this.urgency === 'normal') {
    optionNormal.setAttribute('selected', '')
   }else if(this.urgency === 'low') {
    optionLow.setAttribute('selected', '')
   }

    const inputFullName = document.createElement("input");
    inputFullName.classList.add("form-control");
    inputFullName.type = "text";
    inputFullName.placeholder = "Введіть повне ПІБ";
    inputFullName.classList.add("elemForm");
    inputFullName.classList.add("inputFullName");
    inputFullName.value = this.fullName;


    const selectStatus = document.createElement("select");
    selectStatus.classList.add("form-select");
    selectStatus.setAttribute("aria-label", "Default select example");
    selectStatus.classList.add("elemForm");
    selectStatus.classList.add("selectStatus");
    const optionDefaultStatus = document.createElement("option");
    optionDefaultStatus.value = "defaultStatus";
    optionDefaultStatus.textContent = "Статус";
    optionDefaultStatus.setAttribute('disabled', '');
    optionDefaultStatus.setAttribute('hidden', '');
    const optionOpen = document.createElement("option");
    optionOpen.value = "open";
    optionOpen.textContent = "Відкрито";
    const optionDone = document.createElement("option");
    optionDone.value = "done";
    optionDone.textContent = "Завершено";
(this.status === 'done' ? optionDone.setAttribute('selected', '') : optionOpen.setAttribute('selected', ''))

    const inputDateLastVisit = document.createElement("input");
    inputDateLastVisit.classList.add("form-control");
    inputDateLastVisit.type = "date";
    inputDateLastVisit.placeholder = "Введіть повне ПІБ";
    inputDateLastVisit.classList.add("elemForm");
    inputDateLastVisit.classList.add("inputDateLastVisit");
    inputDateLastVisit.value = this.dateLastVisit;

    const buttonSubmit = document.createElement("button");
    buttonSubmit.type = "submit";
    buttonSubmit.classList.add("btn");
    buttonSubmit.classList.add("btn-primary");
    buttonSubmit.textContent = "Редагувати";

    buttonSubmit.addEventListener("click", (e) => {
      e.preventDefault();

      const editIconWrap = document.querySelector(".editIconWrap");

      editIconWrap.addEventListener("click", (e) => {

        const selectDoctor = document.querySelector(".doctor-select");
        selectDoctor.value = "dentist";
      });

      //------------------------------------------------------
      const selectedDoctorValue =
        document.querySelector(".doctor-select").value;
      const inputDescriptionValue =
        document.querySelector(".inputDescription").value;
      const inputPurposeValue = document.querySelector(".inputPurpose").value;
      const selectUrgencyValue = document.querySelector(".selectUrgency").value;
      const inputFullNameValue = document.querySelector(".inputFullName").value;
      const inputStatusValue = document.querySelector(".selectStatus").value;
      const inputDateLastVisitValue = document.querySelector(
        ".inputDateLastVisit"
      ).value;

      // const inputDoctorValue = document.querySelector(".doctor-select").value;

      fetch(`https://ajax.test-danit.com/api/v2/cards/${this.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: inputPurposeValue,
          description: inputDescriptionValue,
          doctor: selectedDoctorValue,
          urgency: selectUrgencyValue,
          fullName: inputFullNameValue,
          status: inputStatusValue,
          dateLastVisit: inputDateLastVisitValue,
        }),
      })
        .then((res) => {
          const modalBgCard = document.querySelector(".modalBgCard");
          modalBgCard.classList.add("hide");
          const selectDoctor = document.querySelector(".doctor-select");
          if (selectDoctor.nextElementSibling !== null) {
            // selectDoctor.value = "default";
            selectDoctor.nextElementSibling.remove();
          }

          return res.json();
        })
        .then((data) => {
          const id = data.id;
          console.log(id);

          allCards.forEach((card) => {
            if (+card.id === id) {
              card.title = inputPurposeValue;
              card.description = inputDescriptionValue;
              card.doctor = selectedDoctorValue;
              card.urgency = selectUrgencyValue;
              card.fullName = inputFullNameValue;
              card.status = inputStatusValue;
              card.dateLastVisit = inputDateLastVisitValue;
            }
          });

          const oldCard = document.getElementById(id);

          // console.log(oldCard);
          // console.log(oldCard.previousElementSibling);
          new DentistModal(
            data.title,
            data.description,
            data.urgency,
            data.fullName,
            data.status,
            data.dateLastVisit,
            data.id,
            data.doctor
          ).renderCard(oldCard.previousElementSibling);
          oldCard.remove();
        })
        .catch((err) => console.log(err));

      const modalBgCard = document.querySelector(".modalBgCard");
      modalBgCard.classList.add("hide");
      const selectDoctor = document.querySelector(".doctor-select");
      // if (selectDoctor.nextElementSibling !== null) {
      //   // selectDoctor.value = "default";
      //   selectDoctor.nextElementSibling.remove();
      // }
    });

    selectUrgency.append(optionDefaul, optionHigh, optionNormal, optionLow);
    selectStatus.append(optionDefaultStatus, optionOpen, optionDone);
    wrapperElem.append(
      inputPurpose,
      inputDescription,
      selectUrgency,
      inputFullName,
      selectStatus,
      inputDateLastVisit,
      buttonSubmit
    );
    formCreateCard.append(wrapperElem);
  }
}
