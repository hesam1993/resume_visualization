import { Row, Col, Stack, Badge } from "react-bootstrap";
import API from "../API/API";
import BarChart from "./BarChart";
import { useEffect, useState } from "react";

function Profile() {
  const data = [
    { year: 1980, efficiency: 24.3, sales: 8949000 },
    { year: 1985, efficiency: 27.6, sales: 10979000 },
    { year: 1990, efficiency: 28, sales: 9303000 },
    { year: 1991, efficiency: 28.4, sales: 8185000 },
    { year: 1992, efficiency: 27.9, sales: 8213000 },
    { year: 1993, efficiency: 28.4, sales: 8518000 },
    { year: 1994, efficiency: 28.3, sales: 8991000 },
    { year: 1995, efficiency: 28.6, sales: 8620000 },
    { year: 1996, efficiency: 28.5, sales: 8479000 },
    { year: 1997, efficiency: 28.7, sales: 8217000 },
    { year: 1998, efficiency: 28.8, sales: 8085000 },
    { year: 1999, efficiency: 28.3, sales: 8638000 },
    { year: 2000, efficiency: 28.5, sales: 8778000 },
    { year: 2001, efficiency: 28.8, sales: 8352000 },
    { year: 2002, efficiency: 29, sales: 8042000 },
    { year: 2003, efficiency: 29.5, sales: 7556000 },
    { year: 2004, efficiency: 29.5, sales: 7483000 },
    { year: 2005, efficiency: 30.3, sales: 7660000 },
    { year: 2006, efficiency: 30.1, sales: 7762000 },
    { year: 2007, efficiency: 31.2, sales: 7562000 },
    { year: 2008, efficiency: 31.5, sales: 6769000 },
    { year: 2009, efficiency: 32.9, sales: 5402000 },
    { year: 2010, efficiency: 33.9, sales: 5636000 },
    { year: 2011, efficiency: 33.1, sales: 6093000 },
    { year: 2012, efficiency: 35.3, sales: 7245000 },
    { year: 2013, efficiency: 36.4, sales: 7586000 },
    { year: 2014, efficiency: 36.5, sales: 7708000 },
    { year: 2015, efficiency: 37.2, sales: 7517000 },
    { year: 2016, efficiency: 37.7, sales: 6873000 },
    { year: 2017, efficiency: 39.4, sales: 6081000 },
  ];
  const candidateId = window.location.href.split("=")[1];
  const [candidate, setCandidate] = useState([]);
  const [githubInfo, setGithubInfo] = useState([]);
  const [mediumInfo, setMediumInfo] = useState([]);
  console.log(candidateId);
  useEffect(() => {
    API.getCandidate(candidateId)
      .then((candidateInfo) => {
        setCandidate(candidateInfo);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (candidate.length > 0) {
      console.log(candidate[0].githubId);
      API.getGithubInfo(candidate[0].githubId)
        .then((githubInfo) => {
          setGithubInfo(githubInfo);
          console.log(candidate[0]);
        })
        .catch((err) => console.log(err));

      API.getMediumInfo(candidate[0].mediumId)
        .then((mediumInfo) => {
          setMediumInfo(mediumInfo);
        })
        .catch((err) => console.log(err));
    }
  }, [candidate]);

  return (
    <>
      {mediumInfo.items && (
        <>
          <Row className="mx-1">
            <Col sm={2}>
              <div className="profile-picture"></div>
            </Col>
            <Col sm={5}>
              <h4>{candidate[0].fullName}</h4>
              <h5 className="mt-3">{candidate[0].role}</h5>
              <Row className="profile-head-info">
                <Col sm={6}>
                  <Stack direction="horizontal" gap={2}>
                    <span className="material-symbols-outlined profile-icon">
                      location_on
                    </span>
                    <p>{candidate[0].location}</p>
                  </Stack>

                  <Stack direction="horizontal" gap={2}>
                    <span className="material-symbols-outlined profile-icon">
                      call
                    </span>
                    <p>{candidate[0].tel}</p>
                  </Stack>
                </Col>
                <Col sm={6}>
                  <Stack direction="horizontal" gap={2}>
                    <span class="material-symbols-outlined profile-icon">
                      room_preferences
                    </span>
                    <p>{candidate[0].field}</p>
                  </Stack>
                  <Stack direction="horizontal" gap={2}>
                    <span class="material-symbols-outlined profile-icon">
                      mail
                    </span>
                    <p>{candidate[0].email}</p>
                  </Stack>
                </Col>
              </Row>
            </Col>
            <Col sm={5}>
            <BarChart data={data}/>
            </Col>
          </Row>
          <Row className="mt-4 profile-bottom">
            <Col sm={4}>
              <Row className="profile-bottom-title">
                <h4>On the web</h4>

                {candidate[0].mediumId && (
                  <Stack direction="horizontal" gap={2}>
                    <div
                      className="profile-social-icon"
                      style={{
                        backgroundImage: 'url("./icons/medium.png")',
                      }}
                    ></div>
                    <a
                      href={`https://medium.com/${candidate[0].mediumId}`}
                      target="blank"
                    >
                      Medium Page ({mediumInfo.items.length} Articles)
                    </a>
                  </Stack>
                )}

                {candidate[0].githubId && (
                  <Stack direction="horizontal" gap={2}>
                    <div
                      className="profile-social-icon"
                      style={{
                        backgroundImage: 'url("./icons/github.png")',
                      }}
                    ></div>
                    <a
                      href={`https://github.com/${candidate[0].githubId}`}
                      target="blank"
                    >
                      Github Profile ({githubInfo.publicRepos} Public
                      repositories)
                    </a>
                  </Stack>
                )}

                {candidate[0].linkedIn && (
                  <Stack direction="horizontal" gap={2}>
                    <div
                      className="profile-social-icon"
                      style={{
                        backgroundImage: 'url("./icons/linkedin.png")',
                      }}
                    ></div>
                    <a
                      href={`https://linkedin.com/in/${candidate[0].linkedIn}`}
                      target="blank"
                    >
                      LinkedIn Profile
                    </a>
                  </Stack>
                )}
              </Row>
              <Row className="profile-bottom-title mt-4">
                <h4>Countries of Expertise</h4>
                <Stack direction="horizontal" gap={2}>
                  <div
                    className="profile-map"
                    style={{
                      backgroundImage: 'url("./images/map.png")',
                    }}
                  ></div>
                </Stack>
              </Row>
            </Col>
            <Col sm={4}>
              <Row className="profile-bottom-title">
                <h4>About</h4>
                <Stack direction="horizontal" gap={2}>
                  <p>{candidate[0].aboutMe}</p>
                </Stack>
              </Row>
              <Row className="profile-bottom-title mt-4">
                <h4>Attachments</h4>
                <Stack direction="horizontal" gap={2}>
                  <span class="material-symbols-outlined profile-icon">
                    attach_file
                  </span>
                  <p>resume.pdf</p>
                </Stack>
                <Stack direction="horizontal" gap={2}>
                  <span class="material-symbols-outlined profile-icon">
                    attach_file
                  </span>
                  <p>portfolio.pdf</p>
                </Stack>
              </Row>
            </Col>
            <Col sm={4}>
              <Row className="profile-bottom-title mt-3">
                <h4>Skills</h4>
                <Stack direction="horizontal" gap={2}>
                  {candidate[0].skills.map((s, index) => {
                    return (
                      <h5>
                        <Badge key={index} className="mx-1 px-3" bg="secondary">
                          {s}
                        </Badge>
                      </h5>
                    );
                  })}
                </Stack>
              </Row>
              <Row className="profile-bottom-title mt-3">
                <h4>Languages</h4>
                <Stack direction="horizontal" gap={2}>
                  {candidate[0].languages.map((s, index) => {
                    return (
                      <h5>
                        <Badge key={index} className="mx-1 px-3" bg="secondary">
                          {s}
                        </Badge>
                      </h5>
                    );
                  })}
                </Stack>
              </Row>
            </Col>
          </Row>
        </>
      )}
    </>
    
  );
}

export default Profile;
