<script setup>
import { ref } from 'vue'

const emit = defineEmits(['updateWeight', 'updateHeight']);
const dataWeight = ref(null);
const dataHeight = ref(null);

const handleWeight = (ev) => {
    dataWeight.value = Number(ev.target.value);
    emit('updateWeight', dataWeight);
}
const handleHeight = (ev) => {
    dataHeight.value = Number(ev.target.value);
    emit('updateHeight', dataHeight);
}
</script>

<template>
    <nav class="navbar">
        <div class="navbar-brand">
            <a class="navbar-item" href="#">CRITICALC</a>
            <div class="navbar-item input-navbar-item">
                <div class="control">
                    <input
                        class="input"
                        type="number"
                        placeholder="Peso 70kg"
                        @input=handleWeight
                    />
                </div>
            </div>
            <div class="navbar-item input-navbar-item">
                <div class="control">
                    <input
                        class="input"
                        type="number"
                        placeholder="Altura 165cm"
                        @input=handleHeight
                    />
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.input-navbar-item {
    width: 40%;
 }
</style>