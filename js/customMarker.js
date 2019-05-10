
// ảnh icon địa điểm		
var icons = {
	TDC: 
	{
		name: 'TDC',
		icon: './images/tdc.png'
	},
};

// Thêm Marker và InfoWindow vào bản đồ
function addMarker(feature) {
	// Tạo Marker
	var marker = new google.maps.Marker({
		position: feature.position,
		icon: icons[feature.type].icon,
		map: map
	});

	// Hiện thông tin khi click vào Marker
	marker.info = new google.maps.InfoWindow({
		content: '<center><h4>Trường Cao Đẳng Công Nghệ Thủ Đức</h4></center>'
		+'<p><b>Địa chỉ:</b> 53 Võ Văn Ngân - Phường Linh Chiểu - Quận Thủ Đức</p>'
		+'<p><b>Website:</b> <a href="http://tdc.edu.vn/"> http://tdc.edu.vn/</a></p>'
	});

	google.maps.event.addListener(marker, 'click', function() {
	marker.info.open(map, marker);
	});
}

// hiện icon tại địa điểm ( copy Latitude (Kinh độ) và Longtitude (Vĩ độ) bỏ vào )
var features = [{
	position: new google.maps.LatLng(10.85211717, 106.759076),
	type: 'TDC',
	title: 'Trường Cao Đẳng Công Nghệ Thủ Đức'
}
];

for (var i = 0, feature; feature = features[i]; i++) {
	addMarker(feature);
}



