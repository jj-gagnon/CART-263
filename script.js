import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBB } from 'three/addons/math/OBB.js';

console.log('------------------')

const width = window.innerWidth, height = window.innerHeight;

// init


const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 1000);

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




var box_height = Math.random() * 4,
	box_width = 0.2

var geometry = new THREE.BoxGeometry(box_width, box_height, box_width);
// geometry.translate(0, box_height / 2, 0)
geometry.computeBoundingBox()

const material = new THREE.MeshNormalMaterial();


let first_segment = new THREE.Mesh(geometry, material)
// scene.add(first_segment)

var g = new THREE.Group()
g.add(first_segment)
scene.add(g)

var coord = new THREE.AxesHelper()
scene.add(coord)

first_segment.userData.height = box_height

var previous_mesh = first_segment

create_obbs([first_segment])


var objects = []
objects.push(first_segment)

var line_counter = 0

while (line_counter < 30) {
	
	var box_height = ((Math.random()) ** 6) * 4 + box_width *1.5
	

	geometry = new THREE.BoxGeometry(box_width, box_height, box_width)
	geometry.computeBoundingBox()

	var mesh_line_seg = new THREE.Mesh(geometry, material);
	mesh_line_seg.userData.height = box_height

	var pivot = new THREE.Group()
	previous_mesh.add(pivot)
	
	pivot.position.y = previous_mesh.userData.height / 2


	pivot.add(mesh_line_seg)


	mesh_line_seg.position.y = box_height / 2

	var z_rot_limit = (Math.PI / 90) * 15
	pivot.rotation.z = THREE.MathUtils.mapLinear(
		Math.random(),
		0,
		1,
		Math.PI * -1 + z_rot_limit,
		Math.PI - z_rot_limit
	)

	pivot.rotation.y = Math.PI * Math.random() * 2

	create_obbs([mesh_line_seg])


	var obb = mesh_line_seg.userData.obb

	var is_intersecting = false

	for (let i = 0; i < objects.length - 1; i++) {

		if (obb.intersectsOBB(
			objects[i].userData.obb)) {
			console.log("intersecting detected")
			is_intersecting = true

			break
		}
	}

	if (!is_intersecting) {

		objects.push(mesh_line_seg)

		previous_mesh = mesh_line_seg
		line_counter += 1

	} else {
		previous_mesh.remove(pivot)

	}


}


function test_meshes() {

	var objects = []
	var mesh_1_box_height = 3
	var mesh_1_geo = new THREE.BoxGeometry(1, mesh_1_box_height, 1)

	mesh_1_geo.computeBoundingBox()

	console.log("bounding box")
	console.log(mesh_1_geo.boundingBox)



	var mesh_1 = new THREE.Mesh(mesh_1_geo, material)
	// mesh_1.userData.y_trans = y_trans

	var pivot = new THREE.Group()
	scene.add(pivot)


	pivot.add(mesh_1)


	// mesh_1.position.x = -1
	mesh_1.position.y += mesh_1_box_height / 2

	pivot.rotation.z += 1

	var mesh_2_box_height = 2
	var mesh_2_geo = new THREE.BoxGeometry(1, 2, 1)
	mesh_2_geo.computeBoundingBox()
	var mesh_2 = new THREE.Mesh(mesh_2_geo, material)

	var pivot_2 = new THREE.Group()
	mesh_1.add(pivot_2)
	pivot_2.position.y += mesh_1_box_height / 2
	pivot_2.add(mesh_2)
	mesh_2.position.y += mesh_2_box_height / 2
	pivot_2.rotation.z += 1


	objects.push(mesh_1)
	objects.push(mesh_2)
	create_obbs(objects)
	create_obb_helpers(objects)
}






create_obbs(objects)

function create_obbs(meshes) {

	scene.traverse((c) => {
		c.updateMatrixWorld()
	})


	for (const mesh of meshes) {
		mesh.userData.obb = new OBB()
		mesh.userData.obb.fromBox3(mesh.geometry.boundingBox)
		var m = mesh.matrixWorld

		mesh.userData.obb.applyMatrix4(m)
	}
}






// create_obb_helpers(objects)

function create_obb_helpers(meshes) {
	const helper_material = new THREE.MeshBasicMaterial({ color: "purple", wireframe: true });

	for (const mesh of meshes) {
		var obbHelper_geo = new THREE.BoxGeometry(1, 1, 1)

		obbHelper_geo.scale(
			mesh.userData.obb.halfSize.x * 2,
			mesh.userData.obb.halfSize.y * 2,
			mesh.userData.obb.halfSize.z * 2
		)

		var obbHelper = new THREE.Mesh(obbHelper_geo, helper_material);

		obbHelper.position.copy(mesh.userData.obb.center);


		var m = new THREE.Matrix4()
		m.setFromMatrix3(mesh.userData.obb.rotation)
		obbHelper.rotation.setFromRotationMatrix(m);

		scene.add(obbHelper)
	}


}



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


	scene.traverse((object) => {


		if ("obb" in object.userData) {
			const obb = object.userData.obb;

			const ray = raycaster.ray;

			if (obb.intersectRay(ray, intersectionPoint) !== null) {

				const distance = ray.origin.distanceTo(intersectionPoint);
				object.material = new THREE.MeshBasicMaterial({ color: "red" })

			} else {
				object.material = material
			}
		}

	})

}

function animate(time) {


	time = time * 0.001


	controls.update();
	renderer.render(scene, camera);

}
