import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { HeroApresentationSection } from './index';

const meta = {
  title: 'Components/HeroApresentationSection',
  component: HeroApresentationSection,
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
} satisfies Meta<typeof HeroApresentationSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};