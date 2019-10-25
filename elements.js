var TYPE_CITY = "city";
var TYPE_LAND = "land";
var TYPE_RIVER = "river";

var Element = function(name, type, geometry) {
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

// function testConstraints() {
//   violations = [];
//   for (var i = 0; i < constraints.length; ++i) {
//     var c = constraints[i];
//     var src = name2element[c.srcName];
//     var target = name2element[c.targetName];
//     if (!c.test(src.geometry, target.geometry)) {
//       violations.push(c);
//     }
//   }
//   // updateViolations();
// }

// var selected = "Zarahemla";
var selected;// = "Zarahemla";

// var frustumDim = 6;


function initElements() {
  // Initialize data
  addPointElement("Zarahemla", TYPE_CITY, vec2(400, 400));
  addPointElement("Nephi", TYPE_CITY, vec2(400, 200));
  addPointElement("Melek", TYPE_CITY, vec2(280, 400));
  addPointElement("Ammonihah", TYPE_CITY, vec2(300, 600));

  // addPolygonElement("Land of Zarahemla", LAND,
  //                   [ vec2(-2, 0), vec2(2, 0),
  //                     vec2(2, 2), vec2(-2, 2) ]);
  // addPolygonElement("Land of Nephi", LAND,
  //                   [ vec2(-2, -2), vec2(2, -2),
  //                     vec2(2, -.2), vec2(-2, -.2) ]);

  addConstraint("Zarahemla", "Nephi", new DirConstraint(NORTH));
  addConstraint("Ammonihah", "Melek", new DirConstraint(NORTH));
  addConstraint("Ammonihah", "Zarahemla", new DirConstraint(NORTH));

  selected = name2element["Zarahemla"];

  // updateProperties();
  // testConstraints();
}

// function foo() {
//   var success = true;

//   var element = selected;
//   if (element != null) {
//     for (var i = 0; i < element.constraints.length; ++i) {
//       var c = element.constraints[i];
//       var srcElement = elements[c.srcName];
//       var targetElement = elements[c.targetName];
//       renderConnection(srcElement.geometry, targetElement.geometry,
//                        Color.selected);
//     }
//   }

//   for (var i = 0; i < violations.length; ++i) {
//     var c = violations[i];
//     var srcElement = elements[c.srcName];
//     var targetElement = elements[c.targetName];
//     renderConnection(srcElement.geometry, targetElement.geometry, Color.error);
//   }

//   // renderConnection(elements[0].geometry, elements[1].geometry);
//   // success = success && renderCircles();

//   // Render elements
//   pushMatrix();
//   var success = true;
//   for (var name in elements) {
//     // success = success && elements[name].render(name == selected);
//     success = success && elements[name].render(elements[name] == selected);
//   }
//   popMatrix();

//   if (!success) {
//     requestAnimFrame(render);
//   }
// }
