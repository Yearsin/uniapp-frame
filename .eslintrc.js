module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    // 配置js全局变量，因为是uni-app，全局的uni是不需要引入的，还有5+的plus对象
    globals: {
        uni: "readonly",
        plus: "readonly",
        wx: "readonly",
        getApp: true
    },
    extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
    parserOptions: {
        parser: '@babel/eslint-parser'
    },
    rules: {
        eqeqeq: [
            "warn",
            "always",
            {
                null: "ignore",
            }
        ],
        'vue/multi-word-component-names': 0,
        semi: ["error", "never"]
    }
};
