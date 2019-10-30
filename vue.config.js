module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  devServer: {
    //   open: process.platform === 'darwin',
    // host: '0.0.0.0',
    host:"127.0.0.1",
    port: 8080, // CHANGE YOUR PORT HERE!
    https: true,
    // hotOnly: false,
    
    proxy:{
      '/iContinu':{ //the middleware of the API address
        // target:'http://127.0.0.1:8000/' // the root API address
        target:'https://www.nathan-yang-api.com/',
        // crossorign: true
        // target: 'http://157.245.63.35:8001/',
      }
    },
   
  },
}