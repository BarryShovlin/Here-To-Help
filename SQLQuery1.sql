Create Table [SkillTag] (
[Id] integer PRIMARY KEY identity NOT NULL,
[Title] varchar(255) NOT NULL,
[PostId] integer NOT NULL,
[SkillId] integer NOT NULL,

  CONSTRAINT [FK_SkillTag_Post] FOREIGN KEY ([PostId]) REFERENCES [UserProfile] ([Id]),
  CONSTRAINT [FK_SkillTag_Skill] FOREIGN KEY ([SkillId]) REFERENCES [Skill] ([Id])
)
Go
SET IDENTITY_INSERT [SkillTag] ON
INSERT INTO [SkillTag]
([Id], [Title], [PostId], [SkillId])
VALUES (1, '#TableBuild', 1, 1)
SET IDENTITY_INSERT [SkillTag] OFF


ALTER TABLE SkillTag ADD CONSTRAINT [FK_SkillTag_Post] FOREIGN KEY ([PostId]) REFERENCES [Post] ([Id])
ALTER TABLE SkillTag DROP Constraint FK_SkillTag_Post
DELETE FROM SkillTag WHERE Id = 1
SELECT * FROM SkillTag