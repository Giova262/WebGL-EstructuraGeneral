/** Geomtria tubo */

class Triangulo extends Dibujable{

    constructor(_largo,_alto,_ancho,color){

        super();

        /** Datos */
        this.profundidad =_largo
        this.alto =_alto
        this.ancho =_ancho
        this.color = color;

        this.init();
    }

    init(){

        this.position_list = [
          
            //top
            -1.0*this.ancho,1.0*this.profundidad,-1.0*this.alto,
            -1.0*this.ancho,1.0*this.profundidad,1.0*this.alto,
            1.0*this.ancho,-1.0*this.profundidad,1.0*this.alto,
            1.0*this.ancho,-1.0*this.profundidad,-1.0*this.alto,
            //left
            -1.0*this.ancho,1.0*this.profundidad,1.0*this.alto,
            -1.0*this.ancho,-1.0*this.profundidad,1.0*this.alto,
            -1.0*this.ancho,-1.0*this.profundidad,-1.0*this.alto,
            -1.0*this.ancho,1.0*this.profundidad,-1.0*this.alto,
        
            //front
            1.0*this.ancho,-1.0*this.profundidad,1.0*this.alto,
            -1.0*this.ancho,-1.0*this.profundidad,1.0*this.alto,
            -1.0*this.ancho,1.0*this.profundidad,1.0*this.alto,
            //back
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
            1.0,1.0,0.0,
            1.0,1.0,0.0,
            1.0,1.0,0.0,
            1.0,1.0,0.0,
                            
            // left
            -1.0,0.0,0.0,
            -1.0,0.0,0.0,
            -1.0,0.0,0.0,
            -1.0,0.0,0.0,
                
            
                            
            // front
            0.0,0.0,1.0,
            0.0,0.0,1.0,
            0.0,0.0,1.0,
                
            // back
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
                    -1,0,0,
                    -1,0,0,
                    -1,0,0,
                    -1,0,0,
                                
                // left
                0,0,-1,
                0,0,-1,
                0,0,-1,
                0,0,-1,
                    
                
                                
                // front
                1,0,0,
                1,0,0,
                1,0,0,
                    
                // back
                -1,0,0,
                -1,0,0,
                -1,0,0,
                                
                //bottom
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
                        1,0,
                        0,0,
                        0,1,
                        
                    // 
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
                      
                        //front
                        8,9,10,
                        //back
                        11,12,13,
                        //bottom
                        15,14,16,
                        16,14,17
                    ]

    }

}