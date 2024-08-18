/* eslint-disable react/jsx-props-no-spreading */

'use client';

import React from 'react';
import cx from 'clsx';
import { Stack, Text, Checkbox } from '@mantine/core';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useRecoilState } from 'recoil';
import todoListState from '../../state-managements/ToDoListState.recoil';
import classes from './ToDoList.module.css';
import ToDoListClass from '../../classes/ToDoList/ToDoList.class';
import ToDoDeleteIcon from '../ToDoDeleteIcon/ToDoDeleteIcon';

function ToDoList() {
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const items = todoList.map((item, index) => (
    <Draggable key={item.id} index={index} draggableId={item.id.toString()}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Checkbox className={classes.symbol} />
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
              setTodoList(ToDoListClass.removeItem(todoList, index));
            }}
          />
        </div>
      )}
    </Draggable>
  ));

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => {
        setTodoList(ToDoListClass.reorder({ todo: todoList, from: source.index, to: destination?.index || 0 }));
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
