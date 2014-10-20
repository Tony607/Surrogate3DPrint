/**This the configurable servo bracket module*/
var userMearsuredData = true;
//Measured data
//the full length of the servo
var servoLength = 32.34;
var servoWidth = 12.43;
var servoDepth = 15.81;
var m3_nut_height = 2.6;
var servo_bolt_extender_width = 4.79;
//space between the m3 nut top to the buttom of the servo, 
//might need to take the extra length of the bolt exceeding the nut, 
//or we can mount the nut/bolt the other way
var spacer = 1;

//=========
var thickness = 3;
var outerBox_length = 60;
var outerBox_width = 50;
var outerBox_height = 45;

var innerBox_length = outerBox_length - 2 * thickness;
var innerBox_width = outerBox_width - 2 * thickness;
var innerBox_height = outerBox_height - 2 * thickness;
/**helper function that generate the config data from the measurement*/
var makeConfigDataFromMeasure = function () {
	innerBox_length = servoLength;
	innerBox_height = servoWidth;
	innerBox_width = servoDepth + m3_nut_height + spacer - thickness;
	outerBox_length = innerBox_length + 2 * thickness;
	outerBox_width = innerBox_width + 2 * thickness;
	outerBox_height = innerBox_height + 2 * thickness;
};
if (userMearsuredData) {
	makeConfigDataFromMeasure();
}

function bracket() {
	return difference(
		union(
			cube({
				size : [outerBox_width, outerBox_length, outerBox_height],
				center : true
			})),
		union(
			cube({
				size : [innerBox_width, innerBox_length, innerBox_height],
				center : true
			}).translate([0, 0, thickness]),
			cube({
				size : [innerBox_width, innerBox_length, innerBox_height],
				center : true
			}).translate([0, 0, 0]),
			cube({
				size : [innerBox_width, innerBox_length - servo_bolt_extender_width * 2, innerBox_height],
				center : true
			}).translate([thickness, 0, 0]),
			cube({
				size : [innerBox_width, innerBox_length - servo_bolt_extender_width * 2, innerBox_height],
				center : true
			}).translate([thickness, 0, thickness])));
}

function main() {
	//put the model above the x,y plane
	return bracket().translate([0, 0, outerBox_height/2]);
}
