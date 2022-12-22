import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComptableService } from 'src/app/services/ServiceComptable/comptable.service';

@Component({
  selector: 'app-comptable-detail',
  templateUrl: './comptable-detail.component.html',
  styleUrls: ['./comptable-detail.component.scss']
})
export class ComptableDetailComponent implements OnInit {

  constructor(private cptService:ComptableService,
    private routeParams:ActivatedRoute) { }

  ngOnInit(): void {
  }

}
