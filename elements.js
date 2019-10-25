var TYPE_CITY = "city";
var TYPE_LAND = "land";
var TYPE_RIVER = "river";

var Element = function(name, type, geometry) {
  this.id = name;
  this.name = name;
  this.type = type;
  this.geometry = geometry;
  this.constraints = [];
}

var name2element = new Object();
var elementNames = [];

function addPointElement(name, type, p) {
  var e = new Element(name, type, p);//, new Point(p));
  elementNames.push(name);
  name2element[name] = e;
}

function addPolygonElement(name, type, vertices) {
  // var e = new Element(name, type);//, new Polygon(vertices));
  // elements[name] = e;
}

var constraints = [];

function addConstraint(srcName, targetName, constraint) {
  constraint.srcName = srcName;
  constraint.targetName = targetName;
  constraint.id = `${srcName}-${targetName}`;
  constraint.test();
  constraints.push(constraint);
  name2element[srcName].constraints.push(constraint);
  name2element[targetName].constraints.push(constraint);
}

var violations = [];

let selected;

function initElements() {
  // Initialize data
  addPointElement("Zarahemla", TYPE_CITY, vec2(400, 400));
  addPointElement("Nephi", TYPE_CITY, vec2(400, 200));
  addPointElement("Melek", TYPE_CITY, vec2(280, 450));
  addPointElement("Ammonihah", TYPE_CITY, vec2(300, 600));

  // addPolygonElement("Land of Zarahemla", LAND,
  //                   [ vec2(-2, 0), vec2(2, 0),
  //                     vec2(2, 2), vec2(-2, 2) ]);
  // addPolygonElement("Land of Nephi", LAND,
  //                   [ vec2(-2, -2), vec2(2, -2),
  //                     vec2(2, -.2), vec2(-2, -.2) ]);

  // addConstraint("Zarahemla", "Nephi", new DirConstraint(NORTH));
  addConstraint("Nephi", "Zarahemla", new DirConstraint(SOUTH));
  addConstraint("Ammonihah", "Melek", new DirConstraint(NORTH));
  addConstraint("Ammonihah", "Zarahemla", new DirConstraint(NORTH));

  selected = name2element["Zarahemla"];

  // updateProperties();
  // testConstraints();
}
