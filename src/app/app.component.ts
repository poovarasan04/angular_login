import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tarkiz_assesment';
  is_form_type:string="login";

  public switchForm(value:string){
    this.is_form_type=value;
  }
}
