async function getAllPost() {
    const res = await fetch("https://ajax.test-danit.com/api/v2/cards", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
  
    allCards = data;
    checkPosts();

    allCards.forEach((item) => {
      if (item.doctor === "cardiologist") {
        new CardiologistModal(
          item.title,
          item.description,
          item.urgency,
          item.fullName,
          item.status,
          item.pressure,
          item.bodyMassIndex,
          item.transferredDiseases,
          item.age,
          item.id,
          item.doctor
        ).renderCard();
      } else if (item.doctor === "dentist") {
        new DentistModal(
          item.title,
          item.description,
          item.urgency,
          item.fullName,
          item.status,
          item.dateLastVisit,
          item.id,
          item.doctor
        ).renderCard();
      } else if (item.doctor === "therapist") {
        new TherapistModal(
          item.title,
          item.description,
          item.urgency,
          item.fullName,
          item.status,
          item.age,
          item.id,
          item.doctor
        ).renderCard();
      }
    });
  }
  // getAllPost();
  