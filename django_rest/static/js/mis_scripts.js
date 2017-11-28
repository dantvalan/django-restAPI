
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
	    	var li = '<li class="list-group-item"><button type="button" class="btn btn-primary">Crear Catalogo</button></li>';
	    	for(var i =0;i<lcat.length;i++){
	    		li+='<li class="list-group-item" id="'+lcat[i].id+'" onclick="list_areas('+lcat[i].id+')">'+lcat[i].nombre+'</li>';
	    	}
	    	cat.html(li);
	      },
	      error: function (e){
	          console.log('ERROR: '+JSON.stringify(e))
	      }
	  });
});
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
	    	var li = '<li class="list-group-item"><button type="button" class="btn btn-primary">Crear Area</button></li>';
	    	
	    	for(var i =0;i<lcat.length;i++){
	    		li+='<li class="list-group-item" id="'+lcat[i].id+'" onclick="list_items('+lcat[i].id+')">'+lcat[i].nombre+'</li>';
	    	}
	    	cat.html(li);
	    	$('#items').html('');
	      },
	      error: function (e){
	          console.log('ERROR: '+JSON.stringify(e))
	      }
	  });
}

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
	    	var li = '<li class="list-group-item"><button type="button" class="btn btn-primary">Crear Item</button></li>';
	    	
	    	for(var i =0;i<lcat.length;i++){
	    		li+='<li class="list-group-item" id="'+lcat[i].id+'" onclick="list_items('+lcat[i].id+')">'+lcat[i].nombre+'</li>';
	    	}

	    	cat.html(li);
	      },
	      error: function (e){
	          console.log('ERROR: '+JSON.stringify(e))
	      }
	  });
}