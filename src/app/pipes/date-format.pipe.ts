import { Pipe, PipeTransform } from '@angular/core';

/**
 * DateFormatPipe - Custom pipe for formatting task due dates
 * Transforms Date objects into user-friendly string formats
 * Follows Angular's custom pipe pattern (Chapter 4)
 * 
 * Usage: {{ task.dueDate | dateFormat }}
 * Output: "Mar 6, 2026" or "Today" or "Tomorrow" or "Overdue"
 */
@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {
  
  /**
   * Transform a date into a readable format
   * Provides special labels for today, tomorrow, and overdue dates
   * 
   * @param value - Date to format
   * @param format - Optional format type ('short', 'long', or 'relative')
   * @returns Formatted date string
   */
  transform(value: Date | string, format: 'short' | 'long' | 'relative' = 'relative'): string {
    if (!value) {
      return 'No due date';
    }

    const date = typeof value === 'string' ? new Date(value) : value;
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Reset time components for accurate day comparison
    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);

    // Relative format provides contextual labels
    if (format === 'relative') {
      if (compareDate.getTime() === today.getTime()) {
        return '📅 Today';
      } else if (compareDate.getTime() === tomorrow.getTime()) {
        return '📅 Tomorrow';
      } else if (compareDate < today) {
        return '⚠️ Overdue';
      }
    }

    // Format based on requested style
    const options: Intl.DateTimeFormatOptions = format === 'short'
      ? { month: 'short', day: 'numeric' }
      : { month: 'short', day: 'numeric', year: 'numeric' };

    return date.toLocaleDateString('en-US', options);
  }
}
