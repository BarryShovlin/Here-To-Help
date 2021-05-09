using Here_To_Help.Models;
using System.Collections.Generic;

namespace Here_To_Help.Repositories
{
    public interface IUserSkillRepository
    {
        void Add(UserSkill userSkill);
        List<UserSkill> GetAllUserSkills();
        List<UserSkill> GetUserSkillByUserId(int id);
        void Delete(int UserSKillId);
        UserSkill GetUserSkillById(int id);
    }
}