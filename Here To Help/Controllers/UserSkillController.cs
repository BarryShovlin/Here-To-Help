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

    public class UserSkillController : ControllerBase
    {
        private readonly IUserSkillRepository _userSkillRepository;
        public UserSkillController(IUserSkillRepository userSkillRepository)
        {
            _userSkillRepository = userSkillRepository;
        }


        [HttpPost]
        public IActionResult Post(UserSkill userSkill)
        {
            _userSkillRepository.Add(userSkill);
            return Ok(userSkill.Id);
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userSkillRepository.GetAllUserSkills());
        }



        [HttpGet("getByUserId/{id}")]
        public IActionResult Get(int id)
        {
            var us = _userSkillRepository.GetUserSkillByUserId(id);
            if (us == null)
            {
                return NotFound();
            }
            return Ok(us);
        }

        [HttpGet("getById/{id}")]
        public IActionResult GetById(int id)
        {
            var us = _userSkillRepository.GetUserSkillById(id);
            if (us == null)
            {
                return NotFound();
            }
            return Ok(us);
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _userSkillRepository.Delete(id);
            return NoContent();
        }


    }
}
