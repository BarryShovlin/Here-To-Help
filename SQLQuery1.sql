       SELECT PostComment.Id AS PostCommentId, PostComment.UserProfileId AS UserProfileId, PostComment.PostId, PostComment.Content, PostComment.DateCreated, Post.Id AS IdPost, Post.Title As TitlePost, Post.Url AS UrlPost, Post.Content AS ContentPost, Post.UserProfileId AS PostUser, Post.SkillId AS IdSkill
                          FROM PostComment Join Post ON PostComment.PostId = Post.Id
                               
                         WHERE Post.Id = 1





SELECT * FROM UserProfile