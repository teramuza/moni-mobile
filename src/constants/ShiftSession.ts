
export const SESSION_STATUS = {
  NONE: 'none',
  WAITING: 'waiting',
  ACTIVE: 'active',
  COMPLETED: 'completed',
} as const;

export type SessionStatus = typeof SESSION_STATUS[keyof typeof SESSION_STATUS];
