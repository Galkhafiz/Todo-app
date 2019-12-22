// Set up index.html to load the bundle
// Make sure to load uuid via an npm module when necessary

// --

// Add necessary imports

// Render initial todos

// Set up search text handler

// Set up checkbox handler

// Set up form submission handler

// Bonus: Add a watcher for local storage


// import { getTodos, createTodo, removedTodo, toggleTodo } from './todos'
// // console.log(getFilters())
// // setFilters({
// //     searchText: 'Philadelphia',
// //     hideCompleted: true
// // })
// // console.log(getFilters())

// console.log(getTodos())
// removedTodo('95453da5-5d53-4038-90f4-6d7e79d65f61')
// console.log(getTodos())

import { renderTodos } from './views'
import { setFilters } from './filters'
import { createTodo, loadTodos } from './todos'

renderTodos()

document.querySelector('#search-todo').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderTodos()

})


// add todo into todos array 
document.querySelector('#my-form').addEventListener('submit', (e) => {
    const text = e.target.elements.text.value.trim()
    e.preventDefault()

    if (text.length > 0) {
        createTodo(text)
        renderTodos()
        e.target.elements.text.value = ''
        
    } 
    
})



// event on checkbox
document.querySelector('#hide-completed').addEventListener('change', (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })
    renderTodos()
})

window.addEventListener('storage', (e) => {
    if (e.key === 'todos') {
        loadTodos()
        renderTodos()
    }
})