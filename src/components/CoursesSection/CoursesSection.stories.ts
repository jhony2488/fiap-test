import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { CoursesSection } from './index';

const meta = {
  title: 'Components/CoursesSection',
  component: CoursesSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CoursesSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    activeCategory: 'all',
    toggleCategory: () => {},
  },
};
