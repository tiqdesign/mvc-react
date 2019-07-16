using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

using System.Linq;
using System.Threading.Tasks;

namespace SampleProject.Models
{
    public class CalisanData
    {
        ReactDBContext db = new ReactDBContext();

        public IEnumerable<TbCalisan> getAllCalisan()
        {
            try
            {
                return db.TbCalisan.ToList(); 
            }
            catch
            {

                throw;
            }
        }

        public int AddEmployee(TbCalisan calisan)
        {
            try
            {
                db.TbCalisan.Add(calisan);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public int UpdateEmployee(TbCalisan calisan)
        {
            try
            {
                db.Entry(calisan).State = EntityState.Modified;
                db.SaveChanges();

                return 1;
            }
            catch
            {
                throw;
            }
        }
        public int DeleteEmployee(int id)
        {
            try
            {
                TbCalisan cs = db.TbCalisan.Find(id);
                db.TbCalisan.Remove(cs);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public TbCalisan GetEmployeeData(int id)
        {
            try
            {
                TbCalisan cs = db.TbCalisan.Find(id);
                return cs;
            }
            catch
            {
                throw;
            }
        }

    }
}
