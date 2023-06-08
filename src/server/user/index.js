const { user } = require('@/server/api');
const { _GET } = require('@/server/http2');

export const login = (data, cb) => _GET(user.login, data, { cb });