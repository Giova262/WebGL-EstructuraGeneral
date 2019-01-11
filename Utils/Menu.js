/** Menu con Gui */

var obj = {

    'Acelerar': 1,

    'Radio1': 60 ,
    'Altura1' : 32,
    'IntensidadLuz1': 60.0,
    
    'Radio2': 35 ,
    'Altura2' : 20,
    'IntensidadLuz2': 8.6,
   
    //Botones 
    Play: function () {
        run = true;
    },
    'Reset contador': function () {
        segundo=0;
        minuto=0;
        hora=0;
    },
    Stop: function () {
        run = false;
    },
};

//Inicio dat.GUI
var gui = new dat.GUI();

gui.add(obj, 'Play');
gui.add(obj, 'Stop');
gui.add(obj, 'Reset contador');
gui.add(obj, 'Acelerar',0,30).step(0.1).onChange(function(value){
    tiempoIncremento = value;
});

//Carpetas
var f1 = gui.addFolder('Sol Parametros');
var f2 = gui.addFolder('Luna Parametros');

// Asocio a carpetas
f1.add(obj,'Radio1',10,100).onChange(function(value){
    sol.setRadio(value); 
});
f1.add(obj,'Altura1',1,50).onChange(function(value){
    sol.setAltura(value); 
});
f1.add(obj,'IntensidadLuz1',0,300).onChange(function(value){
    gl.uniform1f(intensidadLightLocation,value);
});

f2.add(obj,'Radio2',10,100).onChange(function(value){
    luna.setRadio(value); 
});
f2.add(obj,'Altura2',0,50).onChange(function(value){
    luna.setAltura(value); 
});
f2.add(obj,'IntensidadLuz2',0,20).onChange(function(value){
    gl.uniform1f(intensidadLight2Location,value);
});

//Asocio obj al GUI
gui.remember(obj);


