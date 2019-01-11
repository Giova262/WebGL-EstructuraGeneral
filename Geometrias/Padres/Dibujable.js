
class Dibujable{

    constructor(){

        /** Formato de vertices */
         this.drawTipo = gl.TRIANGLES;

         /** Vectores */
         this.position_list = [];
         this.texture_list = [];
         this.normal_list = [];
         this.tangente_list = [];
         this.index_list = [];
 
         /** Buffers */
         this.position_buffer = gl.createBuffer();                               
		 this.normal_buffer = gl.createBuffer();
		 this.tangente_buffer = gl.createBuffer();
		 this.texture_buffer = gl.createBuffer();
         this.index_buffer = gl.createBuffer();
    }

    setDrawType(_type){
        this.drawTipo = _type;
    }

    dibujar(){

        /** Color por defecto */
        gl.uniform3f(colorDefaultLocation,...this.color );

        /** Posiciones */
        gl.bindBuffer(gl.ARRAY_BUFFER, this.position_buffer);                   
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_list), gl.STATIC_DRAW); 
        gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0); 

        /**Normales */
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normal_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_list), gl.STATIC_DRAW);
        gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

        /** Tangentes */
        gl.bindBuffer(gl.ARRAY_BUFFER, this.tangente_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.tangente_list), gl.STATIC_DRAW);
        gl.vertexAttribPointer(vertexTangenteAttribute, 3, gl.FLOAT, false, 0, 0);

        /** Textura */
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texture_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texture_list), gl.STATIC_DRAW); 
        gl.vertexAttribPointer(vertexTextureAttribute, 2, gl.FLOAT, false, 0, 0); 

        /** Indices */
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.index_buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_list), gl.STATIC_DRAW);
        gl.drawElements( this.drawTipo , this.index_list.length, gl.UNSIGNED_SHORT, 0);

    }
}