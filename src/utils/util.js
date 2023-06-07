const formatTime = (date, type) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    if (type === 1) {
        return [year, month, day].map(formatNumber).join('-');
    }
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};
const getdiffdate = (stime, etime) => {
    //初始化日期列表，数组
    var diffdate = new Array();
    var i = 0;
    //开始日期小于等于结束日期,并循环
    while (stime <= etime) {
        diffdate[i] = stime.slice(5);

        //获取开始日期时间戳
        var stime_ts = new Date(stime).getTime();

        //增加一天时间戳后的日期
        var next_date = stime_ts + (24 * 60 * 60 * 1000);

        //拼接年月日，这里的月份会返回（0-11），所以要+1
        var next_dates_y = new Date(next_date).getFullYear() + '-';
        var next_dates_m = (new Date(next_date).getMonth() + 1 < 10) ? '0' + (new Date(next_date).getMonth() + 1) + '-' : (new Date(next_date).getMonth() + 1) + '-';
        var next_dates_d = (new Date(next_date).getDate() < 10) ? '0' + new Date(next_date).getDate() : new Date(next_date).getDate();

        stime = next_dates_y + next_dates_m + next_dates_d;

        //增加数组key
        i++;
    }
    return diffdate;
};
const formatNumber = n => {
    n = n.toString();
    return n[1] ? n : '0' + n
};
const getMonthBetween = (start, end) => {//传入的格式YYYY-MM
    var result = [];
    var s = start.split("-");
    var e = end.split("-");
    if (s[2] == '01') {
        e[1] = parseInt(e[1]) - 1;
    } else {
        s[1] = parseInt(s[1]) + 1;
    }
    var min = new Date();
    var max = new Date();
    min.setFullYear(s[0], s[1] * 1 - 1, 1);//开始日期
    max.setFullYear(e[0], e[1] * 1 - 1, 1);//结束日期
    var curr = min;
    while (curr <= max) {
        var month = curr.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        // var str = curr.getFullYear() + "-" + (month);
        // var s = curr.getFullYear() + "-0";
        // if (str == s) {
        //     str = curr.getFullYear() + "-1";
        // }
        result.push(month + '-01');
        curr.setMonth(month);
    }
    return result;
}
const getWeekBetween = (start, end) => {//传入的格式YYYY-MM
    var startTime = new Date(start);
    var endTime = new Date(end)
    var timeArr = [];
    while ((endTime.getTime() - startTime.getTime()) >= 0) {
        var year = startTime.getFullYear();
        var month = startTime.getMonth().toString().length == 1 ? "0" + (startTime.getMonth() + 1).toString() : startTime.getMonth() + 1;
        var day = startTime.getDate().toString().length == 1 ? "0" + startTime.getDate() : startTime.getDate();
        var date = year + "-" + month + "-" + day;
        if (new Date(date).getDay() === 0) {
            timeArr.push(month + "-" + day);
        }
        startTime.setDate(startTime.getDate() + 1);
    }
    if (new Date(end).getDay() !== 0) timeArr.push(end.slice(5));
    return timeArr;
};
// 身份证号前端验证
const identityCodeValid = (code) => {
    let city = {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江 ',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北 ',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏 ',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门',
        91: '国外 '
    };
    let pass = true;
    if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
        pass = false;
    } else if (!city[code.substr(0, 2)]) {
        pass = false;
    } else {
        // 18位身份证需要验证最后一位校验位
        if (code.length === 18) {
            code = code.split('');
            // ∑(ai×Wi)(mod 11)
            // 加权因子
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            // 校验位
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++) {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if (last.toString() !== code[17].toString()) {
                pass = false;
            }
        } else {
            pass = false;
        }
    }
    return pass;
};

// 汽车牌照校验
const isVehicleNumber = (vehicleNumber) => {
    let xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
    let creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    if (vehicleNumber.length == 7) {
        return creg.test(vehicleNumber);
    } else if (vehicleNumber.length == 8) {
        return xreg.test(vehicleNumber);
    } else {
        return false;
    }
};
// 时分秒换算
const formatSeconds = (value) => {
    let theTime = parseInt(value); // 秒
    let middle = 0; // 分
    let hour = 0; // 小时
    if (theTime > 60) {
        middle = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        if (middle > 60) {
            hour = parseInt(middle / 60);
            middle = parseInt(middle % 60);
        }
    }
    let result = "";
    if (middle > 0) result = "" + parseInt(middle) + "分" + result;
    if (hour > 0) result = "" + parseInt(hour) + "小时" + result;
    return result;
}

// 金额求和（相加/相减）
const countSum = (arr) => {
    if (!arr.length) return 0;
    arr = arr.map((v) => {
        if (v && !Number.isNaN(Number(v))) return Math.round(v * 100);
        return 0;
    });
    const result =  arr.reduce((prev, curr) => {
        return prev + curr
    }, 0);
    return result / 100;
};

module.exports = {
    formatTime,
    getdiffdate,
    getMonthBetween,
    getWeekBetween,
    identityCodeValid,
    isVehicleNumber,
    formatSeconds,
    countSum
};
