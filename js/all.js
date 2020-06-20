let todoData = [];

let addTodoBtn = document.getElementById('addTodo');
let newTodo = document.getElementById('newTodo');
let clearTaskBtn = document.getElementById('clearTask');
let todoList = document.getElementById('todoList');

//新增Btn click監聽事件
addTodoBtn.addEventListener('click', function () {
	// input content != "" 才新增
	if (newTodo.value !== '') {
		addTodo();
		newTodo.value = '';
	} else {
		console.log('newTodo content is empty');
	}
});

//input keypress Enter監聽事件
newTodo.addEventListener('keypress', function (e) {
	// input content != "" 才新增
	if (e.key === 'Enter' && e.target.value !== '') {
		addTodo();
		e.target.value = '';
	}
});

// clearTaskBtn click 監聽事件
clearTaskBtn.addEventListener('click', removeAllTodo);

//Todo list ul 父元素監聽事件
todoList.addEventListener('click', function (e) {
	if (e.target.nodeName === 'INPUT') {
		checkTodo(parseInt(e.target.getAttribute('data-id')));
	}

	if (e.target.nodeName === 'SPAN') {
		removeTodo(parseInt(e.target.getAttribute('data-id')));
	}
});

function addTodo() {
	let todo = document.getElementById('newTodo').value;
	// 定義資料
	todoData.push({
		id: Math.floor(Date.now()),
		title: todo,
		completed: false,
	});
	render();
}

function checkTodo(checkID) {
	let checkIndex = todoData.findIndex((todos) => todos.id === checkID);
	todoData[checkIndex].completed = !todoData[checkIndex].completed;

	render();
}

function removeTodo(removeId) {
	let removeIndex = todoData.findIndex((todos) => todos.id === removeId);
	todoData.splice(removeIndex, 1);

	render();
}

function removeAllTodo() {
	todoData = [];
	render();
}

function render() {
	let str = '';
	let todoList = document.getElementById('todoList');
	let taskCount = document.getElementById('taskCount');
	todoData.forEach(function (item) {
		// str參考網頁範例
		str += `<li class="list-group-item">
              <div class="d-flex">
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" ${
										item.completed ? 'checked' : ''
									} data-action="complete" data-id="${item.id}">
                  <label class="form-check-label ${
										item.completed ? 'completed' : ''
									}" data-action="complete" data-id="${item.id}"> ${item.title}
                  </label>
                </div>
                <button type="button" class="close ml-auto" aria-label="Close">
                  <span aria-hidden="true" data-action="remove" data-id="${item.id}">&times;</span>
                </button>
              </div>
            </li>`;
	});

	// 新增todo
	todoList.innerHTML = str;
	// 更新任務數
	taskCount.innerHTML = todoData.length;
}
