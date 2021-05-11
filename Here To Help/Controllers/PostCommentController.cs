using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using Here_To_Help.Models;
using Here_To_Help.Repositories;

namespace Here_To_Help.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]

    public class PostCommentController : ControllerBase
    {
        private readonly IPostCommentRepository _postCommentRepository;
        public PostCommentController(IPostCommentRepository postCommentRepository)
        {
            _postCommentRepository = postCommentRepository;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postCommentRepository.GetAllPostComments());
        }



        [HttpGet("getByPostId/{id}")]
        public IActionResult Get(int id)
        {
            var pc = _postCommentRepository.GetPostCommentsByPostId(id);
            if (pc == null)
            {
                return NotFound();
            }
            return Ok(pc);
        }

        [HttpGet("getById/{id}")]
        public IActionResult GetById(int id)
        {
            var pc = _postCommentRepository.GetPostCommentById(id);
            if (pc == null)
            {
                return NotFound();
            }
            return Ok(pc);
        }


        [HttpPost]
        public IActionResult Post(PostComment PostComment)
        {
            _postCommentRepository.Add(PostComment);
            return CreatedAtAction("Details", new { id = PostComment.Id }, PostComment);
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _postCommentRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, PostComment pc)
        {
            if (id != pc.Id)
            {
                return BadRequest();
            }

            _postCommentRepository.Update(pc);
            return NoContent();
        }

    }
}
