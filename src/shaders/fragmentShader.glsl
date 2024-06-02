uniform float uTime;
uniform sampler2D uPerlinTexture;

varying vec2 vUv; // this is the uv mapping from vertex shader (the coordinate of the pixel x-y)


void main() {

    //scale and animate
    // Note we cannot modify varings (kinda like const)
    vec2 smokeUV = vUv;
    smokeUV.x *= 0.5; // only use the left half of texture
    smokeUV.y *= 0.3; // Has a strecthcing effect (cos we only using 30% of it)
    smokeUV.y -= uTime*0.13;

    // picks color from texture at uv coordinate
    // only pick the R value
    float smoke = texture(uPerlinTexture, smokeUV).r;

    //Remap to make the empties emptier and smooth the transition
    smoke = smoothstep(0.4,1.0,smoke);
    // returns a vaslue 0-1 clamped
    // so essentially any value less <0.4 -> 0 but more smooth 

    //edges

    // fade the edges to remove the line
    // remove eges on leftr and right smooth
    smoke *= smoothstep(0.0,0.1,vUv.x);
    smoke *= smoothstep(1.0,0.9,vUv.x);
    //remove edges on bottom and top smooth
    smoke *= smoothstep(0.0,0.1,vUv.y);
    smoke *= smoothstep(1.0,0.4,vUv.y);


    //final color
    gl_FragColor = vec4(0.6,0.3,0.2, smoke);



    // this enables on runtime from renderer
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    //color will look strange if this is not included
}