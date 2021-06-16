#define PI 3.14159265

varying vec4 color;
varying vec2 imageCoord;
uniform float time;
uniform vec2 resolution;
uniform vec2 textureSize;
uniform vec2 imageSize;
uniform sampler2D sampler0;

vec2 img2tex( vec2 v ) { return v / textureSize * imageSize; }

void main()
{
	vec2 uv = imageCoord;

	uv = (uv - 0.5) * 2.0;
	uv.x *= 1.0 + pow(uv.y / PI, 2.0);
	uv.y *= 1.0 + pow(uv.x / PI, 2.0);
	uv = uv * 1.01;
	uv = uv * 0.5 + 0.5;

	vec2 texel = 0.5 / resolution;

	if ( mod(floor(uv.x * resolution.x),2.0) == 0.0 )
		uv.y += texel.y;

	vec3 col = texture2D( sampler0, img2tex(uv) ).rgb;
	col.r = texture2D( sampler0, img2tex(uv - texel / 2.0) ).r;
	col.b = texture2D( sampler0, img2tex(uv + texel / 2.0) ).b;

	col *= 1.0 - sin(PI * uv.x * resolution.x / 1.0) * 0.5;
	col *= 2.0 - cos(PI * uv.y * resolution.y / 2.0) * 0.5;

	col *= 1.0 - fract(sin(uv.y + time * 0.5)) * 0.5;
	col *= 1.0 - length(0.5 - uv) * 0.6;

	if ( min(uv.x,uv.y) < 0.0 || max(uv.x,uv.y) > 1.0 )
		col = vec3(0.0);

	gl_FragColor = vec4( col, 1.0 ) * color;
}
