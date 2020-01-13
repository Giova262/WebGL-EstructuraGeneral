
/** Variables Globales */

var     canvas = null;
        gl = null;
        glProgram = null;

    /** Tiempo */

        tiempo = 0.0;
        offset = 0.0;
        run = true;
    
    /** Localizaciones  */

        vertexPositionAttribute = null,
        vertexTextureAttribute = null,
        vertexNormalAttribute = null;
        vertexTangenteAttribute = null;
        modelMatrixLocation = null;
        viewMatrixLocation = null;
        projMatrixLocation = null;
        normalMatrixLocation = null;
        useTextureLocation = null;
        sampler1Location   = null;
        sampler2Location   = null;
        sampler3Location = null;
        lightPosLocation  = null;
        light2PosLocation = null;
        cameraPosLocation  = null;
        ambientColorLocation = null;
        difusaColorLocation  = null;
        specularColorLocation  = null; 
        intensidadLightLocation  = null;
        intensidadLight2Location  = null;
        kaLocation  = null;
        kdLocation  = null;
        ksLocation  = null;
        nLocation  = null;
        offsetLocation = null;
        offsetRelieveLocation = null;
        colorDefaultLocation = null;
        texturaAnimacionLocation = null;
        useNormalMapLocation = null;
        useNormalMapFragLocation = null;
        useDisplacementMapLocation = null;
      
    /** Texturas */

        ejemplo_textura = null;
        ejemplo_normal = null;
    
    /** Matrices */

        viewMatrix = mat4.create();
        projMatrix = mat4.create();
    
    /** Objetos */

        camara = null;
        prototipo = null;
        

/** Inicio */
function main(){

    initWebGL();
    initShaders();
    initLocalitations();   
    initTextures();
    configuracionInicial();
    initObjects();
    setInterval(draw,10);
}

function initObjects(){

    /** Camara */
    camara = new Camara();
    camara.event();

    /** Escena */
    prototipo = new Prototipo();
   
}

function draw(){

    /** Clear */
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      
    /** Vista */
    camara.update();

    /** Update */
    if(run){
        tiempo += 200;     
    }

    /** Offset */
    offset +=  0.0001; 
    if( offset >= 1) offset = 0.0;
    
    /** Dibujo */
    prototipo.dibujar();
}

/** Configuraciones Generales */

function initWebGL(){

    canvas= document.getElementById("canvas");

    try{
        gl = canvas.getContext("webgl");
    }catch(e){
        alert("Error al obtener el contexto");
    }
    
    if(!gl) alert(" No se puedo iniciar WebGL , Lo siento ");
    
    /** Color con el que se limpia la pantalla */
    gl.clearColor(0.0,0.7,1.0,1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.viewport(0,0, canvas.width , canvas.height);

}

function initShaders(){
     
    /** Obtengo el contenido de los shaders */
    var fs_source = document.getElementById('shader-fs').innerHTML;
        vs_source = document.getElementById('shader-vs').innerHTML;

    /** Compilo los shaders */    
    var   vertexShader = makeShader(vs_source, gl.VERTEX_SHADER);
        fragmentShader = makeShader(fs_source, gl.FRAGMENT_SHADER);
    
    /** Creo el programa de shaders */
    glProgram = gl.createProgram();
    
    /** Attach los shaders al program */
    gl.attachShader(glProgram, vertexShader);
    gl.attachShader(glProgram, fragmentShader);

    /** Linkeo para generar el ejecutable */
    gl.linkProgram(glProgram);

    if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
        alert("Unable to initialize the shader program.");
    }
    
    /** Uso el programa */
    gl.useProgram(glProgram);

}

function makeShader(src, type){

    /** Compilo shader */
    var shader = gl.createShader(type);

    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("Error compiling shader: " + gl.getShaderInfoLog(shader));
    }

    return shader;
}

function initLocalitations(){

    /** Atributos */
    vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
    vertexTextureAttribute  = gl.getAttribLocation(glProgram, "aVertexTexCoord");
    vertexNormalAttribute   = gl.getAttribLocation(glProgram, "aVertexNormal");
    vertexTangenteAttribute = gl.getAttribLocation(glProgram, "aVertexTangente");   

    /**Matices */
    modelMatrixLocation  = gl.getUniformLocation(glProgram, "uMMatrix");
    viewMatrixLocation   = gl.getUniformLocation(glProgram, "uVMatrix");
    projMatrixLocation   = gl.getUniformLocation(glProgram, "uPMatrix");
    normalMatrixLocation = gl.getUniformLocation(glProgram, "uNMatrix");

    /** Samplers */
    sampler1Location = gl.getUniformLocation(glProgram, "uTexturaSampler");
    sampler2Location = gl.getUniformLocation(glProgram, "uNormalSampler");
    sampler3Location = gl.getUniformLocation(glProgram, "uDisplacementSampler");

    /** Phong */
    colorDefaultLocation = gl.getUniformLocation(glProgram, "color_default");
    lightPosLocation  = gl.getUniformLocation(glProgram, "ulightPos");
    light2PosLocation = gl.getUniformLocation(glProgram, "ulightPos2");  
    cameraPosLocation     = gl.getUniformLocation(glProgram, "uCameraPos");
    ambientColorLocation  = gl.getUniformLocation(glProgram, "ambient_color");
    difusaColorLocation   = gl.getUniformLocation(glProgram, "difusa_color");
    specularColorLocation = gl.getUniformLocation(glProgram, "specular_color");      
    intensidadLightLocation  = gl.getUniformLocation(glProgram, "intensidad");
    intensidadLight2Location = gl.getUniformLocation(glProgram, "intensidad2");       
    kaLocation = gl.getUniformLocation(glProgram, "ka");
    kdLocation = gl.getUniformLocation(glProgram, "kd");
    ksLocation = gl.getUniformLocation(glProgram, "ks");
    nLocation  = gl.getUniformLocation(glProgram, "n");
	
	/** Relieve Offset */
    offsetRelieveLocation = gl.getUniformLocation(glProgram, "offsetRelieve");
    
    /** Animacion */
    offsetLocation = gl.getUniformLocation(glProgram, "offset");

    /** Condicionales */
    useTextureLocation         = gl.getUniformLocation(glProgram, "useTexture");
    texturaAnimacionLocation   = gl.getUniformLocation(glProgram, "useTextureAnimacion");
    useNormalMapLocation       = gl.getUniformLocation(glProgram, "useNormalMapVertex");
    useNormalMapFragLocation   = gl.getUniformLocation(glProgram, "useNormalMapFragment");
    useDisplacementMapLocation = gl.getUniformLocation(glProgram, "useDisplacementMap");
    
}

function configuracionInicial(){

     /** Configuracion Luz */
     gl.uniform1f(intensidadLightLocation ,10.0);
     gl.uniform1f(intensidadLight2Location,0);
 
     gl.uniform3f(specularColorLocation,...[1,1,1] );
     gl.uniform3f(ambientColorLocation ,...[1,1,1] );
     gl.uniform3f(difusaColorLocation  ,...[1,1,1] );
  
     gl.uniform3f(lightPosLocation , ...[0,0,50] );
     gl.uniform3f(light2PosLocation, ...[0,0,0]  );
 
     /** Configuracion de Proyeccion */
     mat4.identity(projMatrix);
     mat4.perspective(projMatrix, 45,1200/800, 0.1, 2000.0);
     gl.uniformMatrix4fv(projMatrixLocation, false, projMatrix);
 
     /* Activo atributos*/
     gl.enableVertexAttribArray(vertexPositionAttribute);
     gl.enableVertexAttribArray(vertexTangenteAttribute);
     gl.enableVertexAttribArray(vertexNormalAttribute);
     gl.enableVertexAttribArray(vertexTextureAttribute);
}


function initTextures(){

    /** Mapas de Texturas */
    ejemplo_textura  = getTexture("ejemplo-textura");
        
    /** Mapas de Normales */         
    ejemplo_normal = getTexture("ejemplo-normal");    
     
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


