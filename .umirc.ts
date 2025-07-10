import { defineConfig } from "umi";

export default defineConfig({
  // routes: [{ path: "/", component: "index" }],
  npmClient: "pnpm",
  mock: false,
  proxy: {
    "/api/": {
      // target: "http://10.80.8.70:9100", // 老莫本地
      target: "http://10.20.10.32", // 新测试环境
      changeOrigin: true,
    },
    "/auth/": {
      // target: "http://10.80.8.70:9100", // 老莫本地
      target: "http://10.20.10.32", // 新测试环境
      changeOrigin: true,
    },
  },
});
