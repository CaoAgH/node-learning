exports.formatTime = function handleData(data) {
    for(let i=0,len=data.length;i<len;i++){
        data[i].format_time = getTime(data[i].time)
    }
    return data;
}

function getTime(time) {
    let ret = `${format(time.getFullYear())}-${format(time.getMonth() + 1)}-${format(time.getDate())} ${format(time.getHours())}:${format(time.getMinutes())}:${format(time.getSeconds())}`;
    return ret;
}

function format(num) {
    return num > 10 ? num + '' : '0' + num;
}

