import { useD3 } from "../Hooks/useD3";
import * as d3 from "d3";
import { useEffect } from "react";
function LanguagesBubbleChart(props) {
  const hesam = {};
  let count = 0;
  const dataset = {
    children: [
      { Name: "english", Count: 3 },
      { Name: "persian", Count: 2 },
      { Name: "italian", Count: 2 },
      { Name: "French", Count: 1 },
    ],
  };

  useEffect(() => {
    count += 1;
    if (count < 2) {
      drawBubbleChart();
    }
  }, []);

  const drawBubbleChart = () => {
    var diameter = 600;
    var color = d3.scaleOrdinal(d3.schemeDark2);

    var bubble = d3.pack(dataset).size([diameter, diameter]).padding(1.5);

    var svg = d3
      .select("#languageBubble")
      .append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
      .attr("class", "bubble");
    var nodes = d3.hierarchy(dataset).sum(function (d) {
      return d.Count;
    });

    var node = svg
      .selectAll(".node")
      .data(bubble(nodes).descendants())
      .enter()
      .filter(function (d) {
        return !d.children;
      })
      .append("g")
      .attr("class", "node")
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });

    node.append("title").text(function (d) {
      return d.Name + ": " + d.Count;
    });

    node
      .append("circle")
      .attr("r", function (d) {
        return d.r;
      })
      .style("fill", function (d, i) {
        return color(i);
      });

    node
      .append("text")
      .attr("dy", ".2em")
      .style("text-anchor", "middle")
      .text(function (d) {
        return d.data.Name.substring(0, d.r / 3);
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", function (d) {
        return d.r / 5;
      })
      .attr("fill", "white");

    node
      .append("text")
      .attr("dy", "1.3em")
      .style("text-anchor", "middle")
      .text(function (d) {
        return d.data.Count;
      })
      .attr("font-family", "Gill Sans", "Gill Sans MT")
      .attr("font-size", function (d) {
        return d.r / 5;
      })
      .attr("fill", "white");

    d3.select("#languageBubble").style("height", diameter + "px");
  };
  return (
    <>
      <h2>Candidates Languages Chart</h2>
      <div id="languageBubble"></div>
    </>
  );
}

export default LanguagesBubbleChart;
