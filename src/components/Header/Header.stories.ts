import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Header } from './index';

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Progress0Porcent: Story = {
  args: {
    progress: 0,
  },
};

export const Progress50Porcent: Story = {
  args: {
    progress: 50,
  },
};

export const Progress100Porcent: Story = {
  args: {
    progress: 100,
  },
};
