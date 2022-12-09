import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import SkillsBubbleChart from "./SkillsBubble";
import Dounut from "./Donut";
import NewBarChart from "./NewBarChart";
import Diverge from "./Diverge";
import LanguagesBubbleChart from "./LanguagesBubble";
import API from "../API/API";
import { Link, useNavigate } from "react-router-dom";
import { Button, Stack, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
function CandidatesList() {
  let navigate = useNavigate();
  let tempSkillDonut = [];
  const [weight, setWeight] = useState({ uni: 1, exp: 1, skills: 1, lang: 1 });
  const [candidates, setCandidates] = useState([]);
  const [secondCandidates, setSecondCandidates] = useState([]);
  const [position, setPosition] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const [skillDonut, setSkillDonut] = useState([]);
  const [languagesList, setLanguagesList] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [comparisonList, setComparisonList] = useState([]);
  const [cmpBtn, setCmpBtn] = useState(true);
  const positionId = window.location.href.split("=")[1];
  useEffect(() => {
    API.getApplication(positionId)
      .then((candidatesInfo) => {
        candidatesInfo.sort((a, b) => a.candidateScore - b.candidateScore);
        setCandidates(candidatesInfo);

        console.log(`it is candidates data : ${candidates}`);
      })
      .catch((err) => console.log(err));
    API.getPosition(positionId)
      .then((positionInfo) => {
        setPosition(positionInfo[0]);
        console.log(positionInfo);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    API.getTeamMembers(position.teamId)
      .then((teamInfo) => {
        setTeamMembers(teamInfo);
        console.log(teamInfo);
      })
      .catch((err) => console.log(err));
  }, [position]);

  useEffect(()=>{
    const comparisonedCand = [];
    candidates.map((candidate, index) => {
      const [uniMatch, expMatch, skillsMatch, langMatch, overallMatch] =
        teamComparison(candidate);
      comparisonedCand.push({
        id: candidate.id,
        name: candidate.candidateName,
        uni: uniMatch,
        experience: expMatch,
        skills: skillsMatch,
        lang: langMatch,
        overall: overallMatch,
      });
    });
    
    comparisonedCand.sort((a, b) => b.overall - a.overall );
    setSecondCandidates(comparisonedCand)
    console.log(comparisonedCand);
  },[teamMembers,weight])


  useEffect(() => {
    const skills = [];
    const tempSkills = [];
    candidates.map((candidate) => {
      skills.push(...candidate.skills);
    });

    let counts = {};
    skills.forEach((x) => {
      counts[x] = (counts[x] || 0) + 1;
    });
    Object.keys(counts).forEach((count) => {
      tempSkills.push({ Name: count, Count: counts[count] });
    });

    setSkillsList(tempSkills);
    console.log(skillsList);
  }, [teamMembers]);

  useEffect(() => {
    const languages = [];
    const tempLanguages = [];
    candidates.map((candidate) => {
      languages.push(...candidate.languages);
    });

    const counts = {};
    languages.forEach((x) => {
      counts[x] = (counts[x] || 0) + 1;
    });
    Object.keys(counts).forEach((count) => {
      tempLanguages.push({ Name: count, Count: counts[count] });
    });

    setLanguagesList(tempLanguages);
    console.log(languagesList);
  }, [teamMembers]);

  // useEffect(()=>{
  //   const comparisonedCand = []
  //   candidates.map((candidate, index) => {
  //     const [uniMatch, expMatch, skillsMatch, langMatch, overallMatch] =
  //       teamComparison(candidate);
  //       comparisonedCand.push({"id":candidate.id, "name":candidate.candidateName, "uni":uniMatch, "experience":expMatch, "skills":skillsMatch,"lang":langMatch, "overal":overallMatch})})
  //   console.log(comparisonedCand)
  // },[candidates])

  const addToComparison = (candidate) => {
    if (comparisonList.length < 2) {
      const newComparisonList = [...comparisonList];
      newComparisonList.push(candidate);
      setComparisonList(newComparisonList);
    }
  };
  const doComparison = () => {
    const firstCandidate = comparisonList[0].candidateId;
    const secondCandidate = comparisonList[1].candidateId;
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
    let wholeSkills = [];
    let wholeLanguages = [];

    teamMembers.map((memeber) => {
      wholeSkills.push(...memeber.skills);
      wholeLanguages.push(...memeber.languages);

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
    overallMatch += (uniMatch / 4) * weight.uni;
    overallMatch += (expMatch / 4) * weight.exp;
    overallMatch += (skillsMatch / 4) * weight.skills;
    overallMatch += (langMatch / 4) * weight.lang;
    console.log(
      parseInt(weight.uni) +
        parseInt(weight.exp) +
        parseInt(weight.skills) +
        parseInt(weight.lang)
    );
    overallMatch =
      overallMatch /
      (parseInt(weight.uni) +
        parseInt(weight.exp) +
        parseInt(weight.skills) +
        parseInt(weight.lang));

    console.log(
      Math.ceil(uniMatch),
      Math.ceil(expMatch),
      Math.ceil(skillsMatch),
      Math.ceil(langMatch),
      Math.ceil(overallMatch)
    );

    tempSkillDonut.push({
      candidateName: candidate.candidateName,
      skillsMatch: parseInt(skillsMatch),
    });

    return [
      Math.ceil(uniMatch),
      Math.ceil(expMatch),
      Math.ceil(skillsMatch),
      Math.ceil(langMatch),
      Math.ceil(overallMatch),
    ];
  };

  const weightInputsUni = (event) => {
    setWeight((previousState) => {
      return { ...previousState, uni: event.target.value };
    });
    console.log(weight);
  };
  const weightInputsExp = (event) => {
    setWeight((previousState) => {
      return { ...previousState, exp: event.target.value };
    });
  };
  const weightInputsSkills = (event) => {
    setWeight((previousState) => {
      return { ...previousState, skills: event.target.value };
    });
  };
  const weightInputsLang = (event) => {
    setWeight((previousState) => {
      return { ...previousState, lang: event.target.value };
    });
  };

  return (
    <>
      <Stack direction="horizontal" className="p-3" gap={3}>
        <h3>
          Candidates For "{position.title}" Position, ID: {position.id}
        </h3>
        <Button
          variant="primary"
          style={{ position: "absolute", right: "30px" }}
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
                <td>{candidate.candidateId}</td>
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
            <th>
              University Match{" "}
              <input
                type="text"
                placeholder="Weight"
                name="uniWeight"
                onChange={weightInputsUni}
              ></input>
            </th>
            <th>
              Experience Match{" "}
              <input
                type="text"
                placeholder="Weight"
                name="expWeight"
                onChange={weightInputsExp}
              ></input>
            </th>
            <th>
              Skills Match{" "}
              <input
                type="text"
                placeholder="Weight"
                name="skillsWeight"
                onChange={weightInputsSkills}
              ></input>
            </th>
            <th>Skills Miss</th>
            <th>
              Languages Match{" "}
              <input
                type="text"
                placeholder="Weight"
                name="langWeight"
                onChange={weightInputsLang}
              ></input>
            </th>
            <th>Overall Comparison </th>
          </tr>
        </thead>
        <tbody>
          {secondCandidates.map((candidate, index) => {
            // const [uniMatch, expMatch, skillsMatch, langMatch, overallMatch] =
            //   teamComparison(candidate);
            // let refLink = `/profile?cId=${candidate.id}`;
            return (
              <tr key={index}>
                <td>{candidate.id}</td>
                <td>{candidate.name}</td>
                <td>{candidate.uni}%</td>
                <td>{candidate.experience}%</td>
                <td>{candidate.skills}%</td>
                <td>{100 - candidate.skills}%</td>
                <td>{candidate.lang}%</td>
                <td>{candidate.overall}%</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Row>
        <Col>
          <Dounut skillsDetail={tempSkillDonut}></Dounut>
        </Col>
      </Row>
      <Row>
        {skillsList.length > 0 && (
          <SkillsBubbleChart skillsList={skillsList}></SkillsBubbleChart>
        )}
      </Row>
      <Row>
        {languagesList.length > 0 && (
          <LanguagesBubbleChart
            languages={languagesList}
          ></LanguagesBubbleChart>
        )}
      </Row>
      <Row>
        {skillsList.length > 0 && (
          <NewBarChart skillsList={skillsList}></NewBarChart>
        )}
      </Row>
    </>
  );
}

export default CandidatesList;
