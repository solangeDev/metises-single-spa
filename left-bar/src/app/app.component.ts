import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ms-left-bar',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent  implements OnInit{
  title = 'left-bar';
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  public _opened: boolean = true;

  public _toggleSidebar() {
    this._opened = !this._opened;
  }
}
