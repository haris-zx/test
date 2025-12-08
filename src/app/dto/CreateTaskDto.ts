export interface CreateTaskDto {
  orgId: number;
  ownerId: number;
  title: string;
  status: number;   // <- enum value
  priority: number; // <- enum value
  tags?: string;
  dueDate?: string;
}

export interface Task {
  id?: number;
  orgId: number;
  ownerId: number;
  title: string;
  status: number;   // <- enum value
  priority: number; // <- enum value
  tags?: string;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export function getStatusText(status: number): string {
  switch (status) {
    case 0: return 'Pending';
    case 1: return 'In Progress';
    case 2: return 'Completed';
    case 3: return 'Canceled';
    default: return 'Unknown';
  }
}

export function getPriorityText(priority: number): string {
  switch (priority) {
    case 0: return 'Low';
    case 1: return 'Medium';
    case 2: return 'High';
    case 3: return 'Critical';
    default: return 'Unknown';
  }
}