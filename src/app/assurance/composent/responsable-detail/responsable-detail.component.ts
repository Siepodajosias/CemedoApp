import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Responsable } from '../../model/responsable';
import { AssuranceService } from '../../service/assurance.service';

@Component({
  selector: 'app-responsable-detail',
  templateUrl: './responsable-detail.component.html',
  styleUrls: ['./responsable-detail.component.scss']
})
export class ResponsableDetailComponent implements OnInit {
responsable:Responsable
  constructor(private assurService:AssuranceService,
    private routeParams:ActivatedRoute) { }

  ngOnInit(): void {
    const z=this.routeParams.snapshot.params['id'];
    this.assurService.getResponsableById(z).subscribe({
      next:(value:any)=>{
        this.responsable=value
      }
    })
  }

}
