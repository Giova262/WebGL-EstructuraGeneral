class Esfera extends Dibujable {

    constructor(_ancho,_alto,_anchoSegmento,_altoSegmento,_color){

        super(_ancho,_alto,_anchoSegmento,_altoSegmento,_color);

        this.initBuffers();
        this.initIndex();
    }

    initBuffers(){

        var mitadAncho = this.ancho / 2;
        var mitadAlto = this.alto / 2;
    
        var anchoSegmento = this.ancho / this.filas;
        var altoSegmento = this.alto / this.columnas;
    
        for (var i = 0; i < this.columnas+1; i ++ ) {  
            var y = ( i * altoSegmento ) - mitadAlto;
            
            for ( var j = 0; j < this.filas+1; j ++ ) {
    
                var x = ( j * anchoSegmento )- mitadAncho;

                var theta = x * Math.PI *2 ; 
                var phi = y * Math.PI * 2 ;
                var x1 = 5*  Math.cos(theta) * Math.sin(phi);
                var y1 = 5 * Math.sin(theta) * Math.sin(phi);
                var z1 = 5 * Math.cos(phi);

                /** Vertice Propiedades */
                this.position_list.push( ...[x1,  y1, z1] );

                this.color_list.push(...this.color);
    
                this.normal_list.push( 0, 0, 1 );
    
                this.textura_list.push( j / this.filas  );
                this.textura_list.push( 1 - ( i / this.columnas ) );
            }
        }

        /** Creo buffer de Posiciones */
        this.position_buffer = gl.createBuffer();                               
        gl.bindBuffer(gl.ARRAY_BUFFER, this.position_buffer);                   
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_list), gl.STATIC_DRAW);   
            
        /** Creo buffer de Color */
        this.color_buffer = gl.createBuffer();                               
        gl.bindBuffer(gl.ARRAY_BUFFER, this.color_buffer);                   
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.color_list), gl.STATIC_DRAW);   
           
    }
}