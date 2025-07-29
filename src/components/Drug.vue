<script setup>
import { onMounted, ref } from "vue";
import { calcDrug, showCalc } from "../core/calculator.js";

const props = defineProps({
    drugData: Object,
    weight: Number,
    height: Number,
    tag: String
});


const emit = defineEmits(['updateWeight']);

const vazao = ref(null);
const isActive = ref(false);
const dataWeight = ref(null);

const handleWeight = (ev) => {
    dataWeight.value = Number(ev.target.value);
}

const send = () => {
    emit('updateWeight', dataWeight.value);
};

const colorTag = {
    'pcr': 'tag is-black',
    'analgesico':'tag is-light has-text-dark',
    'sedoanalgesia':'tag is-primary',
    'opioide':'tag is-link',
    'dva':'tag is-info',
    'vasopressor':'tag is-warning',
    'sedativo': 'tag is-danger',
    'alfa-agonista':'tag is-success',
    'beta-agonista':'tag is-success',
    'inotropico': 'tag is-danger',   
    'cronotropico': 'tag is-light has-text-dark',
    'antianginoso': 'tag is-danger',
    'vasodilatador': 'tag is-primary',
    'acls': 'tag is-danger',
    'antiarritmico': 'tag is-warning',
    'insulina': 'tag is-black',
    'iot': 'tag is-black',
    'sri': 'tag is-primary',
    'bnm': 'tag is-danger',
    'psa': 'tag is-info',
    'eletrolito': 'tag is-light has-text-dark'
}

const moveUp = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    setTimeout(() => {
        window.document.getElementById('INPUT_WEIGHT').focus();
    }, 1000);
    
};
const toggleActive = () => {
    // Ativa o componente e mostra o conteúdo
    console.log('toggleActive', isActive.value);
    isActive.value = !isActive.value;
};

onMounted(() => {
    // Atualiza o peso se já estiver definido
    if (props.weight) {
        dataWeight.value = props.weight;
    }
});

/*
is-dark
    is-light
    is-white
    is-primary
    is-link
    is-info
    is-success
    is-warning
    is-danger
*/

//const calc = ref(0);
</script>
<template>
    <div :class="['grid', 'has-3-cols-desktop', 'has-3-cols-mobile', 'drug-box', isActive ? 'active': '']">
        <div class="cell is-col-2-mobile">
            <div class="card drug-card">
                <div class="card-content">
                    <div class="content" @click="toggleActive">
                        <b class="drug-name has-text-white-bis">{{ drugData.NOME }}</b>
                        <p class="drug-name has-text-grey">{{ drugData.FANTASIA_APRESENTACAO }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="cell is-col-2-mobile">
            <div class="box drug-card">
                <div class="tags">
                    <span v-for="oneTag in drugData.TAGS" :class=colorTag[oneTag]>{{ oneTag }}</span>
                </div>
                <font-awesome-icon class="button-drop" :icon="['fas', 'arrow-right']" @click="toggleActive" />
            </div>
        </div>
        <div class="cell cell is-col-span-2" v-if="isActive">
            <div class="card">
                <div class="card-content">
                    <div class="content">
                        <b>Indicação</b>
                        <p>{{ drugData.RESUMO_INDICACAO }}</p>
                        <b>Dose usual</b>
                        <p>{{ drugData.DOSE_01 }} {{ drugData.UNI_APRESENTACAO }}/{{ drugData.UNI_01 }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="cell cell is-col-span-2" v-if="isActive">
            <div class="card has-background-primary-100 has-text-primary-invert" v-if="weight">
                <div class="card-content">
                    <div class="grid">
                        <div class="cell">
                            <b>Diluição</b>
                            <p>{{ drugData.DILUICAO }}</p>
                        </div>
                        <div class="cell">
                            <b>Fazer</b>
                            <p>{{ showCalc(drugData, calcDrug(drugData, weight)) }}</p>
                        </div>
                    </div>
                    <div class="grid" v-if="drugData.ADMINISTRACAO == 'BIC'">
                        <div class="cell">
                            <div class="content">
                                <b>Cálculo de dose</b>
                                <input class="input" type="number" v-model="vazao" placeholder="vazão atual (ml/h)" />
                            </div>
                        </div>
                        <div class="cell">
                            <div class="content" v-if="vazao">
                                <b>Dose atual</b>
                                <p>{{ calcDrug(drugData, weight, vazao, 1) }} {{ drugData.UNI_APRESENTACAO }}/{{
                                    drugData.UNI_01 }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-content" v-if="drugData.DOSE_02 && drugData.PAGINA == 'psa'">
                    <div class="content">
                        <b>Repetir (se necessário)</b>
                        <p>Em {{ drugData.TEMPO_REPETIR }} minutos</p>
                        <b>Fazer (dose extra)</b>
                        <p>{{ showCalc(drugData, calcDrug(drugData, weight, NaN, 2)) }}</p>
                    </div>
                </div>
            </div>
            <div class="card card has-background-primary-100 has-text-primary-invert" v-else="weight">
                <div class="card-content">
                    <div class="content">
                        <div class="field">
                            <label class="label has-text-dark">Digite o peso</label>
                            <div class="control">
                                <input class="input" type="number" placeholder="Peso (kg)" :value="dataWeight"
                                    @input=handleWeight />
                                <button class="button is-primary" @click="send">Calcular</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.drug-box {
    border-bottom: 1px solid #aaa;
    padding: 0px;
    margin: 0px !important;
    position:relative;
}

.drug-card {
    border: none;
    background: none;
    box-shadow: none;    
}

.active .drug-name  {
    color: #009cbf !important;
    transition: color 0.5s ease-in-out;
    cursor: pointer !important;
}

.button-drop {
    color: #fff;
    cursor: pointer;
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    padding: 0.5rem;
    z-index:2;
}

.active .button-drop {
    color: #009cbf;
    transform: rotate(90deg);
    transition: transform 0.5s ease-in-out, color 0.5s ease-in-out;
}

</style>