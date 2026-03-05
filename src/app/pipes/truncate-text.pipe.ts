import { Pipe, PipeTransform } from '@angular/core';

/**
 * TruncateTextPipe truncates long text strings
 * Usage: {{ task.description | truncateText:50 }}
 */
@Pipe({
  name: 'truncateText',
  standalone: true
})
export class TruncateTextPipe implements PipeTransform {
  
  /** Truncate text to specified length and add ellipsis */
  transform(value: string, limit: number = 50, ellipsis: string = '...'): string {
    if (!value) {
      return '';
    }

    if (value.length <= limit) {
      return value;
    }

    const truncated = value.substring(0, limit);
    const lastSpace = truncated.lastIndexOf(' ');
    
    if (lastSpace > limit * 0.8) {
      return truncated.substring(0, lastSpace) + ellipsis;
    }

    return truncated + ellipsis;
  }
}
