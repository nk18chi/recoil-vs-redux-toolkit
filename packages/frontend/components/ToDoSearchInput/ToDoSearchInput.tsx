import React from 'react';
import { TextInput, TextInputProps, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

function ToDoSearchInput(props: TextInputProps) {
  return (
    <TextInput
      radius="xl"
      size="md"
      placeholder="Search Tasks"
      rightSectionWidth={42}
      leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}

export default ToDoSearchInput;
