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
        candidates.fieldsId,
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
            row.fieldsId,
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
    candidates.fieldsId,
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
            row.fieldsId,
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
        positions.fieldsId,
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
            row.fieldsId,
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
    const sql = `SELECT 
    positions.id,
    positions.title,
    positions.description,
    positions.fieldsId,
    positions.status,
    positions.skillsId
	  FROM positions
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
            row.fieldsId,
            row.status,
            row.skillsId
          )
      );
      resolve(candidate);
    });
  });
};

exports.getApplications = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
        applications.id,
        applications.candidateId,
        applications.positionId,
        applications.candidateScore,
        applications.hrScore
        FROM applications`;
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const applications = rows.map(
        (row) =>
          new ApplicationData(
            row.id,
            row.candidateId,
            row.positionId,
            row.candidateScore,
            row.hrScore,
          )
      );
      resolve(applications);
    });
  });
};

exports.getApplication = (applicationId) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
        applications.id,
        applications.candidateId,
        applications.positionId,
        applications.candidateScore,
        applications.hrScore
        FROM applications
        WHERE applications.id = ? `;
    db.all(sql, [applicationId] ,(err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const applications = rows.map(
        (row) =>
          new ApplicationData(
            row.id,
            row.candidateId,
            row.positionId,
            row.candidateScore,
            row.hrScore,
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
      const fields = rows.map(
        (row) =>
          new FieldData(
            row.id,
            row.field,
          )
      );
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
      const field = rows.map(
        (row) =>
          new FieldData(
            row.id,
            row.field,
          )
      );
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
      const skills = rows.map(
        (row) =>
          new SkillsData(
            row.id,
            row.skill,
          )
      );
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
    db.all(sql, [skillId] , (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const skill = rows.map(
        (row) =>
          new SkillsData(
            row.id,
            row.skill,
          )
      );
      resolve(skill);
    });
  });
};

// ===========================================================================================


class CandidateData {
  constructor(id, fullName, age, sex, fieldsId, skillsId) {
    this.id = id;
    this.fullName = fullName;
    this.age = age;
    this.sex = sex;
    this.fieldsId = fieldsId;
    this.skillsId = skillsId;
  }
}

class PositionData {
  constructor(id, title, description, fieldsId, status, skillsId) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.fieldsId = fieldsId;
    this.status = status;
    this.skillsId = skillsId;
  }
}

class ApplicationData {
  constructor(id, candidateId, positionId, candidateScore, hrScore) {
    this.id = id;
    this.candidateId = candidateId;
    this.positionId = positionId;
    this.candidateScore = candidateScore;
    this.hrScore = hrScore;
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