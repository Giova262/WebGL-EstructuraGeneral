/** Geomtria tubo */

class Plano extends Dibujable{

    constructor(filas,columnas,color){

        super();

        /** Datos */
        this.filas = filas;
        this.columnas = columnas;
        this.color = color;

        this.init();
    }

    init(){

        /** Atributos*/
        for(var i = 0.0 ; i< this.columnas ; i++){
            for(var j = 0.0 ; j< this.filas ; j++){

                this.position_list.push(i - (this.filas)/2.0);
                this.position_list.push(j- (this.columnas)/2.0);
                this.position_list.push(0.0);
              
                var u = 1.0 - (j / this.filas);
                var v = 1.0 - (i / this.columnas);

                this.texture_list.push(u);
                this.texture_list.push(v);

                this.normal_list.push(0);
                this.normal_list.push(0);
                this.normal_list.push(1);

                this.tangente_list.push(0);
                this.tangente_list.push(1);
                this.tangente_list.push(0);
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