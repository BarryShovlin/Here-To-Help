using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Here_To_Help.Models;
using Here_To_Help.Utils;

namespace Here_To_Help.Repositories
{
    public class QuestionCommentRepository : BaseRepository, IQuestionCommentRepository
    {
        public QuestionCommentRepository(IConfiguration configuration) : base(configuration) { }

        public List<QuestionComment> GetAllQuestionComments()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT qc.Id, qc.UserProfileId, qc.QuestionId, qc.Content, qc.DateCreated, u.Id AS IdUser, u.FirebaseUserId as FireId, u.Name as NameUser, u.Email as EmailUser, u.UserName AS UserName, u.DateCreated as UCreate, q.Id AS IdQuestion, q.Title as TitleQuestion, q.Content AS QuestionContent, q.UserProfileId AS UId, q.DateCreated AS QuestionDate
                        FROM QuestionComment qc JOIN UserProfile u ON qc.UserProfileId = u.Id JOIN Question q ON qc.QuestionId = q.Id";

                    QuestionComment questionComment = null;
                    var reader = cmd.ExecuteReader();

                    var questionComments = new List<QuestionComment>();
                    while (reader.Read())
                    {
                        questionComment = new QuestionComment()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            QuestionId = reader.GetInt32(reader.GetOrdinal("QuestionId")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            UserProfile = new UserProfile
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("IdUser")),
                                FirebaseUserId = reader.GetString(reader.GetOrdinal("FireId")),
                                Name = reader.GetString(reader.GetOrdinal("NameUser")),
                                Email = reader.GetString(reader.GetOrdinal("EmailUser")),
                                UserName = reader.GetString(reader.GetOrdinal("UserName")),
                                DateCreated = reader.GetDateTime(reader.GetOrdinal("UCreate"))
                            },
                            DateCreated = reader.GetDateTime(reader.GetOrdinal("DateCreated")),
                            Question = new Question()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("IdQuestion")),
                                Title = reader.GetString(reader.GetOrdinal("TitleQuestion")),
                                Content = reader.GetString(reader.GetOrdinal("QuestionContent")),
                                UserProfileId = reader.GetInt32(reader.GetOrdinal("UId")),
                                DateCreated = reader.GetDateTime(reader.GetOrdinal("QuestionDate"))

                            }


                        };

                        questionComments.Add(questionComment);
                    }
                    reader.Close();
                    return questionComments;
                }
            }
        }
        public void Add(QuestionComment questionComment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO QuestionComment (UserProfileId, QuestionId, Content, DateCreated)
                                        OUTPUT INSERTED.ID
                                        VALUES (@UserProfileId, @QuestionId, @Content, @DateCreated)";
                    DbUtils.AddParameter(cmd, "@UserProfileId", questionComment.UserProfileId);
                    DbUtils.AddParameter(cmd, "@QuestionId", questionComment.QuestionId);
                    DbUtils.AddParameter(cmd, "@Content", questionComment.Content);
                    DbUtils.AddParameter(cmd, "@DateCreated", questionComment.DateCreated);


                    questionComment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<QuestionComment> GetQuestionCommentsByQuestionId(int QuestionId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT QuestionComment.Id AS QuestionCommentId, QuestionComment.UserProfileId AS UserProfileId, QuestionComment.QuestionId, QuestionComment.Content, QuestionComment.DateCreated, Question.Id AS IdQuestion, Question.Title As TitleQuestion, Question.Content AS ContentQuestion, Question.UserProfileId AS QuestionUser, Question.SkillId AS IdSkill, up.Id AS UPId, up.UserName as UPUserName
                          FROM QuestionComment Join Question ON QuestionComment.QuestionId = Question.Id JOIN UserProfile up ON QuestionComment.UserProfileId = up.Id
                               
                         WHERE Question.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", QuestionId);

                    QuestionComment questionComment = null;

                    var reader = cmd.ExecuteReader();
                    var questionComments = new List<QuestionComment>();
                    while (reader.Read())
                    {
                        questionComment = new QuestionComment()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("QuestionCommentId")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            QuestionId = reader.GetInt32(reader.GetOrdinal("QuestionId")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            Question = new Question
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("IdQuestion")),
                                Title = reader.GetString(reader.GetOrdinal("TitleQuestion")),
                                Content = reader.GetString(reader.GetOrdinal("ContentQuestion")),
                                UserProfileId = reader.GetInt32(reader.GetOrdinal("QuestionUser")),
                                SkillId = reader.GetInt32(reader.GetOrdinal("IdSkill")),
                            },
                            UserProfile = new UserProfile()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("UPId")),
                                UserName = reader.GetString(reader.GetOrdinal("UPUserName"))
                            },
                            DateCreated = reader.GetDateTime(reader.GetOrdinal("DateCreated"))


                        };

                        questionComments.Add(questionComment);
                    }
                    reader.Close();
                    return questionComments;
                }
            }
        }

        public QuestionComment GetQuestionCommentById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT QuestionComment.Id AS QuestionCommentId, QuestionComment.UserProfileId AS UserProfileId, QuestionComment.QuestionId, QuestionComment.Content, QuestionComment.DateCreated, Question.Id AS IdQuestion, Question.Title As TitleQuestion, Question.Content AS ContentQuestion, Question.UserProfileId AS QuestionUser, Question.SkillId AS IdSkill, up.Id as UPId, up.UserName as UPUserName
                          FROM QuestionComment Join Question ON QuestionComment.QuestionId = Question.Id JOIN UserProfile up ON up.Id = QuestionComment.UserProfileId
                          WHERE QuestionComment.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    QuestionComment questionComment = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        questionComment = new QuestionComment()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("QuestionCommentId")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            QuestionId = reader.GetInt32(reader.GetOrdinal("QuestionId")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            DateCreated = reader.GetDateTime(reader.GetOrdinal("DateCreated")),
                            Question = new Question
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("IdQuestion")),
                                Title = reader.GetString(reader.GetOrdinal("TitleQuestion")),
                                Content = reader.GetString(reader.GetOrdinal("Content")),
                                UserProfileId = reader.GetInt32(reader.GetOrdinal("QuestionUser")),
                                SkillId = reader.GetInt32(reader.GetOrdinal("IdSkill")),
                            },
                            UserProfile = new UserProfile()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("UPId")),
                                UserName = reader.GetString(reader.GetOrdinal("UPUserName"))
                            }


                        };

                    }
                    reader.Close();
                    return questionComment;
                }
            }
        }

        public void Delete(int QuestionCommentId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM QuestionComment WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", QuestionCommentId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(QuestionComment questionComment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        Update QuestionComment
                            Set Content = @Content
                            WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Content", questionComment.Content);
                    DbUtils.AddParameter(cmd, "@Id", questionComment.Id);
                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}
