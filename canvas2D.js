function initGL() {
  const canvas = document.querySelector('#basic');
  const gl = canvas.getContext('webgl');
 
  gl.viewport(0,0, canvas.width, canvas.height);
  gl.clearColor(1,1,1,1); // clearColor 在顏色被清除後畫布要剩下哪些顏色，需要跟 gl.clear 一起使用 => clearColor(1.0(R), 1.0(G), 1.0(B), 1.0(Opacity)) 
 
  return gl;
}

function createShaders(gl, type) {
 var shaderScript = '';
 var shader;

 switch(type) {
   case 'fragment':
     shaderScript = document.querySelector('#shader-fs').textContent;
     shader = gl.createShader(gl.FRAGMENT_SHADER); // createShader 方法可以建立 shader 以用在後續的shadersource 或是 compileshader 中 => createShaer(type)
     // 其中 type 只接受 fragment_shader 或是 vertex_shader
     break;
   case 'vertex':
     shaderScript = document.querySelector('#shader-vs').textContent;
     shader = gl.createShader(gl.VERTEX_SHADER);
     break;
 }

 gl.shaderSource(shader, shaderScript); // shadersource 方法可以建立著色器的 source code => shadersource(shader, source)
 gl.compileShader(shader); // 將GLSL的著色器編譯成二進位碼可讓webglProgram使用
 
 return shader;
}

function initShaders(gl) {
 var vertexShader = createShaders(gl, 'vertex');
 var fragmentShader = createShaders(gl, 'fragment');
 
 var shaderProgram = gl.createProgram(); // createprogram 初始化一個新的 webglProgram
 gl.attachShader(shaderProgram, vertexShader); // attachshader 將前面所編譯出的二進位碼與webglProgram做連結
 gl.attachShader(shaderProgram, fragmentShader);
 gl.linkProgram(shaderProgram); // linkprogram連結param裡面放著的webglProgram並完成描繪頂點著色器與片段著色器的gpu code

//  var isSuccessful = gl.getProgramParameter(shaderProgram, gl.LINK_STATUS);
//  if(!isSuccessful) {
//    throw Error();
//  }
 gl.useProgram(shaderProgram)

 return shaderProgram;
}

function initShaders(gl) {
  var vertexShader = createShaders(gl, 'vertex');
  var fragmentShader = createShaders(gl, 'fragment');
  
  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);
  
  return shaderProgram;
 }

// // 我們畫圖的邏輯一律在 draw function 裡頭
function draw(gl) {
  for (let i = 0; i < POINTS_COUNT * 2; i += 2) {
    vertices[i] += Math.random() * 0.01 - 0.005;
    vertices[i + 1] += Math.random() * 0.01 - 0.005;
  }

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, 3);
}


// function main() {
//  var gl = initGL();
//  const shaderProgram = initShaders(gl);
//  createPoints(gl, shaderProgram);
//  draw(gl);
// }

function createPoints(gl, program) {
  var points = gl.getAttribLocation(program, "position");
  var size = gl.getAttribLocation(program, "size");
  var vertices = [
     -0.9, -0.9, 0.0, // point1
     0.9, -0.9, 0.0, // point2
     0.0,  0.9, 0.0 //point3
  ];
  
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  //                 type                    data              usage
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
  
  
  // gl.vertexAttrib3f(points, 0.0, 0, 0);
   // gl.vertexAttrib3f(points, 0, 0, 0);
  // 使用 gl.vertexAttribPointer 來指向指標
  // 我們需要告訴它，每個頂點將有三個值 X，Y，Z ，它們是浮點數。
  // 後面三個參數分別為 normalized, type stride
  // 之後會再討論，暫時先不理他
  gl.vertexAttribPointer(points, 3, gl.FLOAT, false, 0 , 0);
  gl.enableVertexAttribArray(points);
  gl.vertexAttrib1f(size, 100.0);
  
  var color = gl.getUniformLocation(program, "color");
  gl.uniform4f(color, 0,1,0,1);
}

// main();
// function main() {
//   const canvas = document.querySelector('#basic');
//   const gl = canvas.getContext('webgl');

//   if (gl === null) {
//     alert("Unable to initialize WebGL. Your browser or machine may not support it.");
//     return;
//   }

//   gl.clearColor(1.0, 0.85, 0.2, 3);
//   gl.clear(gl.COLOR_BUFFER_BIT);
// }

// window.onload = main;

// main();

// //
// // Start here
// //
// function main() {
//   const canvas = document.querySelector('#basic');
//   const gl = canvas.getContext('webgl');

//   // If we don't have a GL context, give up now

//   if (!gl) {
//     alert('Unable to initialize WebGL. Your browser or machine may not support it.');
//     return;
//   }

//   // Vertex shader program

//   const vsSource = `
//     attribute vec4 aVertexPosition;
//     uniform mat4 uModelViewMatrix;
//     uniform mat4 uProjectionMatrix;
//     void main() {
//       gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
//     }
//   `;

//   // Fragment shader program

//   const fsSource = `
//     void main() {
//       gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
//     }
//   `;

//   // Initialize a shader program; this is where all the lighting
//   // for the vertices and so forth is established.
//   const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

//   // Collect all the info needed to use the shader program.
//   // Look up which attribute our shader program is using
//   // for aVertexPosition and look up uniform locations.
//   const programInfo = {
//     program: shaderProgram,
//     attribLocations: {
//       vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
//     },
//     uniformLocations: {
//       projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
//       modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
//     },
//   };

//   // Here's where we call the routine that builds all the
//   // objects we'll be drawing.
//   const buffers = initBuffers(gl);

//   // Draw the scene
//   drawScene(gl, programInfo, buffers);
// }

// //
// // initBuffers
// //
// // Initialize the buffers we'll need. For this demo, we just
// // have one object -- a simple two-dimensional square.
// //
// function initBuffers(gl) {

//   // Create a buffer for the square's positions.

//   const positionBuffer = gl.createBuffer();

//   // Select the positionBuffer as the one to apply buffer
//   // operations to from here out.

//   gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

//   // Now create an array of positions for the square.

//   const positions = [
//      1.0,  1.0,
//     -1.0,  1.0,
//      1.0, -1.0,
//     -1.0, -1.0,
//   ];

//   // Now pass the list of positions into WebGL to build the
//   // shape. We do this by creating a Float32Array from the
//   // JavaScript array, then use it to fill the current buffer.

//   gl.bufferData(gl.ARRAY_BUFFER,
//                 new Float32Array(positions),
//                 gl.STATIC_DRAW);

//   return {
//     position: positionBuffer,
//   };
// }

// //
// // Draw the scene.
// //
// function drawScene(gl, programInfo, buffers) {
//   gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
//   gl.clearDepth(1.0);                 // Clear everything
//   gl.enable(gl.DEPTH_TEST);           // Enable depth testing
//   gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

//   // Clear the canvas before we start drawing on it.

//   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

//   // Create a perspective matrix, a special matrix that is
//   // used to simulate the distortion of perspective in a camera.
//   // Our field of view is 45 degrees, with a width/height
//   // ratio that matches the display size of the canvas
//   // and we only want to see objects between 0.1 units
//   // and 100 units away from the camera.

//   const fieldOfView = 45 * Math.PI / 180;   // in radians
//   const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
//   const zNear = 0.1;
//   const zFar = 100.0;
//   const projectionMatrix = glMatrix.mat4.create();

//   // note: glmatrix.js always has the first argument
//   // as the destination to receive the result.
//   glMatrix.mat4.perspective(projectionMatrix,
//                    fieldOfView,
//                    aspect,
//                    zNear,
//                    zFar);

//   // Set the drawing position to the "identity" point, which is
//   // the center of the scene.
//   const modelViewMatrix = glMatrix.mat4.create();

//   // Now move the drawing position a bit to where we want to
//   // start drawing the square.

//   glMatrix.mat4.translate(modelViewMatrix,     // destination matrix
//                  modelViewMatrix,     // matrix to translate
//                  [-0.0, 0.0, -6.0]);  // amount to translate

//   // Tell WebGL how to pull out the positions from the position
//   // buffer into the vertexPosition attribute.
//   {
//     const numComponents = 2;
//     const type = gl.FLOAT;
//     const normalize = false;
//     const stride = 0;
//     const offset = 0;
//     gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
//     gl.vertexAttribPointer(
//         programInfo.attribLocations.vertexPosition,
//         numComponents,
//         type,
//         normalize,
//         stride,
//         offset);
//     gl.enableVertexAttribArray(
//         programInfo.attribLocations.vertexPosition);
//   }

//   // Tell WebGL to use our program when drawing

//   gl.useProgram(programInfo.program);

//   // Set the shader uniforms

//   gl.uniformMatrix4fv(
//       programInfo.uniformLocations.projectionMatrix,
//       false,
//       projectionMatrix);
//   gl.uniformMatrix4fv(
//       programInfo.uniformLocations.modelViewMatrix,
//       false,
//       modelViewMatrix);

//   {
//     const offset = 0;
//     const vertexCount = 4;
//     gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
//   }
// }

// //
// // Initialize a shader program, so WebGL knows how to draw our data
// //
// function initShaderProgram(gl, vsSource, fsSource) {
//   const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
//   const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

//   // Create the shader program

//   const shaderProgram = gl.createProgram();
//   gl.attachShader(shaderProgram, vertexShader);
//   gl.attachShader(shaderProgram, fragmentShader);
//   gl.linkProgram(shaderProgram);

//   // If creating the shader program failed, alert

//   if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
//     alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
//     return null;
//   }

//   return shaderProgram;
// }

// //
// // creates a shader of the given type, uploads the source and
// // compiles it.
// //
// function loadShader(gl, type, source) {
//   const shader = gl.createShader(type);

//   // Send the source to the shader object

//   gl.shaderSource(shader, source);

//   // Compile the shader program

//   gl.compileShader(shader);

//   // See if it compiled successfully

//   if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
//     alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
//     gl.deleteShader(shader);
//     return null;
//   }

//   return shader;
// }

// function initGL() {
//   const canvas = document.querySelector('#basic');
//   const gl = canvas.getContext('webgl');
 
//   gl.viewport(0, 0, canvas.width, canvas.height);
//   gl.clearColor(1,1,1,1);
 
//   return gl;
// }

// function draw(gl) {
//  gl.clear(gl.COLOR_BUFFER_BIT);
//  gl.drawArrays(gl.POINTS, 0, 3);
// }

// shader
// OpenGL Shader
// GLSL

// vec4 vector 3 x,y,z w
// function createShaders(gl, type) {
//  var shaderScript = '';
//  var shader;

//  switch(type) {
//    case 'fragment':
//      shaderScript = document.querySelector('#shader-fs').textContent;
//      shader = gl.createShader(gl.FRAGMENT_SHADER);
//      break;
//    case 'vertex':
//      shaderScript = document.querySelector('#shader-vs').textContent;
//      shader = gl.createShader(gl.VERTEX_SHADER);
//      break;
//  }

//  gl.shaderSource(shader, shaderScript);
//  gl.compileShader(shader);
 
//  return shader;
// }

// function createPoints(gl, program) {
//  var points = gl.getAttribLocation(program, "position");
//  var size = gl.getAttribLocation(program, "size");
//  var vertices = [
//     -0.9, -0.9, 0.0, // point1
//     0.9, -0.9, 0.0, // point2
//     0.0,  0.9, 0.0 //point3
//  ];
 
//  var buffer = gl.createBuffer();
//  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
//  //                 type                    data              usage
//  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
 
 
//  // gl.vertexAttrib3f(points, 0.0, 0, 0);
//   // gl.vertexAttrib3f(points, 0, 0, 0);
//  // 使用 gl.vertexAttribPointer 來指向指標
//  // 我們需要告訴它，每個頂點將有三個值 X，Y，Z ，它們是浮點數。
//  // 後面三個參數分別為 normalized, type stride
//  // 之後會再討論，暫時先不理他
//  gl.vertexAttribPointer(points, 3, gl.FLOAT, false, 0 , 0);
//  gl.enableVertexAttribArray(points);
//  gl.vertexAttrib1f(size, 100.0);
 
//  var color = gl.getUniformLocation(program, "color");
//  gl.uniform4f(color, 0,1,0,1);
// }

function createVertices(gl, program) {
 
}

function main() {
 var gl = initGL();
 var shaderProgram = initShaders(gl);
 createPoints(gl, shaderProgram);
 draw(gl);
}

main();
