<template>
  <div
    :class="$style.AppMarkdown"
    :empty="empty"
    :span="span"
    :error="!valid && dirty"
  >
    <label
      v-if="showLabel"
      :class="$style.AppMarkdown__Label"
      :for="inputID"
    >
      {{label}}
      <span v-if="helpText" :class="$style.AppMarkdown__HelpText">{{helpText}}</span>
    </label>
    <div :class="$style.AppField__Wrap">
      <textarea :class="$style.AppField__Editor" ref="editor"></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import SimpleMDE from 'simplemde'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class AppMarkdown extends Vue {
  private mde: SimpleMDE | undefined = undefined // non-reactive
  private valid: boolean = false
  private dirty: boolean = false
  private uid: string = ''
  private inputValue: string = ''

  @Prop({ required: true })
  private label: string

  @Prop({ default: false, required: false })
  private required: boolean

  @Prop({ default: 1 })
  private span: number

  @Prop({ default: true })
  private showLabel: boolean

  @Prop({ required: false })
  private minlength: number

  @Prop({ required: false })
  private maxlength: number

  get empty() {
    return false
  }

  get inputID(): string {
    return `${this.uid}__Input`
  }

  get helpText() {
    const { minlength, maxlength, required } = this
    if (!required) {
      return 'Optional'
    }
    if (minlength && maxlength) {
      return `${minlength}-${maxlength} characters`
    }
    if (maxlength) {
      return `Maximum ${maxlength} characters`
    }
    if (minlength) {
      return `Minimum ${minlength} characters`
    }
  }

  private createUID() {
    return Math.random()
      .toString(36)
      .substr(2)
  }

  private created() {
    this.uid = this.createUID()
  }

  private mounted() {
    // https://forum.vuejs.org/t/vue-2-and-simplemde/2707/2
    const options = { element: this.$refs.editor } as any
    this.mde = new SimpleMDE(options)
    this.mde.value(this.inputValue)

    this.mde.codemirror.on('change', () => {
      if (this.mde) {
        this.$emit('input', this.mde.value())
      }
    })
  }
}
</script>

<style lang="stylus" module>
@import '../styles/label.styl';

.AppMarkdown {
  position: relative;
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
  }

  &__Label {
    fieldLabel();
    display: flex;
  }

  &__Input {
    field();
  }
}
</style>
