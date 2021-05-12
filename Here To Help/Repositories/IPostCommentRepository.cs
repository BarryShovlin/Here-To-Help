using Here_To_Help.Models;
using System.Collections.Generic;

namespace Here_To_Help.Repositories
{
    public interface IPostCommentRepository
    {
        void Add(PostComment postComment);
        void Delete(int PostCommentId);
        List<PostComment> GetAllPostComments();
        List<PostComment> GetPostCommentsByPostId(int PostId);
        void Update(PostComment postComment);
        PostComment GetPostCommentById(int id);
    }
}