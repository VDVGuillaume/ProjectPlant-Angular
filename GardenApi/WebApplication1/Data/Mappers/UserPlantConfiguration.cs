using GardenApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GardenApi.Data.Mappers
{
    public class UserPlantConfiguration : IEntityTypeConfiguration<UserPlant>
    {
        public void Configure(EntityTypeBuilder<UserPlant> builder)
        {
            builder.HasKey(f => new { f.UserId, f.PlantId });
            builder.HasOne(f => f.User).WithMany(u => u.UserPlants).HasForeignKey(f => f.UserId);
            builder.HasOne(f => f.Plant).WithMany().HasForeignKey(f => f.PlantId);
        }
    }
}
