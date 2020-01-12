/** Clase Rectangulo */

class Rectangulo extends Dibujable{

    constructor(_ancho,_alto,_profundidad,_color,_fila,_columnas){

        super();

        /** Datos */
        this.filas = _fila;
        this.columnas = _columnas;
        this.ancho = _ancho;
        this.alto = _alto;
        this.profundidad = _profundidad;
        this.color = _color;  

        /** Init */
        this.init();
    }

    init(){

        var x = this.ancho / 2;
		var y = this.alto / 2;
		var z = this.profundidad;
	
		this.position_list = [
		// Cara Frontal.
			-x, y,  0,
			 x, y,  0,
			 x, y,  z,
			-x, y,  z,

		// Cara Superior.
			-x, -y, z,
			-x, y,  z,
			 x, y,  z,
			 x, -y, z,

		// Cara Posterior.
			-x, -y, 0,
			-x, -y, z,
			 x, -y, z,
			 x, -y, 0,
					
		// Cara Lateral Derecha.
			 x, -y, 0,
			 x, -y, z,
			 x, y,  z,
			 x, y,  0,
					
		// Cara Inferior.
			-x, -y, 0,
			 x, -y, 0,
			 x, y,  0,
			-x, y,  0,
					
		// Cara Lateral Izquierda.
			-x, -y, 0,
			-x, y,  0,
			-x, y,  z,
			-x, -y, z,
        ];
        
        this.normal_list = [
            // Cara Frontal.
                0,1,0,
                0,1,0,
                0,1,0,
                0,1,0,
                            
            // Cara Superior.
                0,0,1,
                0,0,1,
                0,0,1,
                0,0,1,
                
            // Cara Posterior.
                0,-1,0,
                0,-1,0,
                0,-1,0,
                0,-1,0,
                            
            // Cara Lateral Derecha.
                1,0,0,
                1,0,0,
                1,0,0,
                1,0,0,
                
            // Cara Inferior.
                0,0,-1,
                0,0,-1,
                0,0,-1,
                0,0,-1,
                            
            // Cara Lateral Izquierda.
                -1,0,0,
                -1,0,0,
                -1,0,0,
                -1,0,0,
            ];

            this.tangente_list = [
                // Cara Frontal.
                    0,1,0,
                    0,1,0,
                    0,1,0,
                    0,1,0,
                                
                // Cara Superior.
                    0,0,1,
                    0,0,1,
                    0,0,1,
                    0,0,1,
                    
                // Cara Posterior.
                    0,-1,0,
                    0,-1,0,
                    0,-1,0,
                    0,-1,0,
                                
                // Cara Lateral Derecha.
                    1,0,0,
                    1,0,0,
                    1,0,0,
                    1,0,0,
                    
                // Cara Inferior.
                    0,0,-1,
                    0,0,-1,
                    0,0,-1,
                    0,0,-1,
                                
                // Cara Lateral Izquierda.
                    -1,0,0,
                    -1,0,0,
                    -1,0,0,
                    -1,0,0,
                ];

                this.texture_list = [
                    // Cara Frontal.
                        0,1/3,
                        0,2/3,
                        1/4,1/3,
                        1/4,2/3,
                                    
                    // Cara Superior.
                        1/4,1,
                        1/4,2/3,
                        1/2,1,
                        1/2,2/3,
                        
                    // Cara Posterior.
                        1/4,1/3,
                        1/4,2/3,
                        1/2,1/3,
                        1/2,2/3,
                                    
                    // Cara Lateral Derecha.
                        1/4,0,
                        1/4,1/3,
                        1/2,0,
                        1/2,1/3,
                        
                    // Cara Inferior.
                        1/2,1/3,
                        1/2,2/3,
                        3/4,1/3,
                        3/4,2/3,
                                    
                    // Cara Lateral Izquierda.
                        3/4,1/3,
                        3/4,2/3,
                        1,1/3,
                        1,2/3
                    ];

                    for(var i = 0; i < 24 ; i += 4){
			
                        this.index_list.push(...[i, (i + 1), (i + 2), i, (i + 2), (i + 3)]);
                    }
    
    }

}