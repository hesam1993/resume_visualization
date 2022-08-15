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

app.get("/users", async (req, res) => {
  try {
    const users = await dao.getUsers();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
});

app.get("/candidates", async (req, res) => {
  try {
    const candidates = await dao.getCandidates();
    res.status(200).json({ candidates });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
});

app.get("/candidates/:candidateId", async (req, res) => {
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

app.get("/positions", async (req, res) => {
  try {
    const positions = await dao.getPositions();
    res.status(200).json({ positions });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
});

app.get("/positions/:positionId", async (req, res) => {
  const positionId = req.params.positionId;
  try {
    const position = await dao.getPosition(positionId);
    res.status(200).json({ position });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
});

app.get("/applications", async (req, res) => {
    try {
      const applications = await dao.getApplications();
      res.status(200).json({ applications });
    } catch (err) {
      console.log(err);
      res.status(400).end();
    }
  });


  app.get("/applications/:applicationId", async (req, res) => {
    const applicationId = req.params.applicationId
    try {
      const application = await dao.getApplication(applicationId);
      res.status(200).json({ application });
    } catch (err) {
      console.log(err);
      res.status(400).end();
    }
  });


  app.get("/fields", async (req, res) => {
    try {
      const fields = await dao.getFields();
      res.status(200).json({ fields });
    } catch (err) {
      console.log(err);
      res.status(400).end();
    }
  });


  app.get("/fields/:fieldId", async (req, res) => {
    const fieldId = req.params.fieldId
    try {
      const field = await dao.getField(fieldId);
      res.status(200).json({ field });
    } catch (err) {
      console.log(err);
      res.status(400).end();
    }
  });


  app.get("/skills", async (req, res) => {
    try {
      const skills = await dao.getSkills();
      res.status(200).json({ skills });
    } catch (err) {
      console.log(err);
      res.status(400).end();
    }
  });


  app.get("/skills/:skillId", async (req, res) => {
    const skillId = req.params.skillId
    try {
      const skill = await dao.getField(skillId);
      res.status(200).json({ skill });
    } catch (err) {
      console.log(err);
      res.status(400).end();
    }
  });


app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
