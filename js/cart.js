var vm = new Vue({
	el: "#app",
	data: {
		productList:[],
		totalMoney:0,
		checkAll: false,
		delFlag: false,
		curProduct: "",
	},
	filters: {
		// 标准化价格
		formatMoney: function(value) {
			return "¥" + value.toFixed(2);
		}
	},
	mounted: function() {
		this.$nextTick(function() {
			this.cartView();
		});
	},
	methods: {
		// 获取渲染数据
		cartView: function() {
			var _this = this;
			this.$http.get("data/cartData.json").then(function(res) {
				_this.productList = res.data.result.list;
			});
		},
		// 增减产品数量
		changeMoney: function(product,way) {
			if (way > 0 ) {
				product.productQuentity++;
			}
			else {
				product.productQuentity--;
				if (product.productQuentity < 1) {
					product.productQuentity = 1;
				}
			}
			this.calcTotalPrice();
		},
		// 单选产品
		selectProduct: function(item) {
			if (typeof item.checked == "undefined") {
				//Vue.set(item,"checked",true);
				this.$set(item,"checked",true);
			}
			else {
				item.checked = !item.checked;
			}
			this.calcTotalPrice();
		},
		// 全选
		selectAll: function (isCheck) {
			this.checkAll = isCheck;
			this.productList.forEach(function (item) {
				if (typeof item.checked == "undefined") {
					Vue.set(item,"checked",isCheck);
				} 
				else {
					item.checked = isCheck;
				}
			});
			this.calcTotalPrice();
		},
		// 计算总金额
		calcTotalPrice: function() {
			var _this = this;
			_this.totalMoney = 0;
			this.productList.forEach(function(item,index) {
				if (item.checked) {
					_this.totalMoney += item.productPrice * item.productQuentity;
				}
			});
		},
		// 记录删除信息
		delConfirm: function(item) {
			this.delFlag = true;
			this.curProduct = item;
		},
		// 删除
		delProduct: function() {
			var index = this.productList.indexOf(this.curProduct);
			this.productList.splice(index, 1);
			this.delFlag = false;
		}
	},
});
