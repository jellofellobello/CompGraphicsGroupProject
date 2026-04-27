const modelLoader = new THREE.GLTFLoader();

var trainerBody = null;
var trainerLaces = null;
var trainerSole = null;

function loadModels() {
    let loadedCount = 0;

    function checkAllLoaded() {
        loadedCount++;

        if (loadedCount === 3) {
            updateShoe();
        }
    }

    modelLoader.load("Assets/Models/Trainer/TrainerBody.glb", function(gltf) {
        trainerBody = gltf.scene;
        setupModel(trainerBody);
        checkAllLoaded();
    });

    modelLoader.load("Assets/Models/Trainer/TrainerLaces.glb", function(gltf) {
        trainerLaces = gltf.scene;
        setupModel(trainerLaces);
        checkAllLoaded();
    });

    modelLoader.load("Assets/Models/Trainer/TrainerSole.glb", function(gltf) {
        trainerSole = gltf.scene;
        setupModel(trainerSole);
        checkAllLoaded();
    });
}

function setupModel(model) {
    model.scale.set(3, 3, 3);
    model.position.set(0, 3, 3);

    model.traverse(function(child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
}