
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
        this.useTexturaNormal = false;
        this.useLines = false;
        this.useLight = true;

        /** Listas de datos */
        this.position_list = [];
        this.color_list = [];
        this.textura_list = [];
        this.normal_list = [];
        this.tangente_list = [];
        this.index_list = [];

        /** Buffers */
        this.position_buffer = [];
        this.color_buffer = [];
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

        /** Posiciones */
        gl.enableVertexAttribArray(vertexPositionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.position_buffer);
        gl.vertexAttribPointer(vertexPositionLocation, 3, gl.FLOAT, false, 0, 0);
    
        /** Colores */
        gl.enableVertexAttribArray(vertexColorLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.color_buffer);
        gl.vertexAttribPointer(vertexColorLocation, 3, gl.FLOAT, false, 0, 0);

        /** Dibujar */
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.index_buffer);
        gl.drawElements( gl.LINE_STRIP, this.index_list.length, gl.UNSIGNED_SHORT, 0);    
    }


}