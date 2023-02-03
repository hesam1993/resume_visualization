import { useD3 } from "../Hooks/useD3";
import * as d3 from "d3";
import { useEffect } from "react";
function OverallChart(props) {
  console.log("NEW BAR CHART IS CALLED!!!!!")
  let data = {};
  let count = 0;
  data = [...props.candidates];
  console.log(data)
  let max = 0;

  useEffect(() => {
    count += 1;
    if (count < 2) {
      drawBarChart();
    }
  }, []);

  const drawBarChart = () => {
    var margin = { top: 30, right: 30, bottom: 110, left: 60 },
      width = 1500 - margin.left - margin.right,
      height = 700 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#skillsBarChart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data

    // X axis
    var x = d3
      .scaleBand()
      .range([0, width])
      .domain(
        data.map(function (d) {
          return d.candidateName;
        })
      )
      .padding(0.2);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Add Y axis
    var y = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Bars
    svg
      .selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x(d.candidateName);
      })
      .attr("y", function (d) {
        return y(d.overallScore);
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) {
        return height - y(d.overallScore);
      })
      .attr("fill", "#69b3a2");
  };
  return (
    <>
      <div id="skillsBarChart"></div>
    </>
  );
}

export default OverallChart;
