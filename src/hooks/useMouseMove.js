import {ref, onMounted, onUnmounted} from 'vue'

export default function () {
    // 说明：创建页面左侧预览需要

    const x = ref(0)
    const y = ref(0)

    function update(event) {
        x.value = event.pageX
        y.value = event.pageY
    }
    onMounted(() => window.addEventListener('mousemove', update))
    onUnmounted(() => window.removeEventListener('mousemove', update));
    return {x, y}
};