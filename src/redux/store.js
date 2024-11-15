import { createStore } from 'redux';
import rootReducer from './reducer';
import { composeWithDevTools } from '@redux-devtools/extension';

const composedEnhancers = composeWithDevTools();

const store = createStore(rootReducer,  composedEnhancers);
// rootReducer: 1 reducer là 1 function dùng để cập nhật lại giá trị state
// initValue: giá trị khởi tạo được set cho store
// enhancers: cấu hình các middleware: redux saga, redux thunk
export default store;
