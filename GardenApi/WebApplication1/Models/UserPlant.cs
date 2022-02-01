using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GardenApi.Models
{
    public class UserPlant
    {

        #region properties

        public int UserId { get; set; }

        public int PlantId { get; set; }

        public User User{ get; set; }

        public Plant Plant { get; set; }

        #endregion
    }
}
