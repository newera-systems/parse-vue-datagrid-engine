import type Vue from "vue";

export const waitNextTick = async <V extends Vue>(ctx: V) =>
  await new Promise(resolve => {
    ctx.$nextTick(resolve);
  });
