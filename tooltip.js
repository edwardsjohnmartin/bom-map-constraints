class Tooltip {

  constructor() {
    //----------------------------------------
    // tooltip
    //----------------------------------------
    this.tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("background", "#FFFFFF")
      .attr('id', 'tooltip')
      .classed('tooltipDiv', true)
    ;
  };

  // Gets the HTML content for a tool tip.
  tooltip_html(d) {
    let src = d.srcName;
    let target = d.targetName;
    return `${src} ${d.getDesc()} ${target}`;
  }

  mouseover(d) {
    this.tooltip
      .html(this.tooltip_html(d))
      .classed('tooltip-title', true)
    ;
    this.tooltip.style("visibility", "visible");
  }

  mousemove(d) {
    this.tooltip.style("top", (d3.event.pageY-10)+"px")
      .style("left",(d3.event.pageX+10)+"px");
  }

  mouseout(d) {
    this.tooltip.style("visibility", "hidden");
  }

};
