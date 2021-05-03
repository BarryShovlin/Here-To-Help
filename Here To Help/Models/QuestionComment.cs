namespace Here_To_Help.Models
{
    public class QuestionComment
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public int QuestionId { get; set; }
        public string Content { get; set; }
        public string DateCreated { get; set; }
    }
}