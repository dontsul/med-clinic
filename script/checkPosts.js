function checkPosts() {
    const noItems = document.querySelector('.no-items');
    (allCards.length > 0 ? noItems.classList.add('hide') : noItems.classList.remove('hide'));
}
