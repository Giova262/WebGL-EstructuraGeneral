/** Contiene un Sol */

class Sol{

    constructor(){
        var esferaGeometria = new Esfera(3,Math.PI,[1,1,0],60,60);
      
        this.sol = new Objeto(esferaGeometria);

        this.radio = 50;
        this.position = [0,0,1];
        this.altura = 0;

        this.init();
    }

    init(){
        this.sol.phongCoheficientes(0.9,0.9,0,60);
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

        var theta = -(tiempo*2*Math.PI)/86400 + Math.PI;
        var x = this.radio * Math.cos(theta ) ;
        var y = this.radio * Math.sin(theta )  ;
        var z = this.altura ;

        this.position[0] = x;
        this.position[1] = y;
        this.position[2] = z;

        this.sol.trasladar([x,y,z]);
    }

    dibujar(){
        this.sol.dibujar();
    }
}