using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Here_To_Help.Models;
using Here_To_Help.Utils;

namespace Here_To_Help.Repositories
{
    public class PostRepository : BaseRepository
    { 
        public PostRepository(IConfiguration configuration) : base(configuration) { }

        public List<Post> GetAllPosts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT p.id, p.Title, p.Url, p.Content, p.UserProfileId, p.SkillId, p.CreateDate
                         FROM Post";

                    Post post = null;
                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                        post = new Post()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            Url = reader.GetString(reader.GetOrdinal("Url")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            SkillId = reader.GetInt32(reader.GetOrdinal("SkillId")),
                            CreateDate = reader.GetDateTime(reader.GetOrdinal("CreateDate"))

                        };

                        posts.Add(post);
                    }
                    reader.Close();
                    return posts;
                }
            }
        }
        public void Add(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Post (Title, Url, Content, UserProfileId, SkillId, CreateDate)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Title, @Url, @Content, @UserProfileId, @SkillId, @CreateDate)";
                    DbUtils.AddParameter(cmd, "@Title", post.Title);
                    DbUtils.AddParameter(cmd, "@Url", post.Url);
                    DbUtils.AddParameter(cmd, "@Content", post.Content);
                    DbUtils.AddParameter(cmd, "@UserProfileId", post.UserProfileId);
                    DbUtils.AddParameter(cmd, "@SkillId", post.SkillId);
                    DbUtils.AddParameter(cmd, "@CreateDate", post.CreateDate);


                    post.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public Post GetPostById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Post.Id AS PostId, Post.Title AS Title, Post.Url, Post.Content, Post.UserProfileId, Post.SkillId, Post.CreateDate, s.Id AS IdSkill, s.Name AS NameSkill, u.Id AS IdUser, u.FirebaseUserId As FireId, u.Name AS NameUser, u.Email AS UserEmail, u.UserName AS UserName, u.DateCreated AS UCreate
                          FROM Post Join Skill s ON Post.SkillId = s.Id JOIN UserProfile u ON Post.UserProfileId = u.Id
                               
                         WHERE Post.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Post post = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        post = new Post()
                        {
                            Id = DbUtils.GetInt(reader, "PostId"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Url = DbUtils.GetString(reader, "url"),
                            Content = DbUtils.GetString(reader, "Content"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            SkillId = DbUtils.GetInt(reader, "SkillId"),
                            CreateDate = DbUtils.GetDateTime(reader, "CreateDate")
                            Skill = new Skill()
                            {
                                Id = DbUtils.GetInt(reader, "IdSkill"),
                                Name = DbUtils.GetString(reader, "NameSkill")
                            },

                        };

                    }
                    reader.Close();

                    return post;
                }
            }
        }

        public void Delete(int PostId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Post WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", PostId);
                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}
