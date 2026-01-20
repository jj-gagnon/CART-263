import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const width = window.innerWidth, height = window.innerHeight;

// init

const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 100);
// camera.position.z = 10;
// camera.position.y = 3;
camera.position.z = 1;
camera.position.y = 4;
const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setClearColor(new THREE.Color(1, 1, 1))
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);



const controls = new OrbitControls(camera, renderer.domElement);

controls.target = new THREE.Vector3(0, camera.position.y / 2, 0)






var box_height = 2,
	box_width = 0.02;
var geometry = new THREE.BoxGeometry(box_width, box_height, box_width);
// geometry.translate(0, box_height / 2, 0)
const material = new THREE.MeshNormalMaterial();

// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// mesh.userData.x = box_height


// var mesh_2 = new THREE.Mesh(geometry, material);

// mesh_2.position.y = box_height * 1.1

// mesh_2.geometry.translate(0, box_height, 0)
// mesh_2.rotation.z = Math.PI * Math.random() * 2

// mesh_2.rotation.y = Math.PI * Math.random() * 0.5

var g = new THREE.Group()
scene.add(g)
// scene.add(mesh_2)
var coord = new THREE.AxesHelper()
scene.add(coord)
var previous_mesh = g

for (let i = 0; i < 100; i++) {
	// geometry = new THREE.BoxGeometry(box_width, Math.random() * box_height, box_width)
	var prev_box_height = box_height
	// box_height = Math.random()**20 + 0.1
	box_height = Math.random()

	// box_height = 4
	geometry = new THREE.BoxGeometry(box_width, box_height, box_width)

	geometry.translate(0, box_height / 2, 0)


	var mesh_2 = new THREE.Mesh(geometry, material);


	mesh_2.position.y = prev_box_height



	var z_rot_limit = (Math.PI / 90) * 15
	mesh_2.rotation.z = THREE.MathUtils.mapLinear(
		Math.random(),
		0,
		1,
		Math.PI * -1 + z_rot_limit,
		Math.PI - z_rot_limit
	)
	
	mesh_2.rotation.y = Math.PI * Math.random() * 2


	// mesh_2.rotation.x = Math.PI * Math.random() * 2
	previous_mesh.add(mesh_2)
	previous_mesh = mesh_2




}









function animate(time) {

	// mesh.rotation.x = time / 2000;
	// mesh.rotation.y = time / 1000;
	time = time * 0.001
	// mesh.rotation.y = time

	// mesh.traverse(function(a){
	// mesh.children.forEach(function (a) {
	// a.rotateY(0.001)
	// })

	controls.update();
	renderer.render(scene, camera);

}