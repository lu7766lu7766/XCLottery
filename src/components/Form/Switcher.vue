<template>
  <div class="switcher">
    <input type="checkbox" name="switcher_checkbox" :id="id" v-model="data">
    <label :for="id"></label>
  </div>
</template>

<script>
  export default {
    props: {
      enable: {default: 'Y'},
      disable: {default: 'N'},
      value: {required: true},
    },
    data: () => ({
      id: '',
      data: '',
    }),
    watch: {
      data()
      {
        this.$emit('input', this.data
          ? this.enable
          : this.disable,
        )
      },
    },
    mounted()
    {
      this.id = 'switcher-' + parseInt(Math.random() * 100000)
      this.data = this.value === this.enable
    },
  }
</script>
