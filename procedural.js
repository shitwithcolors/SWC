var camera, scene, renderer, mesh = [];
var geometry, material;
var delta = 0;
var zIndex = 0;
var numMeshes = 0;

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera( 75, 1.92, 0.1, 1000 );
  camera.position.z = 5;

  scene = new THREE.Scene();

  geometry = new THREE.SphereGeometry( 5, 32, 32 );
  material = new THREE.MeshBasicMaterial( { color: 0xdbad84  } );
  // парс ит лайк э про
  numMeshes = generate(zIndex,numMeshes);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeights );
  document.body.appendChild( renderer.domElement );
}

function animate() {
  requestAnimationFrame( animate );
  camera.position.z -= 0.02;
  delta += 0.01;
  if(delta >= 0.5) {
    delta = 0;
    zIndex--;
    numMeshes = generate(zIndex,numMeshes);
  }
  renderer.render( scene, camera );
}

function generate(z,num) {
  var level = seed(9,9,15);
  var yIndex = -4;
  for(var i = 0; i < level.length; i++) {
    var xIndex = -4;
    for(var j = 0; j < level[i].length; j++) {
      if(level[i][j]) {
        mesh.push(new THREE.Mesh( geometry, material ));
        mesh[num].position.x = xIndex;
        mesh[num].position.y = yIndex;
        mesh[num].position.z = z;
        scene.add( mesh[num] );
        xIndex++;
        level[i][j]--;
        num++;
      }
    }
    yIndex++;    
  }
  return num; 
}

// зе сид функшон генерейтс эррей, сьютабл фор generate()-функшон
function seed(w,h,d) {
  var level = [];
  var space = 0;
  for(var i = 0; i < w; i++) {
    level.push([]);    
    for(var j = 0; j < h; j++) {
      if(!d || space) {
        level[i].push(0);
        space = 0;
      } else {
        // нотис хау а вроут зис синг белоу (еа, айм эн эсоул)
        level[i].push(Math.floor(Math.random() * (1 - 0 + 1)) + 0);
        space = 1;      
      }
      if(level[i][j]) {
        d--;
      }
    }
  }
  return level;
}