<template>
  <v-container fluid fill-height id="wrapper">
    <v-layout column justify-center>
      <v-flex xs9>
        <v-container fluid fill-height pa-0>
          <v-layout column justify-end>
            <v-flex xs1>
              <h5 class="headline text-xs-center
                font-weight-bold brown--text text--darken-2"
              >- 以下是生成的译文 -</h5>
            </v-flex>
            <v-flex xs8 pa-4>
              <v-img src="~@/assets/guwen/bg-text-input.png">
                <v-container fluid fill-height class="guwen-wrapper">
                  <v-layout column justify-center>
                    <v-flex xs12>
                      <v-textarea
                        :value="transResult"
                        :no-resize="true"
                        :rows="13"
                        :readonly="true"
                      >
                      </v-textarea>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-img>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs3>
        <v-container fluid fill-height pa-0>
          <v-layout row justify-center>
            <v-flex xs4>
              <router-link to="/">
                <v-img src="~@/assets/common/button-back-to-home.png"></v-img>
              </router-link>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="js">
import { mapState } from 'vuex'

export default {
  name: 'GenResult',
  data () {
    return {
      transResult: '这里是汉代的豫章郡城，如今是洪州的都督府，天上的方位属于翼、轸两星宿的分野，' +
        '地上的位置连结着衡山和庐山。以三江为衣襟，以五湖为衣带，控制着楚地，连接着闽越。' +
        '这里物产的华美，有如天降之宝，其光彩上冲牛斗之宿。这里的土地有灵秀之气，陈蕃专为徐孺设下几榻。' +
        '洪州境内的建筑如云雾排列，有才能的人士如流星一般奔驰驱走。池据于中原与南夷的交界之处，' +
        '宾客与主人包括了东南地区最优秀的人物。都督阎公，享有崇高的名望，远道来到洪州坐镇，宇文州牧，' +
        '是美德的楷模，赴任途中在此暂留。每逢十日一旬的假期，来了很多的良友，迎接远客，高贵的朋友坐满了席位。' +
        '文词宗主孟学士所作文章就像像腾起的蛟龙、飞舞的彩凤；王将军的兵器库中，' +
        '藏有像紫电、青霜这样锋利的宝剑。由于父亲在交趾做县令，我在探亲途中经过这个著名的地方。' +
        '我年幼无知，竟有幸亲身参加了这次盛大的宴会。'
    }
  },
  computed: {
    ...mapState({
      genMethod: state => state.guwen.genMethod,
      textInput: state => state.guwen.textInput,
      photoFile: state => state.guwen.photoFile
    })
  },
  mounted () {
    console.log(this.genMethod)
    console.log(this.textInput)
    console.log(this.photoFile)
  }
}
</script>

<style scoped lang="stylus">
  #wrapper
    background-image: url("~@/assets/guwen/bg-result.png")
    background-repeat: no-repeat
    background-size: 100% 100%
    padding: 15% 3em 1em 3em

  .guwen-wrapper
    padding: 11% 17% 13% 15%

  .guwen-container
    overflow: scroll
</style>
