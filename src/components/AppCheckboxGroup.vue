<template>
  <div :class="$style.AppRadioGroup" :span="span">
    <div :class="$style.AppRadioGroup__Label">{{label}}</div>
    <AppHelpText v-if="description" :class="$style.AppRadioGroup__Help">{{description}}</AppHelpText>
    <div :class="$style.AppRadioGroup__Options">
      <label
        :class="$style.AppRadioGroup__Option"
        v-for="(option, index) in options"
        :key="index"
      >
        <input
          type="checkbox"
          :value="isOptionsArray ? option : index"
          :name="uid"
          :required="required"
          v-model="inputValue"
          @change="change"
        >
        {{option}}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class AppRadioGroup extends Vue {
  private inputValue: Array<string | number> = []
  private uid: string | undefined = undefined

  @Prop({ required: true, type: [Array] })
  private value: Array<string | number> | null

  @Prop({ required: true, type: [Array, Object] })
  private options: {} | string[]

  @Prop({ required: true })
  private label: string

  @Prop({ required: false })
  private description: string

  @Prop({ default: 1 })
  private span: number

  get isOptionsArray() {
    return 'length' in this.options
  }

  @Watch('value', { immediate: true })
  private onValueChange(newValue: any) {
    this.inputValue = newValue
  }

  private change(ev: Event) {
    const value = this.inputValue
    this.$emit('input', value)
  }

  private createUID() {
    return Math.random()
      .toString(36)
      .substr(2)
  }

  private created() {
    this.uid = this.createUID()
  }
}
</script>

<style lang="stylus" module>
@require '../styles/config';
@require '../styles/forms';

.AppRadioGroup {
  grid-column: span 2;

  @media (min-width: 768px) {
    grid-column: span 1;

    &[span='2'] {
      grid-column: span 2;
    }
  }

  &__Options {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 0.5rem;
  }

  &__Label {
    fieldLabel();
  }

  &__Option {
    display: block;
    font-weight: 500;
    cursor: pointer;

    &:hover {
      color: $colorPrimary;
    }
  }

  &__Help {
    margin-bottom: 1rem;
  }
}
</style>
