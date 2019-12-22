import { getTodos, toggleTodo, removedTodo } from './todos'
import { getFilters } from './filters'

// renderTodos
// Arguments: none
// Return value: none
const renderTodos = () => {
    const todoEl = document.querySelector('#todo')
    const filters = getFilters()

    const filteredTodos = getTodos().filter(function (todo) {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        return searchTextMatch && hideCompletedMatch
    })

    const todosLeft = filteredTodos.filter((todo) => !todo.completed)
    
    todoEl.innerHTML = ''
    todoEl.appendChild(generateSummaryDOM(todosLeft))
    
    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            todoEl.appendChild(generateTodoDOM(todo))
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.textContent = 'No to-dos to show'
        messageEl.classList.add('empty-message')
        todoEl.appendChild(messageEl)
    }


}

// generateTodoDOM
// Arguments: todo
// Return value: the todo element
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const textEl = document.createElement('span')
    const removeButton = document.createElement('button')
    const checkbox = document.createElement('input')

    // setup checkbox 
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id)
        renderTodos()
    })


    // setup the todo text
    textEl.textContent = todo.text
    containerEl.appendChild(textEl)

    // set up container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    // setup close button 
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removedTodo(todo.id)
        renderTodos()
    })
   
    return todoEl
}


// generateSummaryDOM
// Arguments: incompletedTodos
// Return value: the summary element
const generateSummaryDOM = (todosLeft) => {
    const summary = document.createElement('h2')
    const plural = todosLeft.length === 1 ? '' : 's'
    summary.classList.add('list-title')
    summary.textContent = `You have ${todosLeft.length} todo${plural} left`
    return summary
}



// Make sure to set up the exports
export { generateTodoDOM, renderTodos, generateSummaryDOM }