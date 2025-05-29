<script setup>
import { ref, onMounted } from 'vue'

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

onMounted(() => {

})


</script>

<template>
    <nav class="navbar">
        <div class="navbar-brand">
            <a class="navbar-item" href="#">
                <svg width="28" height="28" xmlns="http://www.w3.org/2000/svg">
                  <image href="/criticalc.svg" height="28" width="28" />
                </svg>
                <span>CRITICALC</span>
            </a>
            <div class="navbar-item input-navbar-item">
                <div class="control">
                    <input
                        id="INPUT_WEIGHT"
                        class="input"
                        type="number"
                        placeholder="Peso 70kg"
                        :value="dataWeight"
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
                        :value="dataHeight"
                        @input=handleHeight
                    />
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.input-navbar-item {
    max-width: 33%;
 }
</style>