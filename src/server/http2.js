const getUrl = (url) => {
    const {env, envsUrl} = getApp().globalData;
    if (!url.includes('://')) {
        url = envsUrl[env] + url;
    }
    return url
};

// 请求拦截器
const requestInterceptor = ({ url = '', param = {}, ...other } = {}) => {

    other.header.token = uni.getStorageSync('token'); // 请求携带token
    !other.header.hideLoading && uni.showLoading({
        title: '加载中',
        mask: true
    });

    return config = {
        url: getUrl(url),
        data: param,
        ...other
    };
}

// 响应拦截器
const responseInterceptor = (response) => {

    const { statusCode, data } = response;

    if (statusCode >= 200 && statusCode < 300) {
        // 未登录/过期 跳转登录页面
        if (Number(data.code) === 450) {
            uni.clearStorageSync();
            uni.reLaunch({
                url: '/pages/auth/login/index'
            });
            return;
        }
        return data;
    } else {
        throw new Error('请求失败');
    }
}

// 基础网络请求封装
const http = (options) => {
    options = requestInterceptor(options);
    return new Promise((resolve, reject) => {

        const httpTask = uni.request({
            ...options,
            complete: (res) => {
                uni.hideLoading();
                try {
                    const result = responseInterceptor(res);
                    resolve(result);
                } catch (error) {
                    reject(res);
                }
            }
        })
        if (options.header.cb) {
            options.header.cb(httpTask);
        }
    })
}

// get
const _GET = (url, param = {}, headers) => {
    const _headers = headers || {};
    return http({
        url,
        param,
        method: 'GET',
        header: {
            hideLoading: _headers.hideLoading, // 设置是否隐藏Loading弹层，模式显示
            cb: headers.cb
        }
    });
};

// post
const _POST = (url, param = {}, headers) => {
    const _headers = headers || {};
    return http({
        url,
        param,
        method: 'POST',
        header: {
            'content-type': _headers['content-type'] || 'application/json;charset=UTF-8', // 默认值 ,另一种是 "content-type": "application/x-www-form-urlencoded"
            hideLoading: _headers.hideLoading // 设置是否隐藏Loading弹层，模式显示
        }
    })
};

// put
const _PUT = (url, param = {}, headers) => {
    const _headers = headers || {};
    return http({
        url,
        param,
        method: 'PUT',
        header: {
            'Content-Type': _headers['Content-Type'] || 'application/json;charset=UTF-8', // 默认值 ,另一种是 "content-type": "application/x-www-form-urlencoded"
            hideLoading: _headers.hideLoading
        }
    })
};

// delete
const _DELETE = (url, param = {}, headers) => {
    let _headers = headers || {};
    return http({
        url,
        param,
        method: 'DELETE',
        header: {
            'Content-Type': _headers['Content-Type'] || 'application/json;charset=UTF-8', // 默认值 ,另一种是 "content-type": "application/x-www-form-urlencoded"
            Loading: _headers.Loading
        }
    })
};

module.exports = {
    _GET,
    _POST,
    _PUT,
    _DELETE
};
