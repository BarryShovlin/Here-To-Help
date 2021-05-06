       SELECT PostComment.Id AS PostCommentId, PostComment.UserProfileId AS UserProfileId, PostComment.PostId, PostComment.Content, PostComment.DateCreated, Post.Id AS IdPost, Post.Title As TitlePost, Post.Url AS UrlPost, Post.Content AS ContentPost, Post.UserProfileId AS PostUser, Post.SkillId AS IdSkill
                          FROM PostComment Join Post ON PostComment.PostId = Post.Id
                               
                         WHERE Post.Id = 1





SELECT UserSkill.Id, UserSkill.SkillId, UserSkill.UserProfileId, UserSkill.IsKnown, Skill.Id AS SkillId, Skill.Name AS SkillName, u.Id as IdUser, u.FirebaseUserId as FireId, u.name as NameUser, u.Email as EmailUser, u.DateCreated as UDate
                          FROM UserSkill JOIN Skill on UserSkill.SkillId = Skill.Id JOIN UserProfile u ON UserSkill.UserProfileId = u.Id
                               
                         WHERE u.Id = 2