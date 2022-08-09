function initGL() {
  const canvas = document.querySelector('#cube');
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

 gl.useProgram(shaderProgram)

 return shaderProgram;
}


// // 我們畫圖的邏輯一律在 draw function 裡頭
function draw(gl) {

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, 3);
}

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

function main() {
 var gl = initGL();
 var shaderProgram = initShaders(gl);
 createPoints(gl, shaderProgram);
 draw(gl);
}

main();
