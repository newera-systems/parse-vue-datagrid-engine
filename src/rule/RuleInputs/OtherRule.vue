<template>
  <b-form-group>
    <b-input-group>
      <b-input-group-prepend is-text>
        <BIconCone size="24" variant="warning" /> Other Type
      </b-input-group-prepend>
      <b-form-input v-model="content" disabled />
    </b-input-group>
  </b-form-group>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { BFormGroup, BFormInput, BInputGroup, BInputGroupPrepend, BIconCone } from 'bootstrap-vue';
import { EngineRuleData, EngineSubOperators, SimpleRuleType } from '@/datagrid-bvue';

export default defineComponent({
  name: 'OtherRule',
  components: {
    BFormGroup,
    BInputGroup,
    BIconCone,
    BFormInput,
    BInputGroupPrepend,
  },
  props: {
    value: {
      type: Object as PropType<EngineRuleData<string, SimpleRuleType.String>>,
      default: () =>
        ({
          type: SimpleRuleType.String,
          value: null,
          operator: EngineSubOperators.EqualTo,
        } as EngineRuleData<string, SimpleRuleType.String>),
    },
  },
  data() {
    return {
      content: '',
    };
  },
  mounted() {
    this.update();
  },
  methods: {
    update(): void {
      try {
        if (this.value) {
          this.content = JSON.stringify(this.value.value);
        }
      } catch (e) {
        this.content = '';
      }
    },
  },
});
</script>

<style lang="scss" scoped></style>
