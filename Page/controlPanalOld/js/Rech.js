ElkaisarCp.Rech = {};


ElkaisarCp.showAllTrans = function (){
    
  $.ajax({
        url: `${BASE_URL}/home/HPlayerRecharge/getAllRechComp`,
        type: 'GET',
        data: {},
        success: function (data, textStatus, jqXHR) {

            if (!isJson(data))
                alert(data);

            var CompList = JSON.parse(data);
            var List = "";
            var Equip = {};
            for (var Index of ElkaisarCp.ServerOffer.OfferList.Offers) {

                Index.offer = JSON.parse(Index.offer);
                List += `<li class="server-unit-offer" data-id-offer="${Index.id_offer}" data-offer-num="${Index.offer_num}" style="display: flex;flex-flow: row;justify-content: space-between; margin-bottom: 10px">
                           <button class="show-server-offer" data-id-offer="${Index.id_offer}"> ${Index.offer_name} (${Index.offer_num})  </buton><button class="remove-offer" data-id-offer="${Index.id_offer}">-</button>
                        </li>`;

            }
            List += `<li class="server-unit-offer" style="display: flex;flex-flow: row;justify-content: space-around;margin-top: 15px;">
                        <button class="add-server-offer" data-id-offer="2"> إضافة عرض (+)  </button>
                    </li>`;

            $("#current-offers ul").html(List);

        }
    });
    
};

