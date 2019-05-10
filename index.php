<!DOCTYPE html>
<html lang="vi">
<head>
	<title>Google Maps - By Genta</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="js/bootstrap.min.js">
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link rel="icon" href="ggmap.ico" type="image/x-icon" />
	<!-- Nếu bạn có key thì copy sửa tại đây -->
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAwJR7kylDCymhx59VKffi40Ez1qaU6aSo&libraries=places&callback=initMap"
	async defer></script>
	<script src="js/ggmap.js"></script>
	<!-- Chặn bấm chuột phải -->
	<script src="js/norightclick.js"></script>
</head>
<body>
	<div class="container">
		<div class="row">
			<form>
				<div class="col-sm-4">
					<img src="./images/logo.png">
					<div id="title">
						<a href="https://www.facebook.com/mynameisgenta" id="link"> © 2019 By Genta </a>
					</div>
					<div class="form-group">
						<label>Địa chỉ hiện tại của bạn</label>
						<input type="text" class="form-control" id="source" onFocus="geolocate()" placeholder="Nhập địa chỉ hiện tại" value="">
					</div>
					<div class="form-group">
						<label>Địa chỉ bạn muốn đến</label>
						<input type="text" class="form-control" id="destination" onFocus="geolocate()" placeholder="Nhập địa chỉ muốn đến" value="">
					</div>
					
					<div class="form-group">
						<label>Phương tiện di chuyển</label> 
						<select class="form-control" id="mode">
							<option value="DRIVING">Xe máy</option>
							<option value="TRANSIT">Xe tải</option>
							<option value="WALKING">Đi bộ</option>
						</select>
					</div>
					<button type="reset" class="btn btn-danger">Reset</button>
					<button type="reset" class="btn btn-success" onClick="location.href=location.href">Refresh</button>
				</form>

				<!-- Kết quả chỉ đường-->
				<div id="instructions"></div>
			</div>
			
			<div class="col-sm-8"> 
				<!-- Hiển thị bản đồ -->
				<div id='map'></div>
			</div>
		</div>
	</div>
</body>
</html>

