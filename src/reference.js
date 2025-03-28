const DATA_CSV = `TAGS,NOME,CLASSE,DOSE,DOSE_UNI,VOLUME,DILUICAO,DOSE_SOLUCAO,VOLUME_SOLUCAO,DOSE_USUAL,UNI_USUAL,CONCENTRACAO_SOLUCAO,BOLUS,DOSE_MANU,VOL_MANU,DESCRICAO
meds,Fentanil,Sedativo,250,mcg,10,5 frascos (50mL) + SF 0.9% 50mL ,1250,100,1-3,kg/h,12.5,N,,,Analgésico opióide. Pode gerar instabilidade hemodinâmica.
meds,Propofol,Sedativo,200,mg,20,5 frascos (100mL) puro,1000,100,0.3-3,kg/h,10,N,,,Sedativo. Pode gerar cardiodepressão.
meds,Midazolam,Sedativo,50,mg,10,5 frascos (50mL) + SF 0.9% 50mL,250,100,0.02-0.2,kg/h,2.5,N,,,Sedativo benzodiazepínico. Pode gerar cardiodepressão
meds,Dexmedetomidina,Sedativo,200,mcg,2,2 frascos (04mL) + SF 0.9% 96mL,400,100,0.2-1.4,kg/h,4,N,,,Sedativo alfa-adrenérgico central com baixa depressão respiratória
meds,Noradrenalina,Droga vasoativa,16000,mcg,4,4 frascos (16mL) + SG 5% 234mL,64000,250,0.05-1.5,kg/min,256,N,,,Vasopressor alfa-adrenérgico
meds,Noradrenalina (dobrada),Droga vasoativa,16000,mcg,4,8 frascos (32mL) + SG 5% 218mL,128000,250,0.05-1.5,kg/min,512,N,,,Vasopressor alfa-adrenérgico
meds,Dobutamina,Droga vasoativa,250,mg,20,1 frasco (20mL) + SF 0.9% 230mL,250,250,2.5-20,kg/min,1,N,,,Vasopressor beta-adrenérgico inotrópico positivo
meds,Nitroglicerina,Droga vasoativa,50,mg,10,1 frasco (10mL) + SF 0.9% 240mL,50,250,0.5-10,min,0.2,N,,,Vasodilatador coronariano e sistêmico venoso
meds,Nitroprussiato de Sódio,Droga vasoativa,50,mg,2,1 frasco (02mL) + SG 5% 248mL,50,250,0.5-10,kg/min,0.2,N,,,Vasodilatador arterial e venoso
meds,Adrenalina,Droga vasoativa,1,mg,1,16 frascos (16mL) + SG 5% 234mL,16,250,1-10,min,64,N,,,Vasopressor adrenérgico
meds,Vasopressina,Droga vasoativa,20,U,1,1 frasco (20U) + SG 5% 99mL,20,100,0.01-0.04,min,0.2,N,,,Vasopressor não-adrenérgico
meds,Insulina Regular,Insulina,1000,U,10,01mL + SF 0.9% 99mL,100,100,,,1,N,,,
meds,Glulisina,Insulina,100,U,1,01mL + SF 0.9% 99mL,100,100,,,1,N,,,
pcr,Adrenalina,Droga vasoativa,1,mg,1,"1 frasco (01mL) + AD 9mL, seguido por flush de SF 0.9%",1,10,1,fix,0.1,S,1,1,Primeira dose após 2º choque ou quando identificado ritmo não chocável. Repetir dose a cada 3-5min
pcr,Amiodarona,Antiarrítmico,150,mg,3,"2 frasco (06mL) puro, em bolus, seguido por flush com SF 0.9%",300,6,300,fix,50,S,150,3,Primeira dose após 3º choque. Pode ser repetida (metade da dose)
pcr,Bicarbonato de Sódio 8.4% (ampola),Outros,10,mEq,10,"puro, em bolus, seguido por flush com SF 0.9%",10,10,1.0-2.0,fix/kg,1,S,0.75,,Primeira dose completa. Pode ser repetida a cada 15min (metade da dose)
pcr,Bicarbonato de Sódio 8.4% (frasco),Outros,250,mEq,250,"puro, em bolus, seguido por flush com SF 0.9%",250,250,1.0-2.0,fix/kg,1,S,0.75,,Primeira dose completa. Pode ser repetida a cada 15min (metade da dose)
pcr,Gluconato de Cálcio 10%,Eletrólitos,1,g,10,"3 frascos (30mL) puro, em bolus,seguido por flush com SF 0.9%",3,30,3,fix,0.1,S,,,Pode ser repetida a cada 2-5min
pcr,Sulfato de Magnésio 10%,Eletrólitos,1,g,10,"2 frascos (20mL) puro, em bolus, seguido por flush em SF 0.9%",2,20,2,fix,0.1,S,,,"Dose de ataque 1-2g EV, manutenção de 0.5-2g/h"
pcr,Lidocaína 2%,Antiarrítmico,40,mg,20,"puro, em bolus, seguido por flush com SF 0.9%",40,20,1-1.5,fix/kg,2,S,,,`;

const dataCSV = Papa.parse(DATA_CSV, {
  header: true,
  dynamicTyping: true
});

const example = dataCSV.data[1];

console.log(calcDrugFlow(example.CONCENTRACAO_SOLUCAO, example.DOSE_UNI, example.DOSE_USUAL, 70, example.UNI_USUAL));

document.body.onload = () => {
// AÇÕES
const CHANGE_WEIGHT = 'CHANGE_WEIGHT';
const CHANGE_HEIGHT = 'CHANGE_HEIGHT';
const SEARCH = 'SEARCH';
const LOAD = 'LOAD';

// ELEMENTOS
const inputWeight = document.getElementById("input-weight");
const inputHeight = document.getElementById("input-height");
const inputSearch = document.getElementById("input-search");
const outputList = document.getElementById("output-list");

// MÁQUINA DE ESTADOS
var state = { result: elementData };
function changeState(action, value){
  switch (action){
    case 'CHANGE_WEIGHT':
      state.weight = value;
      afterState();
      break;
    case 'CHANGE_HEIGHT':
      state.height = value;
      afterState();
      break;
    case 'SEARCH':
      state.searchTerm = value;
      afterState();
      break;
    case 'LOAD':
      state.loaded = true;
      break;
  }
  afterState();
}

var elementData = null;
  
function afterState(){
    
 elementData = dataCSV.data.map((el) => {
   var temp = document.createElement('div');
   temp.dataTemp = JSON.stringify(el);
   /*temp.onclick = (event) => {
     console.log(event.target.parentElement);
   };*/
  
   temp.innerHTML = `
<div class="grid" style="border-bottom: 1px solid #aaa">
 <div class="cell is-4 drug-name" style="cursor:pointer">
    <p style="padding:1em">${el.NOME}</p>
 </div>
 <div class="cell is-4 drug-info">
   <div class="card">
    <div class="card-content">
      <div class="content">
        <b>Apresentação</b>
         <p>${el.DOSE}${el.DOSE_UNI}/${el.VOLUME}mL</p>
         <b>Diluição padrão</b>
         <p>${el.DILUICAO}</p>
      </div>
    </div>
   </div>
 </div>
 <div class="cell is-4 drug-info">
   <div class="card">
    <div class="card-content">
      <div class="content">
        <b>Dose</b>
        <p>${calcDrug(el, state.weight || 70)}${el.DOSE_UNI}/${el.UNI_USUAL}</p>
      </div>
    </div>
   </div>
 </div>
</div>
`; 
  return temp;
});
  
  elementData.forEach((el) => {
    console.log(el);
    outputList.appendChild(el);
  });
}

inputWeight.onchange = (event) => {
  var temp = Number(event.target.value);
  if( temp ) changeState(CHANGE_WEIGHT, temp);
}

inputSearch.onchange = (event) => {
  var temp = event.target.value;
  if( temp ) changeState(SEARCH, temp);
}

}