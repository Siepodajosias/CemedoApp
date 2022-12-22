import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-programme',
  templateUrl: './programme.component.html',
  styleUrls: ['./programme.component.scss']
})
export class ProgrammeComponent implements OnInit {

  constructor(private route: Router,private primeNgConfig: PrimeNGConfig,) { }

  ngOnInit(): void {
            this.primeNgConfig.setTranslation({
              startsWith: 'Commence par',
              contains: 'Contient',
              notContains: 'Ne contient pas',
              endsWith: 'Fini par',
              equals: 'Egale à',
              notEquals: 'différent de',
              noFilter: 'Pas de filtre',
              reject: 'Non',
              accept: 'Oui'
            });
  }
  urlActif():boolean{
    return this.route.url.includes('/doctor/programme')
  }
}
