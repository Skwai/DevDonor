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
      <select
        :class="$style.AppField__Input"
        v-model="inputValue"
        :required="required"
        :disabled="disabled"
        :id="inputID"
        @input="change"
      >
        <option v-for="(option, index) in options" :value="option" :key="index">{{option}}</option>
      </select>
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

  @Prop({ default: false, required: false })
  required: boolean

  @Prop({ required: true })
  value: string | number

  @Prop({ default: false, required: false })
  disabled: boolean

  @Prop({ default: true })
  showLabel: boolean

  @Prop({ required: true })
  options: (string | number)[]

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
  margin: 0 0 $spacingBase
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
