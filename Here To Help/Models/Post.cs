using System;

namespace Here_To_Help.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public string Content { get; set; }
        public int UserProfileId { get; set; }
        public int SkillId { get; set; }
        public DateTime DateCreated { get; set; }
        public Skill Skill { get; set; }
        public UserProfile UserProfile { get; set; }
        public UserSkill UserSkill { get; set; }
    }
}