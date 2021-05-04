  SELECT q.Id, q.Title, q.Content, q.userProfileId, q.SkillId, q.DateCreated, u.Name, s.name
  FROM Question q JOIN UserProfile u ON q.UserProfileId = u.Id JOIN Skill s ON q.SkillId = s.Id