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

    public class SkillTagController : ControllerBase
    {
        private readonly ISkillTagRepository _skillTagRepository;
        public SkillTagController(ISkillTagRepository skillTagRepository)
        {
            _skillTagRepository = skillTagRepository;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_skillTagRepository.GetAllSkillTags());
        }



        [HttpGet("getById/{id}")]
        public IActionResult Get(int id)
        {
            var up = _skillTagRepository.GetSkillTagById(id);
            if (up == null)
            {
                return NotFound();
            }
            return Ok(up);
        }

        [HttpGet("getByPostId/{id}")]
        public IActionResult GetByPostId(int id)
        {
            return Ok(_skillTagRepository.GetSkillTagsByPostId(id));
        }

        [HttpPost("create/{id}")]
        public IActionResult Post(SkillTag SkillTag)
        {
            _skillTagRepository.Add(SkillTag);
            return CreatedAtAction("Details", new { id = SkillTag.Id }, SkillTag);
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _skillTagRepository.Delete(id);
            return NoContent();
        }



    }
}
