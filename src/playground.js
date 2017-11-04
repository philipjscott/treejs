var THREE = require('three')

var camera, scene, renderer;
init();
animate();
function init() {
  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.set( 0, 75, 100 );
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x003300 );
  var geometry = new THREE.PlaneBufferGeometry( 100, 100 );
  var texture = new THREE.CanvasTexture( generateTexture() );
  for ( var i = 0; i < 20; i ++ ) {
    var material = new THREE.MeshBasicMaterial( {
      color: new THREE.Color().setHSL( 0.3, 0.75, ( i / 15 ) * 0.4 + 0.1 ),
      map: texture,
      depthTest: false,
      depthWrite: false,
      transparent: true
    } );
    var mesh = new THREE.Mesh( geometry, material );
    mesh.position.y = i * 0.25;
    mesh.rotation.x = - Math.PI / 2;
    scene.add( mesh );
  }
  //scene.children.reverse();
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  //
  window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
function generateTexture() {
  var canvas = document.createElement( 'canvas' );
  canvas.width = 512;
  canvas.height = 512;
  var context = canvas.getContext( '2d' );
  for ( var i = 0; i < 20000; i ++ ) {
    context.fillStyle = 'hsl(0,0%,' + ( Math.random() * 50 + 50 ) + '%)';
    context.beginPath();
    context.arc( Math.random() * canvas.width, Math.random() * canvas.height, Math.random() + 0.15, 0, Math.PI * 2, true );
    context.fill();
  }
  context.globalAlpha = 0.075;
  context.globalCompositeOperation = 'lighter';
  return canvas;
}
//
function animate() {
  requestAnimationFrame( animate );
  render();
}
function render() {
  var time = Date.now() / 6000;
//  camera.position.x = 80 * Math.cos( time );
//  camera.position.z = 80 * Math.sin( time );
  camera.lookAt( scene.position );
  for ( var i = 0, l = scene.children.length; i < l; i ++ ) {
    var mesh = scene.children[ i ];
    mesh.position.x = Math.sin( time * 4 ) * i * i * 0.005;
    mesh.position.z = Math.cos( time * 6 ) * i * i * 0.005;
  }
  renderer.render( scene, camera );
}
