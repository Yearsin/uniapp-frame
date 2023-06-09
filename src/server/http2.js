const getUrl = (url) => {
    const {env, envsUrl} = getApp().globalData;
    if (!url.includes('://')) {
        url = envsUrl[env] + url;
    }
    return url
};

// 请求拦截器
const requestInterceptor = ({ url = '', param = {}, ...other }) => {
    const { method, hideLoading } = other;
    !hideLoading && uni.showLoading({ title: '加载中', mask: true });
    const config = {
        url: getUrl(url),
        data: param,
        method,
        header: {
            token: uni.getStorageSync('token') || ''
        }
    }
    method !== 'GET' && (config.header['content-type'] = other['content-type'] || 'application/json;charset=UTF-8');
    return { config, other };
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
    const { config, other } = requestInterceptor(options);
    return new Promise((resolve, reject) => {

        const httpTask = uni.request({
            ...config,
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
        // 中断当前请求任务
        if (other.cb) {
            other.cb(httpTask);
        }
    })
}

// get
const _GET = (url, param = {}, other) => {
    return http({ url, param,  method: 'GET',  ...other })
};

// post
const _POST = (url, param = {}, other) => {
    return http({ url, param,  method: 'POST',  ...other })
};

// put
const _PUT = (url, param = {}, other) => {
    return http({ url, param,  method: 'PUT',  ...other })
};

// delete
const _DELETE = (url, param = {}, other) => {
    return http({ url, param,  method: 'DELETE',  ...other })
};

module.exports = {
    _GET,
    _POST,
    _PUT,
    _DELETE
};
