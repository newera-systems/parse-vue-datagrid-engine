<template>
  <div class="group-ctrl-slot">
    <b-button-toolbar aria-label="Rule creation toolbar">
      <BButtonGroup>
        <BDropdown
          :text="ruleName"
          menu-class="dropdown-menu-rule-modal"
          right
          variant="primary"
        >
          <b-dropdown-header>
            {{ $t("Rule.selectId") }}
          </b-dropdown-header>
          <BDropdownItem
            v-for="rule in groupCtrl.rules"
            :key="rule.identifier"
            :variant="selectedRule === rule.identifier ? 'primary' : 'dark'"
            @click="setRule(rule.identifier)"
          >
            {{ getTranslation(rule.name) }}
          </BDropdownItem>
        </BDropdown>
        <BButton
          :disabled="selectedRule === ''"
          :title="$t('Rule.add')"
          class="btn-icon"
          variant="primary"
          @click="addRule"
        >
          <BIconPlusSquare class="" />
        </BButton>
      </BButtonGroup>
      <BButton
        :title="$t('Rule.addGroup')"
        class="btn-icon ml-2"
        variant="outline-dark"
        @click="groupCtrl.newGroup"
      >
        <BIconFolderPlus />
      </BButton>
    </b-button-toolbar>
  </div>
</template>
<script lang="ts">
import Vue, { defineComponent, PropType } from "vue";
import { GroupCtrlSlotProps } from "query-builder-vue";
import {
  BButton,
  BButtonGroup,
  BButtonToolbar,
  BDropdown,
  BDropdownHeader,
  BDropdownItem,
  BIconFolderPlus,
  BIconPlusSquare,
} from "bootstrap-vue";
import VueI18n from "vue-i18n";
import modalTranslation from "@/translation/modal";

Vue.use(VueI18n);
export default defineComponent({
  name: "ModalGroupCtrlSlot",
  i18n: new VueI18n(modalTranslation),
  components: {
    BButton,
    BButtonGroup,
    BButtonToolbar,
    BDropdown,
    BDropdownHeader,
    BDropdownItem,
    BIconFolderPlus,
    BIconPlusSquare,
  },
  props: {
    groupCtrl: {
      type: Object as PropType<GroupCtrlSlotProps>,
      required: true,
    },
  },
  data() {
    return {
      selectedRule: "",
      expanded: false,
    };
  },
  computed: {
    ruleName(): string {
      if (this.selectedRule === "") {
        return this.$t("Rule.selectId").toString() ?? "Select rule";
      }
      const name = this.groupCtrl.rules.find(
        (rule) => rule.identifier === this.selectedRule
      )?.name;
      return name ? this.getTranslation(name) : this.selectedRule;
    },
  },
  methods: {
    setRule(rule: string) {
      this.expanded = false;
      this.selectedRule = rule;
    },
    addRule() {
      if (!this.selectedRule) {
        return;
      }
      this.groupCtrl.addRule(this.selectedRule);
      this.selectedRule = "";
    },
    getTranslation(key: string): string {
      // @ts-expect-error DataGrid defined when using plugin
      if (this?.$DataGrid?.i18n) {
        return this.$t(key).toString() ?? key;
      }
      return key;
    },
  },
});
</script>

<style scoped>
.group-ctrl-slot {
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>
<style>
.dropdown-menu-rule-modal {
  max-height: 300px;
  overflow-y: auto;
}
</style>
