/*
 * @Author: Code-HHX
 * @Date: 2022-04-19 10:32:17
 * @LastEditors: Code-HHX
 * @LastEditTime: 2022-04-19 14:43:15
 * @Description:常用工具类
 */

//验证变量是否为空
export function isNullAndEmpty(obj) {
  if (
    obj == null ||
    obj == "" ||
    obj == undefined ||
    obj.trim() == "" ||
    obj == "null"
  ) {
    return true;
  } else {
    return false;
  }
}

//验证邮箱格式
export function isEmail(str) {
  var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return reg.test(str);
}
