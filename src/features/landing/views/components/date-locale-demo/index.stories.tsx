import { DateLocaleDemo } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof DateLocaleDemo> = {
  title: 'Landing/DateLocaleDemo',
  component: DateLocaleDemo,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof DateLocaleDemo>;

export const Default: Story = {};
