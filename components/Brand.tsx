import { ActionIcon, Box, Group } from '@mantine/core';
import { MoonStars } from 'tabler-icons-react';

export function Brand() {
  return (
    <Box
      sx={theme => ({
        paddingLeft: theme.spacing.xs,
        paddingRight: theme.spacing.xs,
        paddingBottom: theme.spacing.lg,
        borderBottom: `1px solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      })}
    >
      <Group position="apart">
        <span>Golf Blitz Stats</span>
        <ActionIcon
          variant="default"
          onClick={() => console.log('Toggle')}
          size={30}
        >
          <MoonStars size={16} />
        </ActionIcon>
      </Group>
    </Box>
  );
}
