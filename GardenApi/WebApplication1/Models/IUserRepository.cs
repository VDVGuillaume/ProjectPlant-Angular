
namespace GardenApi.Models
{
    public interface IUserRepository
    {

        User GetBy(string email);
        void Add(User user);
        void SaveChanges();


    }
}
