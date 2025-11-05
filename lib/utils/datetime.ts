import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';

/**
 * Format a UTC datetime string to local timezone
 */
export const formatDateTime = (
  dateString: string,
  formatStr: string = 'PPpp'
): string => {
  const date = parseISO(dateString);
  return format(date, formatStr);
};

/**
 * Format a UTC datetime string to a specific timezone
 */
export const formatDateTimeInTimeZone = (
  dateString: string,
  timeZone: string,
  formatStr: string = 'PPpp'
): string => {
  const date = parseISO(dateString);
  return formatInTimeZone(date, timeZone, formatStr);
};

/**
 * Get relative time (e.g., "2 hours ago")
 */
export const getRelativeTime = (dateString: string): string => {
  const date = parseISO(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};

/**
 * Convert UTC to local timezone
 */
export const toLocalTime = (dateString: string): Date => {
  const date = parseISO(dateString);
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return toZonedTime(date, timeZone);
};

/**
 * Format date for display
 */
export const formatDate = (dateString: string): string => {
  const date = parseISO(dateString);
  return format(date, 'PP');
};

/**
 * Format time for display
 */
export const formatTime = (dateString: string): string => {
  const date = parseISO(dateString);
  return format(date, 'p');
};

