import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

/**
 * CompletedStrikethroughDirective applies strikethrough styling to completed tasks
 * Usage: <div [appCompletedStrikethrough]="task.completed">...</div>
 */
@Directive({
  selector: '[appCompletedStrikethrough]',
  standalone: true
})
export class CompletedStrikethroughDirective implements OnChanges {
  
  /** Input property for completion status */
  @Input() appCompletedStrikethrough: boolean = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  /** Respond to changes in completion status */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appCompletedStrikethrough']) {
      this.applyCompletedStyles();
    }
  }

  /** Apply or remove strikethrough styling based on completion status */
  private applyCompletedStyles(): void {
    const element = this.el.nativeElement;

    if (this.appCompletedStrikethrough) {
      this.renderer.setStyle(element, 'text-decoration', 'line-through');
      this.renderer.setStyle(element, 'opacity', '0.6');
      this.renderer.setStyle(element, 'color', '#6c757d');
      this.renderer.addClass(element, 'task-completed');
    } else {
      this.renderer.removeStyle(element, 'text-decoration');
      this.renderer.removeStyle(element, 'opacity');
      this.renderer.removeStyle(element, 'color');
      this.renderer.removeClass(element, 'task-completed');
    }
  }
}
