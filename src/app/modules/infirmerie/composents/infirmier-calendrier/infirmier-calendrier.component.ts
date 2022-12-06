import { Component, OnInit } from '@angular/core';

@Component({ 
  selector: 'app-infirmier-calendrier',
  templateUrl: './infirmier-calendrier.component.html',
  styleUrls: ['./infirmier-calendrier.component.scss']
})
export class InfirmierCalendrierComponent implements OnInit {

  options: any;
  header: any;
  constructor() { }

  ngOnInit(): void {
    this.options = {
      initialDate : '2019-01-01',
      headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable: true,
      selectable:true,
      selectMirror: true,
      dayMaxEvents: true
      };
  }
}
