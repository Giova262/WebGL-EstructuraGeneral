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

    init2(){
        var sides = 20;
        var height = 1.0;
        var stepTheta = 2 * Math.PI / sides;
        var verticesPerCap = 9 * sides;
      
        var vertices = [];
        var theta = 0;
        var i = 0;
      
        // Top Cap
        for (; i < verticesPerCap; i += 9) {
          vertices[i    ] = Math.cos(theta);
          vertices[i + 1] = height;
          vertices[i + 2] = Math.sin(theta);
          theta += stepTheta;
      
          vertices[i + 3] = 0.0;
          vertices[i + 4] = height;
          vertices[i + 5] = 0.0;
      
          vertices[i + 6] = Math.cos(theta);
          vertices[i + 7] = height;
          vertices[i + 8] = Math.sin(theta);
        }
      
        // Bottom Cap
        theta = 0;
        for (; i < verticesPerCap + verticesPerCap; i += 9) {
          vertices[i + 6] = Math.cos(theta);
          vertices[i + 7] = -height;
          vertices[i + 8] = Math.sin(theta);
          theta += stepTheta;
      
          vertices[i + 3] = 0.0;
          vertices[i + 4] = -height;
          vertices[i + 5] = 0.0;
      
          vertices[i    ] = Math.cos(theta);
          vertices[i + 1] = -height;
          vertices[i + 2] = Math.sin(theta);
        }
      
        for (var j = 0; j < sides; ++j) {
          for (var k = 0; k < 3; ++k, ++i) {
            vertices[i] = vertices[0 + k + 9 * j];
          }
          for (var k = 0; k < 3; ++k, ++i) {
            vertices[i] = vertices[6 + k + 9 * j];
          }
          for (var k = 0; k < 3; ++k, ++i) {
            vertices[i] = vertices[verticesPerCap + k + 9 * j];
          }
      
          for (var k = 0; k < 3; ++k, ++i) {
            vertices[i] = vertices[0 + k + 9 * j];
          }
          for (var k = 0; k < 3; ++k, ++i) {
            vertices[i] = vertices[verticesPerCap + k + 9 * j];
          }
          for (var k = 0; k < 3; ++k, ++i) {
            vertices[i] = vertices[verticesPerCap + 6 + k + 9 * j];
          }
        }
      
      
        var indices = new Array(vertices.length / 3);
        for (i = 0; i < indices.length; ++i) indices[i] = i;
      
        function sub (a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; };
        function cross (a, b) {
          return [
            a[1] * b[2] - a[2] * b[1],
            a[2] * b[0] - a[0] * b[2],
            a[0] * b[1] - a[1] * b[0]
          ];
        };
        function normalize (a) {
          var length = a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
          return [a[0] / length, a[1] / length, a[2] / length];
        };
      
        var normals = [];
      
        for (var i = 0; i < vertices.length; i += 9) {
          var a = [vertices[i    ], vertices[i + 1], vertices[i + 2]];
          var b = [vertices[i + 3], vertices[i + 4], vertices[i + 5]];
          var c = [vertices[i + 6], vertices[i + 7], vertices[i + 8]]
          var normal = normalize(cross(sub(a, b), sub(a, c)));
          normals = normals.concat(normal, normal, normal);
        }

        console.log(vertices)

        this.position_list = vertices
        this.normal_list = normals
        this.index_list = indices
      
       
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