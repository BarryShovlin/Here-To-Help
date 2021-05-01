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
        public string CreateDate { get; set; }
    }
}