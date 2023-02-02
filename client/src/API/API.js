import models from "./models"

const baseURL = "/api";

async function getPositions() {
    let url = `${baseURL}/positions`;
    const response = await fetch(url);
    const positionsJson = await response.json();
    if (response.ok) {
      const positions = positionsJson.positions;
      const final = positions.map(
        (p) =>
          new models.PositionsData(
            p.id,
            p.title,
            p.description,
            p.field,
            p.skills,
            p.sumCandidates,
            p.status,
            p.teamId,
            p.minExp,
            p.languages
          )
      );
      return final;
    } else {
      let err = { status: response.status, errObj: positionsJson };
      throw err; // An object with the error coming from the server
    }
  }


  async function getPosition(positionId) {
    let url = `${baseURL}/positions/${positionId}`;
    const response = await fetch(url);
    const positionJson = await response.json();
    if (response.ok) {
      const position = positionJson.position;
      const final = position.map(
        (p) =>
          new models.PositionData(
            p.id,
            p.title,
            p.description,
            p.field,
            p.skills,
            p.status,
            p.teamId,
            p.minExp,
            p.languages
          )
      );
      return final;
    } else {
      let err = { status: response.status, errObj: positionJson };
      throw err; // An object with the error coming from the server
    }
  }


  async function getApplications() {
    let url = `${baseURL}/applications`;
    const response = await fetch(url);
    const applicationsJson = await response.json();
    if (response.ok) {
      const applications = applicationsJson.applications;
      const final = applications.map(
        (a) =>
          new models.ApplicationsData(
            a.id,
            a.positionTitle,
            a.sumCandidates
          )
      );
      return final;
    } else {
      let err = { status: response.status, errObj: applicationsJson };
      throw err; // An object with the error coming from the server
    }
  }
  
  async function getApplication(positionId) {
    let url = `${baseURL}/applications/${positionId}`;
    const response = await fetch(url);
    const applicationJson = await response.json();
    if (response.ok) {
      const applications = applicationJson.application;
      const final = applications.map(
        (a) =>
          new models.ApplicationData(
            a.id,
            a.candidateId,
            a.candidateName,
            a.positionId,
            a.positionTitle,
            a.hrScore,
            a.sex,
            a.age,
            a.field,
            a.skills,
            a.experienceYears,
            a.education,
            a.work,
            a.languages,
            a.location,
            a.candidateRole,
            a.university,
            a.githubId,
            a.mediumId
          )
      );
      return final;
    } else {
      let err = { status: response.status, errObj: applicationJson };
      throw err; // An object with the error coming from the server
    }
  }


  async function getEducations() {
    let url = `${baseURL}/educations`;
    const response = await fetch(url);
    const educationJson = await response.json();
    if (response.ok) {
      const educations = educationJson.educations;
      const final = educations.map(
        (a) =>
          new models.EducationData(
            a.id,
            a.candidateId,
            a.universityName,
            a.location,
            a.major,
            a.startDate,
            a.finishDate,
            a.description,
          )
      );
      return final;
    } else {
      let err = { status: response.status, errObj: educationJson };
      throw err; // An object with the error coming from the server
    }
  }

  async function getWorks() {
    let url = `${baseURL}/works`;
    const response = await fetch(url);
    const worksJson = await response.json();
    if (response.ok) {
      const works = worksJson.works;
      const final = works.map(
        (a) =>
          new models.EducationData(
            a.id,
            a.candidateId,
            a.universityName,
            a.location,
            a.major,
            a.startDate,
            a.finishDate,
            a.description,
          )
      );
      console.log(final)
      return final;
    } else {
      let err = { status: response.status, errObj: worksJson };
      throw err; // An object with the error coming from the server
    }
  }

  async function getGithubInfo(githubId) {
    let url = `https://api.github.com/users/${githubId}`;
    const response = await fetch(url);
    const githubJson = await response.json();
    console.log(githubJson)
    if (response.ok) {
      const githubInfo = githubJson;
      const final = 
          new models.GithubData(
            githubJson.id,
            githubJson.public_repos,
          )

      return final;
    } else {
      let err = { status: response.status, errObj: githubJson };
      throw err; // An object with the error coming from the server
    }
  }

  async function getCandidate(candidateId) {
    let url = `${baseURL}/candidates/${candidateId}`;
    const response = await fetch(url);
    const candidateJson = await response.json();
    if (response.ok) {
      const candidateInfo = candidateJson.candidate;
      const final = candidateInfo.map(
        (c) =>
          new models.CandidateData(
            c.id,
            c.fullName,
            c.age,
            c.sex,
            c.field,
            c.skills,
            c.experienceYears,
            c.linkedIn,
            c.mediumId,
            c.githubId,
            c.tel,
            c.email,
            c.location,
            c.title,
            c.aboutMe,
            c.languages,
            c.university
          )
      );
      return final;
    } else {
      let err = { status: response.status, errObj: candidateJson };
      throw err; // An object with the error coming from the server
    }
  }


  async function getMediumInfo(mediumId) {
    let url = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${mediumId}`;
    const response = await fetch(url);
    const mediumJson = await response.json();
    console.log(mediumJson)
    if (response.ok) {
      const mediumInfo = mediumJson;
      const final = new models.MediumData(
            mediumInfo.status,
            mediumInfo.feed,
            mediumInfo.items,
          )

      return final;
    } else {
      let err = { status: response.status, errObj: mediumJson };
      throw err; // An object with the error coming from the server
    }
  }

  async function getTeamMembers(teamId) {
    let url = `${baseURL}/teams/${teamId}`;
    const response = await fetch(url);
    const teamJson = await response.json();
    if (response.ok) {
      const teamInfo = teamJson.teamMembers;
      const final = teamInfo.map(
        (c) =>
          new models.TeamMemberData(
            c.id,
            c.fullName,
            c.sex,
            c.skills,
            c.experienceYears,
            c.location,
            c.languages,
            c.university
          )
      );
      return final;
    } else {
      let err = { status: response.status, errObj: teamJson };
      throw err; // An object with the error coming from the server
    }
  }

  async function closePosition(positionId) {
    var requestOptions = {
      method: 'PUT',
      redirect: 'follow'
    };
    let url = `${baseURL}/positions/${positionId}`;
    const response = await fetch(url, requestOptions);
    const resultJson = await response.json();
    if (response.ok) {
      return resultJson;
    } else {
      let err = { status: response.status, errObj: resultJson };
      throw err; // An object with the error coming from the server
    }
  }

  

  const API = {
    getPositions,
    getApplications,
    getApplication,
    getPosition,
    getWorks,
    getEducations,
    getCandidate,
    getGithubInfo,
    getMediumInfo,
    getTeamMembers,
    closePosition
  };
  export default API;