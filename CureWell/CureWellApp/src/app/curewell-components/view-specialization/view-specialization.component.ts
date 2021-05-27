import { Component, OnInit } from '@angular/core';
import { Specialization } from '../../curewell-interfaces/specialization';
import { CurewellService } from '../../curewell-services/curewell.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Route } from '@angular/compiler/src/core';
import { Doctor } from '../../curewell-interfaces/doctor';

@Component({
 templateUrl: './view-specialization.component.html',
})
export class ViewSpecializationComponent implements OnInit {

  specializationList: Specialization[];
  showMsgDiv: boolean = false;
  errorMsg: string;

  constructor(private _curewellService: CurewellService, private router: Router) { }

  ngOnInit() {
    this.getSpecialization()
  }

  getSpecialization() {
    this._curewellService.getAllSpecializations().subscribe(
      response => {
        this.specializationList = response
        this.showMsgDiv = false
      },
      error => {
        this.specializationList = null
        this.errorMsg = error
        console.log('Fetch error: ', this.errorMsg)
      }
    )
  }
}
