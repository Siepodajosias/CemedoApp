import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-medecin-calendrier',
  templateUrl: './medecin-calendrier.component.html',
  styleUrls: ['./medecin-calendrier.component.scss']
})
export class MedecinCalendrierComponent implements OnInit {

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
