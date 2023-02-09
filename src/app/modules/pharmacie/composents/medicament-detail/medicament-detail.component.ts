import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PharmacienService } from 'src/app/services/ServicePharmacie/pharmacien.service';

@Component({
  selector: 'app-medicament-detail',
  templateUrl: './medicament-detail.component.html',
  styleUrls: ['./medicament-detail.component.scss']
})
export class MedicamentDetailComponent implements OnInit {

  constructor(private pharService:PharmacienService,
    private routeParams:ActivatedRoute) { }

  ngOnInit(): void {
  }

}
