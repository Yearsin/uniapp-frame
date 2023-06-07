export default {
    A: /^[1-9]\d*$/, // 正整数
    B: /^(0|[1-9]\d*|0\.\d{0,2}|[1-9]\d*\.\d{0,2})$/, // 正数，两位小数
    C: /^[A-Za-z0-9]+$/, // 英文数字
    D: /^1(3|4|5|6|7|8|9)\d{9}$/, // 手机号11位
    F: /^\d{14,20}$/, // 银行卡号14-20位
    G: /^1\d{10}$/ // 手机号验证
};