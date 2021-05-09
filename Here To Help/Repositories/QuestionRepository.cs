using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Here_To_Help.Models;
using Here_To_Help.Utils;
using System.Data;
using System;

namespace Here_To_Help.Repositories
{
    public class QuestionRepository : BaseRepository, IQuestionRepository
    {
        public QuestionRepository(IConfiguration configuration) : base(configuration) { }

        public List<Question> GetAllQuestions()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT q.Id, q.Title, q.Content, q.userProfileId, q.SkillId, q.DateCreated, u.Id AS IdUserprofile, u.FirebaseUserId AS FireId, u.Name AS NameUser, u.Email AS UserEmail, u.UserName AS UserName, u.DateCreated as UCreate, s.name AS SkillName, s.Id AS IdSkill
                         FROM Question q JOIN UserProfile u ON q.UserProfileId = u.Id JOIN Skill s ON q.SkillId = s.Id
                         WHERE DateDeleted IS NULL";

                    Question question = null;
                    var reader = cmd.ExecuteReader();

                    var questions = new List<Question>();
                    while (reader.Read())
                    {
                        question = new Question()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            SkillId = reader.GetInt32(reader.GetOrdinal("SkillId")),
                            DateCreated = reader.GetDateTime(reader.GetOrdinal("DateCreated")),
                            UserProfile = new UserProfile()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("IdUserProfile")),
                                FirebaseUserId = reader.GetString(reader.GetOrdinal("FireId")),
                                Name = reader.GetString(reader.GetOrdinal("NameUser")),
                                Email = reader.GetString(reader.GetOrdinal("UserEmail")),
                                UserName = reader.GetString(reader.GetOrdinal("UserName")),
                                DateCreated = reader.GetDateTime(reader.GetOrdinal("UCreate"))
                            },
                            Skill = new Skill()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("IdSkill")),
                                Name = reader.GetString(reader.GetOrdinal("SkillName"))
                            }



                        };

                        questions.Add(question);
                    }
                    reader.Close();
                    return questions;
                }
            }
        }
        public void Add(Question question)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Question (Title, Content, UserProfileId, SkillId, DateCreated)
                                        OUTPUT INSERTED.ID
                                        VALUES (@title, @Content, @UserProfileId, @SkillId, @DateCreated)";
                    DbUtils.AddParameter(cmd, "@Title", question.Title);
                    DbUtils.AddParameter(cmd, "@Content", question.Content);
                    DbUtils.AddParameter(cmd, "@UserProfileId", question.UserProfileId);
                    DbUtils.AddParameter(cmd, "@SkillId", question.SkillId);
                    DbUtils.AddParameter(cmd, "@DateCreated", question.DateCreated);


                    question.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public Question GetQuestionById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT q.Id, q.Title, q.Content, q.userProfileId, q.SkillId, q.DateCreated, u.Id AS IdUserprofile, u.FirebaseUserId AS FireId, u.Name AS NameUser, u.Email AS UserEmail, u.UserName AS UserName, u.DateCreated as UCreate, s.name AS SkillName, s.Id AS IdSkill
                         FROM Question q JOIN UserProfile u ON q.UserProfileId = u.Id JOIN Skill s ON q.SkillId = s.id
                               
                         WHERE q.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Question question = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        question = new Question()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            SkillId = DbUtils.GetInt(reader, "SkillId"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "IdUserProfile"),
                                FirebaseUserId = DbUtils.GetString(reader, "FireId"),
                                Name = DbUtils.GetString(reader, "NameUser"),
                                Email = DbUtils.GetString(reader, "UserEmail"),
                                UserName = DbUtils.GetString(reader, "UserName"),
                                DateCreated = DbUtils.GetDateTime(reader, "UCreate")
                            },
                            Skill = new Skill()
                            {
                                Id = DbUtils.GetInt(reader, "IdSkill"),
                                Name = DbUtils.GetString(reader, "SkillName")
                            }
                        };

                    }
                    reader.Close();

                    return question;
                }
            }
        }

        public List<Question> GetQuestionsByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT q.Id, q.Title, q.Content, q.userProfileId, q.SkillId, q.DateCreated, u.Id AS IdUserprofile, u.FirebaseUserId AS FireId, u.Name AS NameUser, u.Email AS UserEmail, u.UserName AS UserName, u.DateCreated as UCreate, s.name AS SkillName, s.Id AS IdSkill
                         FROM Question q JOIN UserProfile u ON q.UserProfileId = u.Id JOIN Skill s ON q.SkillId = s.id
                               
                         WHERE u.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Question question = null;

                    var reader = cmd.ExecuteReader();

                    var questions = new List<Question>();
                    while (reader.Read())
                    {
                        question = new Question()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            SkillId = DbUtils.GetInt(reader, "SkillId"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "IdUserProfile"),
                                FirebaseUserId = DbUtils.GetString(reader, "FireId"),
                                Name = DbUtils.GetString(reader, "NameUser"),
                                Email = DbUtils.GetString(reader, "UserEmail"),
                                UserName = DbUtils.GetString(reader, "UserName"),
                                DateCreated = DbUtils.GetDateTime(reader, "UCreate")
                            },
                            Skill = new Skill()
                            {
                                Id = DbUtils.GetInt(reader, "IdSkill"),
                                Name = DbUtils.GetString(reader, "SkillName")
                            }
                        };
                        questions.Add(question);

                    }
                    reader.Close();

                    return questions;
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Question
                                        SET DateDeleted = @dateDeleted
                                        WHERE Id = @Id;";
                    DbUtils.AddParameter(cmd, "@id", id);
                    DbUtils.AddParameter(cmd, "@dateDeleted", DateTime.Now);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(Question que)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        Update Question
                            Set Title = @Title,
                                Content = @Content,
                                SkillId = @SkillId
                            WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", que.Id);
                    DbUtils.AddParameter(cmd, "@Title", que.Title);
                    DbUtils.AddParameter(cmd, "@Content", que.Content);
                    DbUtils.AddParameter(cmd, "@SkillId", que.SkillId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
