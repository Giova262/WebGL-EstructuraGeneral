
/** Variables Globales */     //TENGO UNA MESCLAS DE INGLES Y ESPAÑOL EN VARIABLES ARREGLARLO!

  var   canvas = null;
        gl = null;
        glProgram = null;

    /** Objetos */

        pelota = null;
        superficie = null;
        superficie2 = null;
        superficie3 = null;
        superficie4 = null;
        camara= null;

    /**Matrices */

        viewMatrix = mat4.create();
        projMatrix = mat4.create();

    /**Localizaciones */

        vertexPositionLocation = null;
        vertexNormalLocation   = null;
        vertexTangenteLocation = null;
        vertexTexturaLocation  = null;       
        modelMatrixLocation    = null;
        viewMatrixLocation     = null;
        projectMatrixLocation  = null;
        normalMatrixLocation   = null;      
        lighPositionLocation   = null;
        cameraPositionLocation = null; 
        ambienteColorLocation  = null;
        difusaColorLocation    = null;
        specularColorLocation  = null;
        intensidadLocation     = null;
        kaLocation = null;
        kdLocation = null;
        ksLocation = null;
        nLocation  = null;
        colorDefaultLocation = null;     
        offsetLocation       = null;         
        useNormalVertexLocation      = null;
        useNormalFragmentLocation    = null;
        useAnimacionLocation         = null;
        useDisplacementLocation      = null;
        useTextureLocation           = null;
        samplerDisplacementLocation  = null;
        samplerTexturaLocation       = null;
        samplerTexturaNormalLocation = null;
    
/** Inicio */

function main(){

    initWebGL();
    initShaders();
    initLocations();
    initTextures();
    initObjetos();
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

function initLocations(){

    /** Atributos */
    vertexPositionLocation = gl.getAttribLocation(glProgram,"aVertexPosition");
    vertexNormalLocation   = gl.getAttribLocation(glProgram,"aVertexNormal");
    vertexTangenteLocation = gl.getAttribLocation(glProgram,"aVertexTangente");
    vertexTexturaLocation  = gl.getAttribLocation(glProgram,"aVertexTexCoord");
   
    /** Matrices */
    modelMatrixLocation   = gl.getUniformLocation(glProgram,"uMMatrix");
    viewMatrixLocation    = gl.getUniformLocation(glProgram,"uVMatrix");
    projectMatrixLocation = gl.getUniformLocation(glProgram,"uPMatrix");
    normalMatrixLocation  = gl.getUniformLocation(glProgram,"uNMatrix");

    /** Iluminacion */
    lighPositionLocation   = gl.getUniformLocation(glProgram,"ulightPos");
    cameraPositionLocation = gl.getUniformLocation(glProgram,"uCameraPos"); 
    ambienteColorLocation = gl.getUniformLocation(glProgram,"ambient_color");
    difusaColorLocation   = gl.getUniformLocation(glProgram,"difusa_color");
    specularColorLocation = gl.getUniformLocation(glProgram,"specular_color");
    intensidadLocation = gl.getUniformLocation(glProgram,"intensidad");
    kaLocation = gl.getUniformLocation(glProgram,"ka");
    kdLocation = gl.getUniformLocation(glProgram,"kd");
    ksLocation = gl.getUniformLocation(glProgram,"ks");
    nLocation  = gl.getUniformLocation(glProgram,"n");
    colorDefaultLocation = gl.getUniformLocation(glProgram,"color_default");

    /**Animacion */
    offsetLocation = gl.getUniformLocation(glProgram,"offset"); 
   
    /**Condicionales */
    useNormalVertexLocation = gl.getUniformLocation(glProgram,"useNormalMapVertex");
    useNormalFragmentLocation = gl.getUniformLocation(glProgram,"useNormalMapFragment");
    useAnimacionLocation = gl.getUniformLocation(glProgram,"useTextureAnimacion");
    useDisplacementLocation = gl.getUniformLocation(glProgram,"useDisplacementMap");
    useTextureLocation = gl.getUniformLocation(glProgram,"useTexture");

    /**Sampler */
    samplerDisplacementLocation = gl.getUniformLocation(glProgram,"uDisplacementSampler");
    samplerTexturaLocation = gl.getUniformLocation(glProgram,"uTexturaSampler");
    samplerTexturaNormalLocation = gl.getUniformLocation(glProgram,"uNormalSampler");

}

function initTextures(){

    /** Mapa Difuso */
    tierraTextura = getTexture("tierra-textura");

    /** Mapa Normales */
    tierraNormalMap = getTexture("tierra-normal"); 

}

function getTexture(_url){

    var texturaTemp = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texturaTemp);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(
           gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
           gl.UNSIGNED_BYTE,
           document.getElementById(_url)
    );

    return texturaTemp;
}

function initObjetos(){
    
    /** Camara */
    camara = new Camara();

    /** Objetos */
    //var geometria1 = new Esfera(2,2,40,40,[0.2,0.7,0.5]);
    var geometria2 = new Plano(20,20,40,40,[0.6,0.5,0.1]);
    //var geometria3 = new Dona(60,60,2*Math.PI,5,20,1,10);
    
    geometria2.linesStripDraw(false);
    geometria2.setTexture(tierraTextura,tierraNormalMap);
    geometria2.usetextura(true);

    superficie = new Objeto(geometria2);

    /** Configuraciones  */         //Ponerlo apartes
    superficie.trasladar([0,0,5]);
    superficie.phong(0.1,3,2,60);

    /** Configuracion Luz */
    gl.uniform1f(intensidadLocation,10.0);
    gl.uniform3f(specularColorLocation,...[1,1,1] );
    gl.uniform3f(ambienteColorLocation,...[1,1,1] );
    gl.uniform3f(difusaColorLocation,...[1,1,1] );
    gl.uniform3f(lighPositionLocation, ...[0,0,25]  );
   

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
    superficie.dibujar();
}