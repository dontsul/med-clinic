class TherapistModal extends Modal {
  constructor(purpose, description, urgency, fullName, status, age, id, doctor) {
    super(purpose, description, urgency, fullName);
    this.id = id;
    this.age = age;
    this.doctor = doctor;
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
    optionDone.value = "Done";
    optionDone.textContent = "Завершено";

    const inputAge = document.createElement("input");
    inputAge.classList.add("form-control");
    inputAge.type = "number";
    inputAge.placeholder = "Введіть вік";
    inputAge.classList.add("elemForm");
    inputAge.classList.add("inputAge");
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
      const inputAgeValue = document.querySelector(".inputAge").value;

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
          age: inputAgeValue,
        }),
      })
        .then((res) => {
          if (res.status === 200) {
            const modalBgCard = document.querySelector(".modalBgCard");
            modalBgCard.classList.add("hide");

            const selectDoctor = document.querySelector(".doctor-select");
            selectDoctor.value = "default";
            if (selectDoctor.nextElementSibling !== null) {
              selectDoctor.nextElementSibling.remove();
            }
          }
          return res.json();
        })
        .then((data) => {
          allCards = [...allCards, data];
          const id = data.id;

          console.log(allCards);
          fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then((obj) => {
              new TherapistModal(
                obj.title,
                obj.description,
                obj.urgency,
                obj.fullName,
                obj.status,
                obj.age,
                obj.id,
                obj.doctor
              ).renderCard();
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    });

    selectUrgency.append(optionDefaul, optionHigh, optionNormal, optionLow);
    selectStatus.append(optionDefaultStatus, optionOpen, optionDone);
    wrapperElem.append(
      inputPurpose,
      selectUrgency,
      inputDescription,
      inputFullName,
      selectStatus,
      inputAge,
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
    // doctorElem.textContent = this.doctor;
    if(this.doctor === "therapist") {
      doctorElem.textContent = "Терапевт";
    }
    
    const fullNameElem = document.createElement("p");
    fullNameElem.textContent = this.fullName;

    const statusElem = document.createElement('p');
    (this.status === 'open' ? statusElem.textContent = 'Відкрито' : statusElem.textContent = 'Завершено');

    const urgencyElem = document.createElement("p");
    
    if(this.urgency === 'high') {
      urgencyElem.textContent = 'Невідкладна';
    }else if(this.urgency === 'normal') {
      urgencyElem.textContent = 'Пріорітетна';
    }else if(this.urgency === 'low'){
      urgencyElem.textContent = 'Звичайна';
    }
    const ageElem = document.createElement("p");
    ageElem.textContent = this.age;
    // close icon elem-------------------------------------
    const closeIconWrapCard = document.createElement("div");
    closeIconWrapCard.classList.add("closeIconWrapCard");
    const closeIconCard = document.createElement("img");
    closeIconCard.setAttribute("src", "./img/icon-close.png");
    closeIconCard.classList.add("closeIconCard");
    closeIconWrapCard.title = 'Видалити';
    closeIconWrapCard.append(closeIconCard);

    closeIconWrapCard.addEventListener("click", (e) => {
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
      allCards.forEach((card) => {
        if (+card.id === +this.id) {
          const selectDoctor = document.querySelector(".doctor-select");
          selectDoctor.value = card.doctor;
        }
      });

      const btnCreateCard = document.querySelector(".btn-create-card");
      btnCreateCard.classList.add("def");
      const modalBgCard = document.querySelector(".modalBgCard");
      modalBgCard.classList.remove("hide");
      document.querySelector(".titleCreateCard").textContent =
        "Редагувати візит";

      const optionTherapistValue = document.querySelector(".optionTherapist");
      optionTherapistValue.toggleAttribute("selected", "");

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

      new TherapistModal(
        card.title,
        card.description,
        card.urgency,
        card.fullName,
        card.status,
        card.age,
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
    additionalBlock.append(titleElem, descriptionElem, urgencyElem, statusElem, ageElem);
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
    const optionCardiologistValue = document.querySelector(
      ".optionCardiologist"
    );
    optionCardiologistValue.toggleAttribute("selected", "");

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
    optionDone.value = "Done";
    optionDone.textContent = "Завершено";
(this.status === 'done' ? optionDone.setAttribute('selected', '') : optionOpen.setAttribute('selected', ''))

    const inputAge = document.createElement("input");
    inputAge.classList.add("form-control");
    inputAge.type = "number";
    inputAge.placeholder = "Введіть вік";
    inputAge.classList.add("elemForm");
    inputAge.classList.add("inputAge");
    inputAge.value = this.age;
    const buttonSubmit = document.createElement("button");
    buttonSubmit.type = "submit";
    buttonSubmit.classList.add("btn");
    buttonSubmit.classList.add("btn-primary");
    buttonSubmit.textContent = "Редагувати";

    buttonSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      //--------------------- const wrapperElem = document.querySelector('.wrapperElem')
      const editIconWrap = document.querySelector(".editIconWrap");

      editIconWrap.addEventListener("click", (e) => {
        // console.log(e.currentTarget.parentNode.id);

        // const chosenDoctor = document.querySelector(".doctor-select");
        // chosenDoctor.childNodes.forEach((option) => {
        //   option.removeAttribute("selected");
        // });
        // const optionCardiologistValue = document.querySelector(
        //   ".optionCardiologist"
        // );
        // optionCardiologistValue.setAttribute("selected", "");

        const selectDoctor = document.querySelector(".doctor-select");
        selectDoctor.value = "therapist";
      });

      //------------------------------------------------------
      const selectedDoctorValue =
        document.querySelector(".doctor-select").value;
      console.log(selectedDoctorValue);
      const inputDescriptionValue =
        document.querySelector(".inputDescription").value;
      const inputPurposeValue = document.querySelector(".inputPurpose").value;
      const selectUrgencyValue = document.querySelector(".selectUrgency").value;
      const inputFullNameValue = document.querySelector(".inputFullName").value;
      const inputStatusValue = document.querySelector(".selectStatus").value;
      const inputAgeValue = document.querySelector(".inputAge").value;
      const inputDoctorValue = document.querySelector(".doctor-select").value;

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
          age: inputAgeValue,
          doctor: inputDoctorValue,
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

          // if (res.status === 200) {
          //   console.log(res.status);
          // }
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
              card.age = inputAgeValue;
              card.status = inputStatusValue;
              card.doctor = inputDoctorValue;
            }
          });

          const oldCard = document.getElementById(id);

          console.log(oldCard);
          console.log(oldCard.previousElementSibling);
          new TherapistModal(
            data.title,
            data.description,
            data.urgency,
            data.fullName,
            data.status,
            data.age,
            data.id,
            data.doctor
          ).renderCard(oldCard.previousElementSibling);
          oldCard.remove();
        })
        .catch((err) => console.log(err));

      const modalBgCard = document.querySelector(".modalBgCard");
      modalBgCard.classList.add("hide");
      const selectDoctor = document.querySelector(".doctor-select");

    });

    selectUrgency.append(optionDefaul, optionHigh, optionNormal, optionLow);
    selectStatus.append(optionDefaultStatus, optionOpen, optionDone);
    wrapperElem.append(
      inputPurpose,
      inputDescription,
      selectUrgency,
      inputFullName,
      selectStatus,
      inputAge,
      buttonSubmit
    );
    formCreateCard.append(wrapperElem);
  }
}
