using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GardenApi.DTOs
{
    public class PlantDTO
    {
        [Required]
        public string Name { get; set; }

        public DateTime DateAdded { get; set; }

        public DateTime DatePlanted { get; set; }

        public string Border { get; set; }

        public string BloomFrom { get; set; }

        public string BloomTill { get; set; }

        public bool WinterGreen { get; set; }

        public string ColorFlower { get; set; }

        public string ColorLeaves { get; set; }

        public int MaxHeight { get; set; }

        public int MaxWidth { get; set; }

        public IList<CommentDTO> Comments { get; set; }

    }
}
