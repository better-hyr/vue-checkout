var vm = new Vue({
	el: ".container",
	data: {
		addressList: [],
		limitNum: 3,
		loadMoreFlag: false,
		currentIndex: 0,
		shippingMethod: 1,
	},
	mounted: function() {
		this.$nextTick(function() {
			this.getAddressList();
		});
	},
	computed: {
		filterAddress: function() {
			return this.addressList.slice(0,this.limitNum);
		}
	},
	methods: {
		getAddressList: function() {
			var _this = this;
			this.$http.get("data/address.json").then(function(res) {
				if (res.data.status == 0) {
					_this.addressList = res.data.result;
				}
			});
		},
		loadMore: function() {
			this.loadMoreFlag = !this.loadMoreFlag;
				if (this.loadMoreFlag) {
					this.limitNum = this.addressList.length;
				} 
				else {
					this.limitNum = 3;
				}
		},
		setDefault: function(addressId) {
			this.addressList.forEach(function(address,index) {
				if (address.addressId == addressId) {
					address.isDefault = true;
				}
				else {
					address.isDefault = false;
				}
			});
		},
	}
});