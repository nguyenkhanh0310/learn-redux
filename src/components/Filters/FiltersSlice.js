// const initState = {
//   search: '',
//   status: 'All',
//   priorities: []
// }

// const filtersReducer = (state = initState, action) => {
//   switch (action.type) {
//     case 'filters/searchFilterChange':
//       return {
//         ...state,
//         search: action.payload
//       }
//     case 'filters/statusFilterChange':
//       return {
//         ...state,
//         status: action.payload
//       }
//     case 'filters/prioritiesFilterChange':
//       return {
//         ...state,
//         priorities: action.payload
//       }
//     default:
//       return state;
//   }
// }

// export default filtersReducer;

import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'filters',
  initialState: {
    search: '',
    status: 'All',
    priorities: []
  },
  reducers: {
    searchFilterChange: (state, action) => {
      // mutation || IMMER
      state.search = action.payload;
    }, // => tạo ra 1 action creators {type: 'filters/searchFilterChange'}
    statusFilterChange: (state, action) => {
      state.status = action.payload;
    },
    priorityFilterChange: (state, action) => {
      state.priorities = action.payload;
    }
  }
})

/**  => Tạo ra reducer

action creator => (payload) => {
  type: 'filters/searchFilterChange' (name và tên của reducer được định nghĩa trong createSlice)
  payload: payload
}

=> {
reducer,
actions
}
action => object 
{
   type: 'abc',
   payload: value
}
   action creators => function: () => {
    return {
      type: 'abc',
      payload: value
    }
  }
*/