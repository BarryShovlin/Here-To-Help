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

    public class SkillController : ControllerBase
    {
        private readonly ISkillRepository _skillRepository;
        public SkillController(ISkillRepository skillRepository)
        {
            _skillRepository = skillRepository;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_skillRepository.GetAllSkills());
        }



        [HttpGet("getById/{id}")]
        public IActionResult Get(int id)
        {
            var up = _skillRepository.GetSkillById(id);
            if (up == null)
            {
                return NotFound();
            }
            return Ok(up);
        }

        [HttpPost]
        public IActionResult Post(Skill Skill)
        {
            _skillRepository.Add(Skill);
            return CreatedAtAction("Details", new { id = Skill.Id }, Skill);
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _skillRepository.Delete(id);
            return NoContent();
        }



    }
}
