var geometry = new THREE.BoxGeometry( 1, 1, 1, 32, 32, 32 );
for (var i in geometry.ertices){
	var vertex = geometry.vertices[i];
	vertex.normalize().multiplyScalar(radius);
}

var materialArray = [];
for (var i = 0; i < 6; i++){
	var faceMaterial = new THREE.MeshPhongMaterial();
	faceMaterial.map = createMap(i); //see  github for implimentation
	materialArray.push(faceMaterial);
}

var sphereMaterial = new THREE.MeshFaceMaterial(materialArray);
