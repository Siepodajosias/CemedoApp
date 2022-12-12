import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-programme',
  templateUrl: './programme.component.html',
  styleUrls: ['./programme.component.scss']
})
export class ProgrammeComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }
  urlActif():boolean{
    return this.route.url.includes('/doctor/programme')
  }
}
