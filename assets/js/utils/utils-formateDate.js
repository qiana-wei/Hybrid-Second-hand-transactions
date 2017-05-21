let formateDate = (date) => {
    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function formateThisDateForSarari(date) {
        //let arr = date.split(' ');
        // monthNames.forEach((val, index) => {
        //     if (val === arr[1]) {
        //         arr[1] = index;
        //     }
        // });
        //return new Date(arr[0] + '-' + padZero(arr[1]) + '-' + padZero(arr[2]) + 'T' + arr[3]);
        return new Date(date.replace(' ','T'));
    }
    
    //let time = new Date(date + ' UTC');
    let time = formateThisDateForSarari(date);
    let year = time.getFullYear();
    let month = monthNames[time.getMonth()];
    let day = time.getDate();
    let hour = padZero(time.getHours());
    let minute = padZero(time.getMinutes());
    let second = padZero(time.getSeconds());
    return `${month} ${day}, ${year} ${hour}:${minute}:${second}`
};

function padZero(str) {
    return ('00' + str).slice(-2);
}

module.exports = formateDate;