using System;

namespace Here_To_Help.Models
{
    public class PostComment
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public int PostId { get; set; }
        public string Content { get; set; }
        public DateTime DateCreated { get; set; }
        public UserProfile UserProfile { get; set; }
        public Post Post { get; set; }
    }
}