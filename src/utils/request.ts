/**
 * @description [ axios 请求封装]
 */

import axios, { AxiosError } from "axios";
import { history } from "umi";
import { notification } from "antd";
// import { clearToken, getToken } from "@/utils/auth";

const service = axios.create({
  baseURL: "/", // 由nginx转发
});

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // config.headers["Token"] = getToken();
    config.timeout = 20000;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptors
service.interceptors.response.use(
  (response: any) => {
    const { data: outData, config } = response;
    const { data, code, message } = outData;
    if (config.responseType === "blob") {
      return response;
    }

    return data;
  },
  (error: any) => {
    const status = error.response?.status;
    const message = error?.response?.data?.message;

    // 登录过期
    if (status === 401) {
      notification.info({ message: message || "登录过期" });
      //   clearToken();
      // history.replace("/login");
      return;
    }
    return Promise.reject(error?.response?.data);
  }
);

export default service;
