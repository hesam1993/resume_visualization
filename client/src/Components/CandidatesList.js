import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import API from "../API/API";
import { Link, useNavigate } from "react-router-dom";
import { Button, Stack } from "react-bootstrap";
import { useEffect, useState } from "react";
function CandidatesList() {
  let navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [position, setPosition] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [comparisonList, setComparisonList] = useState([]);
  const [cmpBtn, setCmpBtn] = useState(true);
  const positionId = window.location.href.split("=")[1];
  useEffect(() => {
    API.getApplication(positionId)
      .then((candidatesInfo) => {
        setCandidates(candidatesInfo);
        console.log(candidates);
      })
      .catch((err) => console.log(err));
    API.getPosition(positionId)
      .then((positionInfo) => {
        setPosition(positionInfo[0]);
        console.log(positionInfo);
      })
      .catch((err) => console.log(err));

    API.getTeamMembers(1)
      .then((teamInfo) => {
        setTeamMembers(teamInfo);
      })
      .catch((err) => console.log(err));
  }, []);

  const addToComparison = (candidate) => {
    if (comparisonList.length < 2) {
      const newComparisonList = [...comparisonList];
      newComparisonList.push(candidate);
      setComparisonList(newComparisonList);
    }
  };
  const doComparison = () => {
    const firstCandidate = comparisonList[0].id;
    const secondCandidate = comparisonList[1].id;
    navigate(
      `/comparison?fid=${firstCandidate}&sid=${secondCandidate}&pid=${positionId}`
    );
  };

  const teamComparison = (candidate) => {
    let langMatch = 0;
    let skillsMatch = 0;
    let expMatch = 0;
    let uniMatch = 0;
    let overallMatch = 0;
    let wholeSkills = []
    let wholeLanguages = []

    teamMembers.map((memeber) => {

      wholeSkills.push(...memeber.skills)
      wholeLanguages.push(...memeber.languages)

      if (memeber.university === candidate.university) {
        uniMatch += 100 / teamMembers.length;
      }
      if (memeber.experienceYears <= candidate.experienceYears) {
        expMatch += 100 / teamMembers.length;
      }

      // memeber.skills.map((skill) => {
      //   candidate.skills.map((cSkill) => {
      //     if (skill === cSkill) {
      //       skillTemp += 100 / memeber.skills.length;
      //     }
      //   });
      // });
      // memeber.languages.map((language) => {
      //   candidate.languages.map((cLanguage) => {
      //     if (language === cLanguage) {
      //       langTemp += 100 / memeber.languages.length;
      //     }
      //   });
      // });

      // skillsMatch += skillTemp / teamMembers.length;
      // langMatch += langTemp / teamMembers.length;
    });
    wholeSkills = [...new Set(wholeSkills)];
    wholeLanguages = [...new Set(wholeLanguages)];

    wholeSkills.map((skill) => {
      candidate.skills.map((cSkill) => {
        if (skill === cSkill) {
          skillsMatch += 100 / wholeSkills.length;
        }
      });
    });
    wholeLanguages.map((language) => {
      candidate.languages.map((cLanguage) => {
        if (language === cLanguage) {
          langMatch += 100 / wholeLanguages.length;
        }
      });
    });
    // skillsMatch += skillTemp / teamMembers.length;
    // langMatch += langTemp / teamMembers.length;
    overallMatch += uniMatch / 4
    overallMatch += expMatch / 4
    overallMatch += skillsMatch / 4
    overallMatch += langMatch / 4
    console.log(Math.floor(uniMatch), Math.floor(expMatch),Math.floor(skillsMatch),Math.floor(langMatch),Math.floor(overallMatch))
    return[Math.floor(uniMatch), Math.floor(expMatch),Math.floor(skillsMatch),Math.floor(langMatch),Math.floor(overallMatch)];
  };

  return (
    <>
      <Stack direction="horizontal" className="p-3" gap={3}>
        <h3>
          Candidates For "{position.title}" Position, ID: {position.id}
        </h3>
        <Button
          variant="primary"
          style={{ position: "fixed", right: "30px" }}
          onClick={doComparison}
          disabled={comparisonList.length === 2 ? false : true}
        >
          Compare Candidates
        </Button>{" "}
      </Stack>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Field</th>
            <th>Skills</th>
            <th>HR Score</th>
            <th>Candidate Score</th>
            <th>Details</th>
            <th>Comparison</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => {
            let refLink = `/profile?cId=${candidate.id}`;
            return (
              <tr key={index}>
                <td>{candidate.id}</td>
                <td>{candidate.candidateName}</td>
                <td>{candidate.age}</td>
                <td>{candidate.sex}</td>
                <td>{candidate.field}</td>
                <td>
                  {candidate.skills.map((s, index) => {
                    return (
                      <Badge key={index} className="mx-1" pill bg="primary">
                        {s}
                      </Badge>
                    );
                  })}
                </td>
                <td>{candidate.hrScore}</td>
                <td>{candidate.candidateScore}</td>
                <td>
                  <Link to={refLink}>
                    <Button variant="primary">Details</Button>{" "}
                  </Link>
                </td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => {
                      addToComparison(candidate);
                    }}
                  >
                    Add to comparison
                  </Button>{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <h3>Team Comparison Results</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>University Match</th>
            <th>Experience Match</th>
            <th>Skills Match</th>
            <th>Languages Match</th>
            <th>Overall Comparison</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => {
            const [uniMatch,expMatch,skillsMatch,langMatch,overallMatch] = teamComparison(candidate);
            // let refLink = `/profile?cId=${candidate.id}`;
            return (
              <tr key={index}>
                <td>{candidate.id}</td>
                <td>{candidate.candidateName}</td>
                <td>{uniMatch}%</td>
                <td>{expMatch}%</td>
                <td>{skillsMatch}%</td>
                <td>{langMatch}%</td>
                <td>{overallMatch}%</td>
                
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default CandidatesList;
