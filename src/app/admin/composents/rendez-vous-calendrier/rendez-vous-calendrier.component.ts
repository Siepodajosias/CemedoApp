import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-rendez-vous-calendrier',
  templateUrl: './rendez-vous-calendrier.component.html',
  styleUrls: ['./rendez-vous-calendrier.component.scss']
})
export class RendezVousCalendrierComponent implements OnInit {
  options: CalendarOptions;

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
