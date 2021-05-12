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

    public class QuestionCommentController : ControllerBase
    {
        private readonly IQuestionCommentRepository _questionCommentRepository;
        public QuestionCommentController(IQuestionCommentRepository questionCommentRepository)
        {
            _questionCommentRepository = questionCommentRepository;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_questionCommentRepository.GetAllQuestionComments());
        }



        [HttpGet("getByQuestionId/{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_questionCommentRepository.GetQuestionCommentsByQuestionId(id));

        }

        [HttpGet("getById/{id}")]
        public IActionResult GetById(int id)
        {
            var pc = _questionCommentRepository.GetQuestionCommentById(id);
            if (pc == null)
            {
                return NotFound();
            }
            return Ok(pc);
        }


        [HttpPost("create/{id}")]
        public IActionResult Question(QuestionComment QuestionComment)
        {
            QuestionComment.DateCreated = DateTime.Now;
            _questionCommentRepository.Add(QuestionComment);
            return CreatedAtAction("Get", new { id = QuestionComment.Id }, QuestionComment);
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _questionCommentRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, QuestionComment pc)
        {
            if (id != pc.Id)
            {
                return BadRequest();
            }

            _questionCommentRepository.Update(pc);
            return NoContent();
        }

    }
}
