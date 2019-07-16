using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SampleProject.Models;

namespace SampleProject.Controllers
{
    [Route("api/[controller]")]
   
    public class CalisanController : Controller
    {
        CalisanData rdb = new CalisanData();

        [HttpGet("[action]")]
        public IEnumerable<TbCalisan> GetAll()
        {
            return rdb.getAllCalisan();
        }

        [HttpPost("[action]")]
        public int Create(TbCalisan cs)
        {
            return rdb.AddEmployee(cs);
        }

        [HttpPut("[action]")]
        public int Edit(TbCalisan cs)
        {
            return rdb.UpdateEmployee(cs);
        }

        [HttpDelete("[action]/{id}")]
        public int Delete(int id)
        {
            return rdb.DeleteEmployee(id);
        }

        [HttpGet("[action]/{id}")]
        public TbCalisan Details(int id)
        {
            return rdb.GetEmployeeData(id);
        }

    }
}