// var host = 'http://192.168.1.104:8080/quanzi/'
var host = 'https://www.bestcircler.com/api/'

// var host = 'https://26acf035.ngrok.io/quanzi/'

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
  uploadFile: host + 'cFile/uploadImage',

  /**
   * 热门关键词
   * token
   */
  searchHotKeyword: host + 'hotSearch/query',

  /**
   * 搜索列表
   * keyword
   */
  searchList: host + 'news/search',

  /**
   * 列表详情
   * id
   */
  newsDetail: host + 'news/detail'
}