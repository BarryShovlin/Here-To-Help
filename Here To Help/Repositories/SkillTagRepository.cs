using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Here_To_Help.Models;
using Here_To_Help.Utils;

namespace Here_To_Help.Repositories
{
    public class SkillTagRepository : BaseRepository, ISkillTagRepository
    {
        public SkillTagRepository(IConfiguration configuration) : base(configuration) { }

        public List<SkillTag> GetAllSkillTags()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT skillTag.id, skillTag.Title, skillTag.PostId, skillTag.SkillId, q.Id as QueId, q.Title as QueTItle, q.SkillId as QueSkill, p.Id as PId, p.Title as PTitle, p.SkillId as PSkillId
                         FROM SkillTag JOIN Post p ON p.SkillId = SkillTag.SkillId JOIN Question q ON q.SkillId = SkillTag.SkillId ";

                    SkillTag skillTag = null;
                    var reader = cmd.ExecuteReader();

                    var skillTags = new List<SkillTag>();
                    while (reader.Read())
                    {
                        skillTag = new SkillTag()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            PostId = reader.GetInt32(reader.GetOrdinal("PostId")),
                            SkillId = reader.GetInt32(reader.GetOrdinal("SkillId")),
                            Post = new Post()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("PId")),
                                Title = reader.GetString(reader.GetOrdinal("PTitle")),
                                SkillId = reader.GetInt32(reader.GetOrdinal("PSkillId"))
                            },
                            Question = new Question()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("QueId")),
                                Title = reader.GetString(reader.GetOrdinal("QueTitle")),
                                SkillId = reader.GetInt32(reader.GetOrdinal("QueSkill"))
                            }


                        };

                        skillTags.Add(skillTag);
                    }
                    reader.Close();
                    return skillTags;
                }
            }
        }
        public void Add(SkillTag skillTag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO SkillTag Title, PostId, SkillId
                                        OUTPUT INSERTED.ID
                                        VALUES (@Title, @SkillId)";
                    DbUtils.AddParameter(cmd, "@Title", skillTag.Title);
                    DbUtils.AddParameter(cmd, "@PostId", skillTag.PostId);
                    DbUtils.AddParameter(cmd, "@SkillId", skillTag.SkillId);


                    skillTag.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public SkillTag GetSkillTagById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT skillTag.id, skillTag.Title, skillTag.PostId, skillTag.SkillId, q.Id as QueId, q.Title as QueTItle, q.SkillId as QueSkill, p.Id as PId, p.Title as PTitle, p.SkillId as PSkillId
                         FROM SkillTag JOIN Post p ON p.SkillId = SkillTag.SkillId JOIN Question q ON q.SkillId = SkillTag.SkillId 

                    WHERE SkillTag.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    SkillTag skillTag = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                        skillTag = new SkillTag()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            PostId = reader.GetInt32(reader.GetOrdinal("PostId")),
                            SkillId = reader.GetInt32(reader.GetOrdinal("SkillId")),
                            Post = new Post()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("PId")),
                                Title = reader.GetString(reader.GetOrdinal("PTitle")),
                                SkillId = reader.GetInt32(reader.GetOrdinal("PSkillId"))
                            },
                            Question = new Question()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("QueId")),
                                Title = reader.GetString(reader.GetOrdinal("QueTitle")),
                                SkillId = reader.GetInt32(reader.GetOrdinal("QueSkill"))
                            }
                        };
                    reader.Close();

                    return skillTag;
                }
            }
        }

        public List<SkillTag> GetSkillTagsByPostId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT skillTag.id, skillTag.Title, skillTag.PostId, skillTag.SkillId, q.Id as QueId, q.Title as QueTItle, q.SkillId as QueSkill, p.Id as PId, p.Title as PTitle, p.SkillId as PSkillId
                         FROM SkillTag JOIN Post p ON p.SkillId = SkillTag.SkillId JOIN Question q ON q.SkillId = SkillTag.SkillId 

                    WHERE SkillTag.PostId = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    SkillTag skillTag = null;

                    var SkillTags = new List<SkillTag>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        skillTag = new SkillTag()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            PostId = reader.GetInt32(reader.GetOrdinal("PostId")),
                            SkillId = reader.GetInt32(reader.GetOrdinal("SkillId")),
                            Post = new Post()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("PId")),
                                Title = reader.GetString(reader.GetOrdinal("PTitle")),
                                SkillId = reader.GetInt32(reader.GetOrdinal("PSkillId"))
                            },
                            Question = new Question()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("QueId")),
                                Title = reader.GetString(reader.GetOrdinal("QueTitle")),
                                SkillId = reader.GetInt32(reader.GetOrdinal("QueSkill"))
                            }
                        };
                        SkillTags.Add(skillTag);
                    }
                    reader.Close();

                    return SkillTags;
                }
            }
        }



        public void Delete(int SkillTagId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM SkillTag WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", SkillTagId);
                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}
