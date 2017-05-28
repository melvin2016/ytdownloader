  $("#convertBtn").click(function(event){
    console.log('clicked !');
    $("#convertBtn").hide();
    var convertAnother1 = $('<a><button class="btn btn-secondary" type="button" id="convertBtn">Wait..Downloading !</button></a>');
    $("#convertAnother1").append($(convertAnother1));
    $.ajax({
      url:'/convert',
      type:'POST',
      data:{
        link : $("#linkForm").val()
      },
      dataType:'json',
      success:function(result){
              console.log(result);
              $("#filename").html('Title : '+result.filename.toString());
              $("#size").html('Size : '+result.size.toString()+' bytes');
              $("#convertAnother1").hide();
              var dwnBtn = $('<a class="btn btn-outline-success btn-sm " role="button" aria-pressed="true">Download</a>').attr({href:'/download/'+result.name.toString()+'.mp4'});
              $("#btnDwn").append($(dwnBtn));
              var convertAnother =  $('<a href="/"><button class="btn btn-secondary" type="button" id="convertBtn">Download Another !</button></a>');
              $("#convertAnother").append($(convertAnother));
          },
      error:function(xhr,status,error){
              console.log(status);
          }
    })
  });
