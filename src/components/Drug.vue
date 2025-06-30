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
const isActive = ref(false);

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

const moveUp = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    setTimeout(() => {
        window.document.getElementById('INPUT_WEIGHT').focus();
    }, 1000);
    
};
const show = () => {
    isActive.value = !isActive.value;
//    calcDrug(props.drugData, props.weight, props.height, props.tag);
 //   showCalc();
 //   moveUp();
};

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
    <div :class="['grid', 'has-3-cols-desktop', 'has-3-cols-mobile', 'drug-box', isActive ? 'active': '']" @click="show">
        <div class="cell">
            <div class="card drug-card">
                <div class="card-content">
                    <div class="content has-text-white">
                        <b class="drug-name">{{ drugData.NOME }}</b>
                        <p class="drug-name">{{ drugData.FANTASIA_APRESENTACAO }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="cell is-gap-1">
            <div class="box drug-card">
                <div class="tags">
                    <span v-for="oneTag in drugData.TAGS" :class=colorTag[oneTag]>{{ oneTag }}</span>
                </div>
                <font-awesome-icon class="button-drop" :icon="['fas', 'arrow-right']" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.drug-box {
    border-bottom: 1px solid #aaa;
    padding: 0px;
    margin: 0px !important;
    cursor: pointer;
}

.drug-card {
    border: none;
    background: none;
    box-shadow: none;    
}

.active .drug-name  {
    color: #009cbf;
    transition: color 0.5s ease-in-out;
}

.button-drop {
    color: #fff;
    cursor: pointer;
    position: absolute;
    float:right;
    right: 0.5rem;
    margin-top: -2rem;
    padding: 0.5rem;
}

.active .button-drop {
    color: #009cbf;
    transform: rotate(90deg);
    transition: transform 0.5s ease-in-out, color 0.5s ease-in-out;
}

</style>