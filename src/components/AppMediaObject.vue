<template>
  <div :class="$style.AppMediaObject" :align="align">
    <div :class="$style.AppMediaObject__Object">
      <slot name="object" />
    </div>
    <div :class="$style.AppMediaObject__Body">
      <slot name="body" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class AppMediaObject extends Vue {
  @Prop({ default: 'center' })
  private align: string
}
</script>

<style lang="stylus" module>
@require '../styles/config.styl';

.AppMediaObject {
  display: flex;
  margin();

  &[align='top'] {
    align-items: flex-start;
  }

  &[align='center'] {
    align-items: center;
  }

  &[align='bottom'] {
    align-item: flex-end;
  }

  &__Body {
    text-align: left;
  }

  &__Object {
    margin-right: $spacingBase;
  }
}
</style>
