// shims-tsx.d.ts

import type Vue from 'vue';
import { type VNode } from 'vue';

declare global {
  namespace JSX {
    interface Element extends VNode {
    }

    interface ElementClass extends Vue {
    }

    type IntrinsicElements = Record<string, any>;
  }
}
