import { Component, ElementRef, HostListener, Renderer2, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tarkiz_assesment';
  is_form_type:string="login";
  isMobile!:number;

  public switchForm(value:string){
    this.is_form_type=value;
  }
  constructor(private el: ElementRef, private renderer: Renderer2){
    
  }
  ngOnInit(){
    this.adjustClasses(window.innerWidth);
  }

  ngOnChanges(_changes: SimpleChanges) {
   
  }
  ngAfterViewInit(){
    this.adjustClasses(window.innerWidth);
  }

@HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const target = event.target as Window;
    this.adjustClasses(target.innerWidth);
  }

  adjustClasses(width: number) {
    this.isMobile=width;
    const element = this.el.nativeElement.querySelector('#myelemont');
    const tab1=this.el.nativeElement.querySelector('#tab1');
    const tab2=this.el.nativeElement.querySelector('#tab2');

    if (width < 600) { 
      this.renderer.removeClass(element, 'h-75');
      this.renderer.addClass(element,'h-100');
      this.renderer.removeClass(tab1,'w-100')
      this.renderer.removeClass(tab2,'w-100')
    } else {
      this.renderer.removeClass(element, 'h-100');
      this.renderer.addClass(element, 'h-75');   
      this.renderer.addClass(tab1,'w-100')
      this.renderer.addClass(tab2,'w-100')  
    }
  }

}
