import { Injectable } from '@angular/core';
import { Doctor } from '../curewell-interfaces/doctor';
import { DoctorSpecialization } from '../curewell-interfaces/doctorspecialization';
import { Specialization } from '../curewell-interfaces/specialization';
import { Surgery } from '../curewell-interfaces/surgery';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurewellService {

  doctorList: Doctor[];
  surgeryList: Surgery[];
  specializationList: Specialization[];
  doctorSpecializationList: DoctorSpecialization[];

  constructor(private http: HttpClient) { }
  
  //GetDoctor
  getDoctors(): Observable<Doctor[]> {
    let tempVar = this.http.get<Doctor[]>('http://localhost:50476/api/CureWell/getDoctors').pipe(catchError(this.errorHandler)); 
    return tempVar;
  }

  //GetSpecialization
  getAllSpecializations(): Observable<Specialization[]> {
    let tempVar = this.http.get<Specialization[]>('http://localhost:50476/api/CureWell/getSpecs').pipe(catchError(this.errorHandler)); 
    return tempVar;
  }

  //GetSurgeries
  getAllSurgeries(): Observable<Surgery[]> {
    // cast the observable to Surgery[] , so we can return to component.ts 's method. 

    let tempVar = this.http.get<Surgery[]>('http://localhost:50476/api/CureWell/getTodaySurgery').pipe(catchError(this.errorHandler)) 
    return tempVar;
  }

  //AddDoctor
  addDoctor(doctorName: string): Observable<boolean> {
    // backend is expecting an object 
    let docObj = {
      doctorName: doctorName // this key should match backend model property. Not case sensitive. 
    }
                              // 2nd argument of post/put, we can only pass object like. 
                              // Either a whole object
                              // Or { key:values } 
    return this.http.post<boolean>('http://localhost:50476/api/CureWell/addDoctor', docObj).pipe(catchError(this.errorHandler))
  }

  //EditDoctor
  editDoctorDetails(doctorId: number, doctorName: string): Observable<boolean> {
    // backend is only updating doctorname, but needs to fidn object in database by id, so we need to pass in both.
    let tempObj = {
      DOCTORID: doctorId, // to show that case sensitive doens;t matter as logn as frontend key matches backend property name. 
      doctorName: doctorName
    }
    return this.http.put<boolean>('http://localhost:50476/api/CureWell/updateDoctor', tempObj).pipe(catchError(this.errorHandler))
  }

  //editSurgery
  editSurgery(doctorId: number, endTime: number, startTime: number, surgeryCategory: string, surgeryDate: Date, surgeryId: number): Observable<boolean> {
    //To do implement necessary logic
    return null;
  }

  //RemoveDoctor
  deleteDoctor(doctor: Doctor) {
    //To do implement necessary logic
    return null;
  }

  //ErrorHandler
  errorHandler(error: HttpErrorResponse) {
    //To do implement necessary logic
    return throwError(error.message || 'ERROR')

  }

}
