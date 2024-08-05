import React from 'react';
import { RingProgress, Text, SimpleGrid, Paper, Group, RingProgressProps } from '@mantine/core';

const data = [
  {
    label: 'Total Tasks',
    stats: '5',
    sections: [
      { value: 40, tooltip: 'Work', color: 'blue' },
      { value: 50, tooltip: 'Private', color: 'red' },
      { value: 10, tooltip: 'Other', color: 'gray' },
    ] as RingProgressProps['sections'],
  },
  {
    label: 'Completed Tasks',
    stats: '1',
    sections: [{ value: 72, color: 'teal' }] as RingProgressProps['sections'],
  },
  { label: 'Overdue Tasks', stats: '2', sections: [{ value: 72, color: 'red' }] as RingProgressProps['sections'] },
] as const;

function ToDoStats() {
  const stats = data.map((stat) => (
    <Paper withBorder radius="md" p="xs" key={stat.label}>
      <Group>
        <RingProgress size={80} roundCaps thickness={8} sections={stat.sections} />

        <div>
          <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
            {stat.label}
          </Text>
          <Text fw={700} size="xl">
            {stat.stats}
          </Text>
        </div>
      </Group>
    </Paper>
  ));

  return <SimpleGrid cols={{ base: 1, sm: 3 }}>{stats}</SimpleGrid>;
}

export default ToDoStats;
