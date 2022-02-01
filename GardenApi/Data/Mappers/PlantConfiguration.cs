using GardenApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GardenApi.Data.Mappers
{
    public class PlantConfiguration : IEntityTypeConfiguration<Plant>
    {
        public void Configure(EntityTypeBuilder<Plant> builder)
        {
            builder.ToTable("Plants");

            //properties

            builder.Property(p => p.Name).IsRequired();
            builder.HasMany(p => p.Comments).WithOne().IsRequired().HasForeignKey("PlantId");
            builder.HasData(

             new Plant
             {
                 PlantId = 1,
                 Name = "Verbena Bonariensis",
                 Border = "Front Left",
                 MaxHeight = 140,
                 MaxWidth = 50,
                 ColorFlower = "Purple",
                 ColorLeaves = "Green",
                 DatePlanted = new DateTime(2019, 03, 17),
                 WinterGreen = true,
                 BloomFrom = "July",
                 BloomTill = "September"
             },

            new Plant
            {
                PlantId = 2,
                Name = "Gaura Lindheimeri",
                Border = "Front Right",
                MaxHeight = 75,
                MaxWidth = 30,
                ColorFlower = "White",
                ColorLeaves = "Green",
                DatePlanted = new DateTime(2019, 04, 28),
                WinterGreen = false,
                BloomFrom = "August",
                BloomTill = "September"
            },
               new Plant
            {
                PlantId = 3,
                Name = "coreopsis",
                Border = "Back Garden",
                MaxHeight = 40,
                MaxWidth = 30,
                ColorFlower = "Yellow",
                ColorLeaves = "Green",
                DatePlanted = new DateTime(2019, 04, 28),
                WinterGreen = false,
                BloomFrom = "August",
                BloomTill = "October"
            },
               new Plant
            {
                PlantId = 4,
                Name = "Sunflower",
                Border = "Front Right",
                MaxHeight = 300,
                MaxWidth = 60,
                ColorFlower = "Yellow",
                ColorLeaves = "Green",
                DatePlanted = new DateTime(2019, 04, 28),
                WinterGreen = false,
                BloomFrom = "July",
                BloomTill = "September"
            },   new Plant
            {
                PlantId = 5,
                Name = "Purple Lavender",
                Border = "Front Left",
                MaxHeight = 50,
                MaxWidth = 50,
                ColorFlower = "Purple",
                ColorLeaves = "Green",
                DatePlanted = new DateTime(2019, 04, 28),
                WinterGreen = false,
                BloomFrom = "May",
                BloomTill = "September"
            },   new Plant
            {
                PlantId = 6,
                Name = "Forget-me-not",
                Border = "Back Garden",
                MaxHeight = 20,
                MaxWidth = 30,
                ColorFlower = "Blue",
                ColorLeaves = "Green",
                DatePlanted = new DateTime(2019, 04, 28),
                WinterGreen = false,
                BloomFrom = "April",
                BloomTill = "June"
            }

            ); 


        }
    }
}
