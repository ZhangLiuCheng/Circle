
/**
 * 格式化首页列表格式.
 */
var formatNewsType = function (originNews) {
  for (var i = 0; i < originNews.length; i++) {
    var item = originNews[i]
    var imageSize = item.imageUrls.length
    if (imageSize < 3) {
      item.type = imageSize;
    } else if (imageSize == 3) {
      item.type = 2;
    } else if (imageSize > 3) {
      item.type = 4;
    }
    // 拷贝图片地址
    var showImageUrls = [];
    for (var j = 0; j < item.type; j++) {
      showImageUrls[j] = item.imageUrls[j]
    }
    item.showImageUrls = showImageUrls;
  }
  return originNews;
}

Array.prototype.indexOf = function (val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
};

Array.prototype.remove  =  function (val)  {
  var  index  =  this.indexOf(val);
  if  (index  >  -1)  {
    this.splice(index,  1);
  }
};

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatNewsType: formatNewsType,
  formatTime: formatTime
}
