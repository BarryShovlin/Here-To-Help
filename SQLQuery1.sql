SELECT * FROM Post
SELECT * FROM SkillTag
SELECT * FROM Skill

set identity_insert [SkillTag] on
INSERT INTO SkillTag (Id, Title, SkillId, PostId) VALUES (30, 'ACProblems', 6, 14)
INSERT INTO SkillTag (Id, Title, SkillId, PostId) VALUES (31, 'EasyElectrical', 7, 15)
INSERT INTO SkillTag (Id, Title, SkillId, PostId) VALUES (32, 'StainedGlass', 9, 16)
INSERT INTO SkillTag (Id, Title, SkillId, PostId) VALUES (33, 'FreezerRepair', 5, 17)
INSERT INTO SkillTag (Id, Title, SkillId, PostId) VALUES (34, 'TableBuild', 1, 18)
set identity_insert [SkillTag] off




