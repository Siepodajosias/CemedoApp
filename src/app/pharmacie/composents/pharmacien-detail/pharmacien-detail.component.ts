import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PharmacienService } from '../../service/pharmacien.service';

@Component({
  selector: 'app-pharmacien-detail',
  templateUrl: './pharmacien-detail.component.html',
  styleUrls: ['./pharmacien-detail.component.scss']
})
export class PharmacienDetailComponent implements OnInit {

  constructor(private pharService:PharmacienService,
    private routeParams:ActivatedRoute) { }

  ngOnInit(): void {
  }

}
