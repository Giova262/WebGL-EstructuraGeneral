
class Dibujable{

    constructor(_ancho,_alto,_filas,_columnas,_color){

        /** Detalles */
        this.ancho = _ancho;
        this.alto = _alto;
        this.filas = _filas;
        this.columnas = _columnas;
        this.color = _color;
        this.textura = null;
        this.texturaNormal = null;

        /** Condicionales */
        this.useTextura = false;
        this.useNormalMap = false;
        this.useLines = false;
        this.useLight = true; //Falta este

        /** Listas de datos */
        this.position_list = [];
        this.textura_list = [];
        this.normal_list = [];
        this.tangente_list = [];
        this.index_list = [];

        /** Buffers */
        this.position_buffer = [];
        this.textura_buffer = [];
        this.normal_buffer = [];
        this.tangente_buffer = [];
        this.index_buffer = [];   
    }


    initIndex(){
    
        /** Lista de indicces */
        for (var i = 0; i < this.columnas; i ++ ) {
            for ( var j = 0; j < this.filas; j ++ ) {
    
                var a = j + (this.filas + 1) * i;
                var b = j + (this.filas + 1) * ( i + 1 );
                var c = ( j + 1 ) + (this.filas + 1) * ( i + 1 );
                var d = ( j + 1 ) + (this.filas + 1) * i;
    
                this.index_list.push( a, b, d );
                this.index_list.push( b, c, d );
            }
        } 

        /** Creo buffer de Indices */
        this.index_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.index_buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_list), gl.STATIC_DRAW);

    }

    dibujar(){

        /** Color Defecto */
        gl.uniform3f(colorDefaultLocation,...this.color );

        /** Posiciones */
        gl.enableVertexAttribArray(vertexPositionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.position_buffer);
        gl.vertexAttribPointer(vertexPositionLocation, 3, gl.FLOAT, false, 0, 0);

        /** Tangente */
        gl.enableVertexAttribArray(vertexTangenteLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.tangeteBuffer);
        gl.vertexAttribPointer(vertexTangenteLocation, 3, gl.FLOAT, false, 0, 0);
              
        /** Normales */
        gl.enableVertexAttribArray(vertexNormalLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
        gl.vertexAttribPointer(vertexNormalLocation, 3, gl.FLOAT, false, 0, 0);
        
        if(this.useTextura){

            gl.uniform1i(useTextureLocation, true);
                // Textura
            gl.enableVertexAttribArray(vertexTexturaLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.textureBuffer);
            gl.vertexAttribPointer(vertexTexturaLocation, 2, gl.FLOAT, false, 0, 0);

                // Mapa difuso     
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.textura);
            gl.uniform1i(samplerTexturaLocation, 0);

                //Mapa de normal( Aca poner el correspondiente Mapa)
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, this.texturaNormal);
            gl.uniform1i(samplerTexturaNormalLocation, 1);

                //Mapa de displacement( Aca poner el correspondiente Mapa)
            gl.activeTexture(gl.TEXTURE2);
            gl.bindTexture(gl.TEXTURE_2D, this.texturaNormal);
            gl.uniform1i(samplerDisplacementLocation, 2);

        }else{
            gl.uniform1i(useTextureLocation, false);
			gl.disableVertexAttribArray(vertexTexturaLocation);
        }
    
        /** Dibujar */
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.index_buffer);
        if(this.useLines){
            gl.drawElements( gl.LINE_STRIP, this.index_list.length, gl.UNSIGNED_SHORT, 0);    
        }else{
            gl.drawElements( gl.TRIANGLE_STRIP, this.index_list.length, gl.UNSIGNED_SHORT, 0);
        }     
    }


}