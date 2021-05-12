import { extend, ResponseError } from 'umi-request';
import { message } from 'antd';

/**
 * todo
 * 拦截返回的错误处理
 * @param err
 */
const errorHandler = (err: ResponseError): Response => {
  const { response } = err;
  if (response === null) {
    message.destroy();
    message.error(err).then();
  }
  console.log(123, response);
  return response;
};
const request = extend({
  errorHandler: errorHandler,
  credentials: 'omit',
  timeout: 50000,
});
/**
 * todo
 * 发出请求前拦截
 */
request.interceptors.request.use((url, options): any => {
  //console.log('请求request:', { url, options });
  // const account: Account = store.get('account');
  // let token = '';
  // if (account) {
  //   token = account.token;
  // }
  // options.headers = {
  //   ...options.headers,
  //   token: token,
  // };
});
/**
 * todo
 * 拦截返回的response
 */
request.interceptors.response.use((response, options): Response => {
  //console.log('返回response:', { response, options });
  return response;
});
export default request;
