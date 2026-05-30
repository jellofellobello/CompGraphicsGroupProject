// Global time variable for customiser animation.
var time = 0;

function animateShoe() {
    if (!shoeGroup) return;

    if (!isDraggingShoe) {
        if (autoRotateEnabled) {
            shoeGroup.rotation.y += autoRotateSpeed;
        }

        shoeGroup.rotation.y += dragRotationVelocity;
        dragRotationVelocity *= 0.92;

        if (Math.abs(dragRotationVelocity) < 0.00005) {
            dragRotationVelocity = 0;
        }
    }
}

function animateRotatingBase() {
    if (!rotatingBase) return;
    rotatingBase.rotation.y += 0.0022;
}

/* Main animation loop. */
function animate() {
    requestAnimationFrame(animate);

    time += 0.01;
    animateShoe();
    animateRotatingBase();

    controls.update();
    renderer.render(scene, camera);
}
