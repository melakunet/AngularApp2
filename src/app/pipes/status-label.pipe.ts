import { Pipe, PipeTransform } from '@angular/core';

/**
 * StatusLabelPipe transforms boolean completion status into labels
 * Usage: {{ task.completed | statusLabel }}
 */
@Pipe({
  name: 'statusLabel',
  standalone: true
})
export class StatusLabelPipe implements PipeTransform {
  
  /** Transform boolean status into a labeled string */
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
