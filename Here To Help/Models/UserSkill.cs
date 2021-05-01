namespace Here_To_Help.Models
{
    public class UserSkill
    {
        public int Id { get; set; }
        public int SkillId { get; set; }
        public int UserProfileId { get; set; }
        public bool IsKnown { get; set; }
    }
}