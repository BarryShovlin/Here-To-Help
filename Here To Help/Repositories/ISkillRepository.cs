using Here_To_Help.Models;
using System.Collections.Generic;

namespace Here_To_Help.Repositories
{
    public interface ISkillRepository
    {
        void Add(Skill skill);
        List<Skill> GetAllSkills();
        Skill GetSkillById(int id);
        void Delete(int SkillId);
    }
}