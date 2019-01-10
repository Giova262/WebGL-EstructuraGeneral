class Plano extends Dibujable{

    constructor(_ancho,_alto,_filas,_columnas,_color ){
        
        super(_ancho,_alto,_filas,_columnas,_color);

        this.initBuffers();

        this.initIndex();
    }

    initBuffers(){
        
        /** Lleno listas */

        var mitadAncho = this.ancho / 2;
        var mitadAlto = this.alto / 2;
    
        var anchoSegmento = this.ancho / this.filas;
        var altoSegmento = this.alto / this.columnas;
    
        for (var i = 0; i < this.columnas+1; i ++ ) {
    
            var y = ( i * altoSegmento ) - mitadAlto;
    
            for ( var j = 0; j < this.filas+1; j ++ ) {
    
                var x = ( j * anchoSegmento )- mitadAncho;

                /** Vertice Propiedades */
                this.position_list.push( ...[x,  y, 0] );

                this.normal_list.push(...[0,0,1]);
                this.tangente_list.push(...[0,1,0]);

                this.textura_list.push( j / this.filas  );
                this.textura_list.push( 1 - ( i / this.columnas ) );
            }
        }

        /** Creo buffer de Posiciones */
        this.position_buffer = gl.createBuffer();                               
        gl.bindBuffer(gl.ARRAY_BUFFER, this.position_buffer);                   
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_list), gl.STATIC_DRAW);   
                   
        /**Creo buffer de normales */
		this.normalBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_list), gl.STATIC_DRAW);
   
        /**Creo buffer de tangente */
		this.tangeteBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.tangeteBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.tangente_list), gl.STATIC_DRAW);
   
        /** creo buffer de textura */
		this.textureBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textura_list), gl.STATIC_DRAW);    
  
    }

    linesStripDraw(_condicion){
        this.useLines = _condicion;
    }

    setTexture(_textura,_texturaNormal){
        this.textura = _textura;
        this.texturaNormal = _texturaNormal;
    }

    usetextura(_condicion){
        this.useTextura = _condicion;
    }

 
    
}