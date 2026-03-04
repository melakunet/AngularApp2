import { Pipe, PipeTransform } from '@angular/core';

/**
 * TruncateTextPipe - Custom pipe for truncating long text strings
 * Useful for displaying task descriptions in a compact format
 * Follows Angular's custom pipe pattern (Chapter 4)
 * 
 * Usage: {{ task.description | truncateText:50 }}
 * Output: "This is a long description that will be tru..."
 */
@Pipe({
  name: 'truncateText',
  standalone: true
})
export class TruncateTextPipe implements PipeTransform {
  
  /**
   * Truncate text to a specified length and add ellipsis
   * 
   * @param value - Text to truncate
   * @param limit - Maximum character length (default: 50)
   * @param ellipsis - String to append when truncated (default: '...')
   * @returns Truncated text with ellipsis
   */
  transform(value: string, limit: number = 50, ellipsis: string = '...'): string {
    if (!value) {
      return '';
    }

    // If text is shorter than limit, return as-is
    if (value.length <= limit) {
      return value;
    }

    // Truncate and add ellipsis
    // Try to break at word boundary for better readability
    const truncated = value.substring(0, limit);
    const lastSpace = truncated.lastIndexOf(' ');
    
    // If there's a space within reasonable distance, break there
    if (lastSpace > limit * 0.8) {
      return truncated.substring(0, lastSpace) + ellipsis;
    }

    return truncated + ellipsis;
  }
}
