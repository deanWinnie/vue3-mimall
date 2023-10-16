module.exports={
  devServer:{
    host:'0.0.0.0',
    port:8080,
    proxy:{
      '/api':{
        target:'http://api-driver.marsview.cc/api/mall/',
        chnageOrigin:true,
        pathRewrite:{
            '/api':''
        }
      }
    }
  },
  productionSourceMap:true,
  chainWebpack:(config)=>{
    config.plugins.delete('prefetch')
  }
}