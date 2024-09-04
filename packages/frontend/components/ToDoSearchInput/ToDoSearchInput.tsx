'use client';

import React from 'react';
import { TextInput, TextInputProps, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import todoListFiltersState from '@/state-managements/ToDoListFiltersState.recoil';
import { useSetRecoilState } from 'recoil';

function ToDoSearchInput(props: TextInputProps) {
  const setToDoListFilters = useSetRecoilState(todoListFiltersState);
  return (
    <TextInput
      id="todo-search-input"
      radius="xl"
      size="md"
      placeholder="Search Tasks"
      rightSectionWidth={42}
      leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
      onChange={(event) => {
        setToDoListFilters((prev) => ({
          ...prev,
          searchText: event.currentTarget.value,
        }));
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}

export default ToDoSearchInput;
