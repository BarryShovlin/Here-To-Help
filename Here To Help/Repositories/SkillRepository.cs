using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Here_To_Help.Models;
using Here_To_Help.Utils;

namespace Here_To_Help.Repositories
{
    public class SkillRepository : BaseRepository, ISkillRepository
    {
        public SkillRepository(IConfiguration configuration) : base(configuration) { }

        public List<Skill> GetAllSkills()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT skill.id, skill.Name
                         FROM Skill";

                    Skill skill = null;
                    var reader = cmd.ExecuteReader();

                    var skills = new List<Skill>();
                    while (reader.Read())
                    {
                        skill = new Skill()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name"))
                        };

                        skills.Add(skill);
                    }
                    reader.Close();
                    return skills;
                }
            }
        }
        public void Add(Skill skill)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Skill (Name)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Name)";
                    DbUtils.AddParameter(cmd, "@Name", skill.Name);


                    skill.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public Skill GetSkillById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Skill.Id AS SkillId, Skill.Name AS Name
                          FROM Skill
                               
                         WHERE Skill.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Skill skill = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        skill = new Skill()
                        {
                            Id = DbUtils.GetInt(reader, "SkillId"),
                            Name = DbUtils.GetString(reader, "Name"),
                        };

                    }
                    reader.Close();

                    return skill;
                }
            }
        }

        public void Delete(int SkillId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Skill WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", SkillId);
                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}
