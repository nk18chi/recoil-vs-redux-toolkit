import React from 'react';
import ToDoList from '@/components/ToDoList/ToDoList';
import { Stack, Title } from '@mantine/core';
import ToDoStats from '@/components/ToDoStats/ToDoStats';
import ToDoSearchInput from '@/components/ToDoSearchInput/ToDoSearchInput';

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
      <ToDoSearchInput />
      <ToDoList />
    </Stack>
  );
}

export default RecoilPage;
