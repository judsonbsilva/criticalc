<script setup>
import { ref } from 'vue'
import About from './About.vue';

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

</script>

<template>
    <div class="panel is-link">
        <p class="panel-tabs" id="input-click-tag">
            <a @click="handleTag('sedativo')">
                <span class="icon is-small"><i class="fas fa-capsules" aria-hidden="true"></i></span>
                <span>Sedoanalgesia</span>
            </a>
            <a @click="handleTag('dva')">
                <span class="icon is-small"><i class="fas fa-capsules" aria-hidden="true"></i></span>
                <span>Droga vasoativa</span>
            </a>
            <a @click="handleTag('pcr')">
                <span class="icon is-small"><i class="fas fa-heart-circle-xmark"></i></span>
                <span>PCR</span>
            </a>
            <a @click="handleTag('iot')">
                <span class="icon is-small"><i class="fas fa-lungs" aria-hidden="true"></i></span>
                <span>Intubação</span>
            </a>
            <a @click="handleTag('outro')">
                <span class="icon is-small"><i class="fas fa-plus" aria-hidden="true"></i></span>
                <span>Outros</span>
            </a>
            <a @click="handleAbout(true)">
                <span class="icon is-small"><i class="fas fa-info" aria-hidden="true"></i></span>
                <span>Sobre nós</span>
            </a>
        </p>
        <div class="panel-block">
            <p class="control has-icons-left">
                <input id="input-search" class="input" type="text" placeholder="noradrenalina" @input=handleSearch />
                <span class="icon is-left">
                    <i class="fas fa-search" aria-hidden="true"></i>
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
                <p>Este site é uma calculadora destinada para médicos e estudantes de medicina disponibilizada
                    gratuitamente para facilitar a prescrição de medicamentos em pacientes críticos. Não utilize como
                    recomendação médica! </p>
                <p>Os cálculos são feitos automaticamente a partir do peso. Estamos em fase de teste, sempre confira as
                    doses recomendadas e desconfie de valores muito fora do habitual.</p>
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
                    <button class="button is-success" @click="handleMoney(true)">Críticas, sugestões e doações</button>
                    <button class="button" @click="handleAbout(false)">Sair</button>
                </div>
            </footer>
        </div>
    </div>

    <div :class="['modal', moneyIsOpen? 'is-active' : '' ]">
        <div class="modal-background"></div>
        <div class="modal-content">
            <p><b>Email (e chave PIX): </b> judsonbarroso@gmail.com</p>
            <br />
            <p>Envie suas dúvidas, críticas e sugestões</p>
            <p>PS: este site respira por aparelhos, doe um tostão e ajude salvá-lo!</p>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="handleMoney(false)"></button>
    </div>
</template>

<style scoped>
</style>
