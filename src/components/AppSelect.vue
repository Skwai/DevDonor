<template>
  <div
    :class="$style.AppField"
    :empty="empty"
    :span="span"
  >
    <label
      v-if="showLabel"
      :class="$style.AppField__Label"
      :for="inputID"
    >{{label}}</Label>
    <div :class="$style.AppField__Wrap">
      <select
        :class="$style.AppField__Input"
        :required="required"
        :disabled="disabled"
        :id="inputID"
        v-model="inputValue"
        @input="change"
      >
        <option
          v-for="(option, index) in options"
          :value="option"
          :key="index"
        >{{option}}</option>
      </select>
      <label
        :for="inputID"
        aria-hidden="true"
        :class="$style.AppField__Toggle"
      >
        <svg :class="$style.AppField__ToggleIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/></svg>
      </label>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class AppField extends Vue {
  private inputValue: string | number | null = null

  @Prop({ required: true })
  private label: string

  @Prop({ default: false, required: false })
  private required: boolean

  @Prop({ required: true })
  private value: string | number

  @Prop({ default: false, required: false })
  private disabled: boolean

  @Prop({ default: true })
  private showLabel: boolean

  @Prop({ required: true })
  private options: Array<string | number>

  @Prop({ default: 1 })
  private span: number

  private change(ev: Event) {
    const value = (ev.target as HTMLInputElement).value
    this.inputValue = value
    this.$emit('input', value)
  }

  private created() {
    this.inputValue = this.value
  }

  get empty(): boolean {
    return !String(this.inputValue).length
  }

  get uid(): string {
    return Math.random()
      .toString(36)
      .substr(2)
  }

  get inputID(): string {
    return `${this.uid}__Input`
  }
}
</script>

<style lang="stylus" module>
@import '../styles/config.styl';
@import '../styles/forms.styl';

.AppField {
  text-align: left;
  grid-column: span 2;

  @media (min-width: 768px) {
    grid-column: span 1;

    &[span='2'] {
      grid-column: span 2;
    }
  }

  &__Wrap {
    display: flex;
    position: relative;
  }

  &__Toggle {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    line-height: 0;
    height: auto;
    z-index: 1;

    &Icon {
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  &__Label {
    fieldLabel();
  }

  &__Input {
    z-index: 2;
    field();
  }
}
</style>
