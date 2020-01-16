/** Camara class */

var previousClientX = 0,
    previousClientY = 0,
    radio = 800,  //De la orbital
    //radio2 = 50;
    escala= 1.0;
    alfa = Math.PI/2, 
    beta = Math.PI/2+0.1, 
    factorVelocidad = 0.01;
    ZOOM = 0.007;

    mouseX=0;
    mouseY=0;
    isMouseDown = false;

    deltaX = 0;
    deltaY = 0;

    fristTime = true ;

    tipoCamara= 0;

    avanzar = false;
    retoceder = false;
    izq = false;
    der = false;

    x2 =50;
    y2= 50;
    parar = false;

    firstPersonBoolean = false


class Camara{

    constructor(){}

    event(){

        /** Guardo posicion del mouse dentro del canvas */
        $("#canvas").mousemove(function(e){     
            mouseX = e.clientX || e.pageX; 
            mouseY = e.clientY || e.pageY;
        });

        /** Evaluo si presione el boton del mouse dentro del canvas */
        $("#canvas").mousedown(function(e){
            isMouseDown = true;
            
        });

        /** Pongo false si suelto el boton del mouse */
        $("body").mouseup(function(e){
            isMouseDown = false;
            fristTime = true;
        });

        /** Rueda del mouse */    
        $("#canvas").bind('mousewheel', function(e){
              
            // Chrome
            if(e.originalEvent.wheelDelta > 0) {
                escala = escala - 0.02; 
              
                //if( escala <= 0.01 ) escala = 0.01 ;
                
            }else  if( e.originalEvent.wheelDelta < 0 ){ 
                escala = escala + 0.02; 
            
                //if( escala >= 1.0 ) escala = 1.0 ;          
            }

             /** Para evitar el scroll del fondo dentro del canvas */
             e.preventDefault()
        });

        /** Eventos disparados por el teclado */
        window.addEventListener("keydown", function (e) {
            if ( e.keyCode == 90) {
              /*  escala = escala - 0.00002; 
                console.log('Rueda')*/
               // if( escala <= 0.01 ) escala = 0.01 ;
            }
            if ( e.keyCode == 88) {
              /*  escala = escala + 0.00002; 
                console.log('Rueda')*/
               // if( escala >= 1.0 ) escala = 1.0 ; 
            }
            if ( e.keyCode == 49) {
                tipoCamara = 0 ;        
            }
            if ( e.keyCode == 50) {
                tipoCamara = 1 ;    
            }
            if ( e.keyCode == 51) {
                tipoCamara = 2 ;        
            }
            if ( e.keyCode == 52) {
                tipoCamara = 3 ;        
            }
            if ( e.keyCode == 53) {
                tipoCamara = 4 ;        
            }
            if ( e.keyCode == 54) {
                tipoCamara = 5 ;
            }

            // Movimientos
            if ( e.keyCode == 87) { // w
        
                avanzar = true;
                console.log('w')
            }
            if ( e.keyCode == 83) { //s
               
                retoceder = true;   
                console.log('s')
            }
            if ( e.keyCode == 65) { //a
                       
                izq = true;  
                console.log('a')
            }
            if ( e.keyCode == 68) { //d

                der = true;  
                console.log('d')
                       
            }
            
        }, true);
          

     
    }

    update(){

        if(tipoCamara == 0) this.orbital();
        if(tipoCamara == 1) this.primeraPersona();

        if(isMouseDown) {

            if(fristTime){
                previousClientX = mouseX;
                previousClientY = mouseY;   
                fristTime = false;
            }
    
            deltaX = mouseX - previousClientX;
            deltaY = mouseY - previousClientY;
               
            previousClientX = mouseX;
            previousClientY = mouseY;
    
            /** Calculo de alfa y beta */
            alfa = alfa - deltaX * factorVelocidad;
            beta = beta - deltaY * factorVelocidad;
            
        } 
    }

    orbital(){

        if (alfa<0) alfa=Math.PI*2;
        if (alfa>Math.PI*2) alfa=0;

        if (beta<  -Math.PI/2 +0.04) beta = -Math.PI/2 + 0.04;
        if( beta >= 0.0 ) beta =  -beta ;

        /** Camara update */   
        var x = radio * escala * Math.cos(alfa) * Math.sin(beta);
        var y = radio * escala * Math.sin(alfa) * Math.sin(beta);
        var z = radio * escala * Math.cos(beta);

        mat4.lookAt(viewMatrix, [x, y, z], [0, 0, 20], [0,0,1]);
        gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix);
        
        gl.uniform3f(cameraPosLocation,x,y,z);

    }

    primeraPersona(){

        var x = radio  * escala * Math.cos(alfa) * Math.sin(beta);
        var y = radio  * escala * Math.sin(alfa) * Math.sin(beta);
        var z = radio * escala * Math.cos(beta);

    

        var direccion = [Math.cos(alfa),Math.sin(alfa)]
        var direccionTangente = [-Math.sin(alfa),Math.cos(alfa)]
   
        if(avanzar){   
             x2  = -2 * direccion[0] + x2
             y2  = -2 * direccion[1] + y2
        }
        if(retoceder){

            x2  = 2 * direccion[0] + x2
            y2  = 2 * direccion[1] + y2
        }

        if(izq){   
            x2  = -2 * direccionTangente[0] + x2
            y2  = -2 * direccionTangente[1] + y2
       }
       if(der){

            x2  = 2 * direccionTangente[0] + x2
            y2  = 2 * direccionTangente[1] + y2
       }

        //var distancia = Math.sqrt(Math.pow(x2, 2.0) + Math.pow(y2, 2.0) ); 
     
       //TODO : cambiar esto por esta apretando el boton o no en windown listener
        avanzar = false;
        retoceder = false;
        izq = false;
        der = false;
        //console.log('Valores de la finales :' + x2 + ' ' +y2)

        mat4.lookAt(viewMatrix, [x2, y2,50], [x, y, z], [0,0,1]);
        gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix); 
        gl.uniform3f(cameraPosLocation,...[x2, y2, 15]);



    }

}