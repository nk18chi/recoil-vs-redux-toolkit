/* eslint-disable react/jsx-props-no-spreading */

'use client';

import React from 'react';
import { Button, Group, NativeSelect, Stack, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import ToDoCategory from '@/classes/ToDo/ToDoCategory.enum';
import { DateInput } from '@mantine/dates';

interface IToDoForm {
  title: string;
  category: ToDoCategory;
  dueDate?: Date | null;
}

interface ToDoFormProps {
  onSubmit: (values: IToDoForm) => void;
}

function ToDoForm({ onSubmit }: ToDoFormProps) {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: '',
      category: ToDoCategory.Work,
      dueDate: null,
    } as IToDoForm,

    validate: {
      title: isNotEmpty('Title is required'),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
      <Stack gap="sm">
        <TextInput
          withAsterisk
          label="Title"
          placeholder="What is your next task?"
          key={form.key('title')}
          {...form.getInputProps('title')}
        />
        <NativeSelect
          withAsterisk
          label="Category"
          data={Object.values(ToDoCategory)}
          onChange={(event) => form.setFieldValue('category', event.currentTarget.value as ToDoCategory)}
          aria-label="ToDo Category"
        />
        <DateInput
          aria-label="ToDo Due Date"
          label="Due Date"
          placeholder="Due Date"
          onChange={(data) => form.setFieldValue('dueDate', data)}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </Stack>
    </form>
  );
}
export default ToDoForm;
