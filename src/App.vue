<script setup>
import Papa from 'papaparse';
import Main from './components/Main.vue';
import { ref, onMounted } from 'vue';
import dataText from '/database2.csv?url&raw';

const dataCSV = ref(null);

onMounted(() => {
  Papa.parse(dataText, {
    header: true,
    dynamicTyping: true,
    complete: function(results) {
      console.log('CSV lido com sucesso.');
      let temp = results.data.map((el) => {
        return {
          CONCENTRACAO: el.DOSE_SOLUCAO / el.VOLUME_SOLUCAO,
          TAGS: el.TAG.split(','),
          ...el
        };
      });

      console.log(temp);
      dataCSV.value = temp;
    }
  });
})

</script>

<template>
  <Main v-if="dataCSV" :dataCSV=dataCSV />
</template>

<style>
@import "/node_modules/bulma/css/bulma.min.css"
</style>
