var stop = function (e) {
    e.stopPropagation();
    e.preventDefault();
}
var TEL_REGEXP = /^1[3456789]\d{9}$/;
export default {
    number(val) {
        var num = "";
        // var q = 1e3;
        var w = 1e4;
        var e = 1e8;
        // var qian = (val / q).toFixed(1);
        var wan = (val / w).toFixed(1);
        var yi = (val / e).toFixed(1);
        if (val < w) {
            num = val;
        }
        // if (val >= q) {
        //     num = qian + "k";
        // }
        if (val >= w) {
            num = wan + "w";
        }
        if (val >= e) {
            num = yi + "e";
        }
        return num;
    },
    validateTel(tel) {
        if (TEL_REGEXP.test(tel)) {
            return true;
        }
        return false;
    },
    FormatTime(a) {
        var length = "";
        var hh = parseInt(a / 3600);
        var mm = parseInt((a - hh * 3600) / 60);
        var ss = parseInt((a - hh * 3600) % 60);
        if (ss < 10) ss = "0" + ss;
        (mm == 0) ? length = "00:" + ss: length = mm + ":" + ss;
        if (hh == 0) {
            length = mm + ":" + ss;
        } else {
            if (mm < 10) mm = "0" + mm;
            length = hh + ":" + mm + ":" + ss;
        }
        return length;
    },
    getTimestamp(time) { //把时间日期转成时间戳
        return (new Date(time)).getTime() / 1000;
    },
    dataisnull(val) {
        var result;
        (val == null || val == "null" || val == "" || val == undefined || val == "undefined" || val == "0" || val == 0 || val == [] || val == '[]') ? result = false: result = true
        return result;
    },
    ban(val) {
        document.querySelector(val).addEventListener("touchmove", stop, false);
        document.body.style.overflow = 'hidden'
    },
    noban() {
        document.body.style.overflow = 'auto'
    },
}