import axios, { AxiosResponse, AxiosPromise, AxiosRequestConfig } from 'axios';
import { message } from 'antd';
const baseURL: string = process.env.BASE_URL || 'http://localhost:3001';
const instance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 30000,
});
/**
 * param 将要转为URL参数字符串的对象
 * key URL参数字符串的前缀
 * encode true/false 是否进行URL编码,默认为true
 *
 * return URL参数字符串
 */
var urlEncode = function(param: any, key?: string, encode?: any) {
  if (param == null) return '';
  var paramStr = '';
  var t = typeof param;
  if (t == 'string' || t == 'number' || t == 'boolean') {
    paramStr +=
      '&' +
      key +
      '=' +
      (encode == null || encode ? encodeURIComponent(param) : param);
  } else {
    for (var i in param) {
      var k =
        key == null
          ? i
          : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
      paramStr += urlEncode(param[i], k, encode);
    }
  }
  return paramStr;
};
export default async function fetch(options: any) {
  // return await axios.get(
  //   baseURL +
  //     options.url +
  //     '?type=1&k=cd8d0618c769230ae281955138e65753&appid=5019a3a2560c436dbe21b20b8c351584',
  // );
  if (options.useToken) {
    options.headers = {
      Authorization: 'Bearer ' + window.localStorage.getItem('Token'),
    };
  }
  try {
    if (options.method.toLowerCase() === 'get') {
      //这里是将get请求的参数拼接到url上面
      console.log(
        baseURL + options.url + urlEncode(options.data).replace('&', '?'),
      );
      options.url = options.url + urlEncode(options.data).replace('&', '?');
    }
    const response = await instance(options);
    // console.log(response,"response")
    const { data } = response;
    const { status } = data;
    console.log(baseURL, '222');
    const success = `${status}` === '1' ? true : false;
    if (!success && typeof window !== 'undefined') {
      message.error(data.message);
      // return
    }
    if (status === 401) {
      window.localStorage.removeItem('Token');
      window.localStorage.removeItem('userName');
    }
    return Promise.resolve({
      success: success,
      ...data,
    });
  } catch (error) {
    if (typeof window !== 'undefined') {
      message.info(error || 'Network Error');
    }
    return Promise.reject();
  }
}
