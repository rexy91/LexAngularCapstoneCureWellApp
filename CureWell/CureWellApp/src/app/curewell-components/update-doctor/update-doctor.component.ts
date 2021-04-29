import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { CurewellService } from '../../curewell-services/curewell.service';
import { Doctor } from '../../curewell-interfaces/doctor';

@Component({
  templateUrl: './update-doctor.component.html'
})
export class UpdateDoctorComponent implements OnInit {

  doctorId: number;
  doctorName: string;
  status: boolean;
  errorMsg: string;

  constructor(private route: ActivatedRoute, private _cureWellService: CurewellService, private router: Router) { }

  ngOnInit() {
     // Assign this component/class 's attributes with url's params
     this.doctorId = this.route.snapshot.params.doctorId 
     this.doctorName = this.route.snapshot.params.doctorName 
  }

  editDoctorDetails(doctorname: string) {
    
    this._cureWellService.editDoctorDetails(this.doctorId, doctorname).subscribe(
      response => {
        this.status = response
        if(this.status)
        {
          alert("Doctor name updated sucessfully.")
        }
        else
        {
          alert("Doctor name was not updated.")
        }
      },
      error => {
        this.errorMsg = error
        console.log("Fetch error: ", this.errorMsg) 
      }
    )
  }
}
