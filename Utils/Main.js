
        /** Variables Globales */

var     canvas = null;
        gl = null;
        glProgram = null;

        pelota = null;
        superficie = null;
        superficie2 = null;
        superficie3 = null;
        superficie4 = null;
        camara= null;

        viewMatrix = mat4.create();
        projMatrix = mat4.create();

        vertexPositionLocation = null;
        vertexColorLocation = null;    
        modelMatrixLocation = null;
        viewMatrixLocation = null;
        projectMatrixLocation = null;
    

        /** Inicio */

function main(){

    initWebGL();
    initShaders();
    variablesLocation();
    initObjetcs();
    setInterval(draw,10);

}

function initWebGL(){
    canvas = document.getElementById("canvas");

    try{
        gl = canvas.getContext("webgl");
    }catch(e){
        alert("No se pudo obtener el contexto del canvas");
    }

    if(!gl) alert("No se pudo iniciar WebGl");

    // Hago un clear aca ?
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.viewport(0,0, canvas.clientWidth, canvas.height);
}

function initShaders(){

    var fs_source = document.getElementById('shader-fs').innerHTML;
        vs_source = document.getElementById('shader-vs').innerHTML;

    var fragmentShader = makeShader(fs_source,gl.FRAGMENT_SHADER);
          vertexShader = makeShader(vs_source,gl.VERTEX_SHADER);

    glProgram = gl.createProgram(); 

    gl.attachShader(glProgram,vertexShader);
    gl.attachShader(glProgram,fragmentShader);

    gl.linkProgram(glProgram);

    if(!gl.getProgramParameter(glProgram,gl.LINK_STATUS)) alert("No se pudo inicializar el shaderProgram");

    gl.useProgram(glProgram);
}

function makeShader(src,type){

    var shader = gl.createShader(type);

    gl.shaderSource(shader,src);
    gl.compileShader(shader);

    if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
        alert("Fallo al compilar el shader"+ gl.getShaderInfoLog(shader));
    }

    return shader;
}

function variablesLocation(){

    /** Atributos */
    vertexPositionLocation = gl.getAttribLocation(glProgram,"aVertexPosition");
    vertexColorLocation = gl.getAttribLocation(glProgram,"aVertexColor");

    /** Matrices */
    modelMatrixLocation = gl.getUniformLocation(glProgram,"uMM");
    viewMatrixLocation = gl.getUniformLocation(glProgram,"uVM");
    projectMatrixLocation = gl.getUniformLocation(glProgram,"uPM");

}

function initObjetcs(){
    
    /** Camara */
    camara = new Camara();

    /** Objetos */
    var geometria1 = new Esfera(2,2,80,80,[0,0,0]);
    superficie = new Objeto(geometria1);

    var geometria2 = new Plano(20,20,40,40,[0,0,0]);
    superficie2 = new Objeto(geometria2);

    var geometria3 = new Dona(60,60,2*Math.PI,2,50,1,4);
    superficie3 = new Objeto(geometria3);


    /** Configuraciones  */
    superficie.trasladar([0,0,5]);

    mat4.identity(projMatrix);
    mat4.perspective(projMatrix, 45,1200/800, 0.1, 2000.0);
    gl.uniformMatrix4fv(projectMatrixLocation, false, projMatrix);
      
}

function draw(){

    /** Clear screen */
    gl.clearColor(1.0,1.0,1.0,1.0);

    /** Update */
    camara.event();
    camara.update();

    /** Draw */
    superficie2.dibujar();
    superficie3.dibujar();
    superficie.dibujar();
}