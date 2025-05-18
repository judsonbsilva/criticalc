
const round2 = (num) => Math.round(num * 100)/100;

const calcDrugFlow = (concentration, unity, dosis, weight, typeOfDosis) => {
  //if( weigth < 20 ) return -1;
  
  
  var dose = null;
  
  try {
    dose = dosis.split('-').map(Number);
  } catch {
    dose = [Number(dosis), Number(dosis)];
  }
  //console.log(concentration, unity, dosis, weight, typeOfDosis);
  //console.log(dose);
  
  switch(typeOfDosis){
    case 'kg/min':
      var flowMin = dose[0] * 60 * weight / concentration;
      var flowMax = dose[1] * 60 * weight / concentration;
      
      return [round2(flowMin), round2(flowMax)];
    case 'kg/h':
      var flowMin = dose[0] * weight / concentration;
      var flowMax = dose[1] * weight / concentration;
      
      return [round2(flowMin), round2(flowMax)];
    case 'min':
      var flowMin = round2(dose[0] * 60 / concentration);
      var flowMax = round2(dose[1] * 60 / concentration);
      
      return [flowMin, flowMax];
    case 'fix/kg':
      var flowMin = round2(dose[0] * weight / concentration);
      var flowMax = round2(dose[1] * weight / concentration);
      
      return [flowMin, flowMax];
    case 'fix':      
      var flowMin = round2(dose[0] / concentration);
      var flowMax = round2(dose[1] / concentration);
      
      return [flowMin, flowMax];
      
  }
  return [];
}

const calcDrugDose = (concentration, weight, typeOfDosis, flow) => {
  //if( weigth < 20 ) return -1;
  
  var dose = null;
  
  switch(typeOfDosis){
    case 'kg/min':
      return round2((flow * concentration) / weight / 60);

    case 'kg/h':
      return round2(flow * concentration / weight);
    
    case 'min':
      return round2(flow * concentration / 60);
      
    case 'fix/kg':
      return round2(flow * concentration / weight);
  }
  return 0;
}

const calcDrug = (drug, weight, flow, doseN) => {
  if( !weight || !Number(weight) || weight < 20)
    return -1;

  if( !doseN ){
    doseN = drug.DOSE_01;
  } else if(doseN == 2){
    doseN = drug.DOSE_02;
  }

  if( flow && Number(flow) ){
    return calcDrugDose(
      drug.CONCENTRACAO,
      weight,
      drug.UNI_01,
      flow);
  } else {
    return calcDrugFlow(
      drug.CONCENTRACAO,
      drug.DOSE_UNI,
      doseN,
      weight,
      drug.UNI_01);
  }
}
/**
 * 
 * @param {não tenho ideia} ADMIN 
 * @param {valores a seres administrados} arrayValue 
 * @returns 
 */
const showCalc = (drug, arrayValue) => {
  
  console.log("SHOWCALC: ",drug, arrayValue);

  const ADMIN = drug.ADMINISTRACAO;
  var textValue = '';
  var timeValue = '';
  if(arrayValue[0] == arrayValue[1])
    textValue = `${arrayValue[0]}`;
  else
    textValue = `Entre ${arrayValue[0]} e ${arrayValue[1]}`;

  if(drug.TEMPO_ADMINISTRACAO){
    if(drug.TEMPO_ADMINISTRACAO == 1)
      timeValue = `1 minuto`;
    else if(drug.TEMPO_ADMINISTRACAO > 1)
      timeValue = `${drug.TEMPO_ADMINISTRACAO} minutos`;
    else 
      timeValue = `${Math.round(drug.TEMPO_ADMINISTRACAO * 60)} segundos`;
  }

  switch(ADMIN) {
    case 'BOLUS': 
      return `${textValue} mL em bolus EV`;
    case 'BOLUS-FLUSH': 
      return `${textValue} mL em bolus EV seguido por flush de SF0.9%`;
    case 'EVABERTO': 
      return `${textValue} mL EV em gotejamento aberto`;
    case 'BIC':
      return `${textValue} mL/h EV em BIC`;
    case 'EVTEMPO':
      return `${textValue} mL EV em ${timeValue}`;
  }
}

export { calcDrug, showCalc }