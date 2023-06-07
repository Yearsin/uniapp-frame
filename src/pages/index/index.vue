<template>
	<view class="content">
		<test></test>
		<uni-rate></uni-rate>
		<uni-badge text="1"></uni-badge>
		<uni-badge text="3" type="primary" :inverted="true"></uni-badge>
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	import { ocr } from '@/server/basic';

	export default {
		data() {
			return {
				title: 'hello uni'
			}
		},
		onLoad() {
			// ocr({ key: 'val' });
		},
		methods: {

		}
	}
</script>

<style lang='scss'>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
