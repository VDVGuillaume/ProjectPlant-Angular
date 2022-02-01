using GardenApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GardenApi.Data.Repositories
{
    public class UserRepository : IUserRepository

    {
        private readonly GardenContext _context;
        private readonly DbSet<User> _users;

        public UserRepository(GardenContext dbContext)
        {
            _context = dbContext;
            _users = dbContext.Users;
        }

        public User GetBy(string email)
        {
            return _users.Include(c => c.UserPlants).ThenInclude(f => f.Plant).SingleOrDefault(c => c.Email == email);
        }

        public void Add(User user)
        {
            _users.Add(user);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
