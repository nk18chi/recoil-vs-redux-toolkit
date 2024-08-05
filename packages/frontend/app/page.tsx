import React from 'react';
import ToDoList from '@/components/Recoil/ToDoList/ToDoList';
import { Stack, Title } from '@mantine/core';
import ToDoStats from '@/components/Recoil/ToDoStats/ToDoStats';

function RecoilPage() {
  return (
    <Stack
      component="main"
      className="p-2 pt-10 m-auto max-w-screen-md items-stretch"
      align="center"
      justify="center"
      gap="md"
    >
      <Title className="text-center">ToDo List with Recoil</Title>
      <ToDoStats />
      <ToDoList />
    </Stack>
  );
}

export default RecoilPage;
