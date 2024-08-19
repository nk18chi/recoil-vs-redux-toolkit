'use client';

import React from 'react';
import { RingProgress, Text, SimpleGrid, Paper, Group, RingProgressProps } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import TodoListStatsState from '@/state-managements/ToDoListStatsState.recoil';

type TToDoStats = {
  label: string;
  stats: string;
  sections: RingProgressProps['sections'];
};

const defaultColors = ['blue', 'red', 'gray', 'green', 'orange', 'teal', 'cyan', 'indigo', 'pink', 'lime'];

function ToDoStats() {
  const { totalTasks, totalCompletedTasks, totalOverdueTasks, tasksByCategory } = useRecoilValue(TodoListStatsState);
  const data: TToDoStats[] = [
    {
      label: 'Total Tasks',
      stats: totalTasks.toString(),
      sections: Object.entries(tasksByCategory).map(([category, count], index) => ({
        value: (count / totalTasks) * 100,
        tooltip: category,
        color: defaultColors[index % defaultColors.length],
      })) as RingProgressProps['sections'],
    },
    {
      label: 'Completed Tasks',
      stats: totalCompletedTasks.toString(),
      sections: [{ value: (totalCompletedTasks / totalTasks) * 100, color: 'teal' }] as RingProgressProps['sections'],
    },
    {
      label: 'Overdue Tasks',
      stats: totalOverdueTasks.toString(),
      sections: [{ value: (totalOverdueTasks / totalTasks) * 100, color: 'red' }] as RingProgressProps['sections'],
    },
  ] as const;

  const stats = data.map((stat) => (
    <Paper withBorder radius="md" p="xs" key={stat.label}>
      <Group>
        <RingProgress size={80} roundCaps thickness={8} sections={stat.sections} />

        <div>
          <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
            {stat.label}
          </Text>
          <Text fw={700} size="xl" aria-label={stat.label}>
            {stat.stats}
          </Text>
        </div>
      </Group>
    </Paper>
  ));

  return <SimpleGrid cols={{ base: 1, sm: 3 }}>{stats}</SimpleGrid>;
}

export default ToDoStats;
