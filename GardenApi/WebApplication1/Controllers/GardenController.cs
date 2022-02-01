using Microsoft.AspNetCore.Mvc;
using GardenApi.DTOs;
using GardenApi.Models;
using System.Collections.Generic;
using System.Linq;

namespace GardenApi.Controllers
{
    [ApiConventionType(typeof(DefaultApiConventions))]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class GardenController : ControllerBase
    {
        private readonly IGardenRepository _gardenRepository;
        private readonly IUserRepository _userRepository;

        public GardenController(IGardenRepository context, IUserRepository userRepository)
        {
            _gardenRepository = context;
            _userRepository = userRepository;
        }

        // GET: api/Garden
        /// <summary>
        /// Get all UserPlants ordered by name
        /// </summary>
        /// <returns>array of plants</returns>
        [HttpGet]
        public IEnumerable<Plant> GetUserPlants()
        {
            User user = _userRepository.GetBy(User.Identity.Name);
            return user.Plants;
        }

        // GET: api/Garden
        /// <summary>
        /// Get all Plants ordered by name
        /// </summary>
        /// <returns>array of plants</returns>
        [Route("all")]
        [HttpGet]
        public IEnumerable<Plant> GetPlants()
        {
            
            return _gardenRepository.GetAll();
        }



        // GET: api/Garden/5
        /// <summary>
        /// Get a plant with given id
        /// </summary>
        /// <param name="id">the id of the plant</param>
        /// <returns>a plant</returns>
        [HttpGet("{id}")]
        public ActionResult<Plant> GetPlant(int id)
        {
            Plant plant = _gardenRepository.GetBy(id);
            if (plant == null) return NotFound();
            return plant;
        }

        // POST: api/Garden
        /// <summary>
        /// Adds a new plant
        /// </summary>
        /// <param name="plant">new plant</param>
        [HttpPost]
        public ActionResult<Plant> PostPlant(PlantDTO plant)
        {
            Plant PlantToCreate = new Plant() { Name = plant.Name,
                BloomFrom = plant.BloomFrom,
                BloomTill = plant.BloomTill,
                Border = plant.Border,
            ColorFlower = plant.ColorFlower,
            ColorLeaves = plant.ColorLeaves,
            DatePlanted = plant.DatePlanted,
            MaxHeight = plant.MaxHeight,
            MaxWidth = plant.MaxWidth,
            WinterGreen = plant.WinterGreen,
            
            
            };         

            User user = _userRepository.GetBy(User.Identity.Name);
            user.AddUserPlant(PlantToCreate);
            _gardenRepository.Add(PlantToCreate);
            _gardenRepository.SaveChanges();
            _userRepository.SaveChanges();

            return CreatedAtAction(nameof(GetPlant), new { id = PlantToCreate.PlantId }, PlantToCreate);
        }

        // PUT: api/Gardens/5
        /// <summary>
        /// Modifies a plant
        /// </summary>
        /// <param name="id">id of the plant to be modified</param>
        /// <param name="plant">the modified plant</param>
        [HttpPut("{id}")]
        public IActionResult PutPlant(int id, Plant plant)
        {
            if (id != plant.PlantId)
            {
                return BadRequest();
            }
            _gardenRepository.Update(plant);
            _gardenRepository.SaveChanges();
            return NoContent();
        }

        // DELETE: api/Gardens/5
        /// <summary>
        /// Deletes a plant
        /// </summary>
        /// <param name="id">the id of the plant to be deleted</param>

        [HttpDelete("{id}")]
        public IActionResult DeletePlant(int id)
        {
            Plant plant = _gardenRepository.GetBy(id);
            if (plant == null)
            {
                return NotFound();
            }
            _gardenRepository.Delete(plant);
            _gardenRepository.SaveChanges();
            return NoContent();
        }



        /// <summary>
        /// Get an comment for a recipe
        /// </summary>
        /// <param name="id">id of the recipe</param>
        /// <param name="commentId">id of the comment</param>
        [HttpGet("{id}/comments/{commentId}")]
        public ActionResult<Comment> GetComment(int id, int commentId)
        {
            if (!_gardenRepository.TryGetPlant(id, out var plant))
            {
                return NotFound();
            }
            Comment comment = plant.GetComment(commentId);
            if (comment == null)
                return NotFound();
            return comment;
        }



        /// <summary>
        /// Adds a comment to a plant
        /// </summary>
        /// <param name="id">the id of the plant</param>
        /// <param name="comment">the comment to be added</param>
        [HttpPost("{id}/comments")]
        public ActionResult<Comment> PostComment(int id, CommentDTO comment)
        {
            if(!_gardenRepository.TryGetPlant(id, out var plant))
            {
                return NotFound();
            }


            var commentToCreate = new Comment(comment.CommentText);

            plant.AddComment(commentToCreate);
            _gardenRepository.SaveChanges();
            return CreatedAtAction("GetComment", new { id = plant.PlantId, commentId = commentToCreate.Id }, commentToCreate);
        
        }


        

    }
}
