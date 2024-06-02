
varying vec2 vUv;

void main() {


    //final position 
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    // Note the uv value is hidden by magic here we want to pass the uv mapping to frag shader
    // So we are adding a varying to pass the value to the frag shader

    // Varryings
    vUv = uv;
}