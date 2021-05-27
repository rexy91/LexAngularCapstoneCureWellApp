using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CureWellServices.Models;
using CureWellDataAccessLayer;
using CureWellDataAccessLayer.Models;
using System.Linq;

namespace CureWellServices.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CureWellController : Controller
    {
        CureWellRepository rep = new CureWellRepository();

        // getDoctors
        [HttpGet]
        public JsonResult getDoctors()
        {
            List<Models.Doctor> docList = new List<Models.Doctor>();
            try
            {
                var tempList = rep.GetAllDoctors();
                
                if(tempList.Any())
                {
                    foreach (var item in tempList)
                    {
                        docList.Add(new Models.Doctor() { 
                               DoctorId = item.DoctorId,
                               DoctorName = item.DoctorName 
                        });
                    }
                }
            }
            catch (Exception)
            {

                docList = null;
            }
            return Json(docList); 
        }

        [HttpPost]
        public bool addDoctor(Models.Doctor dObj)
        {
            bool status = false; 
               // Frontend is passing in whole object. 
            try
            {
                // DAL is expecting a DAL Type Doctor 
                CureWellDataAccessLayer.Models.Doctor doc = new CureWellDataAccessLayer.Models.Doctor();
                // Id is columnd id, will will be generated automatially so we dont need to give. 
                // Here we can do dObj.DoctorName because frontend Doctor model interface has doctorName key, it is not case sensitive, as long as it matches backend property name. 

                doc.DoctorName = dObj.DoctorName;
                status = rep.AddDoctor(doc);
            }
            catch (Exception)
            {

                status = false; 
            }
            return status; 
        }

        // Updating doctor details
        // Here we can't jut declare a Doctory type of DAL, because we need to access the incoming object's attributes.
        [HttpPut]
        public bool updateDoctor(Models.Doctor dObj)
        {
            bool status = false;
            try
            {
                CureWellDataAccessLayer.Models.Doctor doc = new CureWellDataAccessLayer.Models.Doctor();
                if (ModelState.IsValid) // If we were able to create a DAL 's Doctor type object 
                {
                    // Assign incoming object 's attributes to doc's properties. 
                    // Here frontend is only updating the name, but also needs to id property in order to look for the object inside dababase. 
                    // Repo's updatedoc method will find obj in the database by id, then update the name. 

                    doc.DoctorName = dObj.DoctorName;
                    doc.DoctorId = dObj.DoctorId; 

                    // Repo method is expecting DAL object, that's why we needed to create one and assign property value with incoming object's key/value. 
                    status = rep.UpdateDoctorDetails(doc);

                }
            }
            catch (Exception)
            {

                status = false;
            }
            return status;
        }

        // get today's surgeries
        [HttpGet]
        public JsonResult getTodaySurgery()
        {
            List<Models.Surgery> surgeryList = new List<Models.Surgery>();
            try
            {
                var tempList = rep.GetAllSurgery();
                if(tempList.Any())
                {
                    foreach (var item in tempList)
                    {
                        surgeryList.Add(new Models.Surgery() { 
                            SurgeryId = item.SurgeryId,
                            DoctorId = item.DoctorId,
                            SurgeryDate = item.SurgeryDate,
                            EndTime = item.EndTime,
                            StartTime = item.StartTime,
                            SurgeryCategory = item.SurgeryCategory
                        });
                    }
                }
            }
            catch (Exception)
            {
                surgeryList=null;
            }
            return Json(surgeryList);
        }

        // get specifilizations

        [HttpGet]
        public JsonResult getSpecs()
        {
            List<Models.Specialization> specList = new List<Models.Specialization>();
            try
            {
                var tempList = rep.GetAllSpecializations(); 
                if(tempList.Any())
                {
                    foreach (var item in tempList)
                    {
                        specList.Add(new Models.Specialization() { 
                                SpecializationCode = item.SpecializationCode,
                                SpecializationName = item.SpecializationName 
                        });
                    }
                }
            }
            catch (Exception)
            {

                specList = null;
            }
            return Json(specList); 
        }

    } // end of controller class
}