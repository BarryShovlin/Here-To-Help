using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Here_To_Help.Models;
using Here_To_Help.Utils;
using System;

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
                       SELECT p.id, p.Title, p.Url, p.Content, p.UserProfileId, p.SkillId, p.DateCreated, p.DateDeleted, s.Id AS IdSkill, s.Name AS NameSkill, u.Id as IdUser, u.FirebaseUserId AS FireId, u.Name AS NameUser, u.Email AS EmailUser, u.UserName AS UserName, u.DateCreated AS UCreate
                         FROM Post p Join Skill s ON p.SkillId = s.Id JOIN UserProfile u ON p.UserProfileId = u.Id
                          WHERE p.DateDeleted IS NULL
                            ORDER BY p.DateCreated DESC";

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

        public List<Post> GetPostsByUserSkills(int Id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.Id, p.Title, p.Url, p.Content, p.SkillId, p.UserProfileId, p.DateCreated, us.Id as USkillId, us.SkillId as UserSkillSkillId, us.UserProfileId as UPId, s.Id as IdSkill, s.[Name] as NameSkill, up.Id As UpId, up.UserName as UpUserName
        FROM Post p JOIN Skill s ON p.SkillId = s.Id JOIN UserSkill us ON s.Id = us.SkillId JOIN UserProfile up ON up.Id = us.UserProfileId
                            WHERE us.IsKnown = 0 AND p.SkillId = us.SkillId AND us.UserProfileId = @Id AND p.DateDeleted IS NULL
                            ORDER BY p.DateCreated DESC";

                    DbUtils.AddParameter(cmd, "@Id", Id);

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
                            UserSkill = new UserSkill()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("USkillId")),
                                SkillId = reader.GetInt32(reader.GetOrdinal("UserSkillSkillId")),
                                UserProfileId = reader.GetInt32(reader.GetOrdinal("UPId"))
                            },
                            Skill = new Skill()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("IdSkill")),
                                Name = reader.GetString(reader.GetOrdinal("NameSkill"))
                            },
                            UserProfile = new UserProfile()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("UpId")),
                                UserName = reader.GetString(reader.GetOrdinal("UpUserName"))
                            }
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
                    cmd.CommandText = "UPDATE Post SET DateDeleted = @DateDeleted FROM Post WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", PostId);
                    DbUtils.AddParameter(cmd, "@DateDeleted", DateTime.Now);
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

        public List<Post> Search(string criterion)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql =
                        @"SELECT p.Id AS PostId, p.Url, p.Title, p.Content, p.UserProfileId, p.SkillId, p.DateCreated,
                            up.Id as UserProfileId, up.Name, up.Email, up.UserName, up.DateCreated AS UserProfileDateCreated,
                            st.Id as TagId, st.Title as TagTitle, st.PostId as TagPost, st.SkillId as TagSkill,
                            s.Id as IdSkill, s.Name as NameSkill
                        FROM Post p
                             JOIN UserProfile up ON p.UserProfileId = up.Id JOIN Skill s ON p.SkillId = s.Id JOIN SkillTag st ON p.SkillId = st.SkillId
                       
                    WHERE p.Title LIKE @Criterion OR p.Content LIKE @Criterion OR st.Title LIKE @Criterion";


                    cmd.CommandText = sql;
                    DbUtils.AddParameter(cmd, "@Criterion", $"%{criterion}%");
                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                        posts.Add(new Post()
                        {
                            Id = DbUtils.GetInt(reader, "PostId"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Url = DbUtils.GetString(reader, "Url"),
                            Content = DbUtils.GetString(reader, "Content"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            SkillId = DbUtils.GetInt(reader, "SkillId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Email = DbUtils.GetString(reader, "Email"),
                                UserName = DbUtils.GetString(reader, "UserName"),
                                DateCreated = DbUtils.GetDateTime(reader, "UserProfileDateCreated")
                            },
                            Skill = new Skill()
                            {
                                Id = DbUtils.GetInt(reader, "IdSkill"),
                                Name = DbUtils.GetString(reader, "NameSkill")
                            },
                            SkillTag = new SkillTag()
                            {
                                Id = DbUtils.GetInt(reader, "TagId"),
                                Title = DbUtils.GetString(reader, "TagTitle"),
                                PostId = DbUtils.GetInt(reader, "TagPost"),
                                SkillId = DbUtils.GetInt(reader, "TagSkill")
                            },
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated")
                        });
                    }

                    reader.Close();

                    return posts;
                }
            }
        }
    }
}
