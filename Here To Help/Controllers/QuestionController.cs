using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using Here_To_Help.Models;
using Here_To_Help.Repositories;

namespace Here_To_Help.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]

    public class QuestionController : ControllerBase
    {
        private readonly IQuestionRepository _questionRepository;
        public QuestionController(IQuestionRepository questionRepository)
        {
            _questionRepository = questionRepository;
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

        [HttpPost]
        public IActionResult Post(Question Question)
        {
            _questionRepository.Add(Question);
            return CreatedAtAction("Details", new { id = Question.Id }, Question);
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
            if (id != que.Id)
            {
                return BadRequest();
            }

            _questionRepository.Update(que);
            return NoContent();
        }

    }
}
