#version 120
uniform float amount;

varying vec2 imageCoord;

uniform vec2 textureSize;
uniform vec2 imageSize;
uniform sampler2D sampler0;


void main()
{
	vec2 uv = imageCoord;
	float pixelation = 1.0 / amount;
	float ratio = imageSize.x / imageSize.y;
	float u = (floor(uv.x / pixelation) * pixelation + pixelation * 0.5) / textureSize.x * imageSize.x;
	pixelation = ratio / amount;
	float v = (floor(uv.y / pixelation) * pixelation + pixelation * 0.5) / textureSize.y * imageSize.y;
	gl_FragColor = texture2D( sampler0, vec2(u, v) );
}
