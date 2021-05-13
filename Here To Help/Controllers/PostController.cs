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

    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        public PostController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postRepository.GetAllPosts());
        }



        [HttpGet("getById/{id}")]
        public IActionResult Get(int id)
        {
            var up = _postRepository.GetPostById(id);
            if (up == null)
            {
                return NotFound();
            }
            return Ok(up);
        }

        [HttpGet("getByUserSkill/{id}")]
        public IActionResult GetByUserSill(int id)
        {
            return Ok(_postRepository.GetPostsByUserSkills(id));
        }

        [HttpPost]
        public IActionResult Post(Post Post)
        {
            Post.DateCreated = DateTime.Now;
            _postRepository.Add(Post);
            return CreatedAtAction("Get", new { id = Post.Id }, Post);
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _postRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Post que)
        {
            if (id != que.Id)
            {
                return BadRequest();
            }

            _postRepository.Update(que);
            return NoContent();
        }

    }
}
