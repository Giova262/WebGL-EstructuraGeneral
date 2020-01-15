/** Clindro clase */

class Cilindro extends Dibujable{

    constructor(_radio,_alto,_filas,_columnas,_color){

        super();
        
        /** Datos */
        this.filas = _filas;
        this.columnas = _columnas;
        this.alto = _alto;
        this.radio = _radio;
        this.color = _color; 

        /** Init */
        this.init();
    }

    init(){

        var tapa = false ;
        var piso = true ;

        /** Atributos */
        for(var i = 0.0 ; i< this.columnas ; i++){

            var v = i / this.columnas;
            
            if( i == (this.columnas-1) ) tapa = true ;
            if( i != 0.0 ) piso = false ;

            for(var j = 0.0 ; j< this.filas ; j++){

                if( tapa ){  

                    var x = 0;
                    var y = 0;
                    var z = v * this.alto  ;

                }else if(piso){

                    var x = 0;
                    var y = 0;
                    var z = 0;

                }else {
                    var x = this.radio * Math.cos(j * Math.PI * 2 / (this.columnas - 1));
                    var y = this.radio * Math.sin(j * Math.PI * 2 / (this.columnas - 1));
                    var z = v * this.alto  ;
                }

        		this.position_list.push(x);
        		this.position_list.push(y);
                this.position_list.push(z);
              
                this.texture_list.push(1.0 - j / this.filas);
                this.texture_list.push(1.0 - i / this.columnas);

                this.normal_list.push(x);
                this.normal_list.push(y);
                this.normal_list.push(0);

                var tangente = [(y*1), -( (x*1)  ), (x*0)-(y*0) ];
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