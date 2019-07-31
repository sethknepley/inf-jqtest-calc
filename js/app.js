// self executing main function
(function($) {
  console.log('Welcome to the calculator app');

  //--------------- put your code below this line -------------
function resetCalculator(curValue) {
      $("#display").val(curValue);
      $(".btn-danger").removeClass("pendingFunction");
      $("#display").data("isPendingFunction", false);
      $("#display").data("thePendingFunction", "");
      $("#display").data("valueOneLocked", false);
      $("#display").data("valueTwoLocked", false);
      $("#display").data("valueOne", curValue);
      $("#display").data("valueTwo", 0);
      $("#display").data("fromPrevious", false);
  }

      resetCalculator("0");

      $(".btn-default").click(function(){
        console.log($(this))
        if ($("#display").data("fromPrevious") == true) {

          resetCalculator($(this).text());

        }

        else if (($("#display").data("isPendingFunction") == true) && ($("#display").data("valueOneLocked") == false)) {

          $("#display").data("valueOne", $("#display").val());
          $("#display").data("valueOneLocked", true);

          $("#display").val($(this).text());
          $("#display").data("valueTwo", $("#display").val());
          $("#display").data("valueTwoLocked", true);

        }

        else if (($("#display").data("isPendingFunction") == true) && ($("#display").data("valueOneLocked") == true)) {

          var curValue = $("#display").val();
          var toAdd = $(this).text();

          var newValue = curValue + toAdd;

          $("#display").val(newValue);

          $("#display").data("valueTwo", $("#display").val());
          $("#display").data("valueTwoLocked", true);

        }
        else {

          var curValue = $("#display").val();
          if (curValue == "0") {
          curValue = "";
        }

          var toAdd = $(this).text();

          var newValue = curValue + toAdd;

          $("#display").val(newValue);
          }
        });

      $(".btn-clear").click(function(){
          console.log($(this))
          resetCalculator("0");
      });

      $(".btn-danger").click(function(){
        console.log($(this))
        if ($("#display").data("fromPrevious") == true) {
        resetCalculator($("#display").val());
          $("#display").data("valueOneLocked", false);
          $("#display").data("fromPrevious", false)
        }

        var pendingFunction = $(this).text();
          $("#display").data("isPendingFunction", true);
          $("#display").data("thePendingFunction", pendingFunction);

          $(".function-button").removeClass("pendingFunction");
          $(this).addClass("pendingFunction");
      });

      $(".btn-info").click(function(){
        if (($("#display").data("valueOneLocked") == true) && ($("#display").data("valueTwoLocked") == true)) {

        if ($("#display").data("thePendingFunction") == "+") {
        var finalValue = parseFloat($("#display").data("valueOne")) + parseFloat($("#display").data("valueTwo"));
      } else if ($("#display").data("thePendingFunction") == "-") {
        var finalValue = parseFloat($("#display").data("valueOne")) - parseFloat($("#display").data("valueTwo"));
      } else if ($("#display").data("thePendingFunction") == "x") {
        var finalValue = parseFloat($("#display").data("valueOne")) * parseFloat($("#display").data("valueTwo"));
      } else if ($("#display").data("thePendingFunction") == "/") {
        var finalValue = parseFloat($("#display").data("valueOne")) / parseFloat($("#display").data("valueTwo"));
      }

      $("#display").val(finalValue);

      resetCalculator(finalValue);
      $("#display").data("fromPrevious", true);

      } else {

      }
      });
})($);
