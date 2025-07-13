function formatDate(date1) {
    const date = new Date(date1);
    const month = date.getMonth() + 1;
    return `${date.getDate()}.${month < 10 ? '0' : ''}${month}.${date.getFullYear()}`
}


function pushPathToSitemap(path, priority, freq='monthly', pathsArr) {
    pathsArr.push({
        path: path,
        lastmod: (new Date()).toString(),
        priority: priority,
        changefreq: freq
    })
}

module.exports = {
    formatDate,
    pushPathToSitemap
}