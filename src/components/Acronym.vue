<script setup>

const props = defineProps({
    position: String,
    term: String
});

const means = {
    SRI: 'Sequência Rápida de Intubação',
    TV: 'Taquicardia Ventricular',
    SF: 'Soro Fisiológico',
    EV: 'Endovenoso',
    BIC: 'Bomba de Infusão',
    PCR: 'Parada Cardiorrespiratória'
};

</script>
<template>
    <span class="tooltip"
        :tooltip="means[term] || 'Sem explicação disponível'"
        :tooltip-position="position || 'top'">
        {{ term }}
    </span>
</template>

<style scoped>
.tooltip {
  border-bottom: 1px dotted #aaa;
  cursor: pointer;
}

[tooltip]{
  position:relative;
  display:inline-block;
}
[tooltip]::before {
    content: "";
    position: absolute;
    top:-6px;
    left:50%;
    transform: translateX(-50%);
    border-width: 4px 6px 0 6px;
    border-style: solid;
    border-color: rgba(0,0,0,0.7) transparent transparent     transparent;
    z-index: 99;
    opacity:0;
}

[tooltip-position='left']::before{
  left:0%;
  top:50%;
  margin-left:-12px;
  transform:translatey(-50%) rotate(-90deg) 
}
[tooltip-position='top']::before{
  left:50%;
}
[tooltip-position='bottom']::before{
  top:100%;
  margin-top:8px;
  transform: translateX(-50%) translatey(-100%) rotate(-180deg)
}
[tooltip-position='right']::before{
  left:100%;
  top:50%;
  margin-left:1px;
  transform:translatey(-50%) rotate(90deg)
}

[tooltip]::after {
    content: attr(tooltip);
    position: absolute;
    left:50%;
    top:-6px;
    transform: translateX(-50%)   translateY(-100%);
    background: rgba(0,0,0,0.7);
    text-align: center;
    color: #fff;
    padding:4px 2px;
    font-size: 12px;
    min-width: 80px;
    border-radius: 5px;
    pointer-events: none;
    padding: 4px 4px;
    z-index:99;
    opacity:0;
}

[tooltip-position='left']::after{
  left:0%;
  top:50%;
  margin-left:-8px;
  transform: translateX(-100%)   translateY(-50%);
}
[tooltip-position='top']::after{
  left:50%;
}
[tooltip-position='bottom']::after{
  top:100%;
  margin-top:8px;
  transform: translateX(-50%) translateY(0%);
}
[tooltip-position='right']::after{
  left:100%;
  top:50%;
  margin-left:8px;
  transform: translateX(0%)   translateY(-50%);
}

[tooltip]:hover::after,[tooltip]:hover::before {
   opacity:1
}
</style>