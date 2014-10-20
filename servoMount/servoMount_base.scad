// B_ROBOT
// Arduino 3D printed Self Balancig Robot project
// Author: Jose Julio


height = 140;
length = 106;//original design is 102, add 20mm to fit in the Due and Cubieboard
width = 54;//default is 50, cubieboard middle plate is 60, Due is 54
m3NutsHeight = 3.2;
xAdjOnM3Nut = 0.4;
yAdjOnM3 = (width-50)/2;
//bottom plate
module u_plate_base()
{
	translate([-(length+4)/2,0,0]) cube([length+4,width,3]);
	translate([-(length+4)/2,0,0]) cube([2,width,3+10]);
	translate([(length+4)/2-2,0,0]) cube([2,width,3+10]);

	translate([(length+4)/2-8,0,0]) cube([8,2,8]);
	translate([(length+4)/2-8,width-2,0]) cube([8,2,8]);
	translate([-(length+4)/2,0,0]) cube([8,2,8]);
	translate([-(length+4)/2,width-2,0]) cube([8,2,8]);

	translate([-8,(width/2)-11,0]) cube([16,22,15]);
	
}

module u_plate1_holes()
{
	// Motor shaft hole
	translate([length/2,width/2,24]) rotate([0,90,0]) cylinder(r=14,h=10,$fn=32,center=true);
	translate([-length/2,width/2,24]) rotate([0,90,0]) cylinder(r=14,h=10,$fn=32,center=true);

	// Motor mount holes
	translate([-(length+4)/2,9.5,5.5+3]) rotate([0,90,0]) cylinder(r=1.64,h=10,$fn=8,center=true);
	translate([-(length+4)/2,9.5+31,5.5+3]) rotate([0,90,0]) cylinder(r=1.64,h=10,$fn=8,center=true);
	translate([(length+4)/2,9.5,5.5+3]) rotate([0,90,0]) cylinder(r=1.64,h=10,$fn=8,center=true);
	translate([(length+4)/2,9.5+31,5.5+3]) rotate([0,90,0]) cylinder(r=1.64,h=10,$fn=8,center=true);

	//translate([0,width/2,0]) cylinder(r=12,h=10,$fn=24,center=true);
	translate([-30,width/2,0]) cylinder(r=14,h=10,$fn=24,center=true);
	translate([30,width/2,0]) cylinder(r=14,h=10,$fn=24,center=true);	
}

//the bottom plate
// translate([0,0,5]) rotate ([180,-180,0]) difference()

// translate([0,-25,-5]) difference()//set the y translate to -25 when exporting stl
// {
	// u_plate_base();
	// u_plate1_holes();
// }
//-654
module paded_base()
{
translate([-692,-300,0])import("./Pan_solid.stl", convexity=3);

translate([-21.87,19,2]) cube([15,2,12.64]);
}

//paded_base();