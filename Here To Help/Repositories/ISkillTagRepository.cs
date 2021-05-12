using Here_To_Help.Models;
using System.Collections.Generic;

namespace Here_To_Help.Repositories
{
    public interface ISkillTagRepository
    {
        void Add(SkillTag skillTag);
        void Delete(int SkillTagId);
        List<SkillTag> GetAllSkillTags();
        SkillTag GetSkillTagById(int id);
        List<SkillTag> GetSkillTagsByPostId(int id);
    }
}