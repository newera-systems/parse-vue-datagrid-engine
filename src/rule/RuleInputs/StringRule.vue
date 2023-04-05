<template>
  <b-form-group>
    <b-input-group>
      <b-input-group-prepend>
        <OperatorDropdown v-model="operator" :options="operatorList" />
      </b-input-group-prepend>
      <b-form-input v-model="content" autocomplete="off" trim />
      <!--      <b-input-group-append v-show="operator === 'matches'" is-text>-->
      <!--        <b-form-checkbox-->
      <!--          v-model="caseSensitive"-->
      <!--          class="custom-control-info"-->
      <!--          plain-->
      <!--          title="Case sensitive regex"-->
      <!--        />-->
      <!--      </b-input-group-append>-->
    </b-input-group>
    <p v-show="operator === 'matches'" class="m-0 p-0">
      Format:
      <span class="text-danger">/</span>
      <small class="text-info">Pattern</small>
      <span class="text-danger">/</span>
      <small class="text-dark">flags</small>
    </p>
  </b-form-group>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { BFormGroup, BFormInput, BInputGroup, BInputGroupPrepend } from 'bootstrap-vue';
import {
  EngineRuleData,
  EngineSubOperators,
  SimpleRuleType,
  StringOperatorOptions,
} from '@/datagrid-bvue';
import fieldInput from '@/mixins/RuleFieldInput';
import OperatorDropdown from '@/rule/RuleInputs/OperatorDropdown.vue';

export default defineComponent({
  name: 'StringRule',
  mixins: [fieldInput],
  components: {
    BFormGroup,
    BInputGroup,
    BFormInput,
    BInputGroupPrepend,
    OperatorDropdown,
  },
  props: {
    value: {
      type: Object as PropType<EngineRuleData<string, SimpleRuleType.String>>,
      default: () =>
        ({
          type: SimpleRuleType.String,
          value: '',
          operator: EngineSubOperators.EqualTo,
        } as EngineRuleData<string, SimpleRuleType.String>),
    },
  },
  data() {
    return {
      content: '',
      operator: EngineSubOperators.EqualTo,
      operatorList: StringOperatorOptions,
      caseSensitive: false,
    };
  },
  computed: {
    // regex(): string {
    //   if (this.isPossibleRegex(this.content)) {
    //     const pattern = this.content.slice(this.content.indexOf("/") + 1, this.content.lastIndexOf("/"));
    //     const flags = this.getValidFlags(this.content, this.caseSensitive);
    //     return `/${pattern}/${flags}`;
    //   } else {
    //     const flags = this.caseSensitive ? "" : "i";
    //     return `/${this.content}/${flags}`;
    //   }
    // },
  },
  methods: {
    update(): void {
      try {
        if (this.value) {
          this.content = this.value.value;
          this.operator = this.value.operator;
        }
      } catch (e) {
        this.content = '';
        this.operator = EngineSubOperators.EqualTo;
      }
    },
    updateOutput() {
      this.$emit('input', {
        type: SimpleRuleType.String,
        value: this.content,
        operator: this.operator,
      } as EngineRuleData<string, SimpleRuleType.String>);
    },
    // isPossibleRegex(str: string): boolean {
    //   const start = str.search(/\S/); // Find the index of the first non-whitespace character
    //   const end = str.lastIndexOf("/");
    //   if (start === -1 || end === -1 || start >= end || str[start] !== "/") {
    //     return false;
    //   }
    //   const pattern = str.slice(start + 1, end);
    //   const flags = str.slice(end + 1).trim();
    //   const validFlags = ["g", "i", "m", "s", "u", "y"];
    //   const isValidFlags = [...flags].every((flag) => validFlags.includes(flag)); // Check validity of flags
    //   if (!isValidFlags) {
    //     return false;
    //   }
    //   try {
    //     // eslint-disable-next-line no-new
    //     new RegExp(pattern, flags);
    //     return true;
    //   } catch (e) {
    //     return false;
    //   }
    // },
    // getValidFlags(regexStr: string, caseSensitive: boolean): string {
    //   const start = regexStr.search(/\S/); // Find the index of the first non-whitespace character
    //   const end = regexStr.lastIndexOf("/");
    //   if (start === -1 || end === -1 || start >= end || regexStr[start] !== "/") {
    //     return "";
    //   }
    //   const flags = regexStr.slice(end + 1).trim(); // Extract flags and remove leading and trailing whitespace
    //   const validFlags = ["g", "i", "m", "s", "u", "y"];
    //   const existingFlags = [...flags].filter((flag) => validFlags.includes(flag));
    //   const hasInsensitiveFlag = existingFlags.includes("i");
    //
    //   if (caseSensitive && hasInsensitiveFlag) {
    //     // Remove "i" flag if caseSensitive is true and "i" is present in flags
    //     return existingFlags.filter((flag) => flag !== "i").join("");
    //   } else if (!caseSensitive && !hasInsensitiveFlag) {
    //     return existingFlags.concat("i").join("");
    //   } else {
    //     return existingFlags.join("");
    //   }
    // },
  },
  watch: {
    // caseSensitive(newVal, oldVal) {
    //   if (newVal !== oldVal) this.updateOutput();
    // },
    // regex(newVal, oldVal) {
    //   if (newVal !== oldVal){
    //     if (this.operator === EngineSubOperators.Matches){
    //       this.content = newVal;
    //     }
    //   }
    // },
  },
});
</script>

<style lang="scss" scoped></style>
