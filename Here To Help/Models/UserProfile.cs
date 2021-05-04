

using System;
using System.Collections.Generic;

namespace Here_To_Help.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string FirebaseUserId { get; set; }
        public string UserName { get; set; }
        public DateTime DateCreated { get; set; }
    }
}