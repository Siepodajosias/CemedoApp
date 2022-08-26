import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';


@Component({
  selector: 'app-medecin-calendrier',
  templateUrl: './medecin-calendrier.component.html',
  styleUrls: ['./medecin-calendrier.component.scss']
})
export class MedecinCalendrierComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth'
  };


}
