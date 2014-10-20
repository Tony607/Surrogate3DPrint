/**This the Wide angle lens mount module for C920 camera*/
//////////Height////////////
var c920LensHeight = 3.07;
var wideAngleLensBaseHeight = 3.84;
var bottomCylinderHeight = c920LensHeight + wideAngleLensBaseHeight;

var c920AFMotorCubeHeight = 5.38; //this part will be a cube with this height
var c920AFScrewHeight = 5.08;
var c920MaxSMDHeight = 1; //Surface mount component on PCB that might touch the mount
var c920AFScrewBoxHeight = c920AFScrewHeight - c920MaxSMDHeight;

var pcbThickness = 1.22;
var clipExtendedHeight = 1.3
var clipUnitHeight = pcbThickness + c920MaxSMDHeight + clipExtendedHeight;

var c920AFCubeHeightWithoutSMD =c920AFMotorCubeHeight + c920AFScrewBoxHeight;

var totalHeight = bottomCylinderHeight + c920AFMotorCubeHeight + c920AFScrewBoxHeight + clipUnitHeight;

////////////Width///////////
var wideAngleLensDiameter = 15.00
var c920AFMotorCubeWidth = 14.00;//same as length
var c920PCBOverAF = 4.21;
var c92PCBbelowAF = 0;//0.31;
var minMountWidthThickness = 2;
var totalClipWidth = c920AFMotorCubeWidth + c920PCBOverAF + c92PCBbelowAF;
var totalwidth = totalClipWidth + minMountWidthThickness*2;
//////////Length//////////
var c920AFMotorCubeLength = 14.00;
var c920AFScrewMountLength = 2.81;
var lengThthicknessBeyondScrewMount = 2;
var totalLength = c920AFMotorCubeLength + (c920AFScrewMountLength+lengThthicknessBeyondScrewMount)*2;


function lensMount() {
	return difference(
		intersection(
			cube({
				size : [totalwidth, totalLength, totalHeight+90],
				center : true, round: true
			}).translate([c920PCBOverAF/2, 0, totalHeight/2]),
			cube({
				size : [totalwidth, totalLength, totalHeight],
				center : true, round: false
			}).translate([c920PCBOverAF/2, 0, totalHeight/2])),
		union(
			cylinder({r: wideAngleLensDiameter/2, h: bottomCylinderHeight, fn: 100}),
			cube({
				size : [c920AFMotorCubeWidth,c920AFMotorCubeLength, c920AFCubeHeightWithoutSMD],
				center : true
			}).translate([0, 0, bottomCylinderHeight+c920AFCubeHeightWithoutSMD/2]),
			cube({
				size : [totalClipWidth,totalLength, clipUnitHeight+2],
				center : true
			}).translate([c920PCBOverAF/2, 0, c920AFCubeHeightWithoutSMD+bottomCylinderHeight+clipUnitHeight/2])));
}

// function lensMountX() {
	// return union(
			// cylinder({r: wideAngleLensDiameter/2, h: bottomCylinderHeight, fn: 100}),
			// cube({
				// size : [c920AFMotorCubeWidth,c920AFMotorCubeLength, c920AFCubeHeightWithoutSMD],
				// center : true
			// }).translate([0, 0, bottomCylinderHeight+c920AFCubeHeightWithoutSMD/2]),
			// cube({
				// size : [totalClipWidth,totalLength, clipUnitHeight],
				// center : true
			// }).translate([c920PCBOverAF/2, 0, c920AFCubeHeightWithoutSMD+bottomCylinderHeight+clipUnitHeight/2]));
// }

function main() {
	//put the model above the x,y plane
	return lensMount().translate([0, 0, 0]);
}
