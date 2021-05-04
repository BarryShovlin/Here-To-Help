using Here_To_Help.Models;
using System.Collections.Generic;

namespace Here_To_Help.Repositories
{
    public interface IQuestionRepository
    {
        void Add(Question question);
        void Delete(int QuestionId);
        List<Question> GetAllQuestions();
        Question GetQuestionById(int id);
        void Update(Question que);
    }
}