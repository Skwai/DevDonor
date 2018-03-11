<template>
  <div
    :class="$style.AppSelect"
    :empty="empty"
    :span="span"
    :error="!valid && dirty"
    :key="inputValue"
  >
    <label
      v-if="showLabel"
      :class="$style.AppSelect__Label"
      :for="inputID"
    >
      {{label}}
      <span v-if="helpText" :class="$style.AppField__HelpText">{{helpText}}</span>
    </label>
    <div :class="$style.AppSelect__Wrap">
      <select
        :class="$style.AppSelect__Input"
        :required="required"
        :disabled="disabled"
        :id="inputID"
        v-model="inputValue"
        @input="change"
        @blur="onBlur"
        ref="select"
      >
        <option disabled selected value="">Please select one&hellip;</option>
        <option
          v-for="(option, index) in options"
          :value="isArray ? option : index"
          :key="isArray ? option : index"
          :selected="inputValue === index ? 'selected' : null"
        >{{option}}</option>
      </select>
      <label
        :for="inputID"
        aria-hidden="true"
        :class="$style.AppSelect__Toggle"
      >
        <svg :class="$style.AppSelect__ToggleIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/></svg>
      </label>
    </div>
    <AppHelpText v-if="description">{{description}}</AppHelpText>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class AppSelect extends Vue {
  private inputValue: string | number | null = null
  private dirty: boolean = false
  private uid: string | undefined = undefined
  private valid: boolean = false

  @Prop({ required: true })
  private label: string

  @Prop({ default: false, required: false })
  private required: boolean

  @Prop({ required: true, type: String })
  private value: string | number | null

  @Prop({ default: false, required: false })
  private disabled: boolean

  @Prop({ default: true })
  private showLabel: boolean

  @Prop({ required: true, type: [Array, Object] })
  private options: Array<string | number> | { [key: string]: string }

  @Prop({ default: 1 })
  private span: number

  @Prop({ required: false })
  private description: string

  @Watch('value', { immediate: true })
  private onValueChange(newValue: any) {
    this.inputValue = newValue
    this.checkValidity()
  }

  private change(ev: Event) {
    const value = (ev.target as HTMLInputElement).value
    this.$emit('input', value)
    this.checkValidity()
  }

  private checkValidity() {
    this.valid = this.getValidity()
  }

  private getValidity() {
    if (this.$refs.select) {
      const select = this.$refs.select as HTMLSelectElement
      return select.validity.valid
    }
    return false
  }

  private blur(ev: Event) {
    this.dirty = true
  }

  get empty(): boolean {
    return !String(this.inputValue).length
  }

  get inputID(): string {
    return `${this.uid}__Input`
  }

  get helpText() {
    const { required } = this
    if (!required) {
      return 'Optional'
    }
  }

  get isArray() {
    return 'length' in this.options
  }

  private createUID() {
    return Math.random()
      .toString(36)
      .substr(2)
  }

  private created() {
    this.uid = this.createUID()
  }

  private onBlur() {
    this.dirty = true
  }
}
</script>

<style lang="stylus" module>
@import '../styles/config';
@import '../styles/forms';

.AppSelect {
  text-align: left;
  grid-column: span 2;

  @media (min-width: 768px) {
    grid-column: span 1;

    &[span='2'] {
      grid-column: span 2;
    }
  }

  &__HelpText {
    margin-left: auto;
    padding-left: 1rem;
    opacity: 0.5;
    font-size: $fontSizeSmall;
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
    // Remove <select> arrow from firefox
    // https://stackoverflow.com/questions/5912791/how-to-remove-the-arrow-from-a-select-element-in-firefox
    -moz-appearance: none;
    text-indent: 0.01px;
    text-overflow: '';
  }
}
</style>
