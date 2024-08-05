/* eslint-disable react/jsx-props-no-spreading */

'use client';

import React from 'react';
import cx from 'clsx';
import { Stack, Text, Checkbox, ActionIcon } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { IconTrash } from '@tabler/icons-react';
import classes from './index.module.css';

enum Category {
  Work = 'Work',
  Personal = 'Personal',
  Other = 'Other',
}

const data = [
  { id: 1, title: 'Finish the Project', category: Category.Work, dueDate: '2024-12-15', completed: true },
  { id: 2, title: 'Send the Report', category: Category.Work, dueDate: '2024-12-20', completed: false },
  { id: 3, title: 'Buy Groceries', category: Category.Personal, dueDate: '2024-12-23', completed: false },
  { id: 4, title: 'Read a Book', category: Category.Personal, dueDate: '2022-12-28', completed: false },
  { id: 5, title: 'Clean the House', category: Category.Personal, dueDate: '2022-12-31', completed: false },
];

function ToDoList() {
  const [state, handlers] = useListState(data);

  const items = state.map((item, index) => (
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
              Category: {item.category} • DueDate: {item.dueDate}
            </Text>
          </Stack>
          <ActionIcon variant="white" aria-label="Delete" className="ml-auto">
            <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </div>
      )}
    </Draggable>
  ));

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => handlers.reorder({ from: source.index, to: destination?.index || 0 })}
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
