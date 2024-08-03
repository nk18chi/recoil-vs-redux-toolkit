import React from 'react';
import ToDoList from '@/components/Recoil/ToDoList/ToDoList';
import { Stack, Title } from '@mantine/core';

function RecoilPage() {
  return (
    <Stack component="main" className="pt-10 m-auto" align="center" justify="center" gap="md">
      <Title>ToDo List with Recoil</Title>
      <ToDoList />
    </Stack>
  );
}

export default RecoilPage;
