import { Pipe, PipeTransform } from '@angular/core';

/**
 * DateFormatPipe transforms dates into user-friendly formats
 * Usage: {{ task.dueDate | dateFormat }}
 */
@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {
  
  /** Transform a date into a readable format */
  transform(value: Date | string, format: 'short' | 'long' | 'relative' = 'relative'): string {
    if (!value) {
      return 'No due date';
    }

    const date = typeof value === 'string' ? new Date(value) : value;
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);

    if (format === 'relative') {
      if (compareDate.getTime() === today.getTime()) {
        return '📅 Today';
      } else if (compareDate.getTime() === tomorrow.getTime()) {
        return '📅 Tomorrow';
      } else if (compareDate < today) {
        return '⚠️ Overdue';
      }
    }

    const options: Intl.DateTimeFormatOptions = format === 'short'
      ? { month: 'short', day: 'numeric' }
      : { month: 'short', day: 'numeric', year: 'numeric' };

    return date.toLocaleDateString('en-US', options);
  }
}
