using System.Collections.Generic;

namespace GardenApi.Models
{
    public interface IGardenRepository
    {
        Plant GetBy(int id);
        bool TryGetPlant(int id, out Plant plant);
        IEnumerable<Plant> GetAll();
        IEnumerable<Plant> GetBy(string name = null);
        void Add(Plant plant);
        void Delete(Plant plant);
        void Update(Plant plant);
        void SaveChanges();
    }
}

