using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;
        public UsersController(IDatingRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        [HttpGet]
        public async Task<IActionResult> GetUsers(UserParams userParams)
        {
            var currentUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUser);

            userParams.UserId = currentUser;

            if(string.IsNullOrEmpty(userParams.Gender))
            {
                userParams.Gender = userFromRepo.Gender == "male" ? "female" : "male"; //swapping gender. If user has one gender, lets change it. Because we want to see opposite genders in list
            }
            var users = await _repo.GetUsers(userParams);
            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);
            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages ); //Adding some info to response Header
            return Ok(usersToReturn);
        }

        [HttpGet("{id}", Name = "GetUser")] //Name = "GetUser" - this name I'll use inside AuthController -> Register method. In header of response see Location.    
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);

            var userToReturn = _mapper.Map<UserForDetailedDto>(user);

            return Ok(userToReturn);
        }

        //api/users/1 PUT:
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser([FromBody]UserForUpdateDto userForUpdateDto, int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var currentUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(id);

            if(userFromRepo == null)
                return NotFound($"Could not user with an ID of {id}");

            if(currentUser != userFromRepo.Id)
                return Unauthorized();

            _mapper.Map(userForUpdateDto, userFromRepo);

            if(await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating user {id} failed on save");
        }

    [HttpPost("{id}/like/{recipientId}")]
    public async Task<IActionResult> LikeUser(int id, int recipientId)
    {
        if(id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            return Unauthorized();

        var like = await _repo.GetLike(id, recipientId);

        if(like != null)
            return BadRequest("You already like this user");
        
        if(await _repo.GetUser(recipientId) == null)
            return NotFound();

        like = new Like 
        {
            LikerId = id,
            LikeeId = recipientId
        };

        _repo.Add<Like>(like);

        if(await _repo.SaveAll())
            return Ok();

        return BadRequest("Failder to add user");
    }
    }
}