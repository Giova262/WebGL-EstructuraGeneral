/** Contiene un plano */

/** Contiene la Luna */

class Luna{

    constructor(){

        var esferaGeometria = new Esfera(1,Math.PI,solTextura,false,false,[0.8,0.8,0.8],60,60);
        this.luna = new Objeto(esferaGeometria);
 
        this.radio = 35;
        this.position = [];  
        this.altura = 20;

        this.init();
    }

    init(){
        this.luna.phongCoheficientes(0.01,2,0,1);
    }

    getPosition(){
        return this.position;
    }

    setAltura(_altura){
        this.altura = _altura;
    }

    setRadio(_radio){
        this.radio = _radio;
    }

    update(){
        var x = this.radio * Math.cos( -(tiempo*2*Math.PI)/2360580 )  ;
        var y = this.radio * Math.sin( -(tiempo*2*Math.PI)/2360580 ) ;
        var z = this.altura;

        this.position[0] = x;
        this.position[1] = y;
        this.position[2] = z;

        this.luna.trasladar([x,y,z]);
    }

    dibujar(){
        this.luna.dibujar();
    }
}