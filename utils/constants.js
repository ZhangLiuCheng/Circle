// var host = 'http://192.168.1.104:8080/quanzi/'
var host = 'https://www.bestcircler.com/api/'

// var host = 'https://ae4c5f6f.ngrok.io/quanzi/'

module.exports = {
  /**
   * method:get
   * params:code
   */
  loginUrl: host + 'user/loginWXApplet',

  /**
   * 信息列表
   */
  newsListUrl: host + 'news/queryList',

  /**
   * 发布信息
   */
  newsAdd: host + 'news/add',

  /**
   * 上传图片
   */
  uploadFile: host + 'cFile/uploadImage'
}