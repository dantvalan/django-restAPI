
$(function(){
	$.ajax({
	      url: '/catalogos/',
	      method: 'GET',
	      dataType: "json",
	      contentType: "application/json; charset=utf-8",
	      success: function (d){
	    	console.log(JSON.stringify(d));
	    	var lcat = d.catalogos;
	    	var cat = $('#catalogos');
	    	var li = `<li class="list-group-item"> 
	    				<div class="input-group">
						  <input type="text" class="form-control" placeholder="escribe nombre " id="n_cat">
						  <span class="input-group-addon" style="cursor:pointer" onclick="new_cat()">agregar</span>
						</div>
					</li>`;
	    	for(var i =0;i<lcat.length;i++){
	    		li+='<li class="list-group-item" style="cursor:pointer" id="'+lcat[i].id+'" onclick="list_areas('+lcat[i].id+')"> <svg class="border border-danger" onclick="deleter(1,'+lcat[i].id+')" style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="#f5c6cb" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8.46,11.88L9.87,10.47L12,12.59L14.12,10.47L15.53,11.88L13.41,14L15.53,16.12L14.12,17.53L12,15.41L9.88,17.53L8.47,16.12L10.59,14L8.46,11.88M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg> <svg onclick="updater(1,'+lcat[i].id+')" class="border border-info" style="width:24px;height:24px" viewBox="0 0 24 24"> <path fill="#b8daff" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg> '+lcat[i].nombre+'</li>';
	    	}
	    	cat.html(li);
	      },
	      error: function (e){
	          console.log('ERROR: '+JSON.stringify(e))
	      }
	  });
});

function new_cat(){

	var obj_cat = {"catalogo":[{"nombre":$('input#n_cat').val()}]}
	console.log(JSON.stringify(obj_cat));
	$.ajax({
	      url: '/catalogos/',
	      method: 'POST',
	      dataType: "json",
	      contentType: "application/json; charset=utf-8",
	      data: JSON.stringify(obj_cat),
	      beforeSend: function(xhr, settings) {
	          if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
	              xhr.setRequestHeader("X-CSRFToken", csrftoken);
	          }
	      },
	      success: function (d){
	    	console.log('OK: '+JSON.stringify(d))
	    	$('#catalogos').append('<li class="list-group-item" style="cursor:pointer" id="'+d.id+'" onclick="list_areas('+d.id+')"> <svg class="border border-danger" onclick="deleter(1,'+d.id+')" style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="#f5c6cb" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8.46,11.88L9.87,10.47L12,12.59L14.12,10.47L15.53,11.88L13.41,14L15.53,16.12L14.12,17.53L12,15.41L9.88,17.53L8.47,16.12L10.59,14L8.46,11.88M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg> <svg onclick="updater(1,'+d.id+')" class="border border-info" style="width:24px;height:24px" viewBox="0 0 24 24"> <path fill="#b8daff" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg> '+d.nombre+'</li>');
	    	notificacion("<b>Catalogo Agregado</b>.", "success", 'fa fa-check-circle',3000);
	    	$('input#n_cat').val('');
	      },
	      error: function (e){
	          console.log('ERROR: '+JSON.stringify(e))
	      }
	  })
}
// AREAS -----------------------------------------------------------
function list_areas(id_cat){
	console.log(id_cat);
	$.ajax({
	      url: '/area/'+id_cat,
	      method: 'GET',
	      dataType: "json",
	      contentType: "application/json; charset=utf-8",
	      success: function (d){
	    	console.log(JSON.stringify(d));
	    	var lcat = d.Areas;
	    	var cat = $('#areas');
	    	var li = `<li class="list-group-item"> 
	    				<div class="input-group">
						  <input type="text" class="form-control" placeholder="escribe nombre " id="n_area">
						  <span class="input-group-addon" style="cursor:pointer" onclick="new_area(`+id_cat+`)">agregar</span>
						</div>
					</li>`;
	    	
	    	for(var i =0;i<lcat.length;i++){
	    		li+='<li class="list-group-item" style="cursor:pointer" id="'+lcat[i].id+'" onclick="list_items('+lcat[i].id+')"> <svg class="border border-danger" onclick="deleter(2,'+lcat[i].id+')" style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="#f5c6cb" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8.46,11.88L9.87,10.47L12,12.59L14.12,10.47L15.53,11.88L13.41,14L15.53,16.12L14.12,17.53L12,15.41L9.88,17.53L8.47,16.12L10.59,14L8.46,11.88M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg> <svg class="border border-info" style="width:24px;height:24px" viewBox="0 0 24 24"> <path fill="#b8daff" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" onclick="updater(2,'+lcat[i].id+','+id_cat+')"/></svg> '+lcat[i].nombre+'</li>';
	    	}
	    	cat.html(li);
	    	$('#items').html('');
	      },
	      error: function (e){
	          console.log('ERROR: '+JSON.stringify(e))
	      }
	  });
}
 function new_area(catalogo_id){
 	var obj_cat = {"Area":[{"nombre":$('input#n_area').val(), "catalogo_id":catalogo_id}]}
	console.log(JSON.stringify(obj_cat));
	$.ajax({
	      url: '/areas/',
	      method: 'POST',
	      dataType: "json",
	      contentType: "application/json; charset=utf-8",
	      data: JSON.stringify(obj_cat),
	      beforeSend: function(xhr, settings) {
	          if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
	              xhr.setRequestHeader("X-CSRFToken", csrftoken);
	          }
	      },
	      success: function (d){
	    	console.log('OK: '+JSON.stringify(d))
	    	$('#areas').append('<li class="list-group-item" style="cursor:pointer" id="'+d.id+'" onclick="list_items('+d.id+')"> <svg class="border border-danger" onclick="deleter(2,'+d.id+')" style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="#f5c6cb" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8.46,11.88L9.87,10.47L12,12.59L14.12,10.47L15.53,11.88L13.41,14L15.53,16.12L14.12,17.53L12,15.41L9.88,17.53L8.47,16.12L10.59,14L8.46,11.88M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg> <svg class="border border-info" style="width:24px;height:24px" viewBox="0 0 24 24"> <path fill="#b8daff" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" onclick="updater(2,'+d.id+','+catalogo_id+')"/></svg> '+d.nombre+'</li>');
	    	notificacion("<b>Area Agregada</b>.", "success", 'fa fa-check-circle',3000);
	    	$('input#n_area').val('');
	      },
	      error: function (e){
	          console.log('ERROR: '+JSON.stringify(e))
	      }
	  })
 }

// ITEMS -------------------------------------------------
function list_items(id_itm){
	console.log(id_itm);
	$.ajax({
	      url: '/item/'+id_itm,
	      method: 'GET',
	      dataType: "json",
	      contentType: "application/json; charset=utf-8",
	      success: function (d){
	    	console.log(JSON.stringify(d));
	    	var lcat = d.Items;
	    	var cat = $('#items');
	    	var li = `<li class="list-group-item"> 
	    				<div class="input-group">
						  <input type="text" class="form-control" placeholder="escribe nombre " id="n_item">
						  <span class="input-group-addon" style="cursor:pointer" onclick="new_item(`+id_itm+`)">agregar</span>
						</div>
					</li>`;
	    	
	    	for(var i =0;i<lcat.length;i++){
	    		li+='<li class="list-group-item" style="cursor:pointer" id="'+lcat[i].id+'"><svg onclick="deleter(3,'+lcat[i].id+')" class="border border-danger" style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="#f5c6cb" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8.46,11.88L9.87,10.47L12,12.59L14.12,10.47L15.53,11.88L13.41,14L15.53,16.12L14.12,17.53L12,15.41L9.88,17.53L8.47,16.12L10.59,14L8.46,11.88M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg> <svg onclick="updater(3,'+lcat[i].id+','+id_itm+')" class="border border-info" style="width:24px;height:24px" viewBox="0 0 24 24"> <path fill="#b8daff" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/></svg> '+lcat[i].nombre+'</li>';
	    	}

	    	cat.html(li);
	      },
	      error: function (e){
	          console.log('ERROR: '+JSON.stringify(e))
	      }
	  });
}

function new_item(area_id){
	var obj_cat = {"Items":[{"nombre":$('input#n_item').val(), "area_id":area_id}]}
	console.log(JSON.stringify(obj_cat));
	$.ajax({
	      url: '/items/',
	      method: 'POST',
	      dataType: "json",
	      contentType: "application/json; charset=utf-8",
	      data: JSON.stringify(obj_cat),
	      beforeSend: function(xhr, settings) {
	          if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
	              xhr.setRequestHeader("X-CSRFToken", csrftoken);
	          }
	      },
	      success: function (d){
	    	console.log('OK: '+JSON.stringify(d))
	    	$('#items').append('<li class="list-group-item" style="cursor:pointer" id="'+d.id+'"><svg onclick="deleter(3,'+d.id+')" class="border border-danger" style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="#f5c6cb" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8.46,11.88L9.87,10.47L12,12.59L14.12,10.47L15.53,11.88L13.41,14L15.53,16.12L14.12,17.53L12,15.41L9.88,17.53L8.47,16.12L10.59,14L8.46,11.88M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg> <svg onclick="updater(3,'+d.id+','+area_id+')" class="border border-info" style="width:24px;height:24px" viewBox="0 0 24 24"> <path fill="#b8daff" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/></svg> '+d.nombre+'</li>');
	    	notificacion("<b>Item Agregado</b>.", "success", 'fa fa-check-circle',3000);
	    	$('input#n_item').val('');
	      },
	      error: function (e){
	          console.log('ERROR: '+JSON.stringify(e))
	      }
	  })
}

// HELPERS ----------------------------------------------------------

function deleter(q, id_el){
	var model;
	switch(q){
		case 1:
			model = "/catalogo/";
			section = ""
		break;
		case 2:
			model = "/area/";
		break;
		case 3:
			model = "/item/";
		break;
	}
	$.ajax({
	      url: model+id_el,
	      method: 'DELETE',
	      dataType: "json",
	      contentType: "application/json; charset=utf-8",
	      beforeSend: function(xhr, settings) {
	          if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
	              xhr.setRequestHeader("X-CSRFToken", csrftoken);
	          }
	      },
	      success: function (d, status){
	    	notificacion("<b>Ha borrado el registro.</b>.", "success", 'fa fa-check-circle',2000);
	    	setTimeout(function(){ location.reload(); },2000)
	      },
	      error: function (e){
	          console.log('ERROR: '+JSON.stringify(e))
	      }
	  });
}

function updater(q, id_el, id_fk){

	alertify.prompt("Edita aqui ", "",
	function(evt, value ){
		var model;
		var obj_cat;
		switch(q){
			case 1:
				model = "/catalogo/";
				obj_cat = {"catalogo":[{"nombre":value}]}
			break;
			case 2:
				model = "/area/";
				obj_cat = {"Area":[{"nombre":value, "catalogo_id":id_fk}]}
			break;
			case 3:
				model = "/item/";
				obj_cat = {"Items":[{"nombre":value, "area_id":id_fk}]}
			break;
		}
		console.log(JSON.stringify(obj_cat)+' id_el= '+id_el);
		$.ajax({
		      url: model+id_el+'/',
		      method: 'PUT',
		      dataType: "json",
		      contentType: "application/json; charset=utf-8",
		      beforeSend: function(xhr, settings) {
		          if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
		              xhr.setRequestHeader("X-CSRFToken", csrftoken);
		          }
		      },
		      data: JSON.stringify(obj_cat),
		      success: function (d, status){
		    	notificacion("<b>Ha actualizado el registro.</b>.", "success", 'fa fa-check-circle',2000);
		    	setTimeout(function(){ location.reload(); },2000)
		      },
		      error: function (e){
		          console.log('ERROR: '+JSON.stringify(e))
		      }
		  });	
	},function(){});
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

function notificacion(msj, tipo, i, time){
    $.notify({ icon: i,
        message: msj
    },{ type: tipo,
        timer: time,
        placement: { from: 'top', align: 'center' }
    });
}