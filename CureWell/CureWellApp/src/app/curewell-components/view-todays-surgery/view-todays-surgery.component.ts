import { Component, OnInit } from '@angular/core';
import { Surgery } from '../../curewell-interfaces/surgery';
import { CurewellService } from '../../curewell-services/curewell.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Route } from '@angular/compiler/src/core';

@Component({
  templateUrl: './view-todays-surgery.component.html',
})
export class ViewTodaysSurgeryComponent implements OnInit {

  surgeryList: Surgery[];
  showMsgDiv: boolean = false;
  errorMsg: string;

  constructor(private _curewellService: CurewellService, private router: Router) { }

  ngOnInit() {
    this.getTodaySurgery();
  }

  getTodaySurgery() {
    this._curewellService.getAllSurgeries().subscribe(
      response => {
        this.surgeryList = response
        this.showMsgDiv = false
      },
      error => {
        this.errorMsg = error; 
        console.log("Fetch error" , this.errorMsg)
      }
    )
  }

  editSurgery(surgery: Surgery) {
    //To do implement necessary logic
  }

}
