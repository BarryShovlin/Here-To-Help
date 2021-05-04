using Here_To_Help.Models;
using System.Collections.Generic;

namespace Here_To_Help.Repositories
{
    public interface IUserSkillRepository
    {
        void Add(UserSkill userSkill);
        List<UserSkill> GetAllUserSkills();
        UserSkill GetUserSkillById(int id);
        void Delete(int UserSKillId);
    }
}