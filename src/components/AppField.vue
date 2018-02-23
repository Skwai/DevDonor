<template>
  <div
    :class="$style.AppField"
    :empty="empty"
    :span="span"
    :error="!valid && dirty"
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
        @blur="blur"
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
        @blur="blur"
      >
      <slot></slot>
    </div>
    <AppHelpText v-if="description">{{description}}</AppHelpText>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { PropOptions } from 'vue/types/options'

@Component
export default class AppField extends Vue {
  private inputValue: string | number | null = null
  private dirty: boolean = false

  @Prop({ required: true })
  private label: string

  @Prop({ default: 'text', required: false })
  private type: string

  @Prop({ default: false, required: false })
  private required: boolean

  @Prop({ required: true, type: String })
  private value: string | number | null

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

  @Prop({ required: false })
  private description: string

  @Prop({ default: 1 })
  private span: number

  @Prop({ required: false, default: true })
  private valid: boolean

  private change(ev: Event) {
    const value = (ev.target as HTMLInputElement).value
    this.inputValue = value
    this.$emit('input', value)
  }

  private blur(ev: Event) {
    this.dirty = true
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
  position: relative;
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
  }

  &__Label {
    fieldLabel();
  }

  &__Input {
    field();
  }
}
</style>
