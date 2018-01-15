<template>
  <div
    :class="$style.AppField"
    :empty="empty"
  >
    <label
      v-if="showLabel"
      :class="$style.AppField__Label"
      :for="inputID"
    >{{label}}</Label>
    <div :class="$style.AppField__Wrap">
      <textarea v-if="type === 'textarea'"
        :class="$style.AppField__Input"
        v-model="inputValue"
        :required="required"
        :disabled="disabled"
        rows="5"
        cols="20"
        :id="inputID"
        :autocomplete="autocomplete"
        :autocapitalize="autocapitalize"
        :autocorrect="autocorrect"
        :spellcheck="spellcheck"
        :placeholder="placeholder"
        @input="change"
      ></textarea>
      <input
        v-else
        :type="type"
        :class="$style.AppField__Input"
        v-model="inputValue"
        :required="required"
        :disabled="disabled"
        :id="inputID"
        :autocomplete="autocomplete"
        :autocapitalize="autocapitalize"
        :autocorrect="autocorrect"
        :spellcheck="spellcheck"
        :placeholder="placeholder"
        @input="change"
      >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class AppField extends Vue {
  inputValue: string | number | null = null

  @Prop({ required: true })
  label: string

  @Prop({ default: 'text', required: false })
  type: string

  @Prop({ default: false, required: false })
  required: boolean

  @Prop({ required: true })
  value: string | number

  @Prop({ default: false, required: false })
  disabled: boolean

  @Prop({ default: 'on', required: false })
  autocomplete: string

  @Prop({ default: 'on', required: false })
  autocapitalize: string

  @Prop({ default: 'on', required: false })
  autocorrect: string

  @Prop({ default: 'on', required: false })
  spellcheck: string

  @Prop({ required: false })
  placeholder: string

  @Prop({ default: true })
  showLabel: boolean

  change (ev: Event) {
    const value = (ev.target as HTMLInputElement).value
    this.inputValue = value
    this.$emit('input', value)
  }

  created () {
    this.inputValue = this.value
  }

  get empty (): boolean {
    return !String(this.inputValue).length
  }

  get uid (): string {
    return Math.random().toString(36).substr(2)
  }

  get inputID (): string {
    return `${this.uid}__Input`
  }
}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"
@import "../styles/forms.styl"

.AppField
  margin: 1rem 0 $spacingBase
  position: relative
  text-align: left

  &__Wrap
    display: flex

    button
      border-top-left-radius: 0
      border-bottom-left-radius: 0

  &__Label
    fieldLabel()

  &__Input
    field()
</style>
