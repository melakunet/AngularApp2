import { Pipe, PipeTransform } from '@angular/core';

/**
 * StatusLabelPipe - Custom pipe for transforming task completion status
 * Converts boolean completed status into user-friendly labels
 * Demonstrates data transformation pattern from Chapter 4
 * 
 * Usage: {{ task.completed | statusLabel }}
 * Output: "✅ COMPLETED" or "🕒 IN PROGRESS"
 */
@Pipe({
  name: 'statusLabel',
  standalone: true
})
export class StatusLabelPipe implements PipeTransform {
  
  /**
   * Transform boolean completion status into a labeled string
   * 
   * @param value - Boolean completion status
   * @param style - Optional style ('emoji', 'text', or 'badge')
   * @returns Formatted status label
   */
  transform(value: boolean, style: 'emoji' | 'text' | 'badge' = 'emoji'): string {
    switch (style) {
      case 'emoji':
        return value ? '✅ COMPLETED' : '🕒 IN PROGRESS';
      case 'text':
        return value ? 'COMPLETED' : 'IN PROGRESS';
      case 'badge':
        return value ? 'Done' : 'Pending';
      default:
        return value ? 'Completed' : 'In Progress';
    }
  }
}
