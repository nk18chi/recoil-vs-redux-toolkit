import React from 'react';
import ToDoList from '@/components/ToDoList/ToDoList';
import { Divider, Flex, Stack, Title } from '@mantine/core';
import ToDoStats from '@/components/ToDoStats/ToDoStats';
import ToDoSearchInput from '@/components/ToDoSearchInput/ToDoSearchInput';
import ToDoCategoryFilter from '@/components/ToDoCategoryFilter/ToDoCategoryFilter';
import ToDoSort from '@/components/ToDoSort/ToDoSort';
import ToDoStatusTab from '@/components/ToDoStatusTab/ToDoStatusTab';
import ToDoAddModal from '@/components/ToDoAddModal/ToDoAddModal';

function RecoilPage() {
  return (
    <Stack component="main" className="p-2 pt-10 m-auto max-w-screen-md items-stretch" gap="md">
      <Title className="text-center">ToDo List with Recoil</Title>
      <ToDoStats />
      <Stack gap="0">
        <Flex mih={50} gap="4" justify="space-between" align="center" direction="row" wrap="wrap">
          <ToDoStatusTab />
          <ToDoAddModal />
        </Flex>
        <Divider my="0" />
      </Stack>
      <Flex mih={50} gap="4" justify="stretch" align="center" direction="row" wrap="wrap">
        <ToDoCategoryFilter />
        <ToDoSearchInput className="flex-1" />
        <ToDoSort />
      </Flex>
      <ToDoList />
    </Stack>
  );
}

export default RecoilPage;
