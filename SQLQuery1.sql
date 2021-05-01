  
USE [master]
GO
IF db_id('HereToHelp') IS NULL
  CREATE DATABASE [HereToHelp]
GO
USE [HereToHelp]
GO

DROP TABLE IF EXISTS [QuestionComment];
DROP TABLE IF EXISTS [PostComment];
DROP TABLE IF EXISTS [UserSkill];
DROP TABLE IF EXISTS [PostSkill];
DROP TABLE IF EXISTS [Post];
DROP TABLE IF EXISTS [Question];
DROP TABLE IF EXISTS [Skill];
DROP TABLE IF EXISTS [UserProfile];


CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [FirebaseUserId] nvarchar(28),
  [UserName] nvarchar(255),
  [DateCreated] datetime NOT NULL
)
GO
Create Table [Skill] (
[Id] integer PRIMARY KEY identity NOT NULL,
[Name] varchar(255) NOT NULL
)
Go
Create Table [Question] (
[Id] integer PRIMARY KEY identity NOT NULL,
[Title] varchar(255),
[Content] varchar(255),
[UserProfileId] integer NOT NULL,
[SkillId] integer NOT NULL,
[DateCreated] datetime NOT NULL
)
GO
Create Table [Post] (
[Id] integer PRIMARY KEY identity NOT NULL,
[Title] varchar(255),
[Url] varchar(255),
[Content] varchar(255) NOT NULL,
[UserProfileId] integer NOT NULL,
[SkillId] integer NOT NULL,
[DateCreated] datetime NOT NULL
)
Go

CREATE TABLE [QuestionComment] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [UserProfileId] integer NOT NULL,
  [QuestionId] integer NOT NULL,
  [Content] nvarchar(255) NOT NULL,
  [DateCreated] datetime
)
GO

CREATE TABLE [PostComment] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [UserProfileId] integer NOT NULL,
  [PostId] integer NOT NULL,
  [Content] nvarchar(255) NOT NULL,
  [DateCreated] datetime
)
GO

Create Table [UserSkill] (
[Id] integer PRIMARY KEY identity NOT NULL,
[SkillId] integer NOT NULL,
[UserProfileId] integer NOT NULL,
[IsKnown] bit NOT NULL
)
Go

Create Table [PostSkill] (
[Id] integer PRIMARY KEY identity NOT NULL,
[PostId] integer NOT NULL,
[SkillId] integer NOT NULL
)
Go

ALTER TABLE [Post] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO
ALTER TABLE [PostComment] ADD FOREIGN KEY ([PostId]) REFERENCES [Post] ([Id])
GO
ALTER TABLE [QuestionComment] ADD FOREIGN KEY ([QuestionId]) REFERENCES [Question] ([Id])
GO
ALTER TABLE [UserSkill] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO
ALTER TABLE [UserSkill] ADD FOREIGN KEY ([SkillId]) REFERENCES [Skill] ([Id])
GO
ALTER TABLE [PostSkill] ADD FOREIGN KEY ([SkillId]) REFERENCES [Skill] ([Id])
GO
ALTER TABLE [Question] ADD FOREIGN KEY ([SkillId]) REFERENCES [Skill] ([Id])
GO

SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile]
  ([Id], [Name], [Email], [FirebaseUserId], [UserName], [DateCreated])
VALUES 
  (1, 'John Cena', 'jcena@gmail.com', '6RVwp8LqpMO4759eC1AGDlyn9M33', 'SirJohnCena', '6-21-2020'),
    (2, 'Dwayne Johnson', 'djohnson@gmail.com', 'Wanlao3qL5OPWpQyagYhFt4Fhpn2', 'TheRock', '4-20-2020');
SET IDENTITY_INSERT [UserProfile] OFF
SET IDENTITY_INSERT [Skill] ON
INSERT INTO [Skill]
  ([Id], [Name])
VALUES 
  (1, 'Carpentry'),
  (2, 'Masonry'),
  (3, 'Lawn and Garden'),
  (4, 'Plumbing'),
  (5, 'Appliance Repair'),
  (6, 'HVAC'),
  (7, 'Electrical'),
  (8, 'Painting'),
  (9, 'Glass and Windows'),
  (10, 'General Construction');
SET IDENTITY_INSERT [Skill] OFF
SET IDENTITY_INSERT [UserSkill] ON
INSERT INTO [UserSkill]
  ([Id], [SkillId], [UserProfileId], [IsKnown])
VALUES
  (1, 1, 2, 1),
  (2, 2, 2, 0);
SET IDENTITY_INSERT [UserSkill] OFF
SET IDENTITY_INSERT [Post] ON
INSERT INTO [Post]
  ([Id], [Title], [Content], [Url], [UserProfileId], [SkillId], [DateCreated])
VALUES
  (1, 'Wood at Home Depot', 'Here is some content', 'https://www.homedepot.com/s/lumber?NCNI-5', 1, 1, '06-22-2020'),
  (2, 'Masonry Stuff At Home Depot', 'Here is some masonry stuff if you need it', 'https://www.homedepot.com/s/masonry?NCNI-5', 2, 2, '06-23-2020');
SET IDENTITY_INSERT [Post] OFF
SET IDENTITY_INSERT [PostComment] ON
INSERT INTO [PostComment]
  ([Id], [UserProfileId], [PostId], [Content], [DateCreated])
VALUES
  (1, 2, 1, 'This is a comment on a post', '4/29/2021');
SET IDENTITY_INSERT [PostComment] OFF
SET IDENTITY_INSERT [PostSkill] ON
INSERT INTO [PostSkill]
  ([Id], [PostId], [SkillId])
VALUES
  (1, 1, 1),
  (2, 2, 2);
SET IDENTITY_INSERT [PostSkill] OFF
SET IDENTITY_INSERT [Question] ON
INSERT INTO [QUESTION]
([Id], [Title], [Content], [UserProfileId], [SkillId], [DateCreated])
VALUES
(1, 'Wood working question', 'How do you build a table?', 1, 1, 4/28/20201),
(2, 'Masonry Question', 'How do?', 2, 2, 4/28/2021);
SET IDENTITY_INSERT [Question] OFF
SET IDENTITY_INSERT [QuestionComment] ON
INSERT INTO [QuestionComment]
  ([Id], [UserProfileId], [QuestionId], [Content], [DateCreated])
VALUES
  (1, 1, 2, 'This is a comment on a question', '4/29/2021');
SET IDENTITY_INSERT [QuestionComment] OFF
