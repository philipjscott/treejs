var THREE = require('three')

var scene = new THREE.Scene()
scene.background = new THREE.Color( 0x6aa2fc )
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

var geometry = new THREE.BoxGeometry(1, 1, 1)
var material = new THREE.MeshNormalMaterial({ color: 0x00ff00 })
var cube = new THREE.Mesh(geometry, material)
scene.add(cube)

camera.position.z = 3

function animate () {
  cube.rotation.x += 0.01
  cube.rotation.y += 0.03
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()