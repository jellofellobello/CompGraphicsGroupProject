const modelLoader = new THREE.GLTFLoader();

var streewearBody = null;
var streewearLaces = null;
var streetwearSole = null;

var dressBody = null;
var dressSole = null;

function loadModels(){
    var loadedCount = 0;

    function checkAllLoaded(){
        loadedCount++;

        if (loadedCount === 3){
            shoeGroup.add(streewearBody);
            shoeGroup.add(streewearLaces);
            shoeGroup.add(streetwearSole);
            alignShoeToBase();
            applySettings();
        }
    }

    // Loading Angelo's shoe parts
    modelLoader.load("Assets/Models/AngeloShoe/AngeloBody.glb", function(gltf){
        streewearBody = gltf.scene;
        setupModel(streewearBody);
        checkAllLoaded();
    });

    modelLoader.load("Assets/Models/AngeloShoe/AngeloLaces.glb", function(gltf){
        streewearLaces = gltf.scene;
        setupModel(streewearLaces);
        checkAllLoaded();
    });

    modelLoader.load("Assets/Models/AngeloShoe/AngeloSole.glb", function(gltf){
        streetwearSole = gltf.scene;
        setupModel(streetwearSole);
        checkAllLoaded();
    });

    //Dress Shoe
    modelLoader.load("Assets/Models/AngeloDress/AngeloDressBody.glb", function(gltf){
        dressBody = gltf.scene;
        setupModel(dressBody);
        checkAllLoaded();
    });

    modelLoader.load("Assets/Models/AngeloDress/AngeloDressSole.glb", function(gltf){
        dressSole = gltf.scene;
        setupModel(dressSole);
        checkAllLoaded();
    });
}

function setupModel(model){
    model.scale.set(3, 3, 3);
    model.position.set(0, 0, 0);
}
