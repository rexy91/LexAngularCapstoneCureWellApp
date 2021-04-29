import { Component, OnInit, DoCheck } from '@angular/core';
import { Doctor } from '../../curewell-interfaces/doctor';
import { CurewellService } from '../../curewell-services/curewell.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Route } from '@angular/compiler/src/core';

@Component({
  templateUrl: './view-doctor.component.html',
})
export class ViewDoctorComponent implements OnInit {

  doctorList: Doctor[];
  showMsgDiv: boolean = false;
  doctorId: number;
  errorMsg: string;
  status: boolean;

  constructor(private _curewellService: CurewellService, private router: Router) { }

  ngOnInit() {
    
    // if component loaded, call getDoctor to render doctors from backend. 
    this.getDoctor()
  }

  getDoctor() {
    //To do implement necessary logic
    this._curewellService.getDoctors().subscribe(
      response => {
        this.doctorList = response
        this.showMsgDiv = false
        console.log("Doctors fetched successfully.")
      },
      error => {
        this.doctorList = null
        this.errorMsg = error
      }

    )
  }

  editDoctorDetails(doctor: Doctor) {
    //To do implement necessary logic
  }

  removeDoctor(doctor: Doctor) {
    //To do implement necessary logic
  }

}
