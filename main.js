let width = 800;
let height = 800;
let radius = 20;

let flipy = d3.scaleLinear()
  .domain([0, height])
  .range([height, 0])
;

let drag = function() {

  function dragstarted(elementName) {
    d3.select(this)
      .attr("stroke", "black");
  }

  function dragged(elementName) {
    let x = d3.event.x;
    let y = d3.event.y;

    let d = elementName;
    name2element[d].geometry[0] = x;
    name2element[d].geometry[1] = flipy(y);

    // circle
    d3.select(this)
      .attr("cx", x)
      .attr("cy", y)
    ;

    // name
    d3.select(`text.element.label.${d}`)
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

    d3.selectAll(`.constraint.label.${elementName}`)
      .attr('x', c => c.midPoint().x)
      .attr('y', c => flipy(c.midPoint().y))
    ;
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
    .attr('class', d => d.id)
    .style('fill', d => '#55ff55')
    .on('mouseover', function(d, i) {
      d3.select(this).attr('r', radius+2);
      d3.selectAll(`.constraint.${d}`)
        .attr('visibility', 'visible')
      ;
    })
    .on('mouseout', function(d, i) {
      d3.select(this).attr('r', radius);
      d3.selectAll(`line.constraint.${d}`)
        .attr('visibility', c => c.sat ? 'hidden' : 'visible')
      ;
      d3.selectAll(`text.constraint.${d}`)
        .attr('visibility', 'hidden')
      ;
    })
    .call(drag())
  ;

  d3.select('svg')
    .selectAll('text.element')
    .data(data)
    .enter()
    .append('text')
    .text(d => d)
    .attr('class', d => `element label ${d}`)
    // .attr('id', d => `${d}-text`)
    .attr('x', (d,i) => name2element[d].geometry[0])
    .attr('y', (d,i) => flipy(name2element[d].geometry[1]))
    .attr('text-anchor', "middle")
    .attr('alignment-baseline', 'middle')
  ;

  // let tooltip = new Tooltip();

  // Constraints
  svg.selectAll('line.constraint')
    .data(constraints)
    .enter()
    .append('line')
    .attr('class', d => `constraint ${d.srcName} ${d.targetName}`)
    .attr('x1', c => c.srcPoint().x)
    .attr('y1', c => flipy(c.srcPoint().y))
    .attr('x2', c => c.targetPoint().x)
    .attr('y2', c => flipy(c.targetPoint().y))
    .attr('id', c => c.id)
    .style('stroke', c => c.sat ? 'black' : 'red')
    // .style('stroke-width', c => c.sat ? 0 : 2)
    .style('stroke-width', 2)
    .lower()
  ;

  d3.select('svg')
    .selectAll('text.constraint')
    .data(constraints)
    .enter()
    .append('text')
    .text(c => `${c.srcName} ${c.getDesc()} ${c.targetName}`)
    .attr('class', d => `constraint label ${d.srcName} ${d.targetName}`)
    .attr('x', c => c.midPoint().x)
    .attr('y', c => flipy(c.midPoint().y))
    .attr('visibility', 'hidden')
    .attr('text-anchor', "middle")
    .attr('alignment-baseline', 'middle')
  ;

  d3.selectAll('line.constraint')
    .attr('visibility', c => c.sat ? 'hidden' : 'visible')
  ;
}

