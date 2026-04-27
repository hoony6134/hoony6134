import { Button } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Button> = {
  title: 'Landing/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: '확인',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    label: '취소',
    variant: 'secondary',
  },
};

export const Both: Story = {
  render: () => (
    <div className="flex gap-3">
      <Button label="확인" variant="primary" />
      <Button label="취소" variant="secondary" />
    </div>
  ),
};
