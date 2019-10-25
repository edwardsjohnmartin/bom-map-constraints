//------------------------------------------------------------
// DirConstraint
//------------------------------------------------------------

var NORTH = "north";
var SOUTH = "south";
var EAST = "east";
var WEST = "west";

// <this> is <dir> of targetElement
var DirConstraint = function(dir) {
  this.dir = dir;
  switch (this.dir) {
    case NORTH:
    this.targetAngle = 90;
    break;
    case SOUTH:
    this.targetAngle = -90;
    break;
    case EAST:
    this.targetAngle = 0;
    break;
    case WEST:
    this.targetAngle = 180;
    break;
  }
  this.THRESHOLD = 20;
}

DirConstraint.prototype.getDesc = function() {
  return this.dir + " of";
}

DirConstraint.prototype.test = function() {//srcGeometry, targetGeometry) {
  let srcPoint = name2element[this.srcName].geometry;
  let targetPoint = name2element[this.targetName].geometry;
  // var srcPoint = srcGeometry;//.p;
  // var targetPoint = targetGeometry;//.p;
  // See if matches within 15 degrees
  var v = subtract(srcPoint, targetPoint);
  var a = degrees(Math.atan2(v[1], v[0]));
  var diff = Math.abs(this.targetAngle - a);
  if (diff > 180) {
    diff = Math.abs(this.targetAngle - (a + 360));
  }
  this.sat = diff < this.THRESHOLD;
  return this.sat;
}

//------------------------------------------------------------
// 
//------------------------------------------------------------
