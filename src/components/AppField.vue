<template>
  <div
    :class="$style.AppField"
    :empty="empty"
    :type="type"
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
        :rows="rows"
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
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class AppField extends Vue {
  private inputValue: string | number | null = null

  @Prop({ required: true })
  private label: string

  @Prop({ default: 'text', required: false })
  private type: string

  @Prop({ default: false, required: false })
  private required: boolean

  @Prop({ required: true })
  private value: string | number

  @Prop({ default: false, required: false })
  private disabled: boolean

  @Prop({ default: 'on', required: false })
  private autocomplete: string

  @Prop({ default: 'on', required: false })
  private autocapitalize: string

  @Prop({ default: 'on', required: false })
  private autocorrect: string

  @Prop({ default: 'on', required: false })
  private spellcheck: string

  @Prop({ required: false })
  private placeholder: string

  @Prop({ default: true })
  private showLabel: boolean

  @Prop({ default: 5 })
  private rows: number

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
@import "../styles/config.styl"
@import "../styles/forms.styl"

.AppField
  position: relative
  text-align: left

  &[type="textarea"]
    grid-column: span 2

  &__Wrap
    display: flex

  &__Label
    fieldLabel()

  &__Input
    field()
</style>
