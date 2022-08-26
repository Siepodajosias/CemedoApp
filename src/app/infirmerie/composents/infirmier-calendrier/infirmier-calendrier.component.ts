import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
@Component({
  selector: 'app-infirmier-calendrier',
  templateUrl: './infirmier-calendrier.component.html',
  styleUrls: ['./infirmier-calendrier.component.scss']
})
export class InfirmierCalendrierComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth'
  };

}
