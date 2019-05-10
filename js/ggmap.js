// Khởi tạo các biến global mã mình sẽ sử dụng.	
var map;
var stepDisplay;
var placeSearch;
var autocomplete;
var markerArray = [];
var directionsDisplay;
var directionsService;

function initMap() {

			// Latitude (Kinh độ) và Longtitude (Vĩ độ) - cho biết bản đồ của bạn sẽ ở khu vực nào
			map = new google.maps.Map(document.getElementById('map'),
			{	
				// Khởi tạo map với trong id html là map
				center: new google.maps.LatLng(10.85198865, 106.75872637), 
				zoom: 16 // tỉ lệ phóng bản đồ   
			});

			// include file tạo Marker
			$.getScript("./js/customMarker.js");

			// Khởi tạo DirectionsService - thằng này có nhiệm vụ tính toán chỉ đường cho chúng ta.
			directionsService = new google.maps.DirectionsService();
			// Khởi tạo DirectionsRenderer - thằng này có nhiệm vụ hiển thị chỉ đường trên bản đồ sau khi đã tính toán 
			directionsDisplay = new google.maps.DirectionsRenderer({map: map});
			var onChangeHandler = function() {
				 // Hàm xử lý và hiển thị kết quả chỉ đường    
				 calculateAndDisplayRoute(directionsService, directionsDisplay);    
				};    
				$('#source').change(onChangeHandler); // Tạo sự kiện khi chọn điểm xuất phát
				$('#destination').change(onChangeHandler); // Tạo sự kiện khi chọn điểm đích
				$('#mode').change(onChangeHandler); // Tạo sự kiện khi chọn phương tiện di chuyển

			// loại vị trí địa lý. (các loại type : address / establishment / geocode)
			autocomplete = new google.maps.places.Autocomplete(
				document.getElementById('source'), {types: []});
			autocomplete = new google.maps.places.Autocomplete(
				document.getElementById('destination'), {types: []});
			// đặt các trường được trả về chỉ các thành phần địa chỉ.
			autocomplete.setFields(['address_component']);
			// Khi người dùng chọn một địa chỉ từ trình đơn thả xuống, hãy điền vào
			autocomplete.addListener('place_changed', fillInAddress);

		}

		function calculateAndDisplayRoute(directionsService, directionsDisplay) {
				// hàm route của DirectionsService sẽ thực hiện tính toán với các tham số truyền vào
				directionsService.route({    
					origin: $("#source").val(),  // điểm xuất phát   
					destination: $("#destination").val(), // điểm đích    
					travelMode: $("#mode").val(), // phương tiện di chuyển     
				}, 
				function(response, status) {  // response trả về bao gồm tất cả các thông tin về chỉ đường   
					if (status === google.maps.DirectionsStatus.OK) 
					{	
						// hiển thị chỉ đường trên bản đồ (nét màu đỏ từ A-B)
						directionsDisplay.setDirections(response);
						console.log(response);
						// Hiển thị chi tiết các bước cần phải đi đến đích.
						showSteps(response);
					}
				});    
			}    
			
			function showSteps(directionResult) {
				// Mình sẽ chỉ lấy 1 tuyến đường để hiển thị vì nó là tối ưu nhất cho người dùng.
				var myRoute = directionResult.routes[0].legs[0];
				console.log(myRoute);
				var instructions = '<h5 class="distance"><b>Quãng đường:</b> ' + myRoute.distance.text + '</h5>';
				instructions += '<h5 class="duration"><b>Thời gian:</b> ' + myRoute.duration.text + '</h5>';
				instructions += '<h5 class="start_address"><b>Từ:</b> ' + myRoute.start_address + '</h5>';
				instructions += '<h5 class="end_address"><b>Đến:</b> ' + myRoute.end_address + '</h5>';
				instructions += '<ol>';
				var steps = '';
				for (var i = 0; i < myRoute.steps.length; i++) {
					steps += '<li>' + myRoute.steps[i].instructions + '</li>';
				}
				// Đặt kết quả vào <div id="instructions">
				document.getElementById("instructions").innerHTML = instructions;
			}

			function fillInAddress() {
			// Lấy chi tiết địa điểm từ đối tượng tự động hoàn thành.
			var place = autocomplete.getPlace();
			for (var component in componentForm) {
				document.getElementById(component).value = '';
				document.getElementById(component).disabled = false;
			}
			// Lấy từng thành phần của địa chỉ từ chi tiết địa điểm,
			// và sau đó điền vào trường tương ứng trên biểu mẫu.
			for (var i = 0; i < place.address_components.length; i++) {
				var addressType = place.address_components[i].types[0];
				if (componentForm[addressType]) {
					var val = place.address_components[i][componentForm[addressType]];
					document.getElementById(addressType).value = val;
				}
			}
		}

			// Xu hướng đối tượng tự động hoàn thành đến vị trí địa lý của người dùng,
			// như được cung cấp bởi đối tượng 'navigator.geolocation' của trình duyệt.
			function geolocate() {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(function(position) {
						var geolocation = {
							lat: position.coords.latitude,
							lng: position.coords.longitude
						};
						var circle = new google.maps.Circle(
							{center: geolocation, radius: position.coords.accuracy});
						autocomplete.setBounds(circle.getBounds());
					});
				}
			}

			

			