<template>
  <span :class="$style.AppTag"><slot /></span>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AppTag extends Vue {}
</script>

<style lang="stylus" module>
@import '../styles/tag.styl';

.AppTag {
  tag();

  + .AppTag {
    margin-left: 0.25rem;
  }
}
</style>
