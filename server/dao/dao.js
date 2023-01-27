"use strict";
const { Router } = require("express");
const db = require("../db/db");

// ===========================================================================================
exports.getUsers = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM User";
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const users = rows.map(
        (row) =>
          new UserData(
            row.ID,
            row.UserID,
            row.Name + " " + row.Surname,
            row.UserName
          )
      );
      resolve(users);
    });
  });
};

exports.getCandidates = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
    candidates.id,
    candidates.fullName,
    candidates.age,
    candidates.sex,
    fields.field,
    candidates.skills
    FROM candidates JOIN fields on candidates.fieldId = fields.id`;
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const candidates = rows.map(
        (row) =>
          new CandidateData(
            row.id,
            row.fullName,
            row.age,
            row.sex,
            row.field,
            row.skills
          )
      );
      resolve(candidates);
    });
  });
};

exports.getCandidate = (candidateId) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT candidates.id,candidates.fullName,candidates.age,candidates.sex,
    candidates.skills,candidates.experienceYears,candidates.linkedIn,candidates.mediumId,
    candidates.githubId,candidates.tel,candidates.email,candidates.location,candidates.title,
    candidates.aboutMe,candidates.languages,candidates.university,fields.field
    FROM candidates JOIN fields on candidates.fieldId = fields.id
        WHERE candidates.id = ?`;
    db.all(sql, [candidateId], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      const candidate = rows.map(
        (row) =>
          new CandidateData(
            row.id,
            row.fullName,
            row.age,
            row.sex,
            row.field,
            row.skills,
            row.experienceYears,
            row.linkedIn,
            row.mediumId,
            row.githubId,
            row.tel,
            row.email,
            row.location,
            row.title,
            row.aboutMe,
            row.languages,
            row.university
          )
      );
      resolve(candidate);
    });
  });
};

exports.getPositions = () => {
  return new Promise((resolve, reject) => {
    const sql = `select positions.id,positions.title,
    positions.description,
    positions.minExp,
    positions.languages,
    fields.field,
    positions.skills,COUNT(DISTINCT applications.candidateId)
    as 'sumCandidates',positions.status from applications
    JOIN positions on applications.positionId = positions.id JOIN fields on positions.id = fields.id GROUP BY applications.positionId`;
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const positions = rows.map(
        (row) =>
          new PositionsData(
            row.id,
            row.title,
            row.description,
            row.field,
            row.skills,
            row.sumCandidates,
            row.status,
            row.minExp,
            row.languages
          )
      );
      resolve(positions);
    });
  });
};

exports.getPosition = (positionId) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
    positions.id,
    positions.title,
    positions.description,
    positions.minExp,
    positions.languages,
    positions.status,
    positions.skills,
    positions.teamId,
    fields.field
    FROM positions JOIN fields on positions.id = fields.id
    WHERE positions.id = ?
        `;
    db.all(sql, [positionId], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      const candidate = rows.map(
        (row) =>
          new PositionData(
            row.id,
            row.title,
            row.description,
            row.field,
            row.skills,
            row.status,
            row.teamId,
            row.minExp,
            row.languages
          )
      );
      resolve(candidate);
    });
  });
};

exports.getApplications = () => {
  return new Promise((resolve, reject) => {
    const sql = `select applications.id,positions.title as 'positionTitle',COUNT(DISTINCT applications.candidateId)
    as 'sumCandidates' from applications JOIN positions on applications.positionId = positions.id GROUP BY applications.positionId`;
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const applications = rows.map(
        (row) =>
          new ApplicationsData(row.id, row.positionTitle, row.sumCandidates)
      );

      console.log(applications);
      resolve(applications);
    });
  });
};

exports.getApplication = (positionId) => {
  return new Promise((resolve, reject) => {
    const sql = `select applications.id,applications.hrScore,applications.positionId,
    positions.title as 'positionTitle',candidates.fullName as 'candidateName',candidates.age,candidates.mediumId,candidates.githubId,candidates.sex,candidates.university,
	  candidates.experienceYears,candidates.educationId,candidates.workId,candidates.languages,candidates.location,candidates.title as 'Candidate Role',
    fields.field,candidates.skills,candidates.id as 'candidateId' from applications
    JOIN positions on applications.positionId = positions.id JOIN candidates on applications.candidateId = candidates.id JOIN
    fields on candidates.fieldId = fields.id WHERE applications.positionId=?`;
    db.all(sql, [positionId], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const applications = rows.map(
        (row) =>
          new ApplicationData(
            row.id,
            row.candidateId,
            row.candidateName,
            row.positionId,
            row.positionTitle,
            row.hrScore,
            row.sex,
            row.age,
            row.field,
            row.skills,
            row.experienceYears,
            row.educationId,
            row.workId,
            row.languages,
            row.location,
            row.candidateRole,
            row.university,
            row.githubId,
            row.mediumId
          )
      );
      resolve(applications);
    });
  });
};

exports.getFields = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
        fields.id,
        fields.field
        FROM fields`;
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const fields = rows.map((row) => new FieldData(row.id, row.field));
      resolve(fields);
    });
  });
};
exports.getField = (fieldId) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
        fields.id,
        fields.field
        FROM fields
        WHERE fields.id = ?`;
    db.all(sql, [fieldId], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const field = rows.map((row) => new FieldData(row.id, row.field));
      resolve(field);
    });
  });
};

exports.getSkills = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
        skills.id,
        skills.skill
        FROM skills`;
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const skills = rows.map((row) => new SkillsData(row.id, row.skill));
      resolve(skills);
    });
  });
};

exports.getSkill = (skillId) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
        skills.id,
        skills.skill
        FROM skills
        WHERE skills.id = ?`;
    db.all(sql, [skillId], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const skill = rows.map((row) => new SkillsData(row.id, row.skill));
      resolve(skill);
    });
  });
};

exports.getEducations = () => {
  return new Promise((resolve, reject) => {
    const sql = `select * from educations
        `;
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      const education = rows.map(
        (row) =>
          new EducationData(
            row.id,
            row.candidateId,
            row.universityName,
            row.location,
            row.major,
            row.startDate,
            row.finishDate,
            row.description
          )
      );
      resolve(education);
    });
  });
};

exports.getWorks = () => {
  return new Promise((resolve, reject) => {
    const sql = `select * from works
        `;
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      const education = rows.map(
        (row) =>
          new WorksData(
            row.id,
            row.candidateId,
            row.companyName,
            row.location,
            row.jobTitle,
            row.startDate,
            row.finishDate,
            row.description
          )
      );
      resolve(education);
    });
  });
};

exports.getTeamMembers = (teamId) => {
  return new Promise((resolve, reject) => {
    const sql = `select * from team_members where teamId = ?`;
    db.all(sql, [teamId], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      const teamMembers = rows.map(
        (row) =>
          new TeamMemberData(
            row.id,
            row.fullName,
            row.sex,
            row.skills,
            row.experienceYears,
            row.location,
            row.languages,
            row.university
          )
      );
      resolve(teamMembers);
    });
  });
};

// ===========================================================================================

class CandidateData {
  constructor(
    id,
    fullName,
    age,
    sex,
    field,
    skills,
    experienceYears,
    linkedIn,
    mediumId,
    githubId,
    tel,
    email,
    location,
    title,
    aboutMe,
    languages,
    univerity,
    skillsMatch,
    experienceMatch,
    universityMatch,
    languageMatch,
    overallScore
  ) {
    this.id = id;
    this.fullName = fullName;
    this.age = age;
    this.sex = sex;
    this.field = field;
    this.skills = skills;
    this.experienceYears = experienceYears;
    this.linkedIn = linkedIn;
    this.mediumId = mediumId;
    this.githubId = githubId;
    this.tel = tel;
    this.email = email;
    this.location = location;
    this.title = title;
    this.aboutMe = aboutMe;
    this.languages = languages;
    this.univerity = univerity;
    this.skillsMatch = 0;
    this.experienceMatch = 0;
    this.universityMatch = 0;
    this.languageMatch = 0;
    this.overallScore = 0;
  }
}

class PositionsData {
  constructor(
    id,
    title,
    description,
    field,
    skills,
    sumCandidates,
    status,
    minExp,
    languages
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.field = field;
    this.skills = skills;
    this.sumCandidates = sumCandidates;
    this.status = status;
    this.minExp = minExp;
    this.languages = languages;
  }
}
class PositionData {
  constructor(
    id,
    title,
    description,
    field,
    skills,
    status,
    teamId,
    minExp,
    languages
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.field = field;
    this.skills = skills;
    this.status = status;
    this.teamId = teamId;
    this.minExp = minExp;
    this.languages = languages;
  }
}

class ApplicationData {
  constructor(
    id,
    candidateId,
    candidateName,
    positionId,
    positionTitle,
    hrScore,
    sex,
    age,
    field,
    skills,
    experienceYears,
    education,
    work,
    languages,
    location,
    candidateRole,
    university,
    githubId,
    mediumId
  ) {
    this.id = id;
    this.candidateId = candidateId;
    this.candidateName = candidateName;
    this.positionTitle = positionTitle;
    this.positionId = positionId;
    this.hrScore = hrScore;
    this.sex = sex;
    this.age = age;
    this.field = field;
    this.skills = skills;
    this.experienceYears = experienceYears;
    this.education = education;
    this.work = work;
    this.languages = languages;
    this.location = location;
    this.candidateRole = candidateRole;
    this.university = university;
    this.githubId =githubId;
    this.mediumId = mediumId
  }
}
class ApplicationsData {
  constructor(id, positionTitle, sumCandidates) {
    this.id = id;
    this.positionTitle = positionTitle;
    this.sumCandidates = sumCandidates;
  }
}

class FieldData {
  constructor(id, field) {
    this.id = id;
    this.field = field;
  }
}

class SkillsData {
  constructor(id, skill) {
    this.id = id;
    this.skill = skill;
  }
}

class EducationData {
  constructor(
    id,
    candidateId,
    universityName,
    location,
    major,
    startDate,
    finishDate,
    description
  ) {
    this.id = id;
    this.candidateId = candidateId;
    this.universityName = universityName;
    this.location = location;
    this.major = major;
    this.startDate = startDate;
    this.finishDate = finishDate;
    this.description = description;
  }
}

class WorksData {
  constructor(
    id,
    candidateId,
    companyName,
    location,
    jobTitle,
    startDate,
    finishDate,
    description
  ) {
    this.id = id;
    this.candidateId = candidateId;
    this.companyName = companyName;
    this.location = location;
    this.jobTitle = jobTitle;
    this.startDate = startDate;
    this.finishDate = finishDate;
    this.description = description;
  }
}

class TeamMemberData {
  constructor(
    id,
    fullName,
    sex,
    skills,
    experienceYears,
    location,
    languages,
    university
  ) {
    this.id = id;
    this.fullName = fullName;
    this.sex = sex;
    this.skills = skills;
    this.experienceYears = experienceYears;
    this.location = location;
    this.languages = languages;
    this.university = university;
  }
}
