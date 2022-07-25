module.exports = {
    chainWebpack: (config) => {
        config.plugin('define').tap((options) => {
            options[0]['process.env'].ISVUE2 = true;
            return options;
        });
    }
};
