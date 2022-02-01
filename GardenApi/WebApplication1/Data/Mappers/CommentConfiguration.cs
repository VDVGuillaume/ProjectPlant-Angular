using GardenApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GardenApi.Data.Mappers
{
    public class CommentConfiguration : IEntityTypeConfiguration<Comment>
    {
        public void Configure(EntityTypeBuilder<Comment> builder)
        {
            builder.Property(r => r.CommentText).IsRequired();

            builder.HasData(

               new { Id = 1, CommentText = "Dit is een voorbeeld comment", DateAdded = DateTime.Now, PlantId = 1}

               );


        }
    }
}
