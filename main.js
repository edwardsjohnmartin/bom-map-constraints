let width = 800;
let height = 800;
let radius = 20;

let flipy = d3.scaleLinear()
  .domain([0, height])
  .range([height, 0])
;

let drag = function() {

  function dragstarted(d) {
    d3.select(this)
      .attr("stroke", "black");
  }

  function dragged(d) {
    let x = d3.event.x;
    let y = d3.event.y;

    name2element[d].geometry[0] = x;
    name2element[d].geometry[1] = flipy(y);

    // circle
    d3.select(this)
      // .raise()
      .attr("cx", x)
      .attr("cy", y)
    ;

    // name
    d3.select(`#${d}-text`)
      .attr("x", x)
      .attr("y", y)
    ;
    
    // constraints
    name2element[d].constraints.forEach(function(c) {
      let ce = d3.select(`#${c.id}`);
      if (c.srcName == d) {
        ce.attr('x1', x)
          .attr('y1', y);
      } else {
        ce.attr('x2', x)
          .attr('y2', y);
      }
      c.test();
      ce.style('stroke', c.sat ? 'black' : 'red');
    });
  }

  function dragended(d) {
    d3.select(this)
      .attr("stroke", null);
  }

  return d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
}

function init() {
  initElements();

  data = elementNames;

  let svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
  ;
  
  // Cities
  svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', (d,i) => name2element[d].geometry[0])
    .attr('cy', (d,i) => flipy(name2element[d].geometry[1]))
    .attr('r', radius)
    .attr('id', d => d)
    .style('fill', d => '#55ff55')
    .on('mouseover', function(d, i) {
      d3.select(this).attr('r', radius+2);
    })
    .on('mouseout', function(d, i) {
      d3.select(this).attr('r', radius);
    })
    .call(drag())
  ;

  d3.select('svg')
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(d => d)
    .attr('id', d => `${d}-text`)
    .attr('x', (d,i) => name2element[d].geometry[0])
    .attr('y', (d,i) => flipy(name2element[d].geometry[1]))
    .attr('text-anchor', "middle")
    .attr('alignment-baseline', 'middle')
  ;

  let tooltip = new Tooltip();

  // Constraints
  svg.selectAll('line')
    .data(constraints)
    .enter()
    .append('line')
    .attr('x1', (d,i) => name2element[d.srcName].geometry[0])
    .attr('y1', (d,i) => flipy(name2element[d.srcName].geometry[1]))
    .attr('x2', (d,i) => name2element[d.targetName].geometry[0])
    .attr('y2', (d,i) => flipy(name2element[d.targetName].geometry[1]))
    .attr('id', d => d.id)
    .style('stroke', c => c.sat ? 'black' : 'red')
    .lower()
    .on("mouseover", d => {
      tooltip.mouseover(d);
    })
    .on("mousemove", () => {
      tooltip.mousemove();
    })
    .on("mouseout", () => {
      tooltip.mouseout();
    })
    // .append("svg:title")
    // .text(function(d, i) { return 'abc'; })
  ;
}

