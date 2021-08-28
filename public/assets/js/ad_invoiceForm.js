/**
* InvoiceForm - Editable invoice generator
* @author Adriaan Ebbeling
* @version 1.0
*/

function roundNumber(number, decimal_points) {
            if (!decimal_points) return Math.round(number);
            if (number == 0) {
                var decimals = "";
                for (var i = 0; i < decimal_points; i++) decimals += "0";
                return "0." + decimals;
            }

            var exponent = Math.pow(10, decimal_points);
            var num = Math.round((number * exponent)).toString();
            return num.slice(0, -1 * decimal_points) + "." + num.slice(-1 * decimal_points)
}

// Show the selected logo image
function logoImg(input) {
  if (input.files && input.files[0]) {
  var reader = new FileReader();

  reader.onload = function (e) {
    $('#img_prev')
    .attr('src', e.target.result);
  };

  reader.readAsDataURL(input.files[0]);
}
$('.delete-logo').css('display', 'inline-block');
}
    
// Update total invoice amount
function update_total() {
  var total = 0;
  var taxrate = $('#invoice_taxrate').val();
  var totalamount = 0;
  
  $('.price').each(function(i){
    price = $(this).html().replace("$","");
    if (!isNaN(price)) total += Number(price);
  });
  
  subtotal = roundNumber(total,2);
  taxtotal = roundNumber(subtotal * taxrate - subtotal,2);
  total = roundNumber(subtotal * taxrate,2);
  
  $('#subtotal').html("$"+subtotal);
  $('#taxtotal').html("$"+taxtotal);
  $('#invoice_total_tax').val(taxtotal);
  $('#total').html("$"+total);
  
  update_balance();
}

// Update total balance
function update_balance() {
  var due = $("#total").html().replace("$","") - $("#paid").val().replace("$","");
  due = roundNumber(due,2);
  
  $('.due').html("$"+due);
}

// Update prices
function update_price() {
  var row = $(this).parents('.item-row');
  var price = row.find('.cost').val().replace("$","") * row.find('.qty').val();
  price = roundNumber(price,2);
  isNaN(price) ? row.find('.price').html("N/A") : row.find('.price').html("$"+price);
  
  update_total();
}

function bind() {
  $(".cost").blur(update_price);
  $(".qty").blur(update_price);

}

$(document).ready(function() {
    
  // Activate the bootstrap datepicker
  $('.datepicker').datepicker({
    format: 'mm/dd/yyyy',
    autoclose: true
  })
  
  // Delete the invoice logo 
  $( "#delete-logo" ).click(function() {
    $('#img_prev').attr('src', 'assets/img/logo-placeholder.png'); // change to your default logo src 
    $('.select-logo').val('');
    $('#delete-logo').css('display', 'none');
  });
  
  // Activate validation for all file inputs
  $.validate({
    modules : 'file'
  });

  $('input').click(function(){
    $(this).select();
  });

  $("#paid").blur(update_balance);
    $("#invoice_taxrate").change(update_total);
  
  // Add new items row to invoice
  // If you like to change your HTML for your invoice item, do so below, make sure you keep the right classes
  $("#addrow").click(function(){
    $(".item-row:last").after(' <tr class="item-row">        <td>      <input type="text" class="form-control" value="" required="required" placeholder="Add first name" name="item_name[]"> 	 </td>  <td class="description"><input type="text" class="form-control"  required="required" placeholder="Add Last name" name="item_description[]"/></td> <td class="description"><input type="text" class="form-control"  required="required" placeholder="Add sitenow.com" name="website[]"/></td>  <td><div class="input-group input-group">  <input type="email" class="cost form-control" placeholder="Add email" required="required" name="item_price[]">    </div></td> <td><input type="email" class="qty form-control" value="" required="required" placeholder="set mail from@mail.com" name="item_qty[]"></td> <td class="item-name"><a id="addrow" class="btn btn-info" href="javascript:;" title="Add a row"><span class="glyphicon glyphicon-plus"></span> </a>  <a class="delete btn btn-danger" href="javascript:;" title="Remove row"><span class="glyphicon glyphicon-minus"></span></a>  </td></tr>');
    if ($(".delete").length > 0) $(".delete").show();
    bind();
  });
  
  bind();
  
  $(document).on("click","a.delete", function() {
    $(this).parents('.item-row').remove();
    update_total();
    if ($(".delete").length < 2) $(".delete").hide();
  });
  

});// JavaScript Document