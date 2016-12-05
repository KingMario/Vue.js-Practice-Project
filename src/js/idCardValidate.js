export default function (idCard) {
  var area = {
    '11': '北京',
    '12': '天津',
    '13': '河北',
    '14': '山西',
    '15': '内蒙古',
    '21': '辽宁',
    '22': '吉林',
    '23': '黑龙江',
    '31': '上海',
    '32': '江苏',
    '33': '浙江',
    '34': '安徽',
    '35': '福建',
    '36': '江西',
    '37': '山东',
    '41': '河南',
    '42': '湖北',
    '43': '湖南',
    '44': '广东',
    '45': '广西',
    '46': '海南',
    '50': '重庆',
    '51': '四川',
    '52': '贵州',
    '53': '云南',
    '54': '西藏',
    '61': '陕西',
    '62': '甘肃',
    '63': '青海',
    '64': '宁夏',
    '65': '新疆'
  }
  var Y, JYM, ereg
  var S, M
  var idCardDigits = idCard.split('')

  if (!/^[1-9][0-9]{16}[0-9X]$/.test(idCard) || !area[idCard.substr(0, 2)]) { // 长度及地区检验
    return false
  }

  var birthdayYear = parseInt(idCard.substr(6, 4))

  if ((birthdayYear % 4 === 0 && birthdayYear % 100 !== 0) ||
    (birthdayYear % 100 === 0 && birthdayYear % 400 === 0)) {
    ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9X]$/
  } else {
    ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9X]$/
  }
  if (!ereg.test(idCard)) { // 出生日期检查
    return false
  }

  S = (parseInt(idCardDigits[0]) + parseInt(idCardDigits[10])) * 7 +
    (parseInt(idCardDigits[1]) + parseInt(idCardDigits[11])) * 9 +
    (parseInt(idCardDigits[2]) + parseInt(idCardDigits[12])) * 10 +
    (parseInt(idCardDigits[3]) + parseInt(idCardDigits[13])) * 5 +
    (parseInt(idCardDigits[4]) + parseInt(idCardDigits[14])) * 8 +
    (parseInt(idCardDigits[5]) + parseInt(idCardDigits[15])) * 4 +
    (parseInt(idCardDigits[6]) + parseInt(idCardDigits[16])) * 2 +
    parseInt(idCardDigits[7]) * 1 + parseInt(idCardDigits[8]) * 6 +
    parseInt(idCardDigits[9]) * 3
  Y = S % 11
  JYM = '10X98765432'
  M = JYM.substr(Y, 1)
  if (M !== idCardDigits[17]) { // 检验位检查
    return false
  }

  return true
}
