import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

/**
 * PriorityHighlightDirective - Custom attribute directive
 * Modifies the appearance of tasks based on their priority level
 * Demonstrates directive pattern from Chapter 5
 * 
 * High priority: Red border and light red background
 * Medium priority: Orange border and light orange background
 * Low priority: Green border and light green background
 * 
 * Usage: <div [appPriorityHighlight]="task.priority">...</div>
 */
@Directive({
  selector: '[appPriorityHighlight]',
  standalone: true
})
export class PriorityHighlightDirective implements OnInit {
  
  /**
   * Input property to receive the priority level
   * This allows the directive to react to different priority values
   */
  @Input() appPriorityHighlight: 'high' | 'medium' | 'low' = 'low';

  /**
   * Constructor with dependency injection
   * ElementRef: Reference to the host element
   * Renderer2: Safe way to manipulate DOM (prevents XSS attacks)
   * 
   * @param el - Reference to the host element
   * @param renderer - Renderer for safe DOM manipulation
   */
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  /**
   * Lifecycle hook - called after Angular initializes the directive
   * Applies styling based on priority level
   */
  ngOnInit(): void {
    this.applyPriorityStyles();
  }

  /**
   * Apply visual styles based on task priority
   * Uses Renderer2 for safe DOM manipulation
   * Each priority level gets distinct visual treatment
   */
  private applyPriorityStyles(): void {
    const element = this.el.nativeElement;

    // Remove any existing priority classes
    this.renderer.removeClass(element, 'priority-high');
    this.renderer.removeClass(element, 'priority-medium');
    this.renderer.removeClass(element, 'priority-low');

    // Apply styles based on priority
    switch (this.appPriorityHighlight) {
      case 'high':
        // High priority: Red accent with warning border
        this.renderer.setStyle(element, 'border-left', '6px solid #dc3545');
        this.renderer.setStyle(element, 'background-color', '#fff5f5');
        this.renderer.addClass(element, 'priority-high');
        break;

      case 'medium':
        // Medium priority: Orange accent
        this.renderer.setStyle(element, 'border-left', '6px solid #fd7e14');
        this.renderer.setStyle(element, 'background-color', '#fff8f0');
        this.renderer.addClass(element, 'priority-medium');
        break;

      case 'low':
        // Low priority: Green accent
        this.renderer.setStyle(element, 'border-left', '6px solid #28a745');
        this.renderer.setStyle(element, 'background-color', '#f0fff4');
        this.renderer.addClass(element, 'priority-low');
        break;
    }

    // Add common styling for all priority levels
    this.renderer.setStyle(element, 'padding', '15px');
    this.renderer.setStyle(element, 'margin-bottom', '10px');
    this.renderer.setStyle(element, 'border-radius', '8px');
    this.renderer.setStyle(element, 'transition', 'all 0.3s ease');
  }
}
