
import { createApp } from 'vue'
import App from './App.vue'
import './main.css'

createApp(App).mount('#app')
/*
CreateAPp la ham mac dinh duoc cung ca voi Vue.js de tao ra mot
ung dung vue. Nhan tham so la doi tuong App => App la doi tuong haoc 
thanh phan chinh cua ung dung Vue 
mount('#app') phuong thuc duoc goi sau khi tao ung dung
=> id = app trong index.html file '
Sau khi cac thanh phan trong App duoc chay(App.vue) thì app.mouunt được
gọi để gắn kết ứng dụng vào phần tử HTML có id = app -> nội dung trong
App.vue sẽ được thực thi và hiển thị 

*/
