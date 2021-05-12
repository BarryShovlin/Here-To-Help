using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using Here_To_Help.Models;
using Here_To_Help.Repositories;
using System.Security.Claims;

namespace Here_To_Help.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]

    public class QuestionController : ControllerBase
    {
        private readonly IQuestionRepository _questionRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public QuestionController(IQuestionRepository questionRepository, IUserProfileRepository userProfileRepository)
        {
            _questionRepository = questionRepository;
            _userProfileRepository = userProfileRepository;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_questionRepository.GetAllQuestions());
        }



        [HttpGet("getById/{id}")]
        public IActionResult Get(int id)
        {
            var up = _questionRepository.GetQuestionById(id);
            if (up == null)
            {
                return NotFound();
            }
            return Ok(up);
        }

        [HttpPost("new")]
        public IActionResult Post(Question Question)
        {
            Question.DateCreated = DateTime.Now;
            _questionRepository.Add(Question);
            return CreatedAtAction("Get", new { id = Question.Id }, Question);
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _questionRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Question que)
        {
            var user = GetCurrentUser();
            que.DateCreated = DateTime.Now;
            if (user == null) return NotFound();
            _questionRepository.Update(que);
            return NoContent();
        }

        [HttpGet("getByUserId/{id}")]
        public IActionResult GetByUserId(int id)
        {
            return Ok(_questionRepository.GetQuestionsByUserId(id));
        }
        private UserProfile GetCurrentUser()
        {
            var firebaseId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseId);
        }
    }
}
