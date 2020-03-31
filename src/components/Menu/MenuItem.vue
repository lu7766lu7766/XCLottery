<template>
	<li
		v-if="item.label && hasMenu(getAllNodesCode(item))"
		:class="{
			'has-sub': item.children,
			active: hasActive(item),
		}"
	>
		<a href="javascript:;" v-if="item.children">
			<b class="caret"></b>
			<i v-if="item.icon" :class="item.icon"></i>
			<span> {{ item.label }}</span>
		</a>
		<ul class="sub-menu" v-if="item.children">
			<MenuItem v-for="(x, index) in item.children" :key="index" :item="x"> </MenuItem>
		</ul>
		<router-link v-else :to="{ name: item.name }">
			<i v-if="item.icon" :class="item.icon"></i><span>{{ item.label }}</span>
		</router-link>
	</li>
</template>
<script>
	import IndexMixins from 'mixins/Index'
	import Menu from 'constants/Menu'

	export default {
		props: ['item'],
		mixins: [IndexMixins],
		components: {
			MenuItem: () => import('./MenuItem'),
		},
		methods: {
			hasActive(item) {
				if (item.name) {
					return item.name == this.$route.name
				} else if (item.children) {
					return _.some(item.children, i => this.hasActive(i))
				}
				return false
			},
			getAllNodesCode(item) {
				let result = []
				if (item.name) {
					result.push(Menu[item.name])
				}
				if (item.children) {
					_.forEach(item.children, i => {
						result = result.concat(this.getAllNodesCode(i))
					})
				}
				return result
			},
			hasMenu(codes) {
				return _.some(codes, code => {
					const menu = _.find(this.menus, { code })
					return menu && _.some(menu.nodes, x => _.endsWith(x.code, '_READ'))
				})
			},
		},
	}
</script>
