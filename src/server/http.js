const getUrl = (url) => {
    const {env, envsUrl} = getApp().globalData;
    if (!url.includes('://')) {
        url = envsUrl[env] + url;
    }
    return url
};

// 请求拦截器
const requestInterceptor = ({ url = '', param = {}, ...option }) => {
    const { method, hideLoading } = option;
    !hideLoading && uni.showLoading({ title: '加载中', mask: true });
    const config = {
        url: getUrl(url),
        method,
        data: param,
        header: {
            token: uni.getStorageSync('token') || ''
        }
    }
    method !== 'GET' && (config.header['content-type'] = option['content-type'] || 'application/json;charset=UTF-8');
    return { config, option };
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
    const { config, option } = requestInterceptor(options);

    let abort; // 存储终止请求的方法

    const promise = new Promise((resolve, reject) => {

        const httpTask = uni.request({
            ...config,
            complete: (res) => {
                !option.hideLoading && uni.hideLoading();
                try {
                    const result = responseInterceptor(res);
                    resolve(result);
                } catch (error) {
                    reject(res);
                }
            }
        })
        // 取消当前网络任务
        abort = () => {
            httpTask.abort();
        };
    })
    // 集成在实例对象上以便业务层调用
    promise.abort = abort;
    return promise;
}

// get
const _GET = (url, param = {}, option) => {
    return http({ url, param,  method: 'GET',  ...option })
};

// post
const _POST = (url, param = {}, option) => {
    return http({ url, param,  method: 'POST',  ...option })
};

// put
const _PUT = (url, param = {}, option) => {
    return http({ url, param,  method: 'PUT',  ...option })
};

// delete
const _DELETE = (url, param = {}, option) => {
    return http({ url, param,  method: 'DELETE',  ...option })
};

module.exports = {
    _GET,
    _POST,
    _PUT,
    _DELETE
};
