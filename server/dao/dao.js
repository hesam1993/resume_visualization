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
        candidates.fieldId,
        candidates.skillsId
        FROM candidates`;
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
            row.fieldId,
            row.skillsId
          )
      );
      resolve(candidates);
    });
  });
};

exports.getCandidate = (candidateId) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT candidates.id,
    candidates.fullName,
    candidates.age,
    candidates.sex,
    candidates.fieldId,
    candidates.skillsId
	  FROM candidates
    WHERE candidates.id = ?
        `;
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
            row.fieldId,
            row.skillsId
          )
      );
      resolve(candidate);
    });
  });
};

exports.getPositions = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
        positions.id,
        positions.title,
        positions.description,
        positions.fieldId,
        positions.status,
        positions.skillsId
        FROM positions`;
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const positions = rows.map(
        (row) =>
          new PositionData(
            row.id,
            row.title,
            row.description,
            row.fieldId,
            row.status,
            row.skillsId
          )
      );
      resolve(positions);
    });
  });
};

exports.getPosition = (positionId) => {
  return new Promise((resolve, reject) => {
    const sql = `select fields.field, positions.title,positions.status,positions.description, group_concat(DISTINCT skills.skill) as combinedSkills , newSkills.id from 
    (WITH split(id, csv) AS (
      SELECT 
        '', 
        positions.skillsId||','  FROM positions  WHERE positions.id =?
      UNION ALL SELECT
        substr(csv, 0, instr(csv, ',')),
        substr(csv, instr(csv, ',') + 1)
      FROM split 
      WHERE csv != ''
    ) SELECT id FROM split 
    WHERE id!='') AS newSkills JOIN skills on newSkills.id = skills.id JOIN positions JOIN fields on positions.fieldId = fields.id WHERE positions.id = ?
        `;
    db.all(sql, [positionId,positionId], (err, rows) => {
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
            row.status,
            row.combinedSkills
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
            new ApplicationsData(
            row.id,
            row.positionTitle,
            row.sumCandidates
          )
          
      );
      
      console.log(applications)
      resolve(applications);
    });
  });
};

exports.getApplication = (positionId) => {
  return new Promise((resolve, reject) => {
    const sql = `select applications.id,applications.candidateScore,applications.hrScore,applications.positionId,positions.title as 'positionTitle',candidates.fullName as 'candidateName',candidates.id as 'candidateId' from applications
    JOIN positions on applications.positionId = positions.id JOIN candidates on applications.candidateId = candidates.id WHERE applications.positionId=?`;
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
            row.candidateScore,
            row.hrScore
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

// ===========================================================================================

class CandidateData {
  constructor(id, fullName, age, sex, fieldId, skillsId) {
    this.id = id;
    this.fullName = fullName;
    this.age = age;
    this.sex = sex;
    this.fieldId = fieldId;
    this.skillsId = skillsId;
  }
}

class PositionData {
  constructor(id, title, description, field, status, skills) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.field = field;
    this.status = status;
    this.skills = skills;
  }
}

class ApplicationData {
  constructor(id, candidateId,candidateName, positionId,positionTitle, candidateScore, hrScore) {
    this.id = id;
    this.candidateId = candidateId;
    this.candidateName = candidateName;
    this.positionTitle = positionTitle;
    this.positionId = positionId;
    this.candidateScore = candidateScore;
    this.hrScore = hrScore;
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
