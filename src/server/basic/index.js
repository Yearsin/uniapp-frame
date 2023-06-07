const { basic } = require('@/server/api');
const { _POST } = require('@/server/http');

export const ocr = (data) => _POST(basic.ocr, data);