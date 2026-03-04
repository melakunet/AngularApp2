import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

/**
 * CompletedStrikethroughDirective - Custom attribute directive
 * Applies strike-through styling to completed tasks
 * Demonstrates reactive directive pattern from Chapter 5
 * 
 * When a task is marked as completed, this directive:
 * - Applies text-decoration: line-through
 * - Reduces opacity to show task is done
 * - Updates dynamically when completion status changes
 * 
 * Usage: <div [appCompletedStrikethrough]="task.completed">...</div>
 */
@Directive({
  selector: '[appCompletedStrikethrough]',
  standalone: true
})
export class CompletedStrikethroughDirective implements OnChanges {
  
  /**
   * Input property to receive the completion status
   * Directive reacts to changes in this property
   */
  @Input() appCompletedStrikethrough: boolean = false;

  /**
   * Constructor with dependency injection
   * 
   * @param el - Reference to the host element
   * @param renderer - Renderer for safe DOM manipulation
   */
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  /**
   * Lifecycle hook - called when input properties change
   * This makes the directive reactive to completion status changes
   * Implements OnChanges interface for reactive behavior
   * 
   * @param changes - Object containing the changed properties
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Check if the completion status has changed
    if (changes['appCompletedStrikethrough']) {
      this.applyCompletedStyles();
    }
  }

  /**
   * Apply or remove strike-through styling based on completion status
   * Uses Renderer2 for safe and platform-independent DOM manipulation
   */
  private applyCompletedStyles(): void {
    const element = this.el.nativeElement;

    if (this.appCompletedStrikethrough) {
      // Task is completed - apply strike-through and reduce opacity
      this.renderer.setStyle(element, 'text-decoration', 'line-through');
      this.renderer.setStyle(element, 'opacity', '0.6');
      this.renderer.setStyle(element, 'color', '#6c757d');
      this.renderer.addClass(element, 'task-completed');
    } else {
      // Task is not completed - remove strike-through styling
      this.renderer.removeStyle(element, 'text-decoration');
      this.renderer.removeStyle(element, 'opacity');
      this.renderer.removeStyle(element, 'color');
      this.renderer.removeClass(element, 'task-completed');
    }
  }
}
