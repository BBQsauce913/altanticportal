$(document).ready(function(){
	$(".submit").on("click", function(){
		var loadBoxDiv = $("<div class='loader'>");

		var newDiv = loadBoxDiv.prepend(".loadbox");

		for (var i = 0; i < res.length; i++){
			var lane = req.body.truckloads;
			var pickUpDate = req.body.pickupdate;
			var pickUpNumber = req.body.pickupnumber;
			var addInfo = req.body.addInfo;

			info.push(lane);
			info.push(pickUpDate);
			info.push(pickUpNumber);
			info.push(addInfo);

			var newClass = $("<div>").addClass("id").append(info[k]);
			k += 1;
			
		}
	})
	$(".post").on("click", function(){
		$(".loadBox").css({
			"background-color": "red"
		});
	});
	$(".secured").on("click", function(){
		$(".loadBox").css({
			"background-color": "orange"
		});
	});
	$(".transit").on("click", function(){
		$(".loadBox").css({
			"background-color": "green"
		});
	});
	$(".deliverB").on("click", function(){
		$(".loadBox").css({
			"display": "none"
		});
	});
});


    // Question: What does this code do?
    $("#sub").on("click", function(event) {
      event.preventDefault();
      var newTruckload = {
       	truckloads: $("#lane").val().trim(),
        pickupdate: $("#pickupdate").val().trim(),
        pickupnumber: $("#pickupnumber").val().trim(),
        ponumber: $("#ponumber").val().trim()
		addInfo: $("#addinfo").val().trim()
      };

      // Question: What does this code do??
      $.post("/api/new", newTruckload)
      .done(function(data) {
        console.log(data);
        alert("Adding truckload...");
      });
    });
