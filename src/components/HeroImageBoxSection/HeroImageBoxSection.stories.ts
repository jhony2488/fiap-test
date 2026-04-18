import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { HeroImageBoxSection } from './index';

const meta = {
  title: 'Components/HeroImageBoxSection',
  component: HeroImageBoxSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HeroImageBoxSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    imageRef: { current: null },
    width78Porcent: 1440 * 0.78,
  },
};