using System;

namespace Here_To_Help.Models
{
    public class QuestionComment
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public int QuestionId { get; set; }
        public string Content { get; set; }
        public DateTime DateCreated { get; set; }
        public UserProfile UserProfile { get; set; }
    }
}