import { useD3 } from "../Hooks/useD3";
import * as d3 from "d3";
import { useEffect } from "react";
function ScatterPlot(props) {
  console.log("SCatter IS CALLED!!!!!");
  let data = {};
  let count = 0;
  data = [...props.candidates];
  console.log(data);
  let highExperience = 0;
  data.forEach((dd) => {
    highExperience < dd.experienceYears ? (highExperience = dd.experienceYears) : (highExperience = highExperience);
  });

  useEffect(() => {
    count += 1;
    if (count < 2) {
      drawScatterPlot();
    }
  }, []);

  const drawScatterPlot = () => {
    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 760 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#scatterPlot")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data

    var x = d3.scaleLinear().domain([0, highExperience]).range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear().domain([0, 100]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Add dots
    svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return x(d.experienceYears);
      })
      .attr("cy", function (d) {
        return y(d.overallScore);
      })
      .attr("r", 5)
      .style("fill", "#69b3a2");
  };
  return (
    <>
    <h5>X: Experience Years (years) , Y: Overall Score (percentage)</h5>
    
      <div id="scatterPlot"></div>
    </>
  );
}

export default ScatterPlot;
