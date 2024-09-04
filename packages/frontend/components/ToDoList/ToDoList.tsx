/* eslint-disable react/jsx-props-no-spreading */

'use client';

import React from 'react';
import cx from 'clsx';
import { Stack, Text, Checkbox } from '@mantine/core';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useRecoilState, useRecoilValue } from 'recoil';
import filteredTodoListState from '@/state-managements/FilteredToDoListState.recoil';
import todoListState from '../../state-managements/ToDoListState.recoil';
import classes from './ToDoList.module.css';
import ToDoListClass from '../../classes/ToDoList/ToDoList.class';
import ToDoDeleteIcon from '../ToDoDeleteIcon/ToDoDeleteIcon';

function ToDoList() {
  const filteredTodoList = useRecoilValue(filteredTodoListState);
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const items = filteredTodoList.map((item, index) => (
    <Draggable key={item.id} index={index} draggableId={item.id.toString()}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Checkbox
            id={`todo-checkbox-${item.id}`}
            className={classes.symbol}
            aria-label={`todo-checkbox-${item.id}`}
            defaultChecked={item.completed}
            onChange={(event) => {
              setTodoList(
                ToDoListClass.setCompletionStatus({ todoList, todoId: item.id, completed: event.target.checked }),
              );
            }}
          />
          <Stack gap="0">
            <Text td={item.completed ? 'line-through' : ''}>{item.title}</Text>
            <Text c="dimmed" size="sm">
              {[
                `Category: ${item.category}`,
                item.dueDate ? `DueDate: ${item.dueDate.toISOString().split('T')[0]}` : null,
              ]
                .filter((element) => Boolean(element))
                .join(' • ')}
            </Text>
          </Stack>
          <ToDoDeleteIcon
            onClick={() => {
              setTodoList(ToDoListClass.removeItem(todoList, item.id));
            }}
          />
        </div>
      )}
    </Draggable>
  ));

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => {
        setTodoList(
          ToDoListClass.reorder({
            todoList,
            from: { todoId: filteredTodoList[source.index].id },
            to: {
              todoId: filteredTodoList[destination?.index || 0].id,
            },
          }),
        );
      }}
    >
      <Droppable droppableId="dnd-list" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default ToDoList;
