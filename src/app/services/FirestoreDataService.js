
function updateBookDataImplicit(books, savedItems) {

    savedItems.forEach((savedItem) => {
        let bookNum = Math.floor((savedItem.ID / 100)) - 1;
        let item = books[bookNum].findItemByID(savedItem.ID);
        item.setItemStateData(savedItem.data);
    });
}

// function

export { updateBookDataImplicit };