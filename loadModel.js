const modelLoader = new THREE.GLTFLoader();

var trainerBody = null;
var trainerLaces = null;
var trainerSole = null;

var dressBody = null;
var dressLaces = null;
var dressSole = null;

var streewearBody = null;
var streewearLaces = null;
var streetwearSole = null;

function loadModels() {
    let loadedCount = 0;

    function checkAllLoaded() {
        loadedCount++;

        if (loadedCount === 9) {
            updateShoe();
        }
    }

    //Loading trainer parts
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

    //Loading dress shoe parts
    modelLoader.load("Assets/Models/Dress/DressBody.glb", function(gltf) {
        dressBody = gltf.scene;
        setupModel(dressBody);
        checkAllLoaded();
    });

    modelLoader.load("Assets/Models/Dress/DressLaces.glb", function(gltf) {
        dressLaces = gltf.scene;
        setupModel(dressLaces);
        checkAllLoaded();
    });

    modelLoader.load("Assets/Models/Dress/DressSole.glb", function(gltf) {
        dressSole = gltf.scene;
        setupModel(dressSole);
        checkAllLoaded();
    });

    //Loading Angelo's Shoe Parts (Streetwear Shoe)
    modelLoader.load("Assets/Models/AngeloShoe/AngeloBody.glb", function(gltf) {
        streewearBody = gltf.scene;
        setupModel(streewearBody);
        checkAllLoaded();
    });

    modelLoader.load("Assets/Models/AngeloShoe/AngeloLaces.glb", function(gltf) {
        streewearLaces = gltf.scene;
        setupModel(streewearLaces);
        checkAllLoaded();
    });

    modelLoader.load("Assets/Models/AngeloShoe/AngeloSole.glb", function(gltf) {
        streetwearSole = gltf.scene;
        setupModel(streetwearSole);
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