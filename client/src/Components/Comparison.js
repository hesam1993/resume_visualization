import { useEffect, useState } from "react";
import { Table, Badge } from "react-bootstrap";
import API from "../API/API";
import { Routes, Route, useParams, useSearchParams } from "react-router-dom";
function Comparison() {
  let [searchParams, setSearchParams] = useSearchParams();
  const uiniversities = [
    "MIT",
    "University of Cambridge",
    "Stanford University",
    "University of Oxford",
    "Harvard University",
    "California Institute of Technology (Caltech)",
    "Imperial College London",
    "UCL (University College London)",
    "ETH Zurich (Swiss Federal Institute of Technology)",
    "University of Chicago",
    "National University of Singapore (NUS)",
    "Peking University",
    "University of Pennsylvania",
    "Tsinghua University",
    "University of Edinburgh",
    "Ecole Polytechnique Fédérale de Lausanne (EPFL)",
    "Princeton University",
    "Yale University",
    "Nanyang Technological University, Singapore (NTU)",
    "Cornell University",
    "University of Hong Kong (UKU)",
    "Columbia University",
    "University of Tokyo",
    "Johns Hopkins University",
    "University of Michigan-Ann Arbor",
    "Universite PSL",
    "University of California, Berkeley (UCB)",
    "University of Manchester",
    "Seoul National University",
    "Australian National University",
    "McGill University",
    "Northwestern University",
    "University of Melbourne",
    "Fudan University",
    "University of Toronto",
    "Kyoto University",
    "King's College London",
    "Chinese University of Hong Kong (CUHK)",
    "New York University (NYU)",
    "Hong Kong University of Science and Technology (HKUST)",
    "University of Sydney",
    "KAIST - Korea Advanced Institute of Science & Technology",
    "Zhejiang University",
    "University of California, Los Angeles (UCLA)",
    "University of New South Wales (UNSW Sydney)",
    "Shanghai Jiao Tong University",
    "University of British Columbia",
    "Institut Polytechnique de Paris",
    "Technical University of Munich",
    "Duke University",
    "University of Queensland",
  ];

  const positionId = searchParams.get("pid");
  const firstId = searchParams.get("fid");
  const secondId = searchParams.get("sid");
  const [newCandidates, setNewCandidates] = useState([
    { info: {}, education: {}, works: {} },
    { info: {}, education: {}, works: {} },
  ]);
  console.log(positionId);
  useEffect(() => {
    API.getApplication(positionId)
      .then((candidatesInfo) => {
        const cmpCandidates = [...newCandidates];
        candidatesInfo.map((candidate) => {
          console.log(candidate)
          if (candidate.candidateId == firstId) {
            cmpCandidates[0].info = candidate;
          } else if (candidate.candidateId == secondId) {
            cmpCandidates[1].info = candidate;
          }
        });
        setNewCandidates(cmpCandidates);
      })
      .catch((err) => console.log(err));

    API.getEducations()
      .then((educationInfo) => {
        const cmpCandidates = [...newCandidates];
        educationInfo.map((education) => {
          if (education.candidateId == firstId) {
            cmpCandidates[0].education = education;
          } else if (education.candidateId == secondId) {
            cmpCandidates[1].education = education;
          }
        });
        setNewCandidates(cmpCandidates);
        console.log(newCandidates);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>Comparing Candidates</h1>
      {Object.keys(newCandidates[0].info).length !== 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th colSpan={1}>Info</th>
              <th colSpan={1}>First Candidate</th>
              <th colSpan={1}>Second Candidate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{newCandidates[0].info.candidateName}</td>

              <td>{newCandidates[1].info.candidateName}</td>
            </tr>{" "}
            <tr>
              <td>age</td>
              <td>{newCandidates[0].info.age}</td>

              <td>{newCandidates[1].info.age}</td>
            </tr>{" "}
            <tr>
              <td>sex</td>
              <td>{newCandidates[0].info.sex}</td>

              <td>{newCandidates[1].info.sex}</td>
            </tr>{" "}
            <tr>
              <td>Candidate Score</td>
              <td>{newCandidates[0].info.overallScore}</td>

              <td>{newCandidates[1].info.overallScore}</td>
            </tr>{" "}

            <tr>
              <td>Field</td>
              <td>{newCandidates[0].info.field}</td>

              <td>{newCandidates[1].info.field}</td>
            </tr>{" "}
            <tr>
              <td>Skills</td>
              <td>
                {newCandidates[0].info.skills.map((skill, index) => {
                  return (
                    <Badge key={index} className="mx-1" pill bg="primary">
                      {skill}
                    </Badge>
                  );
                })}
              </td>

              <td>
                {newCandidates[1].info.skills.map((skill, index) => {
                  return (
                    <Badge key={index} className="mx-1" pill bg="primary">
                      {skill}
                    </Badge>
                  );
                })}
              </td>
            </tr>{" "}
            <tr>
              <td>Experience</td>
              <td>{newCandidates[0].info.experienceYears} years</td>

              <td>{newCandidates[1].info.experienceYears} years</td>
            </tr>
            <tr>
              <td>Education</td>

              <td>{newCandidates[0].education.universityName}</td>
              <td>
                {uiniversities.includes(
                  newCandidates[1].education.universityName
                ) ? (
                  <h4>{newCandidates[1].education.universityName}</h4>
                ) : (
                  newCandidates[1].education.universityName
                )}
              </td>
            </tr>
            
            <tr>
              <td>Languages</td>
              <td>
                {newCandidates[0].info.languages.map((language, index) => {
                  return (
                    <Badge key={index} className="mx-1" pill bg="primary">
                      {language}
                    </Badge>
                  );
                })}
              </td>

              <td>
                {newCandidates[1].info.languages.map((language, index) => {
                  return (
                    <Badge key={index} className="mx-1" pill bg="primary">
                      {language}
                    </Badge>
                  );
                })}
              </td>
            </tr>
            <tr>
              <td>Location</td>
              <td>{newCandidates[0].info.location}</td>

              <td>{newCandidates[1].info.location}</td>
            </tr>
            <tr>
              <td>Role</td>
              <td>{newCandidates[0].info.positionTitle}</td>

              <td>{newCandidates[1].info.positionTitle}</td>
            </tr>
          </tbody>
        </Table>
      )}
    </>
  );
}

export default Comparison;
