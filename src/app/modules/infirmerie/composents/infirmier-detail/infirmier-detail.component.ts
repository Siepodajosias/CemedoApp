import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfirmierService } from 'src/app/services/ServiceInfirmerie/infirmier.service';

@Component({
  selector: 'app-infirmier-detail',
  templateUrl: './infirmier-detail.component.html',
  styleUrls: ['./infirmier-detail.component.scss']
})
export class InfirmierDetailComponent implements OnInit {

  constructor(private infirmierS:InfirmierService,
    private routeParams:ActivatedRoute) { }

  ngOnInit(): void {
  }

}
