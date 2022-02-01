using GardenApi.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace GardenApi.Data
{
    public class GardenDataInitializer
    {
        private readonly GardenContext _dbContext;
        private UserManager<IdentityUser> _userManager;

        public GardenDataInitializer(GardenContext dbContext, UserManager<IdentityUser> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        public async Task InitializeData()
        {



            _dbContext.Database.EnsureDeleted();
            if (_dbContext.Database.EnsureCreated())
            {
                //seeding the database with recipes, see DBContext         
             

                User applicationuser = new User { Email = "giom@giom.giom", FirstName = "Guillaume", LastName = "Van de Velde" };

                _dbContext.Users.Add(applicationuser);
                await CreateUser(applicationuser.Email, "Giom123!");                        
                _dbContext.SaveChanges();           
                _dbContext.Plants.ToList().ForEach(p => applicationuser.AddUserPlant(p));
                _dbContext.SaveChanges();
            }

        }
         private async Task CreateUser(string email, string password)
         {
            var user = new IdentityUser { UserName = email, Email = email };
            await _userManager.CreateAsync(user, password);
         }



        

      }
}

