namespace Here_To_Help.Models
{
    public class SkillTag
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int PostId { get; set; }
        public int SkillId { get; set; }
        public Skill Skill { get; set; }
        public Post Post { get; set; }
        public Question Question { get; set; }

    }
}