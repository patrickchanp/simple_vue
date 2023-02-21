import { createApp } from 'vue'
import router from "./router";
import './style.css'
import Antd from "ant-design-vue"
import 'ant-design-vue/dist/antd.css';
import App from './App.vue'

const app = createApp(App);
app.use(router).use(Antd).mount("#app");
