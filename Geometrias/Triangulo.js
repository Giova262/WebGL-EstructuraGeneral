/** Geomtria tubo */

class Triangulo extends Dibujable{

    constructor(_largo,_alto,_ancho,color){

        super();

        /** Datos */
        this.largo =_largo
        this.alto =_alto
        this.ancho =_ancho
        this.color = color;

        this.init();
    }

    init(){

        this.position_list.push(0);
        this.position_list.push(0);
        this.position_list.push(0);
        this.texture_list.push(0);
        this.texture_list.push(0);
        this.normal_list.push(0);
        this.normal_list.push(0);
        this.normal_list.push(1);
        this.tangente_list.push(0);
        this.tangente_list.push(1);
        this.tangente_list.push(0);
        
        this.position_list.push(1*this.alto);
        this.position_list.push(0);
        this.position_list.push( 0);
        this.texture_list.push(0.5);
        this.texture_list.push(0.5);
        this.normal_list.push(0);
        this.normal_list.push(0);
        this.normal_list.push(1);
        this.tangente_list.push(0);
        this.tangente_list.push(1);
        this.tangente_list.push(0);
      
        this.position_list.push(0);
        this.position_list.push(1*this.largo);
        this.position_list.push(0);
        this.texture_list.push(1);
        this.texture_list.push(1);
        this.normal_list.push(0);
        this.normal_list.push(0);
        this.normal_list.push(1);
        this.tangente_list.push(0);
        this.tangente_list.push(1);
        this.tangente_list.push(0);

        this.position_list.push(0);
        this.position_list.push(0);
        this.position_list.push(0+this.ancho);
        this.texture_list.push(0);
        this.texture_list.push(0);
        this.normal_list.push(0);
        this.normal_list.push(0);
        this.normal_list.push(1);
        this.tangente_list.push(0);
        this.tangente_list.push(1);
        this.tangente_list.push(0);
        
        this.position_list.push(1*this.alto);
        this.position_list.push(0);
        this.position_list.push(0+this.ancho);
        this.texture_list.push(0.5);
        this.texture_list.push(0.5);
        this.normal_list.push(0);
        this.normal_list.push(0);
        this.normal_list.push(1);
        this.tangente_list.push(0);
        this.tangente_list.push(1);
        this.tangente_list.push(0);
      
        this.position_list.push(0);
        this.position_list.push(1*this.largo);
        this.position_list.push(0+this.ancho);
        this.texture_list.push(1);
        this.texture_list.push(1);
        this.normal_list.push(0);
        this.normal_list.push(0);
        this.normal_list.push(1);
        this.tangente_list.push(0);
        this.tangente_list.push(1);
        this.tangente_list.push(0);

        
        this.index_list.push(0);
        this.index_list.push(1);
        this.index_list.push(2);

        this.index_list.push(2);
        this.index_list.push(5);
        this.index_list.push(1);

        this.index_list.push(1);
        this.index_list.push(4);
        this.index_list.push(5);

        this.index_list.push(0);
        this.index_list.push(3);
        this.index_list.push(1);

        this.index_list.push(1);
        this.index_list.push(4);
        this.index_list.push(3);

        this.index_list.push(0);
        this.index_list.push(3);
        this.index_list.push(2);

        this.index_list.push(2);
        this.index_list.push(5);
        this.index_list.push(3);

        this.index_list.push(3);
        this.index_list.push(4);
        this.index_list.push(5);

      
            
    }

}