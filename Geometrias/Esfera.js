/** Clase Esfera */

class Esfera extends Dibujable{

    constructor(_radio,_angulo,_color,_fila,_columnas){

        super();

        /** Datos */
        this.filas = _fila;
        this.columnas = _columnas;
        this.radio = _radio;
        this.angulo = _angulo;
        this.color = _color;  

        /** Init */
        this.init();
    }

    init(){

        /** Atributos */
        for(var i = 0.0 ; i< this.columnas ; i++){
     
            for(var j = 0.0 ; j< this.filas ; j++){

                var theta = j * Math.PI * 2 / (this.filas - 1);
                var phi = i * this.angulo/ (this.columnas - 1) ;

                var x = this.radio * Math.cos(theta) * Math.sin(phi);
                var y = this.radio * Math.sin(theta) * Math.sin(phi);
                var z = this.radio * Math.cos(phi);
                
                /** Posiciones */
                this.position_list.push(x);
        		this.position_list.push(y);
                this.position_list.push(z);
   
                
                /** Textura */
                var v = 1.0 - i / this.columnas ;   
                var u =  1.0 - j / this.filas ;

                /*if( j < (this.FILAS/2) ){
                    u = j / (this.FILAS/2) ;
                }else{
                    u = (j / (this.FILAS/2) ) - 1 ;
                } */

                /*if( i <= (this.COLUMNAS/2) ){
                    v = i / (this.COLUMNAS/2) ;
                }else{
                    v = (i / (this.COLUMNAS/2) ) - 1 ;
                } */

                this.texture_list.push(u);
                this.texture_list.push(v);

                /** Normales */
                var normal = vec3.fromValues(x,y,z);
                vec3.normalize(normal,normal);
                this.normal_list.push(...normal);

                /** Tangente */
                var tangente = [(y*1)-(z*0), -( (x*1)-(z*0)  ), (x*0)-(y*0) ];
                this.tangente_list.push( ...tangente );
            }

        }

        /** Indices */
        var jump = 0 ;

        for(var i = 0.0 ; i< this.columnas -1 ; i++){
            for(var j = 0.0 ; j< this.filas-1 ; j++){
                this.index_list.push(j + jump );
                this.index_list.push(this.filas + j+ jump );
                this.index_list.push(j+1+ jump );

                this.index_list.push(j+1 + jump );
                this.index_list.push( this.filas + j+ jump );
                this.index_list.push( this.filas + j + 1+ jump );
            }

            jump = jump + this.filas;
        }
    }

}