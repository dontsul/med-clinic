function filterCards() {
  const btnFilter = document.querySelector(".btn-filter");
  btnFilter.addEventListener("click", () => {
    const inputValueFilter = document.querySelector(".input-search").value;
    const statusValueFilter = document.querySelector(".status").value;
    const urgencyValueFilter = document.querySelector(".urgency").value;

    allCards.forEach((card) => {

      //input filter
      if (
        card.title.includes(inputValueFilter) ||
        card.description.includes(inputValueFilter)
      ) {
        document.getElementById(`${card.id}`).classList.remove("hide");
      }else{
        document.getElementById(`${card.id}`).classList.add("hide");
      }

      // //status filter


      if (statusValueFilter === card.status) {
        document.getElementById(`${card.id}`).classList.remove("hide");
      } else if (statusValueFilter !== card.status && statusValueFilter !== "all") {
        document.getElementById(`${card.id}`).classList.add("hide");
      } else if (statusValueFilter === "all") {
        document.getElementById(`${card.id}`).classList.remove("hide");
      }

      //urgencyFilter

      if(card.urgency === urgencyValueFilter) {
        document.getElementById(`${card.id}`).classList.remove("hide");

      }else if(urgencyValueFilter === 'all') {
        document.getElementById(`${card.id}`).classList.remove("hide");
      }else{
        document.getElementById(`${card.id}`).classList.add("hide");
      }
    });
  });
}

filterCards();
