<template>
  <div class="FilterMenu" :class="{ '-open': open }">
    <AppBtn @click="toggle">{{label}}: {{displayValue}}</AppBtn>
    <div class="FilterMenu__Options" @click="onOptionsClick">
      <div
        class="FilterMenu__Option"
        :class="{ '-selected': !value }"
        @click="selectOPtion(null)"
      >All</div>
      <div
        v-for="(option, key) in options"
        :key="key"
        class="FilterMenu__Option"
        :class="{ '-selected': value === option }"
        @click="selectOption(option)"
      >{{option}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: Object,
      required: true
    },
    value: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      open: false
    }
  },

  mounted () {
    this.onDocumentClick = this.onDocumentClick.bind(this)
    document.addEventListener('click', this.onDocumentClick)
  },

  destroyed () {
    document.removeEventListener('click', this.onDocumentClick)
  },

  computed: {
    displayValue () {
      return this.value || 'All'
    }
  },

  methods: {
    toggle () {
      this.open = !this.open
    },

    selectOption (value) {
      this.$emit('update:value', value)
    },

    onOptionsClick (ev) {
      this.open = false
    },

    onDocumentClick (ev) {
      if (!this.$el.contains(ev.target)) {
        this.open = false
      }
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/options.styl"

.FilterMenu
  position: relative

  &__Options
    optionsList()

  &__Option
    optionsItem()

</style>
