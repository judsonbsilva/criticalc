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
    'bnm': 'tag is-danger'
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
    <div class="columns is-mobile is-multiline" style="border-bottom: 1px solid #aaa">
        <div class="column is-2-desktop is-4-mobile" style="cursor:pointer">
            <div class="card drug-name">
                <div class="card-content">
                    <div class="content">
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
        <div class="column is-5-desktop is-8-mobile">
            <div class="card">
                <div class="card-content">
                    <div class="content">
                        <b>Diluição padrão</b>
                        <p>{{ drugData.DILUICAO }}</p>
                        <b>Dose usual</b>
                        <p>{{ drugData.DOSE_01 }} {{ drugData.DOSE_UNI }}/{{ drugData.UNI_01 }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="column is-5-desktop is-12-mobile">
            <div class="card" v-if="weight">
                <div class="card-content">
                    <div class="columns is-multiline">
                        <div class="column is-12">
                            <div class="content">
                                <b>Fazer</b>
                                <p>{{ showCalc(drugData.ADMINISTRACAO, calcDrug(drugData, weight)) }}</p>
                            </div>
                        </div>
                        <div class="column is-6 is-6-mobile">
                            <div class="control">
                                <b>Vazão atual</b>
                                <input class="input" type="number" v-model="vazao" placeholder="(ml/h)"/>
                            </div>
                        </div>

                        <div class="column is-6 is-6-mobile">
                            <span v-if="vazao">
                                <b>Dose atual</b>
                                <p>{{ calcDrug(drugData, weight, vazao) }} {{ drugData.DOSE_UNI }}/{{ drugData.UNI_01 }}</p>
                            </span>
                        </div>
                    </div>
                    <div class="column is-12">
                        <div class="content">
                            <b>Observação</b>
                            <p>{{ drugData.DESCRICAO }}</p>
                            <p>{{ drugData.COLATERAIS }}</p>
                        </div>
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