import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
// 引入插件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: '127.0.0.1',
        port: 5173, // 端口
    },
    plugins: [
        vue(),
        // 配置插件
        AutoImport({
            imports:["vue","vue-router","pinia"],
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver({importStyle: "sass"})],
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                // 自動導入自訂樣式文件進行樣式覆蓋
                additionalData: `
          @use "@/styles/element/index.scss" as *; 
          @use "@/styles/var.scss" as *;       
        `,
            }
        }
    }
})
