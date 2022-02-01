using Microsoft.EntityFrameworkCore;
using GardenApi.Models;
using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using GardenApi.Data.Mappers;

namespace GardenApi.Data
{
    public class GardenContext : IdentityDbContext
    {
        public GardenContext(DbContextOptions<GardenContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfiguration(new PlantConfiguration());
            builder.ApplyConfiguration(new UserConfiguration());
            builder.ApplyConfiguration(new UserPlantConfiguration());
            builder.ApplyConfiguration(new CommentConfiguration());

           

        }

        public DbSet<Plant> Plants { get; set; }
        public DbSet<User> Users { get; set; }
    }
}