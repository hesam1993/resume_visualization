import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
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
  const TtopUnis = [
    "Massachusetts Institute of Technology (MIT)",
    "University of Oxford",
    "Stanford University",
    "University of Cambridge",
    "Harvard University",
    "California Institute of Technology (Caltech)",
    "Imperial College London",
    "ETH Zurich - Swiss Federal Institute of Technology",
    "UCL",
    "University of Chicago",
    "National University of Singapore (NUS)",
    "Nanyang Technological University, Singapore (NTU)",
    "University of Pennsylvania",
    "EPFL",
    "Yale University",
    "The University of Edinburgh",
    "Tsinghua University",
    "Peking University",
    "Columbia University",
    "Princeton University",
    "Cornell University",
    "The University of Hong Kong",
    "The University of Tokyo",
    "University of Michigan-Ann Arbor",
    "Johns Hopkins University",
    "University of Toronto",
    "McGill University",
    "The Australian National University",
    "The University of Manchester",
    "Northwestern University",
    "Fudan University",
    "University of California, Berkeley (UCB)",
    "Kyoto University",
    "The Hong Kong University of Science and Technology",
    "King's College London",
    "Seoul National University",
    "The University of Melbourne",
    "The University of Sydney",
    "The Chinese University of Hong Kong (CUHK)",
    "University of California, Los Angeles (UCLA)",
    "KAIST - Korea Advanced Institute of Science & Technology",
    "New York University (NYU)",
    "The University of New South Wales (UNSW Sydney)",
    "Université PSL",
    "Zhejiang University",
    "University of British Columbia",
    "The University of Queensland",
    '"University of California, San Diego (UCSD)"',
    "Institut Polytechnique de Paris",
    "The London School of Economics and Political Science (LSE)",
    "Shanghai Jiao Tong University",
    "Technical University of Munich",
    "Duke University",
    "Carnegie Mellon University",
    "City University of Hong Kong",
    "University of Amsterdam",
    "Tokyo Institute of Technology (Tokyo Tech)",
    "Delft University of Technology",
    "Monash University",
    "Brown University",
    "The University of Warwick",
    "University of Bristol",
    "Ruprecht-Karls-Universität Heidelberg",
    "Ludwig-Maximilians-Universität München",
    "Universiti Malaya (UM)",
    "The Hong Kong Polytechnic University",
    "University of Texas at Austin",
    "National Taiwan University (NTU)",
    "Universidad de Buenos Aires (UBA)",
    "KU Leuven",
    "University of Zurich",
    "Sorbonne University",
    "University of Glasgow",
    "Korea University",
    "Osaka University",
    "University of Wisconsin-Madison",
    "University of Southampton",
    "Lomonosov Moscow State University",
    "University of Copenhagen",
    "Yonsei University",
    "Pohang University of Science And Technology (POSTECH)",
    "Durham University",
    "Tohoku University",
    "University of Illinois at Urbana-Champaign",
    "The University of Auckland",
    "University of Washington",
    "Université Paris-Saclay",
    "Lund University",
    "Georgia Institute of Technology",
    "KTH Royal Institute of Technology ",
    "University of Birmingham",
    "University of St Andrews",
    "University of Leeds",
    "The University of Western Australia",
    "Rice University",
    "The University of Sheffield",
    "Pennsylvania State University",
    "Sungkyunkwan University(SKKU)",
    "University of Science and Technology of China",
    "Technical University of Denmark",
  ];

  const topUnis = [
    "Massachusetts Institute of Technology (MIT)",
    "University of Oxford",
    "Stanford University",
    "University of Cambridge",
    "Harvard University",
    "California Institute of Technology (Caltech)",
    "Imperial College London",
    "ETH Zurich - Swiss Federal Institute of Technology",
    "UCL",
    "University of Chicago",
    "National University of Singapore (NUS)",
    "Nanyang Technological University, Singapore (NTU)",
    "University of Pennsylvania",
    "EPFL",
    "Yale University",
    "The University of Edinburgh",
    "Tsinghua University",
    "Peking University",
    "Columbia University",
    "Princeton University",
    "Cornell University",
    "The University of Hong Kong",
    "The University of Tokyo",
    "University of Michigan-Ann Arbor",
    "Johns Hopkins University",
    "University of Toronto",
    "McGill University",
    "The Australian National University",
    "The University of Manchester",
    "Northwestern University",
    "Fudan University",
    "University of California, Berkeley (UCB)",
    "Kyoto University",
    "The Hong Kong University of Science and Technology",
    "King's College London",
    "Seoul National University",
    "The University of Melbourne",
    "The University of Sydney",
    "The Chinese University of Hong Kong (CUHK)",
    "University of California, Los Angeles (UCLA)",
    "KAIST - Korea Advanced Institute of Science & Technology",
    "New York University (NYU)",
    "The University of New South Wales (UNSW Sydney)",
    "Université PSL",
    "Zhejiang University",
    "University of British Columbia",
    "The University of Queensland",
    "University of California, San Diego (UCSD)",
    "Institut Polytechnique de Paris",
    "The London School of Economics and Political Science (LSE)",
    "Shanghai Jiao Tong University",
    "Technical University of Munich",
    "Duke University",
    "Carnegie Mellon University",
    "City University of Hong Kong",
    "University of Amsterdam",
    "Tokyo Institute of Technology (Tokyo Tech)",
    "Delft University of Technology",
    "Monash University",
    "Brown University",
    "The University of Warwick",
    "University of Bristol",
    "Ruprecht-Karls-Universität Heidelberg",
    "Ludwig-Maximilians-Universität München",
    "Universiti Malaya (UM)",
    "The Hong Kong Polytechnic University",
    "University of Texas at Austin",
    "National Taiwan University (NTU)",
    "Universidad de Buenos Aires (UBA)",
    "KU Leuven",
    "University of Zurich",
    "Sorbonne University",
    "University of Glasgow",
    "Korea University",
    "Osaka University",
    "University of Wisconsin-Madison",
    "University of Southampton",
    "Lomonosov Moscow State University",
    "University of Copenhagen",
    "Yonsei University",
    "Pohang University of Science And Technology (POSTECH)",
    "Durham University",
    "Tohoku University",
    "University of Illinois at Urbana-Champaign",
    "The University of Auckland",
    "University of Washington",
    "Université Paris-Saclay",
    "Lund University",
    "Georgia Institute of Technology",
    "KTH Royal Institute of Technology",
    "University of Birmingham",
    "University of St Andrews",
    "University of Leeds",
    "The University of Western Australia",
    "Rice University",
    "The University of Sheffield",
    "Pennsylvania State University",
    "Sungkyunkwan University(SKKU)",
    "University of Science and Technology of China",
    "Technical University of Denmark",
    ,
    "University of North Carolina, Chapel Hill",
    "Trinity College Dublin, The University of Dublin",
    "University of Oslo",
    "University of Nottingham",
    "University of Helsinki",
    "Universidad Nacional Autónoma de México  (UNAM)",
    "University of Geneva",
    "Washington University in St. Louis",
    "The University of Adelaide",
    "University of California, Davis",
    "King Abdulaziz University (KAU)",
    "Utrecht University",
    "Université de Montréal",
    "Aalto University",
    "Boston University",
    "Leiden University",
    "University of Southern California",
    "Purdue University",
    "Queen Mary University of London",
    "Nagoya University",
    "University of Bern",
    "The Ohio State University",
    "Chalmers University of Technology",
    "Universidade de São Paulo",
    "Wageningen University & Research",
    "Uppsala University",
    "Eindhoven University of Technology",
    "University of Alberta",
    "Freie Universitaet Berlin",
    "Humboldt-Universität zu Berlin",
    "University of Groningen",
    "École Normale Supérieure de Lyon",
    "Nanjing University",
    "Lancaster University",
    "University of Technology Sydney",
    "Newcastle University",
    "Pontificia Universidad Católica de Chile (UC)",
    "KIT, Karlsruhe Institute of Technology",
    "Kyushu University",
    "University of Basel",
    "McMaster University",
    "Ghent University",
    "Politecnico di Milano",
    "Universiti Putra Malaysia (UPM)",
    "Universiti Kebangsaan Malaysia (UKM)",
    "Hokkaido University",
    "University of California, Santa Barbara (UCSB)",
    "Universiti Sains Malaysia (USM)",
    "Stockholm University",
    "The University of Exeter",
    "University of Waterloo",
    "Cardiff University",
    "University of Vienna",
    "University of York",
    "University of Rochester",
    "Aarhus University",
    "Hanyang University",
    "Michigan State University",
    "University of Maryland, College Park",
    "Technische Universität Berlin (TU Berlin)",
    "Emory University",
    "Case Western Reserve University",
    "Tecnológico de Monterrey",
    "King Fahd University of Petroleum & Minerals",
    "University of Pittsburgh",
    "RWTH Aachen University",
    "Alma Mater Studiorum - University of Bologna",
    "University of Bath",
    "Texas A&M University",
    "Universitat de Barcelona",
    "Western University",
    "Sapienza University of Rome",
    "Albert-Ludwigs-Universitaet Freiburg",
    "University College Dublin",
    "University of Florida",
    "Al-Farabi Kazakh National University",
    "University of Lausanne",
    "Eberhard Karls Universität Tübingen",
    "Indian Institute of Technology Bombay (IITB)",
    "Erasmus University Rotterdam",
    "National Tsing Hua University",
    "Technische Universität Wien",
    "University of Gothenburg",
    "Khalifa University of Science and Technology",
    "Universidad de Chile",
    "Indian Institute of Technology Delhi (IITD)",
    "Indian Institute of Science",
    "University of Minnesota Twin Cities",
    "Université catholique de Louvain (UCLouvain)",
    "University of Liverpool",
    "University of Twente",
    "Dartmouth College",
    "Universiti Teknologi Malaysia",
    "University of Wollongong",
    "Curtin University",
    "Technische Universität Dresden",
    "University of Otago",
    "The University of Newcastle, Australia (UON)",
    "The Hebrew University of Jerusalem",
    "University of Bergen",
    ,
    "Macquarie University",
    "Keio University",
    "University of Reading",
    "Waseda University",
    "University of Göttingen",
    "University of Aberdeen",
    "RMIT University",
    "Universidad Autónoma de Madrid",
    "Universite libre de Bruxelles",
    "Universitat Autònoma de Barcelona",
    "Vrije Universiteit Amsterdam",
    "Tongji University",
    "Ulsan National Institute of Science and Technology (UNIST)",
    "Queensland University of Technology (QUT)",
    "Universität Hamburg",
    "Chulalongkorn University",
    "Arizona State University",
    "Queen's University Belfast",
    "Vanderbilt University",
    "Universidade Estadual de Campinas (Unicamp)",
    "Radboud University",
    "Vrije Universiteit Brussel (VUB)",
    "University of Notre Dame",
    "Complutense University of Madrid",
    "Qatar University",
    "Wuhan University",
    "Rheinische Friedrich-Wilhelms-Universität Bonn",
    "University of Cape Town",
    "University of Sussex",
    "University of Virginia",
    "University of Ottawa",
    "Loughborough University",
    "University of California, Irvine",
    "Maastricht University",
    "University of Antwerp",
    "University of Calgary",
    "Harbin Institute of Technology",
    "Universidad de los Andes",
    "University of Leicester",
    "Victoria University of Wellington",
    "Queen's University at Kingston",
    "USI - Università della Svizzera italiana",
    "American University of Beirut (AUB)",
    "Saint Petersburg State University",
    "Università di Padova",
    "Ecole des Ponts ParisTech",
    "Novosibirsk State University",
    "University of Massachusetts Amherst",
    "Georgetown University",
    "Universitat Pompeu Fabra (Barcelona)",
    "Universiti Brunei Darussalam (UBD)",
    "University of Colorado Boulder",
    "National Cheng Kung University (NCKU)",
    "Yeshiva University",
    "Gadjah Mada University",
    "Indian Institute of Technology Madras (IITM)",
    "Mahidol University",
    "Tel Aviv University",
    "National University of Ireland Galway",
    "Universidad Nacional de Colombia",
    "University of Canterbury | Te Whare Wānanga o Waitaha",
    "Sun Yat-sen University",
    "Sciences Po",
    "Université de Paris",
    "Kyung Hee University",
    "Rutgers University–New Brunswick",
    "Charles University",
    "University of Navarra",
    "National Yang Ming Chiao Tung University",
    "The University of Arizona",
    "Technical University of Darmstadt",
    "Beijing Normal University",
    "Heriot-Watt University",
    "Dalhousie University",
    "Tomsk State University",
    "University of Surrey",
    "Southern University of Science and Technology",
    "Tufts University",
    "Graz University of Technology",
    "Indian Institute of Technology Kanpur (IITK)",
    "King Saud University",
    "Indian Institute of Technology Kharagpur (IIT-KGP)",
    "Bauman Moscow State Technical University",
    "Universität Innsbruck",
    "Deakin University",
    "Massey University",
    "University of Illinois at Chicago (UIC)",
    "University of Tsukuba",
    "Hong Kong Baptist University",
    "United Arab Emirates University",
    "Griffith University",
    "Moscow Institute of Physics and Technology (MIPT / Moscow Phystech)",
    "Universitas Indonesia",
    "Université Paris 1 Panthéon-Sorbonne",
    "Xi’an Jiaotong University",
    "Belarusian State University",
    "University of Porto",
    "University of Turku",
    "Simon Fraser University",
    "University College Cork",
    "North Carolina State University",
    "University of Tartu",
    "University of Strathclyde",
    "Bandung Institute of Technology (ITB)",
    "University of Tasmania",
    "Gwangju Institute of Science and Technology (GIST)",
    "HSE University",
    "University of East Anglia (UEA)",
    "University of Warsaw",
    "Jagiellonian University",
    "University of Southern Denmark (SDU)",
    "Indiana University Bloomington",
    "University of Cologne",
    "University of Miami",
    "National Taiwan University of Science and Technology (Taiwan Tech)",
    "Université Grenoble Alpes",
    "University of Milan",
    "IE University",
    "RUDN University",
    "National Research Nuclear University MEPhI (Moscow Engineering Physics Institute)",
    "Universitat Politècnica de Catalunya · BarcelonaTech (UPC)",
    "Swinburne University of Technology",
    "University of Dundee",
    "Friedrich-Alexander-Universität Erlangen-Nürnberg",
    "Pontificia Universidad Católica Argentina",
    "University of Macau",
    "Aalborg University",
    "University of South Australia",
    "L.N. Gumilyov Eurasian National University (ENU)",
    "Linköping University",
    "City, University of London",
    "Technion - Israel Institute of Technology",
    "Birkbeck, University of London",
    "Taylor's University",
    "Huazhong University of Science and Technology",
    "National Taiwan Normal University",
    "Politecnico di Torino",
    "Royal Holloway University of London",
    "Tianjin University",
    "University of Victoria (UVic)",
    "Goethe-University Frankfurt am Main",
    "University of Hawaiʻi at Mānoa",
    "Northeastern University",
    "Hiroshima University",
    "Universität Jena",
    "Universiti Teknologi Brunei",
    "Virginia Polytechnic Institute and State University",
    "Kazan (Volga region) Federal University",
    "UCSI University",
    "Universität Stuttgart",
    "University of California, Santa Cruz",
    "Brunel University London",
    "Universidad Carlos III de Madrid (UC3M)",
    "Ural Federal University - UrFU",
    "Johannes Kepler University Linz",
    "George Washington University",
    "Tilburg University",
    "University of Lisbon",
    "Nankai University",
    "National University of Sciences And Technology (NUST) Islamabad",
    "University of Jyväskylä",
    "University of Utah",
    "Ewha Womans University",
    "La Trobe University",
    "MGIMO University",
    "ITMO University",
    "Umea University",
    "University Ulm",
    "Sultan Qaboos University",
    "Norwegian University of Science And Technology",
    "Universidade Federal do Rio de Janeiro",
    "Universitat Politècnica de València",
    "Lincoln University",
    "Beijing Institute of Technology",
    "University of Chemistry and Technology, Prague",
    "University of Connecticut",
    "University of Waikato",
    "University of Oulu",
    "Julius-Maximilians-Universität Würzburg",
    "Quaid-i-Azam University",
    "Stony Brook University, State University of New York",
    "Sharif University of Technology",
    "Tokyo Medical and Dental University (TMDU)",
    "American University of Sharjah",
    "Beihang University (former BUAA)",
    "University of Kent",
    "Kobe University",
    "University of Kansas",
    "University at Buffalo SUNY",
    "University of Pisa",
    "Università Vita-Salute San Raffaele",
    "SOAS University of London",
    "Universidad de Palermo (UP)",
    "Peter the Great St. Petersburg Polytechnic University",
    "Ruhr-Universität Bochum",
    "Indian Institute of Technology Guwahati (IITG)",
    "National Research Tomsk Polytechnic University",
    "Pontificia Universidad Católica del Perú",
    "Pakistan Institute of Engineering and Applied Sciences (PIEAS)",
    "University of the Philippines",
  ];

  let tempSkillDonut = [];
  const [weight, setweight] = useState({ uni: 1, exp: 1, skills: 1, lang: 1 });
  const [teamWeight, setTeamWeight] = useState({
    uni: 1,
    exp: 1,
    skills: 1,
    lang: 1,
  });
  const [compareList, setCompareList] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [compareModal, setCompareModal] = useState(false);
  const [secondCandidates, setSecondCandidates] = useState([]);
  const [position, setPosition] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const [skillDonut, setSkillDonut] = useState([]);
  const [languagesList, setLanguagesList] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [comparisonList, setComparisonList] = useState([]);
  const [cmpBtn, setCmpBtn] = useState(true);
  const positionId = window.location.href.split("=")[1];

  // getting application data and then positions data
  useEffect(() => {
    API.getApplication(positionId)
      .then((candidatesInfo) => {
        console.log(candidatesInfo);
        setCandidates(candidatesInfo);
        // console.log(`it is candidates data : ${candidates}`);
      })
      .catch((err) => console.log(err));
    API.getPosition(positionId)
      .then((positionInfo) => {
        setPosition(positionInfo[0]);
        // console.log(positionInfo);
      })
      .catch((err) => console.log(err));
  }, []);

  // getting team members info after having the position info
  useEffect(() => {
    API.getTeamMembers(position.teamId)
      .then((teamInfo) => {
        setTeamMembers(teamInfo);
      })
      .catch((err) => console.log(err));
  }, [position]);

  //calculating team comparison score after having team members and weight info
  useEffect(() => {
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
    console.log(`it is FIRST`);
    console.log(comparisonedCand);

    comparisonedCand.sort((a, b) => b.overall - a.overall);
    setSecondCandidates(comparisonedCand);
    // console.log(comparisonedCand);
  }, [teamMembers, teamWeight]);

  //list skills of the all candidates after having all the team memebrs info
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
    tempSkills.sort((a, b) => b.Count - a.Count);
    setSkillsList(tempSkills);
    // console.log(skillsList);
  }, [teamMembers]);

  //list languages of all candidates after having all the team members info
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
    // console.log(languagesList);
  }, [teamMembers]);

  //score for each candidate is calculated and stored in the candidates state, after having position and weight changes
  useEffect(() => {
    const scores = [];
    candidates.map((candidate, index) => {
      scores.push(candidateScoring(candidate, index));
    });
    let tempCandidates = [...candidates];
    scores.map((sc) => {
      const candidate = tempCandidates[sc.cindex];
      candidate.skillsMatch = sc.skillsMatch;
      candidate.experienceMatch = sc.experienceMatch;
      candidate.universityMatch = sc.universityMatch;
      candidate.languageMatch = sc.languageMatch;
      candidate.overallScore = sc.overallScore;
    });

    tempCandidates.sort((a, b) => b.overallScore - a.overallScore);
    setCandidates(tempCandidates);
    console.log(tempCandidates);
  }, [position, weight]);

  const sortCandidates = (sortFactor) => {
    const comparisonedCand = [...candidates];
    switch (sortFactor) {
      case "experienceMatch":
        comparisonedCand.sort((a, b) => b.experienceMatch - a.experienceMatch);
        break;
      case "skillsMatch":
        comparisonedCand.sort((a, b) => b.skillsMatch - a.skillsMatch);
        break;
      case "universityMatch":
        comparisonedCand.sort((a, b) => b.universityMatch - a.universityMatch);
        break;
      case "languageMatch":
        comparisonedCand.sort((a, b) => b.languageMatch - a.languageMatch);
        break;
      case "overallScore":
        comparisonedCand.sort((a, b) => b.overallScore - a.overallScore);
        break;
      default:
        comparisonedCand.sort((a, b) => b.overallScore - a.overallScore);
        break;
    }
    console.log(comparisonedCand);
    setCandidates(comparisonedCand);
  };

  // adding two candidates to comparison
  const addToComparison = (candidate) => {
    if (comparisonList.length < 2) {
      const newComparisonList = [...comparisonList];
      newComparisonList.push(candidate);
      setComparisonList(newComparisonList);
    }
  };
  const resetComparison = () => {
    let newComparisonList = [...comparisonList];
    newComparisonList = [];
    setComparisonList(newComparisonList);
  };

  // starting the comparison
  const doComparison = () => {
    const firstCandidate = comparisonList[0].candidateId;
    const secondCandidate = comparisonList[1].candidateId;
    const listOfCandidates = [firstCandidate, secondCandidate];
    console.log(comparisonList);
    setCompareModal(true);
    // navigate(
    //   `/comparison?fid=${firstCandidate}&sid=${secondCandidate}&pid=${positionId}`
    // );
  };

  // compute each candidate score based on some factors
  const candidateScoring = (candidate, index) => {
    console.log(candidate.candidateId);
    let langMatch = 0;
    let skillsMatch = 0;
    let expMatch = 0;
    let uniMatch = 10;
    let overallMatch = 0;
    let wholeSkills = [];
    let wholeLanguages = [];

    position.skills.map((posSkill) => {
      candidate.skills.map((cSkill) => {
        if (posSkill === cSkill) {
          skillsMatch += 100 / position.skills.length;
        }
      });
    });
    console.log(uniMatch);
    // giving score based on the rank of the university
    topUnis.map((topUni, index) => {
      if (topUni === candidate.university) {
        console.log(`it is top UNI ${uniMatch}`);
        console.log(index);
        switch (true) {
          case index <= 50:
            uniMatch += 90;
            break;
          case index <= 100:
            uniMatch += 80;
            break;
          case index <= 150:
            uniMatch += 70;
            break;
          case index <= 200:
            uniMatch += 60;
            break;
          case index <= 250:
            uniMatch += 50;
            break;
          case index <= 300:
            uniMatch += 40;
            break;
          case index <= 350:
            uniMatch += 30;
            break;
          case index <= 400:
            uniMatch += 20;
            break;
          default:
            uniMatch += 0;
            break;
        }
      }
    });
    console.log(uniMatch);
    position.languages.map((language) => {
      candidate.languages.map((cLanguage) => {
        if (language === cLanguage) {
          langMatch += 100 / position.languages.length;
        }
      });
    });
    //based on the differenece between minExp and candidate exp years a score is added to the candidate
    const diffExp = position.minExp - candidate.experienceYears;
    switch (true) {
      case diffExp == 0:
        expMatch += 80;
        break;
      case diffExp == -1:
        expMatch += 90;
        break;
      case diffExp <= -2:
        expMatch += 100;
        break;
      case diffExp == 1:
        expMatch += 60;
        break;
      case diffExp == 2:
        expMatch += 40;
        break;
      default:
        expMatch += 10;
    }

    overallMatch += (uniMatch / 4) * weight.uni;
    overallMatch += (expMatch / 4) * weight.exp;
    overallMatch += (skillsMatch / 4) * weight.skills;
    overallMatch += (langMatch / 4) * weight.lang;

    overallMatch =
      overallMatch /
      ((parseInt(weight.uni) +
        parseInt(weight.exp) +
        parseInt(weight.skills) +
        parseInt(weight.lang)) /
        4);

    console.log(
      parseInt(uniMatch),
      parseInt(expMatch),
      parseInt(skillsMatch),
      parseInt(langMatch),
      Math.ceil(overallMatch)
    );
    // overallMatch =
    //   overallMatch /
    //   ((parseInt(weight.uni) +
    //     parseInt(weight.exp) +
    //     parseInt(weight.skills) +
    //     parseInt(weight.lang)) /
    //     4);
    return {
      cindex: index,
      universityMatch: Math.floor(uniMatch),
      experienceMatch: Math.floor(expMatch),
      skillsMatch: Math.floor(skillsMatch),
      languageMatch: Math.floor(langMatch),
      overallScore: Math.floor(overallMatch),
    };
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
    overallMatch += (uniMatch / 4) * teamWeight.uni;
    overallMatch += (expMatch / 4) * teamWeight.exp;
    overallMatch += (skillsMatch / 4) * teamWeight.skills;
    overallMatch += (langMatch / 4) * teamWeight.lang;
    // console.log(
    //   parseInt(weight.uni) +
    //     parseInt(weight.exp) +
    //     parseInt(weight.skills) +
    //     parseInt(weight.lang)
    // );
    overallMatch =
      overallMatch /
      ((parseInt(teamWeight.uni) +
        parseInt(teamWeight.exp) +
        parseInt(teamWeight.skills) +
        parseInt(teamWeight.lang)) /
        4);

    // console.log(
    //   Math.ceil(uniMatch),
    //   Math.ceil(expMatch),
    //   Math.ceil(skillsMatch),
    //   Math.ceil(langMatch),
    //   Math.ceil(overallMatch)
    // );

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

  const teamWeightInputsUni = (event) => {
    if (event.target.value != "") {
      setTeamWeight((previousState) => {
        return { ...previousState, uni: event.target.value };
      });
    } else {
      setTeamWeight((previousState) => {
        return { ...previousState, uni: 1 };
      });
    }
    // console.log(weight);
  };
  const teamWeightInputsExp = (event) => {
    if (event.target.value != "") {
      setTeamWeight((previousState) => {
        return { ...previousState, exp: event.target.value };
      });
    } else {
      setTeamWeight((previousState) => {
        return { ...previousState, exp: 1 };
      });
    }
  };
  const teamWeightInputsSkills = (event) => {
    if (event.target.value != "") {
      setTeamWeight((previousState) => {
        return { ...previousState, skills: event.target.value };
      });
    } else {
      setTeamWeight((previousState) => {
        return { ...previousState, skills: 1 };
      });
    }
  };
  const teamWeightInputsLang = (event) => {
    if (event.target.value != "") {
      setTeamWeight((previousState) => {
        return { ...previousState, lang: event.target.value };
      });
    } else {
      setTeamWeight((previousState) => {
        return { ...previousState, lang: 1 };
      });
    }
  };

  const weightInputsUni = (event) => {
    if (event.target.value != "") {
      setweight((previousState) => {
        return { ...previousState, uni: event.target.value };
      });
    } else {
      setweight((previousState) => {
        return { ...previousState, uni: 1 };
      });
    }
    // console.log(weight);
  };
  const weightInputsExp = (event) => {
    if (event.target.value != "") {
      setweight((previousState) => {
        return { ...previousState, exp: event.target.value };
      });
    } else {
      setweight((previousState) => {
        return { ...previousState, exp: 1 };
      });
    }
  };
  const weightInputsSkills = (event) => {
    if (event.target.value != "") {
      setweight((previousState) => {
        return { ...previousState, skills: event.target.value };
      });
    } else {
      setweight((previousState) => {
        return { ...previousState, skills: 1 };
      });
    }
  };
  const weightInputsLang = (event) => {
    if (event.target.value != "") {
      setweight((previousState) => {
        return { ...previousState, lang: event.target.value };
      });
    } else {
      setweight((previousState) => {
        return { ...previousState, lang: 1 };
      });
    }
  };

  const returnGitInfo = (githubId) => {
    API.getGithubInfo(githubId)
      .then((githubInfo) => {
        return githubInfo.publicRepos;
        // console.log(`it is candidates data : ${candidates}`);
      })
      .catch((err) => console.log(err));
  };
  const MyVerticallyCenteredModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Candidate's info
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead></thead>
            <tbody>
              <tr>
                <td>Name</td>
                <td>{selectedCandidate.candidateName}</td>
              </tr>{" "}
              <tr>
                <td>Candidate Score</td>
                <td>{selectedCandidate.overallScore}%</td>
              </tr>{" "}
              <tr>
                <td>Work Experience</td>
                <td>{selectedCandidate.experienceYears} years</td>
              </tr>
              <tr>
                <td>Skills Match</td>
                <td>{selectedCandidate.skillsMatch}%</td>
              </tr>{" "}
              <tr>
                <td>Skills</td>
                <td>
                  {Object.keys(selectedCandidate).length !== 0 &&
                    selectedCandidate.skills.map((skill, index) => {
                      let badgeColor =
                        position.skills.indexOf(skill) !== -1
                          ? "success"
                          : "primary";
                      return (
                        <Badge
                          key={index}
                          className="mx-1"
                          pill
                          bg={badgeColor}
                        >
                          {skill}
                        </Badge>
                      );
                    })}
                </td>
              </tr>{" "}
              {/* <tr>
              <td>Experience</td>
              <td>{selectedCandidate.experienceYears}</td>
            </tr> */}
              <tr>
                <td>University</td>
                <td>{selectedCandidate.university}</td>
              </tr>
              {/* <tr>
              <td>Location</td>
              <td>{selectedCandidate.location}</td>
            </tr> */}
              <tr>
                <td>Field</td>
                <td>{selectedCandidate.field}</td>
              </tr>{" "}
              <tr>
                <td>Role</td>
                <td>{selectedCandidate.positionTitle}</td>
              </tr>
              <tr>
                <td>Languages</td>
                <td>
                  {Object.keys(selectedCandidate).length !== 0 &&
                    selectedCandidate.languages.map((language, index) => {
                      let badgeColor =
                        position.languages.indexOf(language) !== -1
                          ? "success"
                          : "primary";
                      return (
                        <Badge
                          key={index}
                          className="mx-1"
                          pill
                          bg={badgeColor}
                        >
                          {language}
                        </Badge>
                      );
                    })}
                </td>
              </tr>
              <tr>
                <td>Github link</td>

                <td>
                  {selectedCandidate.githubId != null ? (
                    <a
                      href={`https://github.com/${selectedCandidate.githubId}`}
                      target="blank"
                    >
                      {selectedCandidate.githubId}
                    </a>
                  ) : (
                    `Not Provided`
                  )}
                </td>
              </tr>
              <tr>
                <td>MediumLink</td>
                <td>
                  {selectedCandidate.mediumId != null ? (
                    <a
                      href={`https://medium.com/${selectedCandidate.mediumId}`}
                      target="blank"
                    >
                      {selectedCandidate.mediumId}
                    </a>
                  ) : (
                    `Not Provided`
                  )}
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const CompareModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Candidate's info
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {comparisonList.length > 1 && (
            <Table striped bordered hover>
              <thead></thead>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{comparisonList[0].candidateName}</td>
                  <td>{comparisonList[1].candidateName}</td>
                </tr>{" "}
                <tr>
                  <td>Candidate Score</td>
                  <td>{comparisonList[0].overallScore}%</td>
                  <td>{comparisonList[1].overallScore}%</td>
                </tr>{" "}
                <tr>
                  <td>Work Experience</td>
                  <td>{comparisonList[0].experienceYears} years</td>
                  <td>{comparisonList[1].experienceYears} years</td>
                </tr>
                <tr>
                  <td>Skills Match</td>
                  <td>{comparisonList[0].skillsMatch}%</td>
                  <td>{comparisonList[1].skillsMatch}%</td>
                </tr>{" "}
                <tr>
                  <td>Skills</td>
                  <td>
                    {Object.keys(comparisonList[0]).length !== 0 &&
                      comparisonList[0].skills.map((skill, index) => {
                        let badgeColor =
                          position.skills.indexOf(skill) !== -1
                            ? "success"
                            : "primary";
                        return (
                          <Badge
                            key={index}
                            className="mx-1"
                            pill
                            bg={badgeColor}
                          >
                            {skill}
                          </Badge>
                        );
                      })}
                  </td>
                  <td>
                    {Object.keys(comparisonList[1]).length !== 0 &&
                      comparisonList[1].skills.map((skill, index) => {
                        let badgeColor =
                          position.skills.indexOf(skill) !== -1
                            ? "success"
                            : "primary";
                        return (
                          <Badge
                            key={index}
                            className="mx-1"
                            pill
                            bg={badgeColor}
                          >
                            {skill}
                          </Badge>
                        );
                      })}
                  </td>
                </tr>{" "}
                {/* <tr>
                          <td>Experience</td>
                          <td>{selectedCandidate.experienceYears}</td>
                        </tr> */}
                <tr>
                  <td>University</td>
                  <td>{comparisonList[0].university}</td>
                  <td>{comparisonList[1].university}</td>
                </tr>
                {/* <tr>
                          <td>Location</td>
                          <td>{comparisonList[0].location}</td>
                        </tr> */}
                <tr>
                  <td>Field</td>
                  <td>{comparisonList[0].field}</td>
                  <td>{comparisonList[1].field}</td>
                </tr>{" "}
                <tr>
                  <td>Role</td>
                  <td>{comparisonList[0].positionTitle}</td>
                  <td>{comparisonList[1].positionTitle}</td>
                </tr>
                <tr>
                  <td>Languages</td>
                  <td>
                    {Object.keys(comparisonList[0]).length !== 0 &&
                      comparisonList[0].languages.map((language, index) => {
                        let badgeColor =
                          position.languages.indexOf(language) !== -1
                            ? "success"
                            : "primary";
                        return (
                          <Badge
                            key={index}
                            className="mx-1"
                            pill
                            bg={badgeColor}
                          >
                            {language}
                          </Badge>
                        );
                      })}
                  </td>
                  <td>
                    {Object.keys(comparisonList[1]).length !== 0 &&
                      comparisonList[1].languages.map((language, index) => {
                        let badgeColor =
                          position.languages.indexOf(language) !== -1
                            ? "success"
                            : "primary";
                        return (
                          <Badge
                            key={index}
                            className="mx-1"
                            pill
                            bg={badgeColor}
                          >
                            {language}
                          </Badge>
                        );
                      })}
                  </td>
                </tr>
                <tr>
                  <td>Github link</td>

                  <td>
                    {comparisonList[0].githubId != null ? (
                      <a
                        href={`https://github.com/${comparisonList[0].githubId}`}
                        target="blank"
                      >
                        {comparisonList[0].githubId}
                      </a>
                    ) : (
                      `Not Provided`
                    )}
                  </td>
                  <td>
                    {comparisonList[1].githubId != null ? (
                      <a
                        href={`https://github.com/${comparisonList[1].githubId}`}
                        target="blank"
                      >
                        {comparisonList[1].githubId}
                      </a>
                    ) : (
                      `Not Provided`
                    )}
                  </td>
                </tr>
                <tr>
                  <td>MediumLink</td>
                  <td>
                    {comparisonList[0].mediumId != null ? (
                      <a
                        href={`https://medium.com/${comparisonList[0].mediumId}`}
                        target="blank"
                      >
                        {comparisonList[0].mediumId}
                      </a>
                    ) : (
                      `Not Provided`
                    )}
                  </td>
                  <td>
                    {comparisonList[1].mediumId != null ? (
                      <a
                        href={`https://medium.com/${comparisonList[1].mediumId}`}
                        target="blank"
                      >
                        {comparisonList[1].mediumId}
                      </a>
                    ) : (
                      `Not Provided`
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const prepareModal = (candidate) => {
    setSelectedCandidate(candidate);
    if (selectedCandidate) {
      setModalShow(true);
      console.log(selectedCandidate);
    }
  };

  return (
    <>
      <Stack direction="horizontal" className="p-3" gap={3}>
        <h3>
          Candidates For "{position.title}" Position, ID: {position.id}
        </h3>
        <Button
          variant="primary"
          style={{ position: "absolute", right: "200px" }}
          onClick={doComparison}
          disabled={comparisonList.length === 2 ? false : true}
        >
          {comparisonList.length === 2
            ? "Compare candidates"
            : "Add 2 candidates to compare"}
        </Button>{" "}
        <Button
          variant="warning"
          style={{ position: "absolute", right: "30px" }}
          onClick={resetComparison}
          disabled={comparisonList.length === 2 ? false : true}
        >
          Reset comparison
        </Button>{" "}
      </Stack>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>
              <p
                style={{ cursor: "pointer" }}
                onClick={() => {
                  sortCandidates("universityMatch");
                }}
              >
                Top University Match
              </p>{" "}
              <input
                type="text"
                placeholder="Weight"
                name="uniWeight"
                onChange={weightInputsUni}
              ></input>
            </th>
            <th>
              <p
                style={{ cursor: "pointer" }}
                onClick={() => {
                  sortCandidates("languageMatch");
                }}
              >
                Languages Match
              </p>{" "}
              <input
                type="text"
                placeholder="Weight"
                name="langWeight"
                onChange={weightInputsLang}
              ></input>
            </th>
            <th>
              <p
                style={{ cursor: "pointer" }}
                onClick={() => {
                  sortCandidates("experienceMatch");
                }}
              >
                Experience Match
              </p>{" "}
              <input
                type="text"
                placeholder="Weight"
                name="expWeight"
                onChange={weightInputsExp}
              ></input>
            </th>
            <th>
              <p
                style={{ cursor: "pointer" }}
                onClick={() => {
                  sortCandidates("skillsMatch");
                }}
              >
                Skills Match
              </p>{" "}
              <input
                type="text"
                placeholder="Weight"
                name="skillsWeight"
                onChange={weightInputsSkills}
              ></input>
            </th>
            <th>
              <p
                style={{ cursor: "pointer" }}
                onClick={() => {
                  sortCandidates("overallScore");
                }}
              >
                Candidate Match
              </p>
            </th>
            {/* <th>Remove</th> */}
            <th>Details</th>
            <th>Comparison</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => {
            let refLink = `/profile?cId=${candidate.id}`;
            return (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{candidate.candidateName}</td>
                <td>
                  {candidate.universityMatch}% <br />
                  {candidate.university}
                </td>
                <td>
                  {candidate.languageMatch}% <br />
                  {candidate.languages.map((lang) => `${lang},`)}
                </td>
                <td>
                  {candidate.experienceMatch}% <br />{" "}
                  {candidate.experienceYears}years
                </td>
                {/* <td>
                  {candidate.skills.map((s, index) => {
                    return (
                      <Badge key={index} className="mx-1" pill bg="primary">
                        {s}
                      </Badge>
                    );
                  })}
                </td> */}
                <td>{candidate.skillsMatch}%</td>
                <td>{candidate.overallScore}%</td>
                {/* <td>
                  <Link to={refLink}>
                    <Button variant="danger">add to deleted table</Button>{" "}
                  </Link>
                </td> */}
                <td>
                  {/* <Link to={refLink}>
                    <Button variant="primary">Details Pop up</Button>{" "}
                  </Link> */}
                  <Button
                    variant="primary"
                    onClick={() => prepareModal(candidate)}
                  >
                    Details
                  </Button>
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
                onChange={teamWeightInputsUni}
              ></input>
            </th>
            <th>
              Experience Match{" "}
              <input
                type="text"
                placeholder="Weight"
                name="expWeight"
                onChange={teamWeightInputsExp}
              ></input>
            </th>
            <th>
              Skills Match{" "}
              <input
                type="text"
                placeholder="Weight"
                name="skillsWeight"
                onChange={teamWeightInputsSkills}
              ></input>
            </th>
            <th>Skills Miss</th>
            <th>
              Languages Match{" "}
              <input
                type="text"
                placeholder="Weight"
                name="langWeight"
                onChange={teamWeightInputsLang}
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
              <tr key={index + 1}>
                <td>{index + 1}</td>
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
        {skillsList.length > 0 && (
          <NewBarChart skillsList={skillsList}></NewBarChart>
        )}
      </Row>
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
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <CompareModal show={compareModal} onHide={() => setCompareModal(false)} />
    </>
  );
}

export default CandidatesList;
