function formatDate(date1) {
    const date = new Date(date1);
    const month = date.getMonth() + 1;
    return `${date.getDate()}.${month < 10 ? '0' : ''}${month}.${date.getFullYear()}`
}

module.exports = {
    formatDate
}