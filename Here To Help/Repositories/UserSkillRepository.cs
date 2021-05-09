using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Here_To_Help.Models;
using Here_To_Help.Utils;

namespace Here_To_Help.Repositories
{
    public class UserSkillRepository : BaseRepository, IUserSkillRepository
    {
        public UserSkillRepository(IConfiguration configuration) : base(configuration) { }

        public List<UserSkill> GetAllUserSkills()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT UserSkill.id, UserSkill.SkillId, UserSkill.UserProfileId, UserSkill.IsKnown, Skill.Id AS IdSkill, Skill.Name AS SKillName
                         FROM UserSkill JOIN SKill ON UserSkill.SkillId = SKill.Id";

                    UserSkill userSkill = null;
                    var reader = cmd.ExecuteReader();

                    var UserSkills = new List<UserSkill>();
                    while (reader.Read())
                    {
                        userSkill = new UserSkill()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            SkillId = reader.GetInt32(reader.GetOrdinal("SkillId")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            IsKnown = reader.GetBoolean(reader.GetOrdinal("IsKnown")),
                            Skill = new Skill()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("IdSkill")),
                                Name = reader.GetString(reader.GetOrdinal("SkillName"))
                            }
                        };

                        UserSkills.Add(userSkill);
                    }
                    reader.Close();
                    return UserSkills;
                }
            }
        }
        public void Add(UserSkill userSkill)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserSkill (SkillId, UserProfileId, IsKnown)
                                        OUTPUT INSERTED.ID
                                        VALUES (@SkillId, @UserProfileId, @IsKnown)";
                    DbUtils.AddParameter(cmd, "@SkillId", userSkill.SkillId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", userSkill.UserProfileId);
                    DbUtils.AddParameter(cmd, "@IsKnown", userSkill.IsKnown);

                    userSkill.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<UserSkill> GetUserSkillByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT UserSkill.Id, UserSkill.SkillId, UserSkill.UserProfileId, UserSkill.IsKnown, Skill.Id AS SkillId, Skill.Name AS SkillName, u.Id as IdUser, u.FirebaseUserId as FireId, u.name as NameUser, u.Email as EmailUser, u.DateCreated as UDate
                          FROM UserSkill JOIN Skill on UserSkill.SkillId = Skill.Id JOIN UserProfile u ON UserSkill.UserProfileId = u.Id
                               
                         WHERE u.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    UserSkill userSkill = null;
                    var reader = cmd.ExecuteReader();

                    var UserSkills = new List<UserSkill>();
                    while (reader.Read())
                    {
                        userSkill = new UserSkill()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            SkillId = DbUtils.GetInt(reader, "SkillId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            IsKnown = DbUtils.GetBool(reader, "IsKnown"),
                            Skill = new Skill()
                            {
                                Id = DbUtils.GetInt(reader, "SkillId"),
                                Name = DbUtils.GetString(reader, "SkillName")
                            },
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "IdUser"),
                                FirebaseUserId = DbUtils.GetString(reader, "FireId"),
                                Name = DbUtils.GetString(reader, "NameUser"),
                                Email = DbUtils.GetString(reader, "EmailUser"),
                                DateCreated = DbUtils.GetDateTime(reader, "UDate")
                                
                            }                    
                        };
                        UserSkills.Add(userSkill);
                    }
                    reader.Close();

                    return UserSkills;
                }
            }
        }

        public UserSkill GetUserSkillById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT UserSkill.Id, UserSkill.SkillId, UserSkill.UserProfileId, UserSkill.IsKnown
                          FROM UserSkill
                               
                         WHERE UserSkill.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    UserSkill userSkill = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        userSkill = new UserSkill()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            SkillId = DbUtils.GetInt(reader, "SkillId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            IsKnown = DbUtils.GetBool(reader, "IsKnown"),
                        };
                    }
                    reader.Close();
                    return userSkill;
                }
            }
        }

        public void Delete(int UserSkillId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM UserSkill WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", UserSkillId);
                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}
