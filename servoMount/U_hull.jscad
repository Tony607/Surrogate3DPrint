/**This file is a customizable u-shaped bracket*/

var userMearsuredData = true;
//Measured data, change them into actual measured data
var servoLength = 32.34;
var servoWidth = 12.43;
var x = 10.52;
var z = 15;
var servoDepth = 15.81;
var spacer = 4; //this is a configurable closest distance between the roll bracket and the pitch bracket
var l = 35.65; //total width of pan_solid(with servo)
var bearing_space = 0.83; //the thickness of the large ring on the bearing
var bearing_diameter_large = 9.45; //bearing outer ring diameter(large ring)
var bearing_diameter_small = 7.94; //bearing outer ring diameter(small ring)
var servo_bolt_extender_width = 4.79;

////use this to strengthen structure of the mounting hole of the bearing,
//needed when the difference two bearing outer ring diameters is small
var bearing_spacer = 0;
//=====Start of configuration data====
//equal to the length of the servo
var config_base_width = 40;
//config_base_length = total width of pan_solid(with servo) + thickness x 2 + bearing outer ring thickness
var config_base_length = 30;
var config_base_height = 45;
var config_plate_thickness = 3;
var config_top_radius = 5;

var servo_hole_width = 10;
var servo_hole_length = 5;
// the bias from the centre
var config_top_bias = 5;
//=====End of configuration data====
/**helper function that generate the config data from the measurement*/
var makeConfigDataFromMeasure = function () {
	config_base_width = servoLength;
	config_top_bias = servoLength / 2 - x;
	config_base_height = servoDepth - config_plate_thickness + Math.sqrt(x * x + z * z) + spacer;
	config_base_length = l + config_plate_thickness * 2 + bearing_space;
	if ((bearing_diameter_large - bearing_diameter_small) / 2 < 4) {
		bearing_spacer = 2;
	}
	config_top_radius = bearing_diameter_large / 2 + bearing_spacer;
	servo_hole_width = config_base_width -2*servo_bolt_extender_width;
	servo_hole_length = servoWidth;
};

if (userMearsuredData) {
	makeConfigDataFromMeasure();
}
/**function to generate and extrude a hull*/
function showHull() {
	var o = Array.prototype.slice.call(arguments);
	return union(// -- we have to extrude all, in order to union (we can't mix CAG and CSG)
		//linear_extrude({height: 0.1},union(o)).translate([20,0,0]),    // flat single
		//linear_extrude({height: 0.1},hull(o)).translate([-10,0,0]),    // flat convex hulled
		linear_extrude({
			height : config_plate_thickness
		}, hull(o)).rotateX(90));
}
/**this is the bottom plate*/
function pasePlate(plate_thickness, base_length, base_width) {
	return difference(
		cube({
			size : [base_width, base_length, plate_thickness]
		}).translate([-base_width / 2, -base_length / 2 - plate_thickness, 0]),
		cube({
			size : [servo_hole_width, servo_hole_length, plate_thickness]
		}).translate([-servo_hole_width / 2, -servo_hole_length / 2 - plate_thickness, 0])
		
		);
}
/**this is the vertical plate*/
function vertical_hull(base_height, base_width, top_radius, top_bias) {
	return showHull(
		circle({
			r : top_radius,
			center : true
		}).translate([top_bias, base_height, 0]),
		polygon([[-base_width / 2, 0], [base_width / 2, 0], [base_width / 2, 1], [base_width / 2, 1]]) //a short rectangular,
	);
}

function main() {
	return [
		vertical_hull(config_base_height, config_base_width, config_top_radius, config_top_bias).translate([0, -config_base_length / 2, config_plate_thickness]),
		vertical_hull(config_base_height, config_base_width, config_top_radius, config_top_bias).translate([0, config_base_length / 2 - config_plate_thickness, config_plate_thickness]),
		pasePlate(config_plate_thickness, config_base_length, config_base_width)
	];
}
