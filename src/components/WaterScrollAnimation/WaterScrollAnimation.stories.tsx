import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { WaterScrollAnimation } from './index';

const meta = {
  title: 'Components/WaterScrollAnimation',
  component: WaterScrollAnimation,
  parameters: {
    layout: 'centered',
  },
    decorators: [
      (Story) => (
        <div style={{  width: '100%', minHeight: '100vh', backgroundColor: '#000' }} >
          <Story />
        </div>
      ),
    ],
  tags: ['autodocs'],
} satisfies Meta<typeof WaterScrollAnimation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};