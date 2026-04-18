import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ContactSection } from './index';

const meta = {
  title: 'Components/ContactSection',
  component: ContactSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

} satisfies Meta<typeof ContactSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
