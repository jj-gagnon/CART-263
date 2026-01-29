import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBB } from 'three/addons/math/OBB.js';

console.log('------------------')

const width = window.innerWidth, height = window.innerHeight;

// init


const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 100);

camera.position.z = 10;
camera.position.y = 4;
const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setClearColor(new THREE.Color(1, 1, 1))
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);



const controls = new OrbitControls(camera, renderer.domElement);

controls.target = new THREE.Vector3(0, camera.position.y / 2, 0)




var box_height = 0,
	box_width = 0.08;
var geometry = new THREE.BoxGeometry(box_width, box_height, box_width);

const material = new THREE.MeshNormalMaterial();


var g = new THREE.Group()
scene.add(g)

var coord = new THREE.AxesHelper()
scene.add(coord)
var previous_mesh = g

var obbs = []
var objects = []

for (let i = 0; i < 5; i++) {
	var prev_box_height = box_height
	box_height = Math.random() * 4

	geometry = new THREE.BoxGeometry(box_width, box_height, box_width)

	var mesh_line_seg = new THREE.Mesh(geometry, material);

	geometry.translate(0, box_height / 2, 0)

	mesh_line_seg.userData.obb = new OBB()
	geometry.computeBoundingBox()
	mesh_line_seg.userData.obb.fromBox3(geometry.boundingBox)



	mesh_line_seg.position.y = prev_box_height

	var z_rot_limit = (Math.PI / 90) * 15
	mesh_line_seg.rotation.z = THREE.MathUtils.mapLinear(
		Math.random(),
		0,
		1,
		Math.PI * -1 + z_rot_limit,
		Math.PI - z_rot_limit
	)

	// mesh_line_seg.matrixAutoUpdate= false

	// console.log(mesh_line_seg.matrixWorld)

	mesh_line_seg.rotation.y = Math.PI * Math.random() * 2
	mesh_line_seg.updateMatrixWorld(true)
	// mesh_line_seg.updateWorldMatrix()
	// console.log(mesh_line_seg.matrixWorld)




	// previous_mesh.add(mesh_line_seg)
	previous_mesh = mesh_line_seg

	mesh_line_seg.updateMatrixWorld()
	mesh_line_seg.userData.obb.applyMatrix4(mesh_line_seg.matrixWorld)

	for (const obb of obbs) {
		if (mesh_line_seg.userData.obb.intersectsOBB(obb)) {
			// console.log('interesect')
		}
	}
	obbs.push(mesh_line_seg.userData.obb)
	objects.push(mesh_line_seg)





}
// for (const obb of obbs) {
// console.log(obb)
// }
// console.log(obbs)





var mesh_1_geo = new THREE.BoxGeometry(1, 1, 1)
mesh_1_geo.computeBoundingBox()
var mesh_1 = new THREE.Mesh(mesh_1_geo, material)


var mesh_2_geo = new THREE.BoxGeometry(2, 2, 2)
mesh_2_geo.computeBoundingBox()
var mesh_2 = new THREE.Mesh(mesh_2_geo, material)



// mesh_1.userData.obb = new OBB()
// mesh_1_geo.computeBoundingBox()

// mesh_1.userData.obb.fromBox3(mesh_1_geo.boundingBox)
// mesh_1.userData.obb.applyMatrix4(mesh_1.matrixWorld)


// mesh_2.userData.obb = new OBB()
// mesh_2_geo.translate(1.1, 0, 0)
// mesh_2_geo.computeBoundingBox()
// mesh_2.userData.obb.fromBox3(mesh_2_geo.boundingBox)
// mesh_2.position.x = 1.0000
// mesh_2.updateMatrixWorld()

// mesh_2.userData.obb.applyMatrix4(mesh_2.matrixWorld)

mesh_1.position.x = -2
mesh_1.position.y = 2

mesh_2.position.x = 2.1

objects = []


// mesh_2.add(mesh_1)
// mesh_1.add(mesh_2)

// scene.add(mesh_1)
// scene.add(mesh_1)

var mesh_3_geo = new THREE.BoxGeometry(1,4,2)
mesh_3_geo.computeBoundingBox()
var mesh_3 = new THREE.Mesh(mesh_3_geo, material)

mesh_2.add(mesh_3)
objects.push(mesh_3)

objects.push(mesh_2)
objects.push(mesh_1)

mesh_1.rotation.z = 2

mesh_1.add(mesh_2)

scene.add(mesh_1)
// scene.add(mesh_2)


// mesh_1.add(mesh_2)


// scene.add(mesh_1)






create_obbs(objects)

function create_obbs(meshes) {
	for (const mesh of meshes) {
		mesh.updateMatrixWorld()
	}

	for (const mesh of meshes) {
		mesh.userData.obb = new OBB()
		mesh.userData.obb.fromBox3(mesh.geometry.boundingBox)

		mesh.userData.obb.applyMatrix4(mesh.matrixWorld)
	}
}






create_obb_helpers(objects)

function create_obb_helpers(meshes) {
	const helper_material = new THREE.MeshBasicMaterial({ color: "purple", wireframe: true});

	for (const mesh of meshes) {
		var obbHelper = new THREE.Mesh(mesh.geometry, helper_material);
		obbHelper.position.copy(mesh.userData.obb.center);

		var m = new THREE.Matrix4()
		m.setFromMatrix3(mesh.userData.obb.rotation)
		// obbHelper.rotation.setFromRotationMatrix(mesh.userData.obb.rotation);
		obbHelper.rotation.setFromRotationMatrix(m);

		// console.log(mesh.userData.obb.rotation)
		// obbHelper.scale.copy(mesh.userData.obb.halfSize).multiplyScalar(2);
		scene.add(obbHelper)
	}

	// var obbHelper = new THREE.Mesh(, helper_material);
	// obbHelper.position.copy(obb.center);


	// console.log(obb.rotation.elements)
	// var elements = obb.rotation.elements
	// for (let i = 0; i < elements.length; i ++){
	// 	if (elements[i] < 0.001){
	// 		elements[i] = 0
	// 	}
	// }
	// console.log(obb.rotation)
	// obb.rotation.set([
	// 0,0,0,0,0,0,0,0,0
	// 1,1,1,1,1,1,1,1,1
	// ])
	// console.log(obb.rotation)
	// obbHelper.rotation.setFromRotationMatrix(obb.rotation);
	// obbHelper.setFromRotationMatrix(obb.rotation);
	// console.log(obbHelper.rotation)


	// obbHelper.scale.copy(obb.halfSize).multiplyScalar(2);

}




// var bool = mesh_1.userData.obb.intersectsOBB(mesh_2.userData.obb)
// // console.log(bool)




var mouse = {};
document.addEventListener('mousemove', onDocumentMouseMove, false);


var raycaster = new THREE.Raycaster();

function onDocumentMouseMove(event) {
	event.preventDefault();
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	raycaster.setFromCamera(mouse, camera);

	const intersectionPoint = new THREE.Vector3();
	const intersections = [];

	for (let i = 0, il = objects.length; i < il; i++) {

		const object = objects[i];
		const obb = object.userData.obb;

		const ray = raycaster.ray;

		if (obb.intersectRay(ray, intersectionPoint) !== null) {

			const distance = ray.origin.distanceTo(intersectionPoint);
			// intersections.push({ distance: distance, object: object });
			object.material = new THREE.MeshBasicMaterial({ color: "red" })
			// console.log("mesh")

		} else {
			object.material = new THREE.MeshBasicMaterial({ color: "blue" })
		}

	}

}


const helper_geo = new THREE.BoxGeometry(1, 1, 1);
// const helper_material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const helper_material = new THREE.MeshBasicMaterial({ color: "purple" });
var obbHelper;
for (const obb of obbs) {
	obbHelper = new THREE.Mesh(helper_geo, helper_material);
	obbHelper.position.copy(obb.center);


	// console.log(obb.rotation.elements)
	var elements = obb.rotation.elements
	// for (let i = 0; i < elements.length; i ++){
	// 	if (elements[i] < 0.001){
	// 		elements[i] = 0
	// 	}
	// }
	// console.log(obb.rotation)
	// obb.rotation.set([
	// 0,0,0,0,0,0,0,0,0
	// 1,1,1,1,1,1,1,1,1
	// ])
	// console.log(obb.rotation)
	// obbHelper.rotation.setFromRotationMatrix(obb.rotation);
	// obbHelper.setFromRotationMatrix(obb.rotation);
	// console.log(obbHelper.rotation)


	obbHelper.scale.copy(obb.halfSize).multiplyScalar(2);
	// scene.add(obbHelper)
}

obbHelper = new THREE.Mesh(helper_geo, helper_material);
// scene.add(obbHelper)


function animate(time) {


	time = time * 0.001
	


	// mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	// mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

	// raycaster.setFromCamera(mouse, camera);

	// const intersectionPoint = new THREE.Vector3();
	// const intersections = [];

	// for (let i = 0, il = objects.length; i < il; i++) {

	// 	const object = objects[i];
	// 	const obb = object.userData.obb;

	// 	const ray = raycaster.ray;

	// 	if (obb.intersectRay(ray, intersectionPoint) !== null) {

	// 		const distance = ray.origin.distanceTo(intersectionPoint);
	// 		intersections.push({ distance: distance, object: object });

	// 	}

	// }


	controls.update();
	renderer.render(scene, camera);

}