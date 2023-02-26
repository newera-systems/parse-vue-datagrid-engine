import Vue from 'vue'

export const waitNextTick = <V extends Vue>(ctx: V) =>
  new Promise((resolve) => ctx.$nextTick(resolve))
