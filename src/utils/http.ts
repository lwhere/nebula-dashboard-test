import { message as AntdMessage } from 'antd';
// import axios from 'axios';
import intl from 'react-intl-universal';
import { HttpSeriveManager } from './HttpServiceManager';
import { trackEvent } from './stat';
import Cookie from 'js-cookie';

const service = HttpSeriveManager._axiosInstance;

service.interceptors.request.use(config => {
  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }
  const token = Cookie.get('dashboard_token');
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registResponseInterceptor = (interceptorFn, store) => {
  interceptorFn(store);
};

export const interceptorFn = (store) => {
  service.interceptors.response.use(
    (response: any) => {
      const { code, message } = response.data;

      let _code;
      //HACK: get graph,storage server data
      if(response.config?.url.includes('api-graph')||response.config?.url.includes('api-storage')){
        return response.data;
      }
      if ('code' in response.data) {
        _code = code;
      } else {
        // response from prometheus api
        _code = response.data.status === 'success' ? 0 : -1;
        response.data.code = _code;
      }
      // if connection refused, login again
      if (
        code === -1 &&
        message &&
        (message.includes('connection refused') ||
          message.includes('an existing connection was forcibly closed'))
      ) {
        AntdMessage.warning(intl.get('configServer.connectError'));
        store.dispatch({
          type: 'app/asyncLogout',
        });
      } else if (code === -1 && message) {
        AntdMessage.warning(message);
      }
      return response.data;
    },
    (error: any) => {
      AntdMessage.error(
        `${intl.get('common.requestError')}: ${error.response.status} ${
          error.response.statusText
        }`,
      );
      return error.response;
    },
  );
}

const sendRequest = async (type: string, api: string, params?, config?) => {
  const { trackEventConfig, ...otherConfig } = config;
  let res;
  switch (type) {
    case 'get':
      res = (await service.get(api, { params, ...otherConfig })) as any;
      break;
    case 'post':
      res = (await service.post(api, params, otherConfig)) as any;
      break;
    case 'put':
      res = (await service.put(api, params, otherConfig)) as any;
      break;
    case 'delete':
      res = (await service.delete(api, params)) as any;
      break;
    default:
      break;
  }

  if (res && trackEventConfig) {
    trackService(res, trackEventConfig);
  }
  return res;
};

const trackService = (res, config) => {
  const { category, action } = config;
  trackEvent(category, action, res.code === 0 ? 'ajax_success' : 'ajax_failed');
};

const get =
  (api: string) =>
  (params?: object, config = {}) =>
    sendRequest('get', api, params, config);

const post =
  (api: string) =>
  (params?: object, config = {} as any) =>
    sendRequest('post', api, params, config);

const put =
  (api: string) =>
  (params?: object, config = {}) =>
    sendRequest('put', api, params, config);

const _delete =
  (api: string) =>
  (params?: object, config = {}) =>
    sendRequest('delete', api, params, config);

export { get, post, put, _delete };
