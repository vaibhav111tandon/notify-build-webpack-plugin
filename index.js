const notifier = require('node-notifier');

module.exports = class NotifyBuildWebpackPlugin{

    defaultOptions = {
        success: {
            title: 'Success',
            message: 'Build Executed Successfully'
        },
        error: {
            title: 'Failed',
            message: 'Something error out during build process'
        }
    }

    constructor(options){
        this.options = options;
    }

    apply(compiler){
        if(this.options.hasOwnProperty('error')){
            compiler.hooks.done.tap("NotifyBuildWebpackPlugin", (stats) => {
                if(stats.compilation.errors.length){
                    this.notify('error');
                }
            });
        }

        if(this.options.hasOwnProperty('success')){
            compiler.hooks.afterEmit.tap("NotifyBuildWebpackPlugin", () => {
                this.notify('success');
            });
        }
    }

    notify(type){
        notifier.notify({
            title: this.options[type].title || this.defaultOptions[type].title,
            message: this.options[type].message || this.defaultOptions[type].message,
            sound: true,
            wait: true
        },
        function (err, response) {
            if(err){
                console.log('Something unexpected happened: ', err);
            }
        });
    }
}