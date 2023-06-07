const getUrl = (url) => {
    const {env, envsUrl} = getApp().globalData;
    if (!url.includes('://')) {
        url = envsUrl[env] + url;
    }
    return url
};

// 构造uni.request
const http = ({ url = '', param = {}, ...other } = {}) => {
    other.header.Authorization = 'Bearer ' + uni.getStorageSync('token'); // 请求携带token
    other.header.loading && uni.showLoading({
        title: '加载中',
        mask: true
    });
    return new Promise((resolve, reject) => {
        uni.request({
            url: getUrl(url),
            data: param,
            ...other,
            complete: (res) => {
                uni.hideLoading();
                if (res.data.Status === 1 || res.data.Status === 888 || res.data.Status === 999) {
                    resolve(res.data.Data);
                } else if (res.data.Status === 2) {
                    uni.clearStorageSync();
                    uni.reLaunch({
                        url: '/pages/auth/login/login'
                    });
                } else {
                    reject(res);
                }
            }
        })
    })
};

// get方法
const _GET = (url, param = {}, headers) => {
    let _headers = headers || {};
    return http({
        url,
        param,
        method: 'GET',
        header: {
            loading: !(_headers.loading === 0)
        }
    })
};

// post方法
const _POST = (url, param = {}, headers) => {
    let _headers = headers || {};
    return http({
        url,
        param,
        method: 'POST',
        header: {
            'content-type': _headers['content-type'] || 'application/json;charset=UTF-8', // 默认值 ,另一种是 "content-type": "application/x-www-form-urlencoded"
            loading: !(_headers.loading === 0)
        }
    })
};

module.exports = {
    _GET,
    _POST
};
