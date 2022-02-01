using Microsoft.EntityFrameworkCore;
using GardenApi.Models;
using System.Collections.Generic;
using System.Linq;

namespace GardenApi.Data.Repositories
{
    public class GardenRepository : IGardenRepository
    {
        private readonly GardenContext _context;
        private readonly DbSet<Plant> _plants;

        public GardenRepository(GardenContext dbContext)
        {
            _context = dbContext;
            _plants = dbContext.Plants;
        }

        public IEnumerable<Plant> GetAll()
        {
            return _plants.Include(p => p.Comments).ToList();
        }

        public Plant GetBy(int id)
        {
            return _plants.Include(p => p.Comments).SingleOrDefault(r => r.PlantId == id);
        }

        public bool TryGetPlant(int id, out Plant plant)
        {
            plant = _context.Plants.Include(p => p.Comments).FirstOrDefault(t => t.PlantId == id);
            return plant != null;
        }

        public void Add(Plant plant)
        {
            _plants.Add(plant);
        }

        public void Update(Plant plant)
        {
            _context.Update(plant);
        }

        public void Delete(Plant plant)
        {
            _plants.Remove(plant);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public IEnumerable<Plant> GetBy(string name = null)
        {
            var plants = _plants.Include(p => p.Comments).AsQueryable();
            if (!string.IsNullOrEmpty(name))
                plants = plants.Where(r => r.Name.IndexOf(name) >= 0);            
            return plants.OrderBy(r => r.Name).ToList();
        }
    }
}
