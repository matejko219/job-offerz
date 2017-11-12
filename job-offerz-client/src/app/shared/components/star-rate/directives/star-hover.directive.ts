import {Directive, ElementRef, Renderer2, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[starHover]'
})
export class StarHoverDirective implements OnInit {

  _value: number = 1;
  starNodes: any[] = [];
  isDivHover: boolean = false;
  lastHoverStarId: number = 0;

  @Input()
  disabled = false;

  @Input('starHover') set value(value: number) {
    this._value = value;
    this.setStarsBasedOnValue();
  }

  get value() {
    return this._value;
  }

  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.starNodes = Array.from(this.elementRef.nativeElement.children);
    this.starNodes = this.starNodes.slice(1);
    this.starNodes.forEach((node, idx) => {
      node.addEventListener('mouseover', (event) => {
        this.lastHoverStarId = idx;
        this.isDivHover = true;
        this.setStarsBasedOnValue();
      });

      node.addEventListener('mouseout', (event) => {
        this.isDivHover = false;
        this.setStarsBasedOnValue();
      });
    });
    this.setStarsBasedOnValue();
  }

  private setStarsBasedOnValue() {
    if (this.starNodes) {
      this.starNodes.forEach((node, idx) => {
        if (this.isDivHover && !this.disabled) {
          if (idx <= this.lastHoverStarId) {
            this.renderer.setProperty(node, 'innerText', 'star');
          } else this.renderer.setProperty(node, 'innerText', 'star_border');
        }else {
          if (this.value >= idx + 1) {
            this.renderer.setProperty(node, 'innerText', 'star');
          } else this.renderer.setProperty(node, 'innerText', 'star_border');
        }
      });
    }
  }
}
