const { user } = require('@/server/api')
const { _GET } = require('@/server/http')

export const demo = (param) => _GET(user.demo, param, { hideLoading: true })
