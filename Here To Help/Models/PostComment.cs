namespace Here_To_Help.Models
{
    public class PostComment
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public int PostId { get; set; }
        public string Content { get; set; }
        public string DateCreated { get; set; }
    }
}