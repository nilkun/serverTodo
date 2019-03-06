const documentLoaded = () => {
    
// event listeners
    const clickItem = document.querySelector("ul").addEventListener("click", (e) => {
        if(e.target.nodeName==="SPAN") {            
            const url = "api/todos/" + e.target.parentNode.getAttribute("data-id");
            e.target.parentNode.remove();
            fetch(url, {
                method: "DELETE",
            })
            .catch(err => console.log(err));
        }
        else {
            const url = "api/todos/" + e.target.getAttribute("data-id");
            e.target.classList.toggle("done");

            // getAttribute creates a string!
            let boolean = (e.target.getAttribute("completed") === "true") ? false : true;
            e.target.setAttribute("completed", boolean);
            const update = { completed: boolean };
            
            fetch(url, {
                method: "PUT",
                url: url,
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(update)
            })
            .then((data) => {
                return data.json()})
            .then((data) => { /* The return value */ })
            .catch(err => console.log("Error: " + err))
        }
    });

    const sendInput = document.querySelector("#todoInput");
    sendInput.addEventListener("keypress", (e) => {
        if(e.key === "Enter") { 
            create(sendInput.value);
        }
    });

// methods for retrieving, editing, and deleting
    const show = data => {
        const todo = document.createElement("li");
        const deleteButton = document.createElement("span");
        deleteButton.textContent="X";        
        todo.append(data.name);
        todo.append(deleteButton);
        todo.classList.add("task");
        todo.setAttribute("data-id", data._id);
        todo.setAttribute("completed", data.completed);   
        if(data.completed) {
            todo.classList.add("done");
        }
        document.querySelector('.list').append(todo);
    }

    const create = data => {
        fetch('api/todos', { 
            method: "POST",
            headers: { 'Accept': 'application/json',
                       'Content-Type': 'application/json'
                     },
            body: JSON.stringify({
                name: data
            })
         })
        .then(reply => reply.json())
        .then(reply => show(reply))
        .catch(err => console.log(err));
    }

// Initialization
    fetch("/api/todos")
    .then(data => data.json())
    .then(todos => {
        todos.forEach(todo => {
            show(todo);
        })
    })
    .catch(err => console.log(err));
}

window.addEventListener('load', documentLoaded, false);