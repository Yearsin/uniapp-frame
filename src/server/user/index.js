const { user } = require('@/server/api');
const { _GET } = require('@/server/http');

export const login = (param) => _GET(user.login, param, {hideLoading: true})