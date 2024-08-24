'use client';

import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { useSetRecoilState } from 'recoil';
import todoListState from '@/state-managements/ToDoListState.recoil';
import IToDo from '@/classes/ToDo/ToDo.interface';
import ToDoForm from '../ToDoForm/ToDoForm';

function ToDoAddModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const setTodoList = useSetRecoilState(todoListState);
  return (
    <>
      <Modal opened={opened} onClose={close} title="Add New Task" centered>
        <ToDoForm
          onSubmit={(values) => {
            setTodoList((prev) => {
              const newTodo: IToDo = {
                ...values,
                id: prev.length + 1,
                completed: false,
                position: prev.length,
                createdAt: new Date(),
              };
              return [...prev, newTodo];
            });
            close();
          }}
        />
      </Modal>

      <Button aria-label="Add Task" onClick={open}>
        Add Task
      </Button>
    </>
  );
}
export default ToDoAddModal;
