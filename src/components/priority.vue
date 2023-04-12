<template>
  <a-select
      v-model:value="value"
      label-in-value
      style="width: 95px"
      :options="options"
      @change="handleChange"
  ></a-select>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const options = ref([{
      value: 'high',
      label: 'High',
    }, {
      value: 'medium',
      label: 'Medium',
    },{
      value: 'low',
      label: 'Low',
    }]);
    const handleChange = value => {
      console.log(value); // { key: "lucy", label: "Lucy (101)" }
    };

    return {
      value: ref({
        value: 'Priority',
      }),
      options,
      handleChange,
    };
  },
});
</script>
