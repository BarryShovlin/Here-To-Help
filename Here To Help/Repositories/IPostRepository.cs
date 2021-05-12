using Here_To_Help.Models;
using System.Collections.Generic;

namespace Here_To_Help.Repositories
{
    public interface IPostRepository
    {
        void Add(Post post);
        void Delete(int PostId);
        List<Post> GetAllPosts();
        Post GetPostById(int id);
        void Update(Post post);
        List<Post> GetPostsByUserSkills(int id);
        List<Post> Search(string criterion, bool sortDescending);
    }
}