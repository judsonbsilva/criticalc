<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['search', 'filterTag']);
const searchTerm = ref('');
const tag = ref(null);
const aboutIsOpen = ref(false);
const moneyIsOpen = ref(false);

const handleSearch = (ev) => {
    searchTerm.value = ev.target.value;
    emit('search', searchTerm);
}

const handleTag = (name) => {
    tag.value = name;
    emit('filterTag', name);
}

const handleAbout = (value) => { aboutIsOpen.value = value; }

const handleMoney = (value) => {
    aboutIsOpen.value = false;
    moneyIsOpen.value = value;
}


onMounted(() => {
    var menu = document.getElementById('input-click-tag');
    menu.scrollTo({ top:0, left:800, behavior: 'smooth'});
    setTimeout(() => {
        menu.scrollTo({ top:0, left:0, behavior: 'smooth'});
    }, 1500);
})
</script>

<template>
    <div class="panel is-link">
        <ul class="panel-tabs tabs" id="input-click-tag">
            <li @click="handleTag('sedativo')"
                :class="[ tag == 'sedativo' ? 'is-active' : '']" >
                <a>
                    <span class="icon is-small">
                        <font-awesome-icon :icon="['fas','bed']" />
                    </span>
                    <span>Sedoanalgesia</span>
                </a>
            </li>
            <li @click="handleTag('dva')"
                :class="[ tag == 'dva' ? 'is-active' : '']" >
                <a>
                    <span class="icon is-small">
                        <font-awesome-icon :icon="['fas', 'capsules']" />
                    </span>
                    <span>Droga vasoativa</span>
                </a>
            </li>
            <li @click="handleTag('pcr')"
                :class="[ tag == 'pcr' ? 'is-active' : '']" >
                <a>
                    <span class="icon is-small">
                        <font-awesome-icon :icon="['fas', 'skull']" />
                    </span>
                    <span>PCR</span>
                </a>
            </li>
            <li @click="handleTag('iot')"
                :class="[ tag == 'iot' ? 'is-active' : '']" >
                <a>
                    <span class="icon is-small">
                        <font-awesome-icon :icon="['fas', 'lungs']" />
                    </span>
                    <span>Intubação</span>
                </a>
            </li>
            <li @click="handleTag('arritmia')"
                :class="[ tag == 'arritmia' ? 'is-active' : '']" >
                <a>
                    <span class="icon is-small">
                        <font-awesome-icon :icon="['fas', 'heart-pulse']" />
                    </span>
                    <span>Arritmias</span>
                </a>
            </li>
            <li @click="handleTag('psa')"
                :class="[ tag == 'psa' ? 'is-active' : '']" >
                <a>
                    <span class="icon is-small">
                        <font-awesome-icon :icon="['fas', 'eye-dropper']" />   
                    </span>
                    <span>Sedação procedural</span>
                </a>
            </li>
            <li @click="handleAbout(true)">
                <a>
                    <span class="icon is-small">
                        <font-awesome-icon :icon="['fas', 'circle-info']" />
                    </span>
                    <span>Sobre nós</span>
                </a>
            </li>
        </ul>
        <div class="panel-block">
            <p class="control has-icons-left">
                <input id="input-search" class="input" type="text" placeholder="noradrenalina" @input=handleSearch />
                <span class="icon is-left">
                    <font-awesome-icon :icon="['fas', 'search']" />
                </span>
            </p>
        </div>
    </div>

    <div :class="['modal', aboutIsOpen ? 'is-active' : '']">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Sobre nós</p>
                <button class="delete" aria-label="close" @click="handleAbout(false)"></button>
            </header>
            <section class="modal-card-body">
                <b>Atenção!</b><br />
                <p>Este site é uma calculadora de código aberto disponibilizada gratuitamente a médicos e estudantes de medicina para auxiliar na prescrição de doentes críticos. Não utilize como recomendação médica!</p>
                <p>As doses são calculadas a partir do peso. Estamos em fase de teste. Se notar doses fora do habitual, desconfie.</p>
                <br />
                <i>Faça bom proveito e salve muitas vidas! :D</i>
                <br /><br />
                <p><b>Criado por</b> Judson Barroso da Silva</p>
                <p>Médico residente de Clínica Médica do Hospital Universitário do Piauí</p>
                <!-- <p><b>Revisado por</b> Victor Paro Cunha???</p>
                <p>Médico emergencista pelo Universidade Médica de São Paulo</p> -->
            </section>
            <footer class="modal-card-foot">
                <div class="buttons">
                    <button class="button is-success" @click="handleMoney(true)">Doe! (e critique)</button>
                    <button class="button" @click="handleAbout(false)">Sair</button>
                </div>
            </footer>
        </div>
    </div>

    <div :class="['modal', moneyIsOpen? 'is-active' : '' ]">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="card">
                <div class="card-header">
                    <p class="card-header-title">Email (e chave PIX): judsonbarroso@gmail.com</p>
                </div>
                <div class="card-content">
                    <div class="content">
                        <p>Envie suas dúvidas, críticas e sugestões</p>
                        <p>PS: este site respira por aparelhos, doe um tostão e ajude salvá-lo!</p>
                    </div>
                </div>
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="handleMoney(false)"></button>
    </div>
</template>

<style scoped>
#input-click-tag { margin-bottom: 0px }
#input-click-tag .is-active { border-bottom: solid #fff 2px; }
</style>
