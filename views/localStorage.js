const documentLoaded = () => {
    
// event listeners
    const clickItem = document.querySelector("ul").addEventListener("click", (e) => {

        if(e.target.nodeName==="SPAN") { // CLICKING ON SPAN MEANS DELETING            
            const id = e.target.parentNode.getAttribute("data-id");
            e.target.parentNode.remove();
            remove(id);
        }
        else { // TOGGLE COMPLETED
            const id = e.target.getAttribute("data-id");
            e.target.classList.toggle("done");

            // getAttribute creates a string!
            let boolean = (e.target.getAttribute("completed") === "true") ? false : true;
            e.target.setAttribute("completed", boolean);
            update(id, boolean);
        }
    });

    const sendInput = document.querySelector("#todoInput");
    sendInput.addEventListener("keypress", (e) => {
        if(e.key === "Enter") { 
            create(sendInput.value);
        }
    });

// methods
    const create = input => {    
        let data = JSON.parse(localStorage.getItem("todo"));
        const newTodo = {
            name: input, 
            completed: false,
            id: Date.now()
        }  
        data.push(newTodo);
        localStorage.setItem("todo", JSON.stringify(data));
        show(newTodo);
    }

    const remove = id => {
        const editTodos = JSON.parse(localStorage.getItem("todo"));
        const removeIndex = -1;
        for(let i = 0; i < editTodos.length; i++) {
            if(editTodos[i]._id === id) {
                removeIndex = i;
                break;
            } 
        }
        editTodos.splice(removeIndex);
        localStorage.setItem("todo", JSON.stringify(editTodos));
    }

    const show = data => {
        const todo = document.createElement("li");
        const deleteButton = document.createElement("span");
        deleteButton.textContent="X";        
        todo.append(data.name);
        todo.append(deleteButton);
        todo.classList.add("task");
        todo.setAttribute("data-id", data.id);
        todo.setAttribute("completed", data.completed);   
        if(data.completed) {
            todo.classList.add("done");
        }
        document.querySelector('.list').append(todo);
    }    

    const update = (id, boolean) => {
        const editTodos = JSON.parse(localStorage.getItem("todo"));
        for(let i = 0; i < editTodos.length; i++) {
            if(editTodos[i].id == id) {
                editTodos[i].completed = boolean;
                break;
            } 
        }
        localStorage.setItem("todo", JSON.stringify(editTodos));
    }

// initialization
    let todoList = JSON.parse(localStorage.getItem("todo"));
    todoList.forEach(data => {
        const todo = document.createElement("li");
        const deleteButton = document.createElement("span");
        deleteButton.textContent="X";        
        todo.append(data.name);
        todo.append(deleteButton);
        todo.classList.add("task");
        todo.setAttribute("data-id", data.id);
        todo.setAttribute("completed", data.completed);   
        if(data.completed) {
            todo.classList.add("done");
        }
        document.querySelector('.list').append(todo);
    });

}

window.addEventListener('load', documentLoaded, false);