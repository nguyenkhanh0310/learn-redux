import { createSelector } from '@reduxjs/toolkit';

export const searchTextSelector = (state) => state.filters.search;
export const filterStatusSelector = (state) => state.filters.status;
export const filterPrioritiesSelector = (state) => state.filters.priorities;
export const todoListSelector = (state) => state.todoList.todos;

// reselect
export const todosRemainingSelector = createSelector(
  todoListSelector,
  filterStatusSelector,
  filterPrioritiesSelector,
  searchTextSelector,
  (todoList, status, priorities, searchText) => { // status => 'All', 'completed', 'To do'
    return todoList.filter((todo) => {
      if (status === 'All') {
        return priorities.length
          ? todo.name.includes(searchText) && priorities.includes(todo.priority)
          : todo.name.includes(searchText);
      }
      return (
        todo.name.includes(searchText) &&
        (status === 'Completed' ? todo.completed : !todo.completed)
        &&
        (priorities.length ? priorities.includes(todo.priority) : true)
      );
    })
  })

// nếu ta có 1 selector phụ thuộc vào 1 selector khác thì ta truyền vào làm tham số cho createSelector