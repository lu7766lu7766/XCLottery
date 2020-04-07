<template>
  <section>
    <img class="pointer" :src="src" @click="show" />
    <image-container ref="box" :src="src" size="auto" />
  </section>
</template>

<script>
  export default {
    props: ['src'],
    components: {
      ImageContainer: require('@/Container/Image').default,
    },
    methods: {
      show()
      {
        this.$refs['box'].show()
      },
    },
  }
</script>