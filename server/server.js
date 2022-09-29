"use strict";

const express = require("express"); //import express
const morgan = require("morgan"); // logging middleware
const cookieParser = require("cookie-parser");
const dao = require("./dao/dao");
const path = require("path");
require("dotenv").config();

const port = 3001;
const app = express();

app.use(morgan("tiny")); // Set-up logging
app.use(express.json({ limit: "50mb" })); // Process body content
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "public")));

app.get("/api/users", async (req, res) => {
  try {
    const users = await dao.getUsers();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
});

app.get("/api/candidates", async (req, res) => {
  try {
    const candidates = await dao.getCandidates();
    res.status(200).json({ candidates });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
});

app.get("/api/candidates/:candidateId", async (req, res) => {
  console.log("called in server.js");
  const candidateId = req.params.candidateId;
  try {
    const candidate = await dao.getCandidate(candidateId);
    res.status(200).json({ candidate });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
});

app.get("/api/positions", async (req, res) => {
  try {
    const positions = await dao.getPositions();
    res.status(200).json({ positions });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
});

app.get("/api/positions/:positionId", async (req, res) => {
  const positionId = req.params.positionId;
  try {
    const position = await dao.getPosition(positionId);
    res.status(200).json({ position });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
});

app.get("/api/applications", async (req, res) => {
    try {
      const applications = await dao.getApplications();
      res.status(200).json({ applications });
    } catch (err) {
      console.log(err);
      res.status(400).end();
    }
  });


  app.get("/api/applications/:positionId", async (req, res) => {
    const positionId = req.params.positionId
    try {
      const application = await dao.getApplication(positionId);
      res.status(200).json({ application });
    } catch (err) {
      console.log(err);
      res.status(400).end();
    }
  });


  app.get("/api/fields", async (req, res) => {
    try {
      const fields = await dao.getFields();
      res.status(200).json({ fields });
    } catch (err) {
      console.log(err);
      res.status(400).end();
    }
  });


  app.get("/api/fields/:fieldId", async (req, res) => {
    const fieldId = req.params.fieldId
    try {
      const field = await dao.getField(fieldId);
      res.status(200).json({ field });
    } catch (err) {
      console.log(err);
      res.status(400).end();
    }
  });


  app.get("/api/skills", async (req, res) => {
    try {
      const skills = await dao.getSkills();
      res.status(200).json({ skills });
    } catch (err) {
      console.log(err);
      res.status(400).end();
    }
  });


  app.get("/api/skills/:skillId", async (req, res) => {
    const skillId = req.params.skillId
    try {
      const skill = await dao.getField(skillId);
      res.status(200).json({ skill });
    } catch (err) {
      console.log(err);
      res.status(400).end();
    }
  });

  app.get("/api/educations", async (req, res) => {
    try {
      const educations = await dao.getEducations();
      res.status(200).json({ educations });
    } catch (err) {
      console.log(err);
      res.status(400).end();
    }
  });
  
  app.get("/api/works", async (req, res) => {
    try {
      const works = await dao.getWorks();
      res.status(200).json({ works });
    } catch (err) {
      console.log(err);
      res.status(400).end();
    }
  });

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
