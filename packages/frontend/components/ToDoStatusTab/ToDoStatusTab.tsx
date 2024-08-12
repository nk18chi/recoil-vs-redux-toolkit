'use client';

import React, { useState } from 'react';
import { Container, Anchor, Group, Box } from '@mantine/core';
import classes from './ToDoStatusTab.module.css';

enum Status {
  All = 'All',
  Incomplete = 'Incomplete',
  Complete = 'Complete',
}

const mainLinks = [{ label: Status.All }, { label: Status.Incomplete }, { label: Status.Complete }];

function ToDoStatusTab() {
  const [active, setActive] = useState(0);

  const mainItems = mainLinks.map((item, index) => (
    <Anchor<'a'>
      key={item.label}
      className={classes.mainLink}
      data-active={index === active || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(index);
      }}
    >
      {item.label}
    </Anchor>
  ));

  return (
    <Box className={classes.header}>
      <Container className={classes.inner}>
        <Box className={classes.links}>
          <Group gap={0} justify="flex-end" className={classes.mainLinks}>
            {mainItems}
          </Group>
        </Box>
      </Container>
    </Box>
  );
}

export default ToDoStatusTab;
