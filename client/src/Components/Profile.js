import { Row, Col, Stack, Badge } from "react-bootstrap";
import API from "../API/API";
import { useEffect, useState } from "react";

function Profile() {
  const candidateId = window.location.href.split("=")[1];
  const [candidate, setCandidate] = useState([]);
  const [githubInfo, setGithubInfo] = useState([]);
  console.log(candidateId);
  useEffect(() => {
    API.getCandidate(candidateId)
      .then((candidateInfo) => {
        setCandidate(candidateInfo);
        // console.log(candidateInfo);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (candidate.length > 0) {
      console.log(candidate[0].githubId);
      API.getGithubInfo(candidate[0].githubId)
        .then((githubInfo) => {
          setGithubInfo(githubInfo);
          console.log(githubInfo);
        })
        .catch((err) => console.log(err));
    }
  }, [candidate]);

  return (
    <>
      <Row className="mx-1">
        <Col sm={2}>
          <div className="profile-picture"></div>
        </Col>
        <Col sm={5}>
          <h4>HESAM MASHHADI MOHAMMAD</h4>
          <h5 className="mt-3">Frontend Developer</h5>
          <Row className="profile-head-info">
            <Col sm={6}>
              <Stack direction="horizontal" gap={2}>
                <span className="material-symbols-outlined profile-icon">
                  location_on
                </span>
                <p>Torino, Italy</p>
              </Stack>

              <Stack direction="horizontal" gap={2}>
                <span className="material-symbols-outlined profile-icon">
                  call
                </span>
                <p>+12398765</p>
              </Stack>
            </Col>
            <Col sm={6}>
              <Stack direction="horizontal" gap={2}>
                <span class="material-symbols-outlined profile-icon">
                  room_preferences
                </span>
                <p>computer</p>
              </Stack>
              <Stack direction="horizontal" gap={2}>
                <span class="material-symbols-outlined profile-icon">mail</span>
                <p>test@test.com</p>
              </Stack>
            </Col>
          </Row>
        </Col>
        <Col sm={5}>5</Col>
      </Row>
      <Row className="mt-4 profile-bottom">
        <Col sm={4}>
          <Row className="profile-bottom-title">
            <h4>On the web</h4>
            <Stack direction="horizontal" gap={2}>
              <div
                className="profile-social-icon"
                style={{
                  backgroundImage: 'url("./icons/instagram.png")',
                }}
              ></div>
              <a href="#">Hesam93</a>
            </Stack>
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
                {candidate[0].githubId} (number of repositories:{" "}
                {githubInfo.publicRepos})
              </a>
            </Stack>
            <Stack direction="horizontal" gap={2}>
              <div
                className="profile-social-icon"
                style={{
                  backgroundImage: 'url("./icons/facebook.png")',
                }}
              ></div>
              <a href="#">Hesam93</a>
            </Stack>
            <Stack direction="horizontal" gap={2}>
              <div
                className="profile-social-icon"
                style={{
                  backgroundImage: 'url("./icons/linkedin.png")',
                }}
              ></div>
              <a href="#">Hesam93</a>
            </Stack>
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
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non
                quam luctus, imperdiet nisi commodo, placerat magna. Proin
                dictum bibendum purus, vitae pretium eros. Curabitur dapibus
                enim id dui lacinia mollis. Nullam vel semper nisl, nec commodo
                augue. Donec semper ante ac justo condimentum, eu vulputate erat
                convallis. Praesent eget.
              </p>
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
              {["CSS", "Reactjs", "Bootstrap"].map((s, index) => {
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
              {["English", "Italian", "Persian"].map((s, index) => {
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
  );
}

export default Profile;
