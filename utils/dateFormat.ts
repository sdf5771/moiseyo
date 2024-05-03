function dateFormat(date: Date) {
    let month = Number(date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    let hour = date.getHours().toString();
    let minute = date.getMinutes().toString();
    let second = date.getSeconds().toString();

    month = Number(month) >= 10 ? month : '0' + month;
    day = Number(day) >= 10 ? day : '0' + day;
    hour = Number(hour) >= 10 ? hour : '0' + hour;
    minute = Number(minute) >= 10 ? minute : '0' + minute;
    second = Number(second) >= 10 ? second : '0' + second;

    return date.getFullYear() + '년 ' + month + '월 ' + day + '일 - ' + hour + '시 ' + minute + '분 ' + second + '초';
}

export default dateFormat;