<template>
  <div :class="$style.ProjectFilterCategory" :open="open">
    <div :class="$style.ProjectFilterCategory__Label" @click="toggle">
      {{label}}
      <svg :class="$style.ProjectFilterCategory__LabelIcon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" width="24" height="24">
        <line :class="$style.ProjectFilterCategory__LabelIconVertical" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="square" x1="12" y1="2" x2="12" y2="22"></line>
        <line fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="square" x1="22" y1="12" x2="2" y2="12"></line>
      </svg>
    </div>
    <ul :class="$style.ProjectFilterCategory__List">
      <li
        :class="$style.ProjectFilterCategory__ListItem"
        @click="clear"
        :active="!value.length"
      >All</li>
      <li
        :class="$style.ProjectFilterCategory__ListItem"
        v-for="(item, index) in options"
        :key="index"
        tabindex="1"
        @click="select(index)"
        :active="value === index"
      >{{item}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class ProjectFilterCategory extends Vue {
  private open: boolean = false

  @Prop({ required: true })
  private label: string

  @Prop({ required: true, type: [String, Number] })
  private value: string | number

  @Prop({ required: true, type: [Array, Object] })
  private options: string[] | {}

  get isArray() {
    return 'length' in this.options
  }

  private toggle() {
    this.open = !this.open
  }

  private select(filter: string) {
    this.$emit('input', filter)
  }

  private clear() {
    this.$emit('input', '')
  }
}
</script>

<style lang="stylus" module>
@import '../styles/config.styl';

.ProjectFilterCategory {
  border-top: $colorLightGray solid 1px;

  &:first-child {
    border-top: 0;
  }

  &__List {
    list-style: none;
    padding-bottom: 1rem;
    display: none;

    [open] & {
      display: block;
    }

    &Item {
      padding: 0.5rem 1rem 0.5rem 2rem;
      position: relative;
      user-select: none;
      font-size: $fontSizeSmall;
      cursor: pointer;
      border-radius: 3px;
      transition: background $transitionBase;

      &[active] {
        color: $colorPrimary;

        &::before {
          opacity: 1;
          transform: scale(2);
        }

        &:hover {
          text-decoration: line-through;
        }
      }

      &:hover {
        background: rgba(0, 0, 0, 0.05);
      }

      &::before {
        position: absolute;
        content: '';
        left: 1rem;
        top: 50%;
        margin: -2px 0 0 0;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: currentColor;
        opacity: 0;
        transition: $transitionBase;
        transform-origin: center center;
      }
    }
  }

  &__Label {
    display: flex;
    padding: 0.75rem 0;
    cursor: pointer;
    align-items: center;
    user-select: none;
    border-radius: 3px;
    transition: background $transitionBase;
    font-size: 0.9125rem;

    &:hover, &:focus {
      // background: rgba(0, 0, 0, 0.05);
      color: $colorPrimary;
    }

    &Icon {
      width: 1em;
      height: 1em;
      margin-left: auto;

      &Vertical {
        transition: 0.2s;
        transform-origin: center center;

        [open] & {
          transform: scale(1, 0);
        }
      }
    }
  }
}
</style>
