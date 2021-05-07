INSERT INTO UserSkill (SkillId, UserProfileId, IsKnown)
                                        OUTPUT INSERTED.ID
                                        VALUES (5, 1, 0)



UPDATE Post
SET SkillId = 2
Where Post.Id = 1