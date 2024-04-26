/**
 * @author Santa Antilles
 * @description
 * @date 2024/4/25-23:10:03
 */
const PORT = process.env.VUE_APP_SERVER_PORT || 80;

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        port: PORT
    }
})
