# Notify-Build-Webpack-Plugin

###  Usage

```
plugins: [
    new NotifyBuildWebpackPlugin({
        success: {
            title: <Success Title>,
            message: <Success Message>
        },
        error: {
            title: <Error Title>,
            message: <Error Message>
        }
    })
]