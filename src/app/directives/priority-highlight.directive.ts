import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

/**
 * PriorityHighlightDirective styles tasks based on priority level
 * Usage: <div [appPriorityHighlight]="task.priority">...</div>
 */
@Directive({
  selector: '[appPriorityHighlight]',
  standalone: true
})
export class PriorityHighlightDirective implements OnInit {
  
  /** Input property for priority level */
  @Input() appPriorityHighlight: 'high' | 'medium' | 'low' = 'low';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.applyPriorityStyles();
  }

  /** Apply visual styles based on task priority */
  private applyPriorityStyles(): void {
    const element = this.el.nativeElement;

    this.renderer.removeClass(element, 'priority-high');
    this.renderer.removeClass(element, 'priority-medium');
    this.renderer.removeClass(element, 'priority-low');

    switch (this.appPriorityHighlight) {
      case 'high':
        this.renderer.setStyle(element, 'border-left', '6px solid #dc3545');
        this.renderer.setStyle(element, 'background-color', '#fff5f5');
        this.renderer.addClass(element, 'priority-high');
        break;

      case 'medium':
        this.renderer.setStyle(element, 'border-left', '6px solid #fd7e14');
        this.renderer.setStyle(element, 'background-color', '#fff8f0');
        this.renderer.addClass(element, 'priority-medium');
        break;

      case 'low':
        this.renderer.setStyle(element, 'border-left', '6px solid #28a745');
        this.renderer.setStyle(element, 'background-color', '#f0fff4');
        this.renderer.addClass(element, 'priority-low');
        break;
    }

    this.renderer.setStyle(element, 'padding', '15px');
    this.renderer.setStyle(element, 'margin-bottom', '10px');
    this.renderer.setStyle(element, 'border-radius', '8px');
    this.renderer.setStyle(element, 'transition', 'all 0.3s ease');
  }
}
