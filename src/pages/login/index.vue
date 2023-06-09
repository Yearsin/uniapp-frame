<template>
    <view>login</view>
</template>

<script>

import { login } from '@/server/user';

export default {
    data() {
        return {
            
        }
    },
    onLoad() {
        login(task => {
            console.log(task);
            task.abort();
        }).then(res => {
            console.log(res, 'res')
        }).catch(err => {
            console.log(err, 'err')
        })
    },
    methods: {

    }
}
</script>

<style lang='scss'>

</style>