using System;
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
    [Route("api/users/{userId}/[controller]")]
    public class MessagesController : Controller
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;

        public MessagesController(IDatingRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet("{id}", Name = "GetMessage")]
        public async Task<IActionResult> GetMessage(int userId, int id)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var messageFromRepo = await _repo.GetMessage(id);

            if (messageFromRepo == null)
                return NotFound();

            return Ok(messageFromRepo);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMessage(int userId, [FromBody] MessageForCreatingDto messageForCreatingDto)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            messageForCreatingDto.SenderId = userId;

            var recipient = await _repo.GetUser(messageForCreatingDto.RecipientId);

            if(recipient == null)
                return BadRequest("Could not find user");

            var message = _mapper.Map<Message>(messageForCreatingDto);

            _repo.Add(message);

            var messageToReturn = _mapper.Map<MessageForCreatingDto>(message);

            if(await _repo.SaveAll())
                return CreatedAtRoute("GetMessage", new {id = message.Id}, messageToReturn); //after message in saved, go to GetMessage Action and get saved message

            throw new Exception("Creating the message failed on save");
        }
    }
}