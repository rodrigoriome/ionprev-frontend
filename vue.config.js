module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? process.env.VUE_APP_WEB_HOST : "./",
  devServer: {
    port: process.env.PORT || 8080
  }
};
