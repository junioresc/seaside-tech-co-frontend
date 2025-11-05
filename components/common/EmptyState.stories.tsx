import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import InboxIcon from '@mui/icons-material/Inbox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    title: 'No items found',
    description: 'There are no items to display at this time.',
  },
};

export const WithIcon: Story = {
  args: {
    icon: <InboxIcon sx={{ fontSize: 64 }} />,
    title: 'No items found',
    description: 'There are no items to display at this time.',
  },
};

export const WithAction: Story = {
  args: {
    icon: <ShoppingCartIcon sx={{ fontSize: 64 }} />,
    title: 'Your cart is empty',
    description: 'Add some products to get started!',
    action: {
      label: 'Browse Products',
      onClick: () => alert('Navigate to products'),
    },
  },
};

export const NoRepairs: Story = {
  args: {
    icon: <InboxIcon sx={{ fontSize: 64 }} />,
    title: 'No repairs yet',
    description: 'When you have repairs, they will appear here.',
  },
};

export const NoAppointments: Story = {
  args: {
    icon: <InboxIcon sx={{ fontSize: 64 }} />,
    title: 'No appointments scheduled',
    description: 'Book an appointment to see it here.',
    action: {
      label: 'Book Appointment',
      onClick: () => alert('Navigate to booking'),
    },
  },
};

