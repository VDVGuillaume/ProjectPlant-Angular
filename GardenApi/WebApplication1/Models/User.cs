using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GardenApi.Models
{
    public class User
    {
        #region properties
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

        public ICollection<UserPlant> UserPlants { get; set; }

        public IEnumerable<Plant> Plants => UserPlants.Select(p => p.Plant).ToList();

        #endregion

        #region constructors
        public User()
        {
            UserPlants = new List<UserPlant>();
        }

        #endregion

        #region methods

        public void AddUserPlant(Plant plant)
        {
            UserPlants.Add(new UserPlant() { PlantId = plant.PlantId, UserId = UserId, Plant = plant, User = this });
        }

        #endregion




    }
}
