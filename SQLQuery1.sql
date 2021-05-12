SELECT p.Id AS PostId, p.Url, p.Title, p.Content, p.UserProfileId, p.SkillId, p.DateCreated,
                            up.Id as UserProfileId, up.Name, up.Email, up.UserName, up.DateCreated AS UserProfileDateCreated,
                            st.Id as TagId, st.Title as TagTitle, st.PostId as TagPost, st.SkillId as TagSkill,
                            s.Id as IdSkill, s.Name as NameSkill
                        FROM Post p
                             JOIN UserProfile up ON p.UserProfileId = up.Id JOIN Skill s ON p.SkillId = s.Id JOIN SkillTag st ON p.SkillId = st.SkillId
                       