using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Here_To_Help.Models;
using Here_To_Help.Utils;

namespace Here_To_Help.Repositories
{
    public class PostCommentRepository : BaseRepository, IPostCommentRepository
    {
        public PostCommentRepository(IConfiguration configuration) : base(configuration) { }

        public List<PostComment> GetAllPostComments()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT pc.Id, pc.UserProfileId, pc.PostId, pc.Content, pc.DateCreated, u.Id AS IdUser, u.FirebaseUserId as FireId, u.Name as NameUser, u.Email as EmailUser, u.UserName AS UserName, u.DateCreated as UCreate, p.Id AS IdPost, p.Title AS TitlePost, p.Url AS Url, p.Content AS PostContent, p.UserProfileId AS UId, p.SkillId AS IdSkill, p.DateCreated AS PostDate
                        FROM PostComment pc JOIN UserProfile u ON pc.UserProfileId = u.Id JOIN Post p ON pc.PostId = p.Id";

                    PostComment postComment = null;
                    var reader = cmd.ExecuteReader();

                    var postComments = new List<PostComment>();
                    while (reader.Read())
                    {
                        postComment = new PostComment()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            PostId = reader.GetInt32(reader.GetOrdinal("PostId")),
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
                            Post = new Post()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("IdPost")),
                                Title = reader.GetString(reader.GetOrdinal("TitlePost")),
                                Url = reader.GetString(reader.GetOrdinal("Url")),
                                Content = reader.GetString(reader.GetOrdinal("PostContent")),
                                UserProfileId = reader.GetInt32(reader.GetOrdinal("UId")),
                                SkillId = reader.GetInt32(reader.GetOrdinal("IdSkill")),
                                DateCreated = reader.GetDateTime(reader.GetOrdinal("PostDate"))

                            }


                        };

                        postComments.Add(postComment);
                    }
                    reader.Close();
                    return postComments;
                }
            }
        }
        public void Add(PostComment postComment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO PostComment (UserProfileId, PostId, Content, DateCreated)
                                        OUTPUT INSERTED.ID
                                        VALUES (@UserProfileId, @PostId, @Content, @DateCreated)";
                    DbUtils.AddParameter(cmd, "@UserProfileId", postComment.UserProfileId);
                    DbUtils.AddParameter(cmd, "@PostId", postComment.PostId);
                    DbUtils.AddParameter(cmd, "@Content", postComment.Content);
                    DbUtils.AddParameter(cmd, "@DateCreated", postComment.DateCreated);


                    postComment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<PostComment> GetPostCommentsByPostId(int PostId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT PostComment.Id AS PostCommentId, PostComment.UserProfileId AS UserProfileId, PostComment.PostId, PostComment.Content, PostComment.DateCreated, Post.Id AS IdPost, Post.Title As TitlePost, Post.Url AS UrlPost, Post.Content AS ContentPost, Post.UserProfileId AS PostUser, Post.SkillId AS IdSkill
                          FROM PostComment Join Post ON PostComment.PostId = Post.Id
                               
                         WHERE Post.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", PostId);

                    PostComment postComment = null;

                    var reader = cmd.ExecuteReader();
                    var postComments = new List<PostComment>();
                    while (reader.Read())
                    {
                        postComment = new PostComment()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            PostId = reader.GetInt32(reader.GetOrdinal("PostId")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            Post = new Post
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("IdPost")),
                                Title = reader.GetString(reader.GetOrdinal("TitlePost")),
                                Url = reader.GetString(reader.GetOrdinal("UrlPost")),
                                Content = reader.GetString(reader.GetOrdinal("ContentPost")),
                                UserProfileId = reader.GetInt32(reader.GetOrdinal("PostUser")),
                                SkillId = reader.GetInt32(reader.GetOrdinal("IdSkill")),
                            },
                            DateCreated = reader.GetDateTime(reader.GetOrdinal("DateCreated"))


                        };

                        postComments.Add(postComment);
                    }
                    reader.Close();
                    return postComments;
                }
            }
        }

        public PostComment GetPostCommentById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT PostComment.Id AS PostCommentId, PostComment.UserProfileId AS UserProfileId, PostComment.PostId, PostComment.Content, PostComment.DateCreated, Post.Id AS IdPost, Post.Title As TitlePost, Post.Url AS UrlPost, Post.Content AS ContentPost, Post.UserProfileId AS PostUser, Post.SkillId AS IdSkill, up.Id as UPId, up.UserName as UPUserName
                          FROM PostComment Join Post ON PostComment.PostId = Post.Id JOIN UserProfile up ON up.Id = PostComment.UserProfileId
                          WHERE PostComment.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    PostComment postComment = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        postComment = new PostComment()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("PostCommentId")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            PostId = reader.GetInt32(reader.GetOrdinal("PostId")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            DateCreated = reader.GetDateTime(reader.GetOrdinal("DateCreated")),
                            Post = new Post
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("IdPost")),
                                Title = reader.GetString(reader.GetOrdinal("TitlePost")),
                                Url = reader.GetString(reader.GetOrdinal("UrlPost")),
                                Content = reader.GetString(reader.GetOrdinal("Content")),
                                UserProfileId = reader.GetInt32(reader.GetOrdinal("PostUser")),
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
                    return postComment;
                }
            }
        }

        public void Delete(int PostCommentId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM PostComment WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", PostCommentId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(PostComment postComment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        Update PostComment
                            Set Content = @Content
                            WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Content", postComment.Content);
                    DbUtils.AddParameter(cmd, "@Id", postComment.Id);
                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}
