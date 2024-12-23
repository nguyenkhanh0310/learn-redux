import { Col, Row, Input, Button, Select, Tag, Space } from 'antd';
import Todo from '../Todo';
import { useDispatch, useSelector } from "react-redux";
// import { addTodo } from '../../redux/actions';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { todosRemainingSelector } from '../../redux/selectors';
import todoListSlice, { addNewTodo, addTodos } from './todosSlice';

export default function TodoList() {
  const [todoName, setTodoName] = useState('');
  const [priority, setPriority] = useState('Medium');

  const todoList = useSelector(todosRemainingSelector);

  const dispatch = useDispatch();

  const handleAddButtonClick = () => {
    // dispatch(
    //   todoListSlice.actions.addTodo({
    //     id: uuidv4(),
    //     name: todoName,
    //     priority: priority,
    //     completed: false
    //   })
    // );

    dispatch(addNewTodo(
      {
        id: uuidv4(),
        name: todoName,
        priority: priority,
        completed: false
      }
    ))

    // dispatch 1 thunk action creator

    // dispatch(addTodos(
    //   {
    //     id: uuidv4(),
    //     name: todoName,
    //     priority: priority,
    //     completed: false
    //   }
    // ))

    setTodoName('');
    setPriority('Medium');
  }

  const handleInputChange = (e) => {
    setTodoName(e.target.value);
  }

  const handlePriorityChange = (value) => {
    setPriority(value);
  }

  return (
    <Row style={{ height: 'calc(100% - 40px)' }}>
      <Col span={24} style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
        {todoList.map(todo => (
          <Todo key={todo.id} id={todo.id} name={todo.name} priority={todo.priority} completed={todo.completed} />
        ))}
      </Col>
      <Col span={24}>
        <Space.Compact style={{ display: 'flex' }}>
          <Input value={todoName} onChange={handleInputChange} />
          <Select defaultValue="Medium" onChange={handlePriorityChange}>
            <Select.Option value='High'>
              <Tag color='red'>High</Tag>
            </Select.Option>
            <Select.Option value='Medium'>
              <Tag color='blue'>Medium</Tag>
            </Select.Option>
            <Select.Option value='Low'>
              <Tag color='gray'>Low</Tag>
            </Select.Option>
          </Select>
          <Button type='primary' onClick={handleAddButtonClick}>
            Add
          </Button>
        </Space.Compact>
      </Col>
    </Row>
  );
}