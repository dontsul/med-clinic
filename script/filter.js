function filterCards() {
  const btnFilter = document.querySelector(".btn-filter");
  btnFilter.addEventListener("click", () => {
    const inputValueFilter = document.querySelector(".input-search").value;
    const statusValueFilter = document.querySelector(".status").value;
    const urgencyValueFilter = document.querySelector(".urgency").value;

    allCards.forEach((card) => {
      console.log(urgencyValueFilter);
      console.log(card.urgency);

      if (
        (card.title.includes(inputValueFilter) && inputValueFilter !== "") ||
        (card.description.includes(inputValueFilter) &&
          inputValueFilter !== "") ||
        card.urgency === urgencyValueFilter
      ) {
        document.getElementById(`${card.id}`).classList.remove("hide");
      } else if(urgencyValueFilter === 'all'){
        document.getElementById(`${card.id}`).classList.remove("hide");
      }else{
        document.getElementById(`${card.id}`).classList.add("hide");
      }
    });
  });
}

filterCards();
