using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace GardenApi.Models
{
    public class Plant
    {
        #region Properties
        public int PlantId { get; set; }

        [Required]
        public string Name { get; set; }

        public DateTime DateAdded { get; set; }

        public DateTime DatePlanted { get; set;}
        public string Border { get; set; }

        public string BloomFrom { get; set;}

        public string BloomTill { get; set; }

        public bool WinterGreen { get; set; }

        public string ColorFlower { get; set; }

        public string ColorLeaves { get; set; }

        public int MaxHeight { get; set; }

        public int MaxWidth { get; set; }

        public ICollection<Comment> Comments { get; private set; }

          
      
        #endregion

        #region Constructors
        public Plant()
        {        
            DateAdded = DateTime.Now;
            Comments = new List<Comment>();
        }

        public Plant(string name) : this()
        {
            Name = name;
        }
        #endregion

        #region Methods

        public void AddComment(Comment comment) => Comments.Add(comment);

        public Comment GetComment(int id) => Comments.SingleOrDefault(c => c.Id == id);
   
        #endregion
    }
}