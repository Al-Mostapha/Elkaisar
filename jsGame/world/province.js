Elkaisar.World.Province.canvasCtx = document.createElement('canvas').getContext('2d');
Elkaisar.World.Province.coloredCoordImage = new Image(100, 100);
Elkaisar.World.Province.coloredCoordImage.src = 'images/world/provinceImage/provinceColored.png';
Elkaisar.World.Province.coloredCoordImage.onload = function () {
    Elkaisar.World.Province.canvasCtx.drawImage(Elkaisar.World.Province.coloredCoordImage, 0, 0, 100, 100);

};


Elkaisar.World.Province.colorCode = {
    "1": {r: 0, g: 0, b: 255}, // بريطانيا
    "2": {r: 0, g: 0, b: 0}, //rich
    "3": {r: 102, g: 102, b: 102}, // Asia
    "4": {r: 0, g: 255, b: 0}, // France
    "5": {r: 255, g: 0, b: 255}, // Macdon
    "6": {r: 0, g: 255, b: 255}, // Spain
    "7": {r: 255, g: 0, b: 0}, // Italia
    "8": {r: 102, g: 0, b: 153}, // Parsia
    "9": {r: 255, g: 255, b: 255}, // Cartage
    "10": {r: 255, g: 255, b: 0}// Egypt
};

Elkaisar.World.Province.Title = {
    "1": {"en": "BRITONS", "ar": "بريطانيا", "de": "Britannien", "es": "BRITANIA", "pt": "BRITÂNICOS", "zh": "不列颠"},
    "2": {"en": "REICH", "ar": "المانيا", "de": "Reich", "es": "GERMANIA", "pt": "REICH", "zh": "日耳曼"},
    "3": {"en": "ASIANA", "ar": "آسيا", "de": "Hunne", "es": "ASIANA", "pt": "ASIANA", "zh": "匈奴"},
    "4": {"en": "GAULS", "ar": "فرنسا", "de": "Gallien", "es": "GALIA", "pt": "GAULESES", "zh": "高卢"},
    "5": {"en": "MACEDON", "ar": "مقدونيا", "de": "Mazedonien", "es": "MACEDONIA", "pt": "MACEDÔNIA", "zh": "马其顿"},
    "6": {"en": "HISPANIA", "ar": "اسبانيا", "de": "Spanien", "es": "HISPANIA", "pt": "HISPANIA", "zh": "西班牙"},
    "7": {"en": "ITALIA", "ar": "ايطاليا", "de": "Rom", "es": "ITALIA", "pt": "ITALIA", "zh": "罗马"},
    "8": {"en": "PARTHIA", "ar": "الفرس", "de": "Perserreich", "es": "PARTHIA", "pt": "PÁRTIA", "zh": "波斯"},
    "9": {"en": "CARTHAGE", "ar": "قرطاجة", "de": "Karthago", "es": "CARTAGO", "pt": "CARTAGO", "zh": "迦太基"},
    "10": {"en": "Egypt", "ar": "مصر", "de": "Ägypten", "es": "EGIPTO", "pt": "EGITO", "zh": "埃及"}
};

Elkaisar.World.Province.getTitle = function (x, y) {

    x = Math.floor(x / 5);
    y = Math.floor(y / 5);
    const pixelColor = Elkaisar.World.Province.canvasCtx.getImageData(x, y, 1, 1).data;

    for (var ii in Elkaisar.World.Province.colorCode) {

        if (Elkaisar.World.Province.colorCode[ii].r === pixelColor[0] && Elkaisar.World.Province.colorCode[ii].g === pixelColor[1] && Elkaisar.World.Province.colorCode[ii].b === pixelColor[2]) {
            return Elkaisar.World.Province.Title[ii][UserLag.language];
        }

    }

};





$(document).on('click', '#relocate-city-now', function () {
    var province = $('#move-city-to .select-list').attr('data-value');
    return $.ajax({
        url: `${Elkaisar.Config.NodeUrl}/api/AItemUse/useRandomMove`,
        type: 'POST',
        data: {
            Item: 'random_move',
            amount: 1,
            idCity: Elkaisar.CurrentCity.City.id_city,
            token: Elkaisar.Config.OuthToken,
            province: province
        },
        success: function (data) {
            if (!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            var JsonData = JSON['parse'](data);
            if (JsonData['state'] === 'ok') {
                Elkaisar['City']['getCityBase']()['done'](function (_0x5bcbd8) {
                    $('#city-data .coords')['html']('[ ' + Elkaisar['CurrentCity']['City']['y'] + ' , ' + Elkaisar['CurrentCity']['City']['x'] + ' ]');
                    alert_box['succesMessage'](
                            'قد تم نقل مدينتك بنجاح الى الاحداثيات الاتية <br/>'
                            + '[ ' + Elkaisar['CurrentCity']['City']['x']
                            + ' , ' + Elkaisar['CurrentCity']['City']['y'] + ' ]');
                    if ($('#WorldCity')['attr']('data-view') === 'world') {
                        $('#x_coord-input input')['val'](Elkaisar['CurrentCity']['City']['x']);
                        $('#y_coord-input input')['val'](Elkaisar['CurrentCity']['City']['y']);
                        $('#nav-btn button')['click']();
                    }


                });
            } else if(JsonData['state'] === 'error_no_place_empty'){
                setTimeout(function () {
                    alert_box['confirmMessage']('للاسف لا يمكنك نقل المدينة فى هذ المكان حيث ان المكان ليس خالى :]');
                }, 0x64)
            }else {
                (Elkaisar.LBase.Error(data), console['log'](data));
            }
        }
    });
});

