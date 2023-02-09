import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReceptionService } from 'src/app/services/ServiceReception/reception.service';

@Component({
  selector: 'app-reception-detail',
  templateUrl: './reception-detail.component.html',
  styleUrls: ['./reception-detail.component.scss']
})
export class ReceptionDetailComponent implements OnInit {

  constructor(private receptService:ReceptionService,
    private routeParams:ActivatedRoute) { }

  ngOnInit(): void {
  }

}
