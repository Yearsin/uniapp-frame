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
    },
    extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
    parserOptions: {
        parser: "babel-eslint",
    },
    rules: {
        eqeqeq: [
            "warn",
            "always",
            {
                null: "ignore",
            }
        ],
        semi: ["error", "never"],
    }
};
