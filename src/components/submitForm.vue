<template>
  <a-form
      ref="formRef"
      name="dynamic_form_nest_item"
      :model="dynamicValidateForm"
      @finish="onFinish"
  >
    <a-space
        v-for="(item, index) in dynamicValidateForm.items"
        :key="item.id"
        style="display: flex; margin-bottom: 8px"
        align="baseline"
    >
      <a-form-item
          :name="['items', index, 'first']"
          :rules="{
          required: true,
          message: 'Finish the form',
        }"
      >
        <a-input v-model:value="item.first" placeholder="Add new todo" />
      </a-form-item>
    </a-space>
    <a-form-item>
      <a-button type="dashed" block @click="addTodoItem">
        <PlusOutlined />
        Add todo
      </a-button>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue';
export default defineComponent({
  setup() {
    const formRef = ref();
    const dynamicValidateForm = reactive({
      items: [],
    });
    const addItem = () => {
      dynamicValidateForm.items.push({
        first: '',
        id: Date.now(),
      });
    };
    const onFinish = values => {
      console.log('Received values of form:', values);
      console.log('dynamicValidateForm.items:', dynamicValidateForm.items);
    };
    return {
      formRef,
      dynamicValidateForm,
      onFinish,
      addTodoItem: addItem,
    };
  },
});
</script>
