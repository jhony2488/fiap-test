import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { FaqSection } from './index';

const meta = {
  title: 'Components/FaqSection',
  component: FaqSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FaqSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    openFaqIndex: null,
    setOpenFaqIndex: () => {},
  },
};

export const OneItemSelected: Story = {
  args: {
    openFaqIndex: 0,
    setOpenFaqIndex: () => {},
  },
};
