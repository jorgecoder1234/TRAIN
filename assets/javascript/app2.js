//Defining the fire database

$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyBfFuM425D2gpfq4CtbLO_cUEqitFbJuqo",
        authDomain: "traindatabase-1a659.firebaseapp.com",
        databaseURL: "https://traindatabase-1a659.firebaseio.com",
        projectId: "traindatabase-1a659",
        storageBucket: "traindatabase-1a659.appspot.com",
        messagingSenderId: "366136927022"
    };

    firebase.initializeApp(config);


    var dataRef = firebase.database();


    //On clicl, to save information to the database
    $("#submit-btn").on("click", function (event) {
        //don't refresh the page
        event.preventDefault();

        //Taken the information from the textbox
        var name = $("#name").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrain = $("#firstTrain").val().trim();
        var frequency = $("#frequency").val().trim();

        //Push information to the databse      

        dataRef.ref().push({
            name: name,
            destination: destination,
            time: firstTrain,
            frequency: frequency
        });

        alert("Employee successfully added");

        //To empty th textbox
      
        $("#name").val("");
        $("#destination").val("");
        $("#firstTrain").val("");
        $("#frequency").val("");

    });


    //To detect any new entri from the databse

    dataRef.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());


        var name = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var frequency = childSnapshot.val().frequency;
        var time = childSnapshot.val().time;

        console.log(name);
        console.log(destination);
        console.log(frequency);
        console.log(time);


        //Logic to calculate the next arrival
       
        var firstTrainConverted = moment(time, "hh:mm").subtract(1, "years");
        console.log(firstTrainConverted);

       

        var currentTime = moment();
        console.log("Current Time: " + moment(currentTime).format("hh:mm"));

        
        $("#currentTime").html("Current Time: " + moment(currentTime).format("hh:mm"));

        
        var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
        console.log("Difference In Time: " + diffTime);

        
        var timeRemainder = diffTime % frequency;
        console.log(timeRemainder);

        
        var nextTrainMin = frequency - timeRemainder;
        console.log("Minutes Till Train: " + nextTrainMin);

        
        var nextTrainAdd = moment().add(nextTrainMin, "minutes");
        var nextTrainArr = moment(nextTrainAdd).format("hh:mm");
        console.log("Arrival Time: " + nextTrainArr);

       
        //To display a new entry to the table

        var newRow = $("<tr>").append(
            $("<td>").text(name),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(nextTrainArr),
            $("<td>").text(nextTrainMin),
        );


          $("#schedule").append(newRow);



    }, function (err) {
        console.log(err);
    });


});