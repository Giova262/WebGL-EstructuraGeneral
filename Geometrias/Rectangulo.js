/** Clase Rectangulo */

class Rectangulo extends Dibujable{

    constructor(_ancho,_alto,_profundidad,_color){

        super();

        /** Datos */
        this.ancho = _ancho;
        this.alto = _alto;
        this.profundidad = _profundidad;

        this.color = _color;  

        /** Init */
        this.init();
    }

    init(){

        this.position_list = [
            //top
            -1.0*this.ancho,1.0*this.profundidad,-1.0*this.alto,
            -1.0*this.ancho,1.0*this.profundidad,1.0*this.alto,
            1.0*this.ancho,1.0*this.profundidad,1.0*this.alto,
            1.0*this.ancho,1.0*this.profundidad,-1.0*this.alto,
            //left
            -1.0*this.ancho,1.0*this.profundidad,1.0*this.alto,
            -1.0*this.ancho,-1.0*this.profundidad,1.0*this.alto,
            -1.0*this.ancho,-1.0*this.profundidad,-1.0*this.alto,
            -1.0*this.ancho,1.0*this.profundidad,-1.0*this.alto,
            //right
            1.0*this.ancho,1.0*this.profundidad,1.0*this.alto,
            1.0*this.ancho,-1.0*this.profundidad,1.0*this.alto,
            1.0*this.ancho,-1.0*this.profundidad,-1.0*this.alto,
            1.0*this.ancho,1.0*this.profundidad,-1.0*this.alto,
            //front
            1.0*this.ancho,1.0*this.profundidad,1.0*this.alto,
            1.0*this.ancho,-1.0*this.profundidad,1.0*this.alto,
            -1.0*this.ancho,-1.0*this.profundidad,1.0*this.alto,
            -1.0*this.ancho,1.0*this.profundidad,1.0*this.alto,
            //back
            1.0*this.ancho,1.0*this.profundidad,-1.0*this.alto,
            1.0*this.ancho,-1.0*this.profundidad,-1.0*this.alto,
            -1.0*this.ancho,-1.0*this.profundidad,-1.0*this.alto,
            -1.0*this.ancho,1.0*this.profundidad,-1.0*this.alto,
            //bottom
            -1.0*this.ancho,-1.0*this.profundidad,-1.0*this.alto,
            -1.0*this.ancho,-1.0*this.profundidad,1.0*this.alto,
            1.0*this.ancho,-1.0*this.profundidad,1.0*this.alto,
            1.0*this.ancho,-1.0*this.profundidad,-1.0*this.alto,
        ]
	
	
        this.normal_list = [
            // top
            0.0,1.0,0.0,
            0.0,1.0,0.0,
            0.0,1.0,0.0,
            0.0,1.0,0.0,
                            
            // left
            -1.0,0.0,0.0,
            -1.0,0.0,0.0,
            -1.0,0.0,0.0,
            -1.0,0.0,0.0,
                
            // right
            1.0,0.0,0.0,
            1.0,0.0,0.0,
            1.0,0.0,0.0,
            1.0,0.0,0.0,
                            
            // front
            0.0,0.0,1.0,
            0.0,0.0,1.0,
            0.0,0.0,1.0,
            0.0,0.0,1.0,
                
            // back
            0.0,0.0,-1.0,
            0.0,0.0,-1.0,
            0.0,0.0,-1.0,
            0.0,0.0,-1.0,
                            
            // bottom
            0.0,-1.0,0.0,
            0.0,-1.0,0.0,
            0.0,-1.0,0.0,
            0.0,-1.0,0.0
            ];

            this.tangente_list = [
                // top
                    0,1,0,
                    0,1,0,
                    0,1,0,
                    0,1,0,
                                
                // 
                    0,0,1,
                    0,0,1,
                    0,0,1,
                    0,0,1,
                    
                // 
                    0,-1,0,
                    0,-1,0,
                    0,-1,0,
                    0,-1,0,
                                
                // 
                    1,0,0,
                    1,0,0,
                    1,0,0,
                    1,0,0,
                    
                // 
                    0,0,-1,
                    0,0,-1,
                    0,0,-1,
                    0,0,-1,
                                
                //
                    -1,0,0,
                    -1,0,0,
                    -1,0,0,
                    -1,0,0,
                ];

                this.texture_list = [
                    // top.
                        0,0,
                        0,1,
                        1,1,
                        1,0,
                                    
                    // left.
                        0,0,
                        1,0,
                        1,1,
                        0,1,
                        
                    // 
                        1,1,
                        0,1,
                        0,0,
                        1,0,
                                    
                    // 
                        1,1,
                        1,0,
                        0,0,
                        0,1,
                        
                    // 
                        0,0,
                        0,1,
                        1,1,
                        1,0,
                                    
                    // 
                        1,1,
                        1,0,
                        0,0,
                        0,1,
                    ];


                    this.index_list = [
                        //top
                        0,1,2,
                        0,2,3,
                        //left
                        5,4,6,
                        6,4,7,
                        //right
                        8,9,10,
                        8,10,11,
                        //front
                        13,12,14,
                        15,14,12,
                        //back
                        16,17,18,
                        16,18,19,
                        //bottom
                        21,20,22,
                        22,20,23
                    ]

    }

}