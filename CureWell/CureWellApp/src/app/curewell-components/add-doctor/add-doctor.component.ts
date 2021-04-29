import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CurewellService } from '../../curewell-services/curewell.service';
import { Doctor } from '../../curewell-interfaces/doctor';
import { DoctorSpecialization } from '../../curewell-interfaces/doctorspecialization';
import { Specialization } from '../../curewell-interfaces/specialization';
import { Surgery } from '../../curewell-interfaces/surgery';
import { Router } from '@angular/router';

@Component({
  templateUrl: './add-doctor.component.html'
})
export class AddDoctorComponent implements OnInit {

  doctorId: number;
  doctorName: string;
  status: boolean;
  errorAddMsg: string;
  showDiv: boolean = false;
  msg: string;

  constructor(private _curewellService: CurewellService, private router: Router) { }

  ngOnInit() {
  }

  addDoctor(doctorName: string) {
    this._curewellService.addDoctor(doctorName).subscribe(
      response => {
        this.status = response
        if(this.status)
        {     
          this.showDiv = true; 
          this.msg = 'Doctor added successfully.'
        }
        else
        {
          // If this.status = false, means backend method logic is wrong, but the post fetch was good. 
          this.showDiv = true; 
          this.msg = 'Doctor was not added.'
        }
      },
      // If there is fetching error, if fetch is good, backend action/api method is hit, this won't show. 
      error => {
          this.errorAddMsg=error; 
          alert("Some error occured while communicating with backend ") 
          console.log(this.errorAddMsg); 
      }
    )
  }
}
