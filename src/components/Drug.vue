<script setup>
import { onMounted, ref, watch } from "vue";
import { calcDrug, showCalc } from "../core/calculator.js";

const props = defineProps({
    drugData: Object,
    weight: Number,
    height: Number,
    tag: String
});

const vazao = ref(null);

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
    'psa': 'tag is-info'
}

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
    <div class="grid has-2-cols-mobile has-3-cols-desktop" style="border-bottom: 1px solid #aaa">
        <div class="content" v-if="drugData ? false: true">
            <h2>Não localizado ou em construção</h2>
        </div>
        <div class="cell" style="cursor:pointer">
            <div class="card drug-name">
                <div class="card-content">
                    <div class="content has-text-white">
                        <b>{{ drugData.NOME }}</b>
                        <p>{{ drugData.FANTASIA_APRESENTACAO }}</p>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="box drug-name">
                        <div class="tags">
                            <span v-for="oneTag in drugData.TAGS" :class=colorTag[oneTag]>{{oneTag}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="cell">
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
        <div class="cell is-col-span-2">
            <div class="card" v-if="weight">
                <div class="card-content">
                    <div class="content">
                        <b>Diluição</b>
                        <p>{{ drugData.DILUICAO }}</p>
                        <b>Fazer</b>
                        <p>{{ showCalc(drugData, calcDrug(drugData, weight)) }}</p>
                    </div>
                    <div class="grid" v-if="drugData.ADMINISTRACAO == 'BIC'">
                        <div class="cell">
                            <div class="content">
                                <b>Cálculo de dose</b>
                                <input class="input" type="number" v-model="vazao" placeholder="vazão atual (ml/h)"/>
                            </div>
                        </div>
                        <div class="cell">
                            <div class="content" v-if="vazao">
                                <b>Dose atual</b>
                                <p>{{ calcDrug(drugData, weight, vazao, 1) }} {{ drugData.UNI_APRESENTACAO }}/{{ drugData.UNI_01 }}</p>
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
        </div>
    </div>
</template>

<style scoped>
.drug-name {
    border: none;
    background: none;
    box-shadow: none;
}
</style>