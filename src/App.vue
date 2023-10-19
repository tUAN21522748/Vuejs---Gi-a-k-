<script setup>
/*
thành phần chinh
<template> : chứa mã HTML và Vue template syntax(cú pháp riêng cảu vue)
để xác định giao diện người dùng của ứng dụng 
đi cùng directive và binding

directive : thực hiện các hành động hoặc thay đổi các phần tử HTML

v-text:ghi đè nội dung hiện có trong phần tử (string)
v-html:hiển thị nội dung html được đánh dấu là an toàn(element)
v-show: hiển thị phần tử dựa trên true/false => true-> hiển thị , false -> ẩn(biến bool)
v-if: kết quả tương tự v-show nhưng phần tử sẽ bị xóa/thêm còn v-show thì ẩn/hiện
v-for: lặp qua 1 mảng hoặc 1 đối tượng(giống filter,map, trong react) ((value, key) in object)
v-on:lắng nghe các events : click ,,.. Có thể dùng@click để thay thế cho v-on
v-bind:ràng buộc dữ liệu giữa thuộc tính HTMl vf thuôc tinh vue.js
v-model:ràng buộc hai chiều giữa dữ liệu và phần tử đầu vào như:input,..
<script> : chứa mã js để xác định logic(biến , methods , computed ,import...)
<style>: chứa css hoạc Sass ,..
*/
import { ref, onMounted, computed, watch } from "vue";
/*
ref : truy cập , tương tác biến tham chiếu => tạo và cập nhật giá trị biến
onMounted : duoc goi lan dau de lan dau render page hoac component
computed : su dung de tao 1 thuoc tinh tinh toan trong Vue , 1 thuoc
tinh se tu dong cap nhat khi cac thuoc tinh phu thuoc cua no thay doi
wacth: theo doi su thay doi cuaa 1 gia tri hoac 1 bien 
*/

/*
tao ra cac bien tham chieu bang cach su dung ham ref 
va co gia tri ban dau (...) 
1 số thuộc tính của biến vởi ref
1.value : giá trị hiện tại của biến
2.readonly:thuộc tính chỉ đọc của biến
3.isRef: chỉ đọc và trả về true
4.unRef:truy xuát giá trị gốc từ 1 biến tham chiếu
*/
const todos = ref([]);
const name = ref("");

const input_content = ref("");
const input_category = ref(null);


/* 
computed được sử dụng để tạo r 1 một thuộc tính tính toán có tên là todos_asc
computed nhận 1 hàm làm đối số => () và return mảng theo thứ tự giảm dần của 
thời gian tạo(thuôc tính createAt)  => Khi danh sách todos_asc thay đổi thì todos_asc
sẽ cập nhật tự động để hiển thị danh sách đã được sắp xếp
*/

const todos_asc = computed(() =>
  todos.value.sort((a, b) => {
    return a.createAt - b.createAt;
  })
);

/*
watch cho phép theo doi va xử lý các thay đổi của 1 biến hoặc 1 biểu thức tính
toán theo thời gian trong component
watch(source, callback, options?)
source:biến muốn theo doi x, callback: ham được gọi khi biến thay đổi
options:chứa đôi tượng tùy chọn cho theo doi (deep,immediate ,flush)

localStoage: 1 đối tượng trong js lưu trữ dl cục bộ dưới dạng cặp khóa -giá trị
phương thức : setItem,getItem,removeItem
*/

watch(name, (newVal) => {
  localStorage.setItem("name", newVal);
});
watch(todos, (newVal) => {
	localStorage.setItem('todos', JSON.stringify(newVal))
}, {
	deep: true
})
/*
khi f5 trang thì tráng thái của ứng dụng sẽ mất đi nên phải sử dụng
onMounted() để lưu trữ lại trạng thái 
*/
onMounted(() => {
  name.value = localStorage.getItem('name') || "";
  todos.value = JSON.parse(localStorage.getItem('todos')) || []
});
const addTodo = () => {
	if (input_content.value.trim() === '' || input_category.value === null) {
		return
	}
	todos.value.push({
		content: input_content.value,
		category: input_category.value,
		done: false,
		editable: false,
		createdAt: new Date().getTime()
	})
}

const removeTodo = (todo) => {
	todos.value = todos.value.filter((t) => t !== todo)
}
</script>

<template>
	<main class="app">
		
		<section class="greeting">
			<h2 class="title">
				What's up, <input type="text" id="name" placeholder="Name here" v-model="name">
			</h2>
		</section>

		<section class="create-todo">
			<h3>CREATE A TODO</h3>

			<form id="new-todo-form" @submit.prevent="addTodo">
				<h4>What's on your todo list?</h4>
				<input 
					type="text" 
					name="content" 
					id="content" 
					placeholder="e.g. make a video"
					v-model="input_content" />
				
				<h4>Pick a category</h4>
				<div class="options">

					<label>
						<input 
							type="radio" 
							name="category" 
							id="category1" 
							value="business"
							v-model="input_category" />
						<span class="bubble business"></span>
						<div>Business</div>
					</label>

					<label>
						<input 
							type="radio" 
							name="category" 
							id="category2" 
							value="personal"
							v-model="input_category" />
						<span class="bubble personal"></span>
						<div>Personal</div>
					</label>
				</div>

				<input type="submit" value="Add todo" />
			</form>
		</section>

		<section class="todo-list">
			<h3>TODO LIST</h3>
			<div class="list" id="todo-list">

				<div v-for="todo in todos_asc" :class="`todo-item ${todo.done && 'done'}`">
					<label>
						<input type="checkbox" v-model="todo.done" />
						<span :class="`bubble ${
							todo.category == 'business' 
								? 'business' 
								: 'personal'
						}`"></span>
					</label>

					<div class="todo-content">
						<input type="text" v-model="todo.content" />
            <input type="text" v-model="todo.category" />
					</div>

					<div class="actions">
						<button class="delete" @click="removeTodo(todo)">Delete</button>
					</div>
				</div>

			</div>
		</section>

	</main>
</template>

