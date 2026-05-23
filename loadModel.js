const modelLoader = new THREE.GLTFLoader();

var bodySelect = 0;
var laceSelect = 0;
var soleSelect = 0;

var shoeModelBody = [];
var shoeModelLaces = [];
var shoeModelSole = [];

var loadAllBody = [
    "Assets/Models/AngeloShoe/AngeloBody.glb",
    "Assets/Models/AngeloDress/AngeloDressBody.glb"
];

var loadAllLaces = [
    "Assets/Models/AngeloShoe/AngeloLaces.glb"
];

var loadAllSole = [
    "Assets/Models/AngeloShoe/AngeloSole.glb",
    "Assets/Models/AngeloDress/AngeloDressSole.glb"
];

function loadModels(){
    var loadedCount = 0;

    var totalModels =
        loadAllBody.length +
        loadAllLaces.length +
        loadAllSole.length;

    function checkAllLoaded(){
        loadedCount++;

        if (loadedCount === totalModels){
            shoeGroup.add(shoeModelBody[bodySelect]);
            shoeGroup.add(shoeModelLaces[laceSelect]);
            shoeGroup.add(shoeModelSole[soleSelect]);

            alignShoeToBase();
            applySettings();
        }
    }

    var bodyOffsets = [
        { x: 0, y: 0, z: 0 },
        { x: 1.5, y: 0, z: -0.5 }
    ];

    var laceOffsets = [
        { x: 0, y: 0, z: 0 }
    ];

    var soleOffsets = [
        { x: 3, y: 3, z: 0 },
        { x: 1.5, y: 0, z: -0.5 }
    ];


    for (let i = 0; i < loadAllBody.length; i++){
        modelLoader.load(loadAllBody[i], function(gltf){
            shoeModelBody[i] = gltf.scene;
            setupModel(shoeModelBody[i]);

            shoeModelBody[i].position.set(
                bodyOffsets[i].x,
                bodyOffsets[i].y,
                bodyOffsets[i].z
            );

            checkAllLoaded();
        });
    }

    for (let i = 0; i < loadAllLaces.length; i++){
        modelLoader.load(loadAllLaces[i], function(gltf){
            shoeModelLaces[i] = gltf.scene;
            setupModel(shoeModelLaces[i]);
            checkAllLoaded();
        });
    }

    for (let i = 0; i < loadAllSole.length; i++){
        modelLoader.load(loadAllSole[i], function(gltf){
            shoeModelSole[i] = gltf.scene;
            setupModel(shoeModelSole[i]);
            checkAllLoaded();
        });
    }

    // Loading Angelo's shoe parts
    /*modelLoader.load("Assets/Models/AngeloShoe/AngeloBody.glb", function(gltf){
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
    });*/

}

function updateShoeModel(){
    if (!shoeGroup) return;

    while (shoeGroup.children.length > 0){
        shoeGroup.remove(shoeGroup.children[0]);
    }

    shoeGroup.add(shoeModelBody[bodySelect]);
    shoeGroup.add(shoeModelLaces[laceSelect]);
    shoeGroup.add(shoeModelSole[soleSelect]);

    alignShoeToBase();
    applySettings();
}

function setupModel(model){
    model.scale.set(3, 3, 3);
    model.position.set(0, 0, 0);
}