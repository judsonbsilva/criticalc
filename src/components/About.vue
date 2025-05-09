<script setup>
import { ref } from 'vue'

const props = defineProps({
    show: Boolean
})
</script>

<template>
    <div class="modal" :class="{ 'is-active': show }">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Sobre nós</p>
                <button class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <b>Atenção!</b><br/>
                <p>Este site é uma calculadora destinada para médicos e estudantes de medicina disponibilizada gratuitamente para facilitar a prescrição de medicamentos em pacientes críticos. Não utilize como recomendação médica! </p>
                <p>Os cálculos são feitos automaticamente a partir do peso. Estamos em fase de teste, sempre confira as doses recomendadas e desconfie de valores muito fora do habitual.</p>
                <br />
                <p>Faça bom proveito e salve muitas vidas! :D</p>
                <br/>
                <p><b>Criado por</b> Judson Barroso da Silva, médico residente de Clínica Médica do Hospital Universitário do Piauí</p>
                
            </section>
            <footer class="modal-card-foot">
                <div class="buttons">
                    <button class="button is-success">Críticas, sugestões e doações</button>
                    <button class="button">Sair</button>
                </div>
            </footer>
        </div>
    </div>
</template>
