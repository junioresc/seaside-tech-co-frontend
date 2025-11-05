import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from './StatusBadge';

const meta: Meta<typeof StatusBadge> = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: [
        'received',
        'diagnosing',
        'awaiting_approval',
        'approved',
        'repairing',
        'waiting_parts',
        'ready',
        'completed',
        'cancelled',
        'scheduled',
        'checked_in',
        'in_progress',
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

// Repair statuses
export const Received: Story = {
  args: {
    status: 'received',
  },
};

export const Diagnosing: Story = {
  args: {
    status: 'diagnosing',
  },
};

export const AwaitingApproval: Story = {
  args: {
    status: 'awaiting_approval',
  },
};

export const Approved: Story = {
  args: {
    status: 'approved',
  },
};

export const Repairing: Story = {
  args: {
    status: 'repairing',
  },
};

export const WaitingParts: Story = {
  args: {
    status: 'waiting_parts',
  },
};

export const Ready: Story = {
  args: {
    status: 'ready',
  },
};

export const Completed: Story = {
  args: {
    status: 'completed',
  },
};

export const Cancelled: Story = {
  args: {
    status: 'cancelled',
  },
};

// Appointment statuses
export const Scheduled: Story = {
  args: {
    status: 'scheduled',
  },
};

export const CheckedIn: Story = {
  args: {
    status: 'checked_in',
  },
};

export const InProgress: Story = {
  args: {
    status: 'in_progress',
  },
};

