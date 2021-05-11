using Here_To_Help.Models;
using System.Collections.Generic;

namespace Here_To_Help.Repositories
{
    public interface IQuestionCommentRepository
    {
        void Add(QuestionComment questionComment);
        void Delete(int QuestionCommentId);
        List<QuestionComment> GetAllQuestionComments();
        QuestionComment GetQuestionCommentById(int id);
        List<QuestionComment> GetQuestionCommentsByQuestionId(int QuestionId);
        void Update(QuestionComment questionComment);
    }
}