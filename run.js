/* Define the main run function to start the project.
 * - setup the scene
 * - build the shoe customiser objects
 * - build the customisation GUI
 * - attach resize event handler
 * - render the first frame
 * - start the animation loop
 */
function run(){
    setScene();
    addShapes();
    buildGui();

    window.addEventListener("resize", resizeScene);
    renderer.render(scene, camera);
    animate();
}

run();
