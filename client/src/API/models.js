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
    languages
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
  }
  /**
   * Construct a Counter from a plain object
   * @param {{}} json
   * @return  Track the newly created Track object
   */
  static from(json) {
    const l = Object.assign(new CandidateData(), json);
    return l;
  }
}

class PositionsData {
  constructor(id, title, description, field, skills, sumCandidates, status) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.field = field;
    this.skills = skills.split(",");
    this.sumCandidates = sumCandidates;
    this.status = status;
  }
  /**
   * Construct a Counter from a plain object
   * @param {{}} json
   * @return  Track the newly created Track object
   */
  static from(json) {
    const l = Object.assign(new PositionsData(), json);
    return l;
  }
}

class PositionData {
  constructor(id, title, description, field, skills, status) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.field = field;
    this.skills = skills.split(",");
    this.status = status;
  }
  /**
   * Construct a Counter from a plain object
   * @param {{}} json
   * @return  Track the newly created Track object
   */
  static from(json) {
    const l = Object.assign(new PositionData(), json);
    return l;
  }
}

class ApplicationData {
  constructor(
    id,
    candidateId,
    candidateName,
    positionId,
    positionTitle,
    candidateScore,
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
    candidateRole
  ) {
    this.id = id;
    this.candidateId = candidateId;
    this.candidateName = candidateName;
    this.positionTitle = positionTitle;
    this.positionId = positionId;
    this.candidateScore = candidateScore;
    this.hrScore = hrScore;
    this.sex = sex;
    this.age = age;
    this.field = field;
    this.skills = skills.split(",");
    this.experienceYears = experienceYears;
    this.education = education;
    this.work = work;
    this.languages = languages.split(",");
    this.location = location;
    this.candidateRole = candidateRole;
  }

  /**
   * Construct a Counter from a plain object
   * @param {{}} json
   * @return  Track the newly created Track object
   */
  static from(json) {
    const l = Object.assign(new ApplicationData(), json);
    return l;
  }
}
class ApplicationsData {
  constructor(id, positionTitle, sumCandidates) {
    this.id = id;
    this.positionTitle = positionTitle;
    this.sumCandidates = sumCandidates;
  }
  /**
   * Construct a Counter from a plain object
   * @param {{}} json
   * @return  Track the newly created Track object
   */
  static from(json) {
    const l = Object.assign(new ApplicationsData(), json);
    return l;
  }
}

class FieldData {
  constructor(id, field) {
    this.id = id;
    this.field = field;
  }
  /**
   * Construct a Counter from a plain object
   * @param {{}} json
   * @return  Track the newly created Track object
   */
  static from(json) {
    const l = Object.assign(new FieldData(), json);
    return l;
  }
}

class SkillsData {
  constructor(id, skill) {
    this.id = id;
    this.skill = skill;
  }
  /**
   * Construct a Counter from a plain object
   * @param {{}} json
   * @return  Track the newly created Track object
   */
  static from(json) {
    const l = Object.assign(new SkillsData(), json);
    return l;
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
  /**
   * Construct a Counter from a plain object
   * @param {{}} json
   * @return  Track the newly created Track object
   */
  static from(json) {
    const l = Object.assign(new EducationData(), json);
    return l;
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
  /**
   * Construct a Counter from a plain object
   * @param {{}} json
   * @return  Track the newly created Track object
   */
  static from(json) {
    const l = Object.assign(new WorksData(), json);
    return l;
  }
}

class GithubData {
  constructor(id, publicRepos) {
    this.id = id;
    this.publicRepos = publicRepos;
  }
  /**
   * Construct a Counter from a plain object
   * @param {{}} json
   * @return  Track the newly created Track object
   */
  static from(json) {
    const l = Object.assign(new WorksData(), json);
    return l;
  }
}

class MediumData {
  constructor(status, feed, items) {
    this.status = status;
    this.feed = feed;
    this.items = items;
  }
  /**
   * Construct a Counter from a plain object
   * @param {{}} json
   * @return  Track the newly created Track object
   */
  static from(json) {
    const l = Object.assign(new WorksData(), json);
    return l;
  }
}

const models = {
  SkillsData,
  CandidateData,
  PositionsData,
  ApplicationData,
  ApplicationsData,
  FieldData,
  PositionData,
  WorksData,
  EducationData,
  GithubData,
  MediumData
};
export default models;
