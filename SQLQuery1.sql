INSERT INTO UserSkill (SkillId, UserProfileId, IsKnown)
                                        OUTPUT INSERTED.ID
                                        VALUES (5, 1, 0)



SELECT * FROM QuestionComment