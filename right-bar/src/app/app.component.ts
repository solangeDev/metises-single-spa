import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ms-right-bar',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }
  title = 'right-bar';

  public _opened: boolean = true;

  public _toggleSidebar() {
    this._opened = !this._opened;
  }

}
