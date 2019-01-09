//class SuperficieDeRevolucion{
class SRCBezier{

    constructor(_puntosCurva,_puntosRevolucion,_angulo){

           /** Detalles */
           this.color = [0,0,0];
           this.puntosCurva = _puntosCurva;
           this.puntosRevolucion = _puntosRevolucion;
           this.puntosControl = [];
           this.curva = [];
           this.tramos = 1;
           this.angulo = _angulo;
   
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

    getPuntoBezier(_u,_p0,_p1,_p2,_p3){

        /** Ecuacion Cubica de Bezier */
        var B0 = Math.pow( (1-_u),3.0 );
        var B1 = 3*_u * Math.pow( (1-_u),2.0 );
        var B2 = 3*(1-_u) * Math.pow( _u,2.0 );
        var B3 = Math.pow( _u ,3.0 );

        var x = B0*_p0[0]+ B1*_p1[0]+ B2*_p2[0]+ B3*_p3[0];
        var y = B0*_p0[1]+ B1*_p1[1]+ B2*_p2[1]+ B3*_p3[1];
        var z = B0*_p0[2]+ B1*_p1[2]+ B2*_p2[2]+ B3*_p3[2];

        return [x,y,z];
    }

    initGeometria(){

        /** Puntos de la Curva */
        for(var indice_tramo = 0; indice_tramo < this.puntosControl.length; indice_tramo = indice_tramo + 4 ) {
         
            var punto1 = this.puntosControl[indice_tramo + 0];
			var punto2 = this.puntosControl[indice_tramo + 1];
            var punto3 = this.puntosControl[indice_tramo + 2];
            var punto4 = this.puntosControl[indice_tramo + 3];       
                 
            for(var i=0; i< (this.puntosCurva / this.tramos); i++){      

                var u = (i )/ ( (this.puntosCurva/ this.tramos) -1);
                this.curva.push( ... this.getPuntoBezier(u,punto1,punto2,punto3,punto4) );    
            } 	
        }   

        /** Posicion/Normales/UV/Tangentes/Color */
        for(var i=0 ; i < this.curva.length ; i = i +3){

            for(var j=0 ; j<this.puntosRevolucion;j++){

                var posicion = vec3.fromValues(this.curva[i], this.curva[i+1], this.curva[i+2]);
               
                //Matrix de rotacion ( Aca puedo implentar Barrido con traslado)
                var matrix = mat4.create();
                mat4.identity(matrix);
                mat4.rotate(matrix,matrix, j * this.angulo /(this.puntosRevolucion-1), [0.0, 0.0, 1.0]);
                    //mat4.translate(matrix, matrix, [0,i,j]);
                    //mat4.scale(matrix, matrix, [1,1,1]);
                vec3.transformMat4(posicion, posicion, matrix);
             
                //Posicion/color
				this.position_list.push(...[posicion[0], posicion[1], posicion[2]]);
                this.color_list.push(...this.color);           
            } 
        }

        /** Lista de indices */
        var jump = 0 ;

        for(var i = 0 ; i< this.puntosCurva -1 ; i++){
            for(var j = 0 ; j< this.puntosRevolucion-1 ; j++){

                this.index_list.push(j + jump );
                this.index_list.push(this.puntosRevolucion + j + jump );    
            }
            jump = jump + this.puntosRevolucion;        
        }    


        /** Creo buffer de Posiciones */
        this.position_buffer = gl.createBuffer();                               
        gl.bindBuffer(gl.ARRAY_BUFFER, this.position_buffer);                   
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_list), gl.STATIC_DRAW);   
            
        /** Creo buffer de Color */
        this.color_buffer = gl.createBuffer();                               
        gl.bindBuffer(gl.ARRAY_BUFFER, this.color_buffer);                   
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.color_list), gl.STATIC_DRAW);   

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