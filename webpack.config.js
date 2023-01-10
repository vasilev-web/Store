module.exports = function(env) {

    const type = env && env.production ? 'production' : 'development'

    require("@babel/register")({
        only: [ `${__dirname}/config` ],
    });

    return require(`./config/webpack.${type}.js`)();
};
