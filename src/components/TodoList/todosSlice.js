// const initState = [
//   {
//     id: 1,
//     name: 'Learn yoga',
//     completed: false,
//     priority: 'Medium'
//   },
//   {
//     id: 2,
//     name: 'Learn redux',
//     completed: true,
//     priority: 'High'
//   },
//   {
//     id: 3,
//     name: 'Learn JS',
//     completed: false,
//     priority: 'Low'
//   },
// ];

// const todoListReducer = (state = initState, action) => {
//   switch (action.type) {
//     case 'todoList/addTodo':
//       return [
//         ...state,
//         action.payload
//       ];
//     case 'todoList/toggleTodoStatus':
//       return state.map(todo =>
//         todo.id === action.payload
//           ? { ...todo, completed: !todo.completed }
//           : todo
//       );
//     default:
//       return state;
//   }
// }

// export default todoListReducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todoList',
  initialState: { status: 'idle', todos: [] }, // [] => { status: '', todos: [] }
  reducers: { // IMMER
    addTodo: (state, action) => {
      state.push(action.payload);
    }, // action creators
    toggleTodoStatus: (state, action) => {
      const currentTodo = state.find(todo => todo.id === action.payload);
      if (currentTodo) {
        currentTodo.completed = !currentTodo.completed;
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.status = 'loading';     
    }).addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.status = 'idle';
    }).addCase(addNewTodo.fulfilled, (state, action) => {
      state.todos.push(action.payload);
    }).addCase(updateTodo.fulfilled, (state, action) => {
      let currentTodo = state.todos.find((todo) => todo.id === action.payload);
      currentTodo = action.payload;
    })
  }
});

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const res = await fetch('/api/todos');
  const data = await res.json()
  return data.todos;
})

export const addNewTodo = createAsyncThunk('todos/addNewTodo', async (newTodo) => {
  const res = await fetch('/api/todos', {
    method: 'POST',
    body: JSON.stringify(newTodo)
  })
  const data = await res.json();
  return data.todos;
})

export const updateTodo = createAsyncThunk('todos/updateTodo', async (updatedTodo) => {
  const res = await fetch('/api/updateTodo', {
    method: 'POST',
    body: JSON.stringify(updateTodo)
  })
  const data = await res.json();
  return data.todos;
})

/** 
 * createAsyncThunk tạo chúng ta 3 actions tương ứng: 
 * todos/fetchTodos/pending
 * todos/fetchTodos/fullfilled
 * todos/fetchTodos/rejected
 * */

export default todosSlice;



// action => {object} và action creator () => { return action }
// thunk action (function) và thunk action creators () => { return thunk action }

// export function addTodos(todo) { // thunk function - thunk action
//   return function addTodosThunk(dispatch, getState) {
//     console.log('add to do', getState());
//     console.log({ todo })

//     // custom payload
//     todo.name = 'Test custom payload'
//     dispatch(todosSlice.actions.addTodo(todo));

//     console.log('add todo thunk after', getState());
//   }
// } 

