/** Clindro clase */

class Cilindro{

    constructor(radio,alto){

        /** Detalle */
        this.FILAS = 60;
        this.COLUMNAS = 60;
        this.alto = alto;
        this.radio = radio;
        

        /** Datos */
		this.position_buffer = [];
        this.color_buffer = [];
        this.index_buffer = [];

        /** Buffers */
        this.verticeBuffer = null,
        this.colorBuffer = null;
        this.indexBuffer = null;

        /** Init */
        this.init();

    }

    init(){

        var tapa = false ;
        var piso = true ;

        /** Datos de Posiciones y Colores */
        for(var i = 0.0 ; i< this.COLUMNAS ; i++){

            var v = i / this.COLUMNAS;
            
            if( i == (this.COLUMNAS-1) ) tapa = true ;
            if( i != 0.0 ) piso = false ;

            for(var j = 0.0 ; j< this.FILAS ; j++){

                if( tapa ){  

                    var x = 0;
                    var y = 0;
                    var z = v * this.alto  ;

                }else if(piso){

                    var x = 0;
                    var y = 0;
                    var z = 0;

                }else {
                    var x = this.radio * Math.cos(j * Math.PI * 2 / (this.COLUMNAS - 1));
                    var y = this.radio * Math.sin(j * Math.PI * 2 / (this.COLUMNAS - 1));
                    var z = v * this.alto  ;
                }

        		this.position_buffer.push(x);
        		this.position_buffer.push(y);
                this.position_buffer.push(z);
              
                this.color_buffer.push(0.8);
                this.color_buffer.push(0.7);
                this.color_buffer.push(0.8);
            }
        }

        /** Datos de Indices */
        var jump = 0 ;

        for(var i = 0.0 ; i< this.COLUMNAS -1 ; i++){
            for(var j = 0.0 ; j< this.FILAS-1 ; j++){
                this.index_buffer.push(j + jump );
                this.index_buffer.push(this.FILAS + j+ jump );
                this.index_buffer.push(j+1+ jump );

                this.index_buffer.push(j+1 + jump );
                this.index_buffer.push( this.FILAS + j+ jump );
                this.index_buffer.push( this.FILAS + j + 1+ jump );
            }

            jump = jump + this.FILAS;
        }


        /** Creo buffer de Vertices */
        this.verticeBuffer = gl.createBuffer();                               
        gl.bindBuffer(gl.ARRAY_BUFFER, this.verticeBuffer);                   
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);   
        
        /** Creo buffer de Color */
        this.colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.color_buffer), gl.STATIC_DRAW);    
   
        /** Creo buffer de Indices */
        this.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_buffer), gl.STATIC_DRAW);
   
    }

    dibujar(){

        /** Posiciones */
        gl.enableVertexAttribArray(vertexPositionAttribute);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.verticeBuffer);
        gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    
        /** Colores */
        gl.enableVertexAttribArray(vertexColorAttribute);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.vertexAttribPointer(vertexColorAttribute, 3, gl.FLOAT, false, 0, 0);
    
        /** Indices */
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.drawElements( gl.TRIANGLES, this.index_buffer.length, gl.UNSIGNED_SHORT, 0);
 
    }

}