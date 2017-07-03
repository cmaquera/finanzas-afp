
            const CRU_hombre_55 = 187.61608; //sin cónyuge
            const CRU_hombre_60 = 168.72462;
            const CRU_hombre_65 = 148.15048;
            const CRU_hombre_70 = 126.92324;

            const CRU_mujer_55 = 205.39545; //sin cónyuge
            const CRU_mujer_60 = 187.84711;
            const CRU_mujer_65 = 168.07431;
            const CRU_mujer_70 = 146.57645;


            module.exports = {
                tasa_mensual: function(fondo){
                    if(fondo==1){
                        renta=0.04; 
                        tasa_interes=0.03;
                        return (Math.pow((1+renta+tasa_interes), (30/360)))-1;

                    }                
                    else if(fondo==2){
                        renta=0.05; 
                        tasa_interes=0.02;
                        return (Math.pow((1+renta+tasa_interes), (30/360)))-1;
                    }                
                    else if(fondo==3){
                        renta=0.06; 
                        tasa_interes=0.02;
                        return (Math.pow((1+renta+tasa_interes), (30/360)))-1;
                    }
                    return null;
                },
                fondo_acumulado: function(tasa_mensual, sueldo, aporte, edad_retiro, edad){
                    return (0.10*sueldo*(((Math.pow((1+tasa_mensual), ((edad_retiro-edad)*aporte)))-1)/(tasa_mensual))+sueldo*(Math.pow((1+tasa_mensual), ((edad_retiro-edad)*aporte))));
                },
                pension: function(fondo_acumulado, edad_retiro, sexo){
                    var pension = null;
                    if(edad_retiro==55 && sexo=="Masculino")
                        pension=fondo_acumulado/CRU_hombre_55;
                    else if(edad_retiro==55 && sexo=="Femenino")
                        pension=fondo_acumulado/CRU_mujer_55;

                    if(edad_retiro==55 && sexo=="Masculino")
                        pension=fondo_acumulado/CRU_hombre_60;
                    else if(edad_retiro==55 && sexo=="Femenino")
                        pension=fondo_acumulado/CRU_mujer_60;

                    if(edad_retiro==55 && sexo=="Masculino")
                        pension=fondo_acumulado/CRU_hombre_65;
                    else if(edad_retiro==55 && sexo=="Femenino")
                        pension=fondo_acumulado/CRU_mujer_65;

                    if(edad_retiro==55 && sexo=="Masculino")
                        pension=fondo_acumulado/CRU_hombre_70;
                    else if(edad_retiro==55 && sexo=="Femenino")
                        pension=fondo_acumulado/CRU_mujer_70;
                    return pension;
                }
                
            };

            