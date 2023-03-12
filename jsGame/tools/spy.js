SPY = {

    onCity: function (x_coord, y_coord, id_player) {



    },
    sendSpy: function (x_coord, y_coord) {
        
        var idCity = Elkaisar.CurrentCity.City.id_city;
        if(isNaN(Elkaisar.CurrentCity.City.spies)){
            alert_box.failMessage("لا يوجد عدد كافى من الجواسيس");
            return ;
        }
        var msg = `تاكيد ارسال جواسيس الى <br/> [${x_coord} , ${y_coord}]`;
        var container = `<div class="spy-wrapper">
                                <div class="pull-L">
                                    <img src="images/items/item027.jpg" class="image">
                                </div>
                                <div class="pull-R">
                                    <div class="right pull-R">
                                        <input type="text" id="number-to-use" class="input only_num" step="${Elkaisar.CurrentCity.City.spies}" max="${Elkaisar.CurrentCity.City.spies}" min="0">
                                    </div>
                                    <div class="left pull-L">
                                        <div>استعمال</div>
                                        <div class="possess">
                                            تمتلك  ${Elkaisar.CurrentCity.City.spies}
                                        </div>
                                    </div>
                                </div>
                            </div>`;
        alert_box.confirmWithInput(msg, container, function () {
            
            var number_to_use = $("#number-to-use").val();
            if (!number_to_use || Number(number_to_use) <= 0) {
                 alert_box.failMessage("عدد الجواسيس غير كافى للقيام بعملية التجسس");
                return ;
            }else if(Number(number_to_use) > Number(Elkaisar.CurrentCity.City.spies) || isNaN(Elkaisar.CurrentCity.City.spies) ){
                alert_box.failMessage("لا يوجد عدد كافى من الجواسيس");
                return ;
            }
            else {
                $.ajax({
                    url: `${Elkaisar.Config.NodeUrl}/api/ASpy/start`,
                    data: {
                        xCoord     : x_coord,
                        yCoord     : y_coord,
                        spyNum     : number_to_use,
                        idCity     : idCity,
                        token      : Elkaisar.Config.OuthToken,
                        server     : Elkaisar.Config.idServer
                    },
                    type: 'POST',
                    beforeSend: function (xhr) {

                    },
                    success: function (data, textStatus, jqXHR) {
                        
                        if(!Elkaisar.LBase.isJson(data))
                            return Elkaisar.LBase.Error(data);
                        var JsonObject = JSON.parse(data);
                        
                        if(JsonObject.state === "ok")
                        {
                            
                            Elkaisar.City.getCity(idCity).City = JsonObject.City;
                            Elkaisar.DPlayer.Notif.spy_task = Number(Elkaisar.DPlayer.Notif.spy_task) + 1;
                            Fixed.refreshPlayerNotif();
                            city_profile.refresh_army_view();  
                            alert_box.succesMessage("تم ارسال الجواسيس بنجاح");
                            $(".close_RB img").trigger("click");
                        }
                        
                        
                        
                    },
                    error: function (jqXHR, textStatus, errorThrown) {

                    }
                });
            }
            
        });
    }



};