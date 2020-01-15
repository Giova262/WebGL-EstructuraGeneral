
class SuperficieDeRevolucion extends Dibujable{

    constructor(_puntosCurva,_puntosRevolucion,_angulo,_color){
        
        super();
    
        /** Detalles */
        this.color = _color;
        this.puntosCurva = _puntosCurva; // es el paso en la curva osea el u
        this.puntosRevolucion = _puntosRevolucion;
        this.puntosControl = [];
        this.curva = [];
        this.curvaTangentes = [];
        this.tramos = 1;
        this.angulo = _angulo;     
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

    getTangenteBezier(_u,_p0,_p1,_p2,_p3){

        /** Ecuacion Cubica de Bezier derivada */
        var B0 = -(3*_u*_u)+(6*_u)-3;
        var B1 = (9*_u*_u)-(12*_u)+3;
        var B2 = -(9*_u*_u)+(6*_u);
        var B3 = 3*_u*_u;

        var x = B0*_p0[0]+ B1*_p1[0]+ B2*_p2[0]+ B3*_p3[0];
        var y = B0*_p0[1]+ B1*_p1[1]+ B2*_p2[1]+ B3*_p3[1];
        var z = B0*_p0[2]+ B1*_p1[2]+ B2*_p2[2]+ B3*_p3[2];

        return [x,y,z];
    }

    getPuntoBSpline(_u,_p0,_p1,_p2,_p3){

        /** Ecuacion Cubica de B-Spline */
    }

    initGeometria(){

        /** Puntos de la Curva */
        for(var indice_tramo = 0; indice_tramo < this.puntosControl.length; indice_tramo = indice_tramo + 4 ) {
         
            var punto1 = this.puntosControl[indice_tramo + 0];
			var punto2 = this.puntosControl[indice_tramo + 1];
            var punto3 = this.puntosControl[indice_tramo + 2];
            var punto4 = this.puntosControl[indice_tramo + 3];       
                 
            for(var i=0; i< (this.puntosCurva / this.tramos); i++){      

                var u = (i )/ ( (this.puntosCurva/ this.tramos) -1); // Paso en la curva u
                this.curva.push( ... this.getPuntoBezier(u,punto1,punto2,punto3,punto4) );    // con ese u pido la posicion en el espacio segundo bezier
                this.curvaTangentes.push(... this.getTangenteBezier(u,punto1,punto2,punto3,punto4));
            } 	
        }   

        //Despues de crear la curva osea el perfil ahora aplico la revolucion

        /** Atributos */
        for(var i=0 ; i < this.curva.length ; i = i +3){

            for(var j=0 ; j<this.puntosRevolucion;j++){

                var posicion = vec3.fromValues(this.curva[i], this.curva[i+1], this.curva[i+2]);
                var tangente = vec3.fromValues(this.curvaTangentes[i], this.curvaTangentes[i+1], this.curvaTangentes[i+2]);
                var normal = vec3.create();
                vec3.cross(normal, tangente, [0.0, -1.0, 0.0]);
                
                /** Rotacion sobre el eje Z */
                var matrix = mat4.create();
                mat4.identity(matrix);
                mat4.rotate(matrix,matrix, j * this.angulo /(this.puntosRevolucion-1), [0.0, 0.0, 1.0]);
                
                vec3.transformMat4(posicion, posicion, matrix);
                vec3.transformMat4(tangente, tangente, matrix);
                vec3.transformMat4(normal, normal, matrix);
                vec3.normalize(normal, normal);

                /** Atributos */
                this.position_list.push(...[posicion[0], posicion[1], posicion[2]]);     
                this.normal_list.push( ...normal);
                this.tangente_list.push(...[tangente[0], tangente[1], tangente[2]]);
                this.texture_list.push( j / this.puntosRevolucion );
                this.texture_list.push( 1 - ( i / this.curva.length ) );         
            } 
        }

        /** Indices */
        var jump = 0 ;

        for(var i = 0 ; i< this.puntosCurva -1 ; i++){
            for(var j = 0 ; j< this.puntosRevolucion-1 ; j++){

                this.index_list.push(j + jump );
                this.index_list.push(this.puntosRevolucion + j + jump );      
            }

            jump = jump + this.puntosRevolucion;        
        }    
     
    }

}