<template>
<div class="order-list">
    <order-header title="订单列表">
        <template v-slot:tip>
            <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
        </template>
    </order-header>
    <div class="wrapper">
        <div class="container">
            <div class="order-box">

                <!--<loading v-if="loading"></loading>-->
                <div class="order" v-for="(order,index) in list" :key="index">
                    <div class="order-title">
                        <div class="item-info fl">
                            {{order.createTime}}
                            <span>|</span>
                            {{order.receiverName}}
                            <span>|</span>
                            订单号：{{order.orderNo}}
                            <span>|</span>
                            {{order.paymentTypeDesc}}
                        </div>
                        <div class="item-money fr">
                            <span>应付金额：</span>
                            <span class="money">{{order.payment}}</span>
                            <span>元</span>
                        </div>
                    </div>
                    <div class="order-content clearfix">
                        <div class="good-box fl">
                            <div class="good-list" v-for="(item,index) in order.orderItemVoList" :key="index">
                                <div class="good-img">
                                    <img :src="item.productImage" alt="">
                                </div>
                                <div class="good-name">
                                    <div class="p-name">{{item.productName}}</div>
                                    <div class="p-money">{{item.totalPrice + 'X'+item.quantity }}元</div>
                                </div>
                            </div>
                        </div>
                        <div class="good-state fr" v-if="order.status == 20">
                            <a href="javascript:;">{{order.statusDesc}}</a>
                        </div>
                        <div class="good-state fr" v-else>
                            <a href="javascript:;" @click="goPay(order.orderNo)">{{order.statusDesc}}</a>
                        </div>
                    </div>
                </div>
                <div class="scroll-more" v-infinite-scroll="scrollMore" infinite-scroll-disabled="busy" infinite-scroll-distance="210">
                    <img src="/imgs/loading-svg/loading-spinning-bubbles.svg" alt="" v-show="loading">
                </div>
                <no-data v-if="!loading && list.length==0"></no-data>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import OrderHeader from './../components/OrderHeader'
// import Loading from './../components/Loading'
import NoData from './../components/NoData'
import infiniteScroll from 'vue3-infinite-scroll-good'
import { getCurrentInstance ,onMounted,ref } from 'vue'
export default {
    name: 'order-list',
    components: {
        OrderHeader,
        NoData
    },
    directives: {
        infiniteScroll
    },
    setup(){
      const { proxy } = getCurrentInstance()
      let list = ref([])
      let loading = ref(true)
      let pageSize = ref(10)
      let pageNum = ref(1)
      let total = ref(0)
      let busy = ref(false)
      const getOrderList = ()=> {
        loading.value = true;
        busy.value = true;
        proxy.$axios.get('/orders', {
          params: {
            pageSize: 3,
            pageNum: pageNum.value
          }
        }).then((res) => {
          loading.value = false;
          list.value = list.value.concat(res.list);
          busy.value = false;
        }).catch(() => {
          loading.value = false;
        })
      }
      const goPay = (orderNo)=> {
        proxy.$router.push({
          path: '/order/pay',
          query: {
            orderNo
          }
        })
      }
      //滚动加载
      const scrollMore = ()=> {
        busy.value = true;
        setTimeout(() => {
            (pageNum.value)++;
            getList();
        }, 500)
      }
      const getList=()=> {
        loading.value = true;
        proxy.$axios.get('/orders', {
          params: {
            pageSize: 2,
            pageNum: pageNum.value
          }
        }).then((res) => {
          list.value = list.value.concat(res.list);
          if (res.hasNextPage) {
            busy.value = false;
          } else {
            busy.value = true;
            loading.value = false;
          }
        })
      }
      onMounted(()=>{
        getOrderList()
      })
      return {
        list,
        loading,
        pageSize,
        pageNum,
        total,
        busy,
        getList,
        scrollMore,
        goPay,
        getOrderList
      }
    },
    methods: {
    }
}
</script>

<style lang="scss">
@import './../assets/scss/config.scss';
@import './../assets/scss/mixin.scss';

.order-list {
  .wrapper {
    background-color: $colorJ;
    padding-top: 33px;
    padding-bottom: 110px;

    .order-box {
      .order {
        @include border();
        background-color: $colorG;
        margin-bottom: 31px;

        &:last-child {
            margin-bottom: 0;
        }

        .order-title {
            @include height(74px);
            background-color: $colorK;
            padding: 0 43px;
            font-size: 16px;
            color: $colorC;

            .item-info {
                span {
                    margin: 0 9px;
                }
            }

            .money {
                font-size: 26px;
                color: $colorB;
            }
        }

        .order-content {
          padding: 0 43px;

          .good-box {
            width: 88%;

            .good-list {
              display: flex;
              align-items: center;
              height: 145px;

              .good-img {
                width: 112px;

                img {
                  width: 100%;
                }
              }

              .good-name {
                font-size: 20px;
                color: $colorB;
              }
            }
          }

          .good-state {
            @include height(145px);
            font-size: 20px;
            color: $colorA;

            a {
              color: $colorA;
            }
          }
        }
      }

      .pagination {
        text-align: right;
      }

      .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #FF6600;
      }

      .el-button--primary {
        background-color: #FF6600;
        border-color: #FF6600;
      }

      .load-more,
      .scroll-more {
        text-align: center;
      }
    }
  }
}
</style>
