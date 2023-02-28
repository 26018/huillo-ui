<template>
    <div class="about">
        <h2>关于此站点的名字</h2>
        <div>Huillo是一个男孩的名字...</div>
        <br>
        <div>几年前，在一场演唱会上，Coldplay演唱了一首歌曲</div>
        <div>这首歌叫 <em>fix you</em>，在这场演唱会结束之后</div>
        <div>有一位父亲拍下了一段视频，一个孩子伴着 <em>fix you</em> 又唱又跳</div>
        <br>
        <div>这个小孩的名字叫Huillo，他从小就患有自闭症</div>
        <div>他的父亲问他，”你最喜欢Coldplay的哪一首歌？”</div>
        <div>Huillo略带羞涩的表情，小声的说 <em>fix you</em>。</div>
        <div>后来他的父亲带着他，一起去了Coldplay的演唱会</div>
        <div>当fix you的前奏响起，他将孩子紧紧拥抱着</div>
        <div>在他耳边唱着，"I will try to fix you..."</div>
        <div>Huillo情绪激动，难掩泪水。</div>

        <br>
        <div>我们不知道Huillo为何激动落泪</div>
        <div>或许是fix you这首歌，给了Huillo勇气，从自闭症中慢慢走出来</div>
        <div>或许这就是音乐带给我们的意义</div>

        <br>
        <div>Tears stream down your face</div>
        <div>When you lose something you cannot replace</div>
        <div>Tears stream down your face and I</div>
        <div>Lights will guide you home</div>
        <div>And ignite your bones</div>
        <div>And I will try to fix you</div>
        <br>
        <div style="color: gray;cursor: pointer" @click="$router.push('/')">返回首页</div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.about {
    max-width: 600px;
    margin: 0 auto;
    background-color: transparent;
}

div {
    margin-top: 4px;
    /*letter-spacing: 1px;*/
}
</style>