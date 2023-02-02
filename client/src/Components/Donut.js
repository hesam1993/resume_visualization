import { useD3 } from "../Hooks/useD3";
import * as d3 from "d3";
import { useEffect } from "react";
function Dounut(props) {
  let data = [{candidateName: 'Candidate 1', skillsMatch: 15},
  {candidateName: 'Candidate 2', skillsMatch: 5},
  {candidateName: 'Candidate 3', skillsMatch: 10},
  {candidateName: 'Candidate 4', skillsMatch: 10},
  {candidateName: 'Candidate 5', skillsMatch: 30},
  {candidateName: 'Candidate 6', skillsMatch: 15},
  {candidateName: 'Candidate 7', skillsMatch: 10},
  {candidateName: 'Candidate 8', skillsMatch: 20},
  {candidateName: 'Candidate 9', skillsMatch: 75},
  {candidateName: 'Candidate 10', skillsMatch: 10}];
  let count = 0;
  
  // console.log(data);

  useEffect(() => {
    count += 1;
    if (count<2) {
      drawBubbleChart();
  }}, []);

  const drawBubbleChart = () => {
    var margin = { top: 30, right: 0, bottom: 30, left: 0 },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom,
      tooltip = { width: 100, height: 100, x: 10, y: -30 };
    //initialize margin end
    var svg = d3
      .select("#barChart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var pie = d3
      .pie()
      .sort(null)
      .value((d) => d.skillsMatch);

    var arc = d3
      .arc()
      .innerRadius(Math.min(width, height) / 2 - 100)
      .outerRadius(Math.min(width, height) / 2 - 1)
      .cornerRadius(15);

    var arcLabel = function () {
      const radius = (Math.min(width, height) / 2) * 0.8;
      return d3.arc().innerRadius(radius).outerRadius(radius);
    };
    data.forEach(function (d) {
      // console.log(d);
      //     d.date = parseDate(d.date);
    });
    var color = d3
      .scaleOrdinal(d3.schemeSet1)
      .domain(data.map((d) => d.candidateName))
      .range(
        d3
          .quantize((t) => d3.interpolateSpectral(t * 0.8 + 0.1), data.length)
          .reverse()
      );
    const arcs = pie(data);
    svg
      .append("g")
      .attr("stroke", "white")
      .selectAll("path")
      .data(arcs)
      .enter()
      .append("path")
      .attr("fill", (d) => color(d.data.candidateName))
      .attr("d", arc)
      .append("title")
      .text(
        (d) => `${d.data.candidateName}: ${d.data.skillsMatch.toLocaleString()}`
      );

    svg
      .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(arcs)
      .enter()
      .append("text")
      .attr("transform", (d) => `translate(${arcLabel().centroid(d)})`)
      .call((text) =>
        text
          .append("tspan")
          .attr("y", "-0.4em")
          .attr("font-weight", "bold")
          .text((d) => d.data.candidateName)
      )
      .call((text) =>
        text
          .filter((d) => d.endAngle - d.startAngle > 0.25)
          .append("tspan")
          .attr("x", 0)
          .attr("y", "0.7em")
          .attr("fill-opacity", 0.7)
          .text((d) => d.data.skillsMatch.toLocaleString())
      );
  };
  return (
    <>
      <div id="barChart"></div>
    </>
  );
}

export default Dounut;
