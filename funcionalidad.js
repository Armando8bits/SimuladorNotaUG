function calcula1erPa() {
    // Obtener el valor actual del textbox
    let gFormativ = acomodaNumero(document.getElementById("textbox1").value);
    let gPractica = acomodaNumero(document.getElementById("textbox2").value);
    let examen1er = acomodaNumero(document.getElementById("textbox3").value);
    Promedio1erP = calculaParcial(gFormativ, gPractica, examen1er);
    document.getElementById("LblPromedio1").innerHTML = Promedio1erP.toFixed(2);
    calculaRangos();
}
function calcula2doPa() {
    // Obtener el valor actual del textbox
    let gFormativ = acomodaNumero(document.getElementById("textbox4").value);
    let gPractica = acomodaNumero(document.getElementById("textbox5").value);
    let examen1er = acomodaNumero(document.getElementById("textbox6").value);
    Promedio2doP = calculaParcial(gFormativ, gPractica, examen1er);
    document.getElementById("LblPromedio2").innerHTML = Promedio2doP.toFixed(2); //eso ultimo redondea a dos decimales
}
function acomodaNumero(textoCaja) {
    let valor = textoCaja.replace(",", ".");
    return parseFloat(valor);
}
function calculaParcial(Formativ, Practica, examenP) {
    let Pro = 0;
    if (!(isNaN(Formativ) && isNaN(Practica) && isNaN(examenP))) {
        if (Formativ >= 0 && Formativ <= 10 && Practica >= 0 && Practica <= 10 && examenP >= 0 && examenP <= 10) {
            Pro = (Formativ + Practica) * 0.33 + examenP * 0.34;
        }
    }
    return Pro;
}

function calculaProGlo() {
    if (!(isNaN(Promedio1erP) && isNaN(Promedio2doP))) {
        if (Promedio1erP > 0 && Promedio2doP > 0) {
            let Etiqueta = document.getElementById("LblPromedioG"); //obtengo el elemnto por su ID
            Etiqueta.style.color ="#669"; //le cambio el color
            PromedioGlov = (Promedio1erP + Promedio2doP) / 2;
            Texto2 = "Tienes Opción de dar Examen de Mejoramiento:";

            if (PromedioGlov >= ExelenciaAca) {
                Texto = "Felicidades, alcanzaste Excelencia Académica";
            }
            else if (PromedioGlov >= casiExelenciaAca) {
                Texto = "Felicidades, te Matricularas entre los Primeros";
            }
            else if (PromedioGlov >= Aprovado) {
                Texto = "Aprobaste";
            }
            else if (PromedioGlov < Aprovado) {
                Etiqueta.style.color = "red";
                NotaExaRecup = (Aprovado - 0.4 * PromedioGlov) / 0.6; //hasta que cambie la ponderacion
                if (NotaExaRecup <= 10) {
                    Texto = "Reprobaste, intenta Sacar más de " + NotaExaRecup.toFixed(2) + " en el examen de Recuperación";
                    Texto2 = "Nota que obtuviste en examen de Recuperación:";
                } else {
                    Texto = "Reprobaste, Repite el Semestre";
                    Texto2 = "...";
                }
            }
        } else {
            PromedioGlov = 0;
            Texto = "Completa los datos...";
            Texto2 = "...";
        }
        document.getElementById("LblPromedioG").innerHTML = PromedioGlov.toFixed(2);
        document.getElementById("LblMensajePro").innerHTML = Texto;
        document.getElementById("LblMensajeOp").innerHTML = Texto2;
    }
}

function calculaRangos() {
    let PromedioPasar = 2 * Aprovado - Promedio1erP;
    let PromedioMaxPa = 2 * ExelenciaAca - Promedio1erP;
    if (Promedio1erP == 0) {
        Texto = "";
    } else if (2 * ExelenciaAca - Promedio1erP < 10) {
        Texto = PromedioPasar.toFixed(2) + " - " + PromedioMaxPa.toFixed(2);
    } else if (PromedioPasar <= 10) {
        Texto = PromedioPasar.toFixed(2);
    } else {
        Texto = "10 más recuperación";
    }
    document.getElementById("LblRangoMinimo").innerHTML = Texto;
}

function calculaExamMej() {
    let examen = acomodaNumero(document.getElementById("textbox7").value);
    let NuevoPromedio = 0;
    if (PromedioGlov > 0 && (!isNaN(examen)) && NotaExaRecup <= 10) {
        if (examen > 10) {
            Texto = "";
        } else if ((PromedioGlov < Aprovado && examen < NotaExaRecup) || (PromedioGlov > Aprovado && examen < promedioMenor())) {
            Texto = "Desaprovechaste la oportunidad, sigues con: " + PromedioGlov.toFixed(2);
        } else if (PromedioGlov < Aprovado && examen >= NotaExaRecup) {
            NuevoPromedio = 0.4 * PromedioGlov + 0.6 * examen;
            Texto = "Apruebas con: " + NuevoPromedio.toFixed(2);
        } else if (PromedioGlov > Aprovado && examen >= promedioMenor()) {
            NuevoPromedio = (examen + promedioMayor()) / 2;
            Texto = "Apruebas con: " + NuevoPromedio.toFixed(2);
        }
    }
    else {
        Texto = "";
    }
    document.getElementById("LblPromedioFINAL").innerHTML = Texto;
}

function promedioMenor() {
    let menor;
    if (Promedio1erP > Promedio2doP) {
        menor = Promedio2doP;
    } else {
        menor = Promedio1erP;
    }
    return menor;
}

function promedioMayor() {
    let mayor;
    if (Promedio1erP > Promedio2doP) {
        mayor = Promedio1erP;
    } else {
        mayor = Promedio2doP;
    }
    return mayor;
}
function calculalo() {
    calcula1erPa();
    calcula2doPa();
    calculaProGlo();
    calculaExamMej();
}  

//variables globales (let sirve para ambitos cerrados)
var Promedio1erP = 0;
var Promedio2doP = 0;
var PromedioGlov = 0;
var NotaExaRecup = 0; //la nota minima para pasar el semestre
const ExelenciaAca = 9.5;
const casiExelenciaAca = 9;
const Aprovado = 7;
