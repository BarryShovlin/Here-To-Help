using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Here_To_Help.Models;
using Here_To_Help.Utils;

namespace Here_To_Help.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
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
                       SELECT p.id, p.Title, p.Url, p.Content, p.UserProfileId, p.SkillId, p.DateCreated, s.Id AS IdSkill, s.Name AS NameSkill, u.Id as IdUser, u.FirebaseUserId AS FireId, u.Name AS NameUser, u.Email AS EmailUser, u.UserName AS UserName, u.DateCreated AS UCreate
                         FROM Post p Join Skill s ON p.SkillId = s.Id JOIN UserProfile u ON p.UserProfileId = u.Id";

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
                            DateCreated = reader.GetDateTime(reader.GetOrdinal("DateCreated")),
                            Skill = new Skill()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("IdSkill")),
                                Name = reader.GetString(reader.GetOrdinal("NameSkill"))
                            },
                            UserProfile = new UserProfile
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("IdUser")),
                                FirebaseUserId = reader.GetString(reader.GetOrdinal("FireId")),
                                Name = reader.GetString(reader.GetOrdinal("NameUser")),
                                Email = reader.GetString(reader.GetOrdinal("EmailUser")),
                                UserName = reader.GetString(reader.GetOrdinal("UserName")),
                                DateCreated = reader.GetDateTime(reader.GetOrdinal("UCreate"))
                            }

                        };

                        posts.Add(post);
                    }
                    reader.Close();
                    return posts;
                }
            }
        }

        public List<Post> GetPostsByUserSkills(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.Id, p.Title, p.Url, p.Content, p.SkillId, p.UserProfileId, us.Id as USkillId, us.SkillId as USkillId, us.UserProfileId as UPId
                        FROM Post p JOIN UserSkill us ON p.UserProfileId = us.UserProfileId
                            WHERE p.Id = @Id";

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
                            DateCreated = reader.GetDateTime(reader.GetOrdinal("DateCreated")),
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
                    cmd.CommandText = @"INSERT INTO Post (Title, Url, Content, UserProfileId, SkillId, DateCreated)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Title, @Url, @Content, @UserProfileId, @SkillId, @DateCreated)";
                    DbUtils.AddParameter(cmd, "@Title", post.Title);
                    DbUtils.AddParameter(cmd, "@Url", post.Url);
                    DbUtils.AddParameter(cmd, "@Content", post.Content);
                    DbUtils.AddParameter(cmd, "@UserProfileId", post.UserProfileId);
                    DbUtils.AddParameter(cmd, "@SkillId", post.SkillId);
                    DbUtils.AddParameter(cmd, "@DateCreated", post.DateCreated);


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
                          SELECT Post.Id AS PostId, Post.Title AS Title, Post.Url, Post.Content, Post.UserProfileId, Post.SkillId, Post.DateCreated, s.Id AS IdSkill, s.Name AS NameSkill, u.Id AS IdUser, u.FirebaseUserId As FireId, u.Name AS NameUser, u.Email AS UserEmail, u.UserName AS UserName, u.DateCreated AS UCreate
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
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            Skill = new Skill()
                            {
                                Id = DbUtils.GetInt(reader, "IdSkill"),
                                Name = DbUtils.GetString(reader, "NameSkill")
                            },
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "IdUser"),
                                FirebaseUserId = DbUtils.GetString(reader, "FireId"),
                                Name = DbUtils.GetString(reader, "NameUser"),
                                Email = DbUtils.GetString(reader, "UserEmail"),
                                UserName = DbUtils.GetString(reader, "UserName"),
                                DateCreated = DbUtils.GetDateTime(reader, "UCreate")
                            }
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

        public void Update(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        Update Post
                            Set Title = @Title,
                                Url = @Url,
                                Content = @Content
                            WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Title", post.Title);
                    DbUtils.AddParameter(cmd, "@Url", post.Url);
                    DbUtils.AddParameter(cmd, "@Content", post.Content);
                    DbUtils.AddParameter(cmd, "@Id", post.Id);
                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}
