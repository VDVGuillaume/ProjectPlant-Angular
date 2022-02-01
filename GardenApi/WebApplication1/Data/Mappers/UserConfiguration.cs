using GardenApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GardenApi.Data.Mappers
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.Property(c => c.LastName).IsRequired().HasMaxLength(50);
            builder.Property(c => c.FirstName).IsRequired().HasMaxLength(50);
            builder.Property(c => c.Email).IsRequired().HasMaxLength(100);
            builder.Ignore(c => c.UserPlants);
        }
    }
}
