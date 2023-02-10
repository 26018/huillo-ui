<template>
    <div>
        <div class="container">
            <jh-card>
                <div class="card-title">已上传文件</div>
                <div>
                    <span class="number green">5</span>
                    <span>份</span>
                </div>
            </jh-card>
            <jh-card>
                <div class="zanyong">
                    <div style="display: flex;flex-direction: column">
                        <div class="card-title">占用存储</div>
                        <div>
                            <span class="number red">23</span>
                            <span>MB</span>
                        </div>
                    </div>
                    <div class="">
                        <div class="card-title">1MB</div>
                        <div class="font-deyihei">图片类型</div>
                    </div>

                    <div class="">
                        <div class="card-title">1MB</div>
                        <div class="font-deyihei">文档类型</div>
                    </div>

                    <div class="">
                        <div class="card-title">1MB</div>
                        <div class="font-deyihei">其他类型</div>
                    </div>
                </div>
            </jh-card>
        </div>
    </div>
</template>

<script>
import JhCard from "../components/other/cmp/JhCard.vue";

export default {
    name: "Recycle",
    components: {JhCard}
}
</script>

<style scoped>

.card-title {
    font-size: 20px;
    font-weight: 600;
    font-family: siyuan, sans-serif;
}

.container {
    display: flex;
    justify-content: space-between;
}

.zanyong {
    display: flex;
    align-items: center;
}

.zanyong > * {
    margin-right: 32px;
    margin-left: 32px;
    box-sizing: border-box;
}

.number {
    font-size: 40px;
    font-weight: 600;
}

.font-deyihei{
    font-family: deyihei,serif;
}

.container > * {
    margin: 8px;
}
</style>