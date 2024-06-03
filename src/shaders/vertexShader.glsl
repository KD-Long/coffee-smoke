uniform float uTime;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

vec2 rotate2D(vec2 value, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    mat2 m = mat2(c, s, -s, c);
    return m * value;
}

void main() {

    vec3 newPosition = position;

    //twist
    // user perlin noise to randomise the twist
    float twistPerlin = texture(
            uPerlinTexture, 
            vec2(0.5, uv.y * 0.2 - uTime*0.005)
        ).r;
    // EXPLAINED: if texture were to be mapped on uv we want the x positon 0.5
    // and the y based on the vertex y essentially taking a vertical line sample of the perlin 
    // * 0.2 reduces the frequency of the twists

    float angle = 10.0 * twistPerlin ; // *10 increases the amplitude
    newPosition.xz = rotate2D(newPosition.xz, angle);

    //wind
    vec2 windoffset = vec2(
        texture(uPerlinTexture,vec2(0.25,uTime*0.005)).r -0.5, // values go from 0-1 this means -0.5 sets it to range from -.5 to .5
        texture(uPerlinTexture,vec2(0.15,uTime*0.005)).r -0.5 
        
    );
    windoffset *= 10.0 * pow(uv.y,2.0);
    newPosition.xz += windoffset;


    //final position 
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

    // Note the uv value is hidden by magic here we want to pass the uv mapping to frag shader
    // So we are adding a varying to pass the value to the frag shader

    // Varryings
    vUv = uv;

}