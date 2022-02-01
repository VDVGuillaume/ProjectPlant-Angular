using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GardenApi.DTOs;
using GardenApi.Models;

namespace GardenApi.Controllers
{
    [ApiConventionType(typeof(DefaultApiConventions))]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository UserRepository)
        {
            _userRepository = UserRepository;
        }

        /// <summary>
        /// Get the details of the authenticated User
        /// </summary>
        /// <returns>the User</returns>
        [HttpGet()]
        public ActionResult<UserDTO> GetUser()
        {
            User user = _userRepository.GetBy(User.Identity.Name);
            return new UserDTO(user);
        }
    }
}