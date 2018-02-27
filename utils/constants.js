var host = 'http://192.168.1.104:8080/quanzi/'
// var host = 'https://www.bestcircler.com/'

module.exports = {
  /**
   * method:get
   * params:code
   */
  loginUrl: host + 'user/loginWXApplet',

  /**
   * 信息列表
   */
  newsListUrl: host + 'news/list',

  /**
   * 发布信息
   */
  newsAdd: host + 'news/add'
}