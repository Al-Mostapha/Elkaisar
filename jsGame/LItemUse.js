Elkaisar.Item.useItemFunc = function () {

    Elkaisar.BaseData.Items[`motiv_60`][`UseFunc`] = function (amount) {

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemUse/useMotivSpeech`,
            type: 'POST',
            data: {
                Item: "motiv_60",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Player_profile.getPlayerStateData();
                    Elkaisar.Building.refreshView();
                }
            }
        });

    };

    Elkaisar.BaseData.Items[`motiv_7`][`UseFunc`] = function (amount) {

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemUse/useMotivSpeech`,
            type: 'POST',
            data: {
                Item: "motiv_7",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Fixed.refresePlayerStateList();
                    Elkaisar.Building.refreshView();
                }
            }
        });

    };

    Elkaisar.BaseData.Items[`prot_pop`][`UseFunc`] = function (amount) {

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemUse/useProtPop`,
            type: 'POST',
            data: {
                Item: "prot_pop",
                amount: amount,
                idCity: Elkaisar.CurrentCity.City.id_city,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.CurrentCity.City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });

    };

    Elkaisar.BaseData.Items[`peace`][`UseFunc`] = function (amount) {

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemUse/useCeaseFire`,
            type: 'POST',
            data: {
                Item: "peace",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Player_profile.getPlayerStateData();
                }
            }
        });

    };
    Elkaisar.BaseData.Items[`a_play`][`UseFunc`] = function (amount) {

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemUse/useTheatrics`,
            type: 'POST',
            data: {
                Item: "a_play",
                amount: amount,
                idCity: Elkaisar.CurrentCity.City.id_city,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.CurrentCity.City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };
    
    Elkaisar.BaseData.Items[`freedom_help`][`UseFunc`] = function (amount) {

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemUse/useFreedomHelp`,
            type: 'POST',
            data: {
                Item: "freedom_help",
                amount: amount,
                idCity: Elkaisar.CurrentCity.City.id_city,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.CurrentCity.City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    alert_box.succesMessage("تم رفع الإستعمار بنجاح");
                    Elkaisar.World.Map.getWorldCityColonized();
                }
               
            }
        });

    };

    Elkaisar.BaseData.Items[`medical_moun`][`UseFunc`] = function (amount) {

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemUse/useMedicalStatue`,
            type: 'POST',
            data: {
                Item: "medical_moun",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Player_profile.getPlayerStateData();
                }
            }
        });

    };

    Elkaisar.BaseData.Items[`mediacl_statue`][`UseFunc`] = function (amount) {

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemUse/useMedicalStatue`,
            type: 'POST',
            data: {
                Item: "mediacl_statue",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Player_profile.getPlayerStateData();
                }
            }
        });

    };

    Elkaisar.BaseData.Items[`sparta_stab`][`UseFunc`] = function (amount) {

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemUse/useAttackAdvancer`,
            type: 'POST',
            data: {
                Item: "sparta_stab",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Player_profile.getPlayerStateData();
                }
            }
        });

    };

    Elkaisar.BaseData.Items[`qulinds_shaft`][`UseFunc`] = function (amount) {

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemUse/useAttackAdvancer`,
            type: 'POST',
            data: {
                Item: "qulinds_shaft",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Player_profile.getPlayerStateData();
                }
            }
        });

    };

    Elkaisar.BaseData.Items[`marmlo_helmet`][`UseFunc`] = function (amount) {

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemUse/useDefenceAdvancer`,
            type: 'POST',
            data: {
                Item: "marmlo_helmet",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Player_profile.getPlayerStateData();
                }
            }
        });

    };

    Elkaisar.BaseData.Items[`march_prot`][`UseFunc`] = function (amount) {

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemUse/useDefenceAdvancer`,
            type: 'POST',
            data: {
                Item: "march_prot",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Player_profile.getPlayerStateData();
                }
            }
        });

    };

    if (Elkaisar['BaseData']['Items']['random_move'])
        Elkaisar['BaseData']['Items']['random_move']['UseFunc'] = function (amount) {
            return alert_box['randomMove'](function () {
                var Province = $('#move-city-to .select-list')['attr']('data-value');
                return $.ajax({
                    'url': Elkaisar.Config.NodeUrl + '/api/AItemUse/useRandomMove',
                    'type': 'POST',
                    'data': {
                        'Item': 'random_move',
                        'amount': 1,
                        'idCity': Elkaisar['CurrentCity']['City']['id_city'],
                        token: Elkaisar['Config']['OuthToken'],
                        server: Elkaisar['Config']['idServer'],
                        'province': Province
                    },
                    success: function (_0x73e02b, _0x3bf26e, _0x2783a1) {
                        if (!Elkaisar['LBase']['isJson'](_0x73e02b))
                            return Elkaisar['LBase']['Error'](_0x73e02b);
                        var JsonData = JSON['parse'](_0x73e02b);
                        if (JsonData['state'] === 'ok')
                            Elkaisar['City']['getCityBase']()['done'](function (_0x1f81a0) {
                                $('#city-data .coords')['html']('[ ' + Elkaisar['CurrentCity']['City']['y'] + ' , ' + Elkaisar['CurrentCity']['City']['x'] + ' ]');
                                alert_box['succesMessage']('قد تم نقل مدينتك بنجاح الى الاحداثيات الاتية <br/>' + '[ ' + Elkaisar['CurrentCity']['City']['x'] + ' , ' + Elkaisar['CurrentCity']['City']['y'] + ' ]');

                                Elkaisar.World.Map.getWorldCity().done(function () {
                                    if ($('#WorldCity')['attr']('data-view') === 'world') {
                                        $('#x_coord-input input')['val'](Elkaisar['CurrentCity']['City']['x']);
                                        $('#y_coord-input input')['val'](Elkaisar['CurrentCity']['City']['y']);
                                        $('#nav-btn button')['click']();
                                    }
                                    $(".close-alert_container").click();
                                    $(".close_dialog").click();
                                });
                            });
                        else if (JsonData['state'] === 'error_no_place_empty') {
                            setTimeout(function () {
                                alert_box['confirmMessage']('للاسف لا يمكنك نقل المدينة فى هذ المكان حيث ان المكان ليس خالى :]');
                            }, 0x64)
                        } else {
                            Elkaisar.LBase.Error(_0x73e02b);
                            console['log'](_0x73e02b);
                        }
                    }
                });
            });
        };

    Elkaisar.BaseData.Items[`certain_move`][`UseFunc`] = function (amount) {

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemUse/useCertainMove`,
            type: 'POST',
            data: {
                Item: "certain_move",
                amount: amount,
                idCity: Elkaisar.CurrentCity.City.id_city,
                newX: Number($("#new-city-x-coord").val()),
                newY: Number($("#new-city-y-coord").val()),
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);

                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    alert_box.succesMessage("قد تم نقل مدينتك بنجاح الى الاحداثيات الاتية <br/>" + "[ " + Elkaisar.CurrentCity.City.x + " , " + Elkaisar.CurrentCity.City.y + " ]");
                    Elkaisar.City.getCityBase().done(function (data) {

                        $("#city-data .coords").html("[ " + Elkaisar.CurrentCity.City.y + " , " + Elkaisar.CurrentCity.City.x + " ]");

                        Elkaisar.World.Map.getWorldCity().done(function () {
                            if ($('#WorldCity')['attr']('data-view') === 'world') {
                                $('#x_coord-input input')['val'](Elkaisar['CurrentCity']['City']['x']);
                                $('#y_coord-input input')['val'](Elkaisar['CurrentCity']['City']['y']);
                                $('#nav-btn button')['click']();
                            }

                            $(".close-alert_container").click();
                            $(".close_dialog").click();
                        });
                    });

                } else if (JsonObject.state === "error_no_place_empty") {
                    setTimeout(function () {
                        alert_box.confirmMessage("للاسف لا يمكنك نقل المدينة فى هذ المكان حيث ان المكان ليس خالى :]");
                    }, 500)
                } else {
                    Elkaisar.LBase.Error(data);
                    console.log(data)
                }
            }
        });

    };

    Elkaisar.BaseData.Items[`wheat_1`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemUse/useWheat`,
            type: 'POST',
            data: {
                Item: "wheat_1",
                amount: amount,
                idCity: Elkaisar.CurrentCity.City.id_city,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    Player_profile.getPlayerStateData();
                }
            }
        });

    };

    Elkaisar.BaseData.Items[`wheat_7`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemUse/useWheat`,
            type: 'POST',
            data: {
                Item: "wheat_7",
                amount: amount,
                idCity: Elkaisar.CurrentCity.City.id_city,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    Player_profile.getPlayerStateData();
                }
            }
        });

    };

    Elkaisar.BaseData.Items[`stone_1`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemUse/useStone`,
            type: 'POST',
            data: {
                Item: "stone_1",
                amount: amount,
                idCity: Elkaisar.CurrentCity.City.id_city,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    Player_profile.getPlayerStateData();
                }
            }
        });

    };

    Elkaisar.BaseData.Items[`stone_7`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemUse/useStone`,
            type: 'POST',
            data: {
                Item: "stone_7",
                amount: amount,
                idCity: Elkaisar.CurrentCity.City.id_city,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    Player_profile.getPlayerStateData();
                }
            }
        });

    };

    Elkaisar.BaseData.Items[`wood_1`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemUse/useWood`,
            type: 'POST',
            data: {
                Item: "wood_1",
                amount: amount,
                idCity: Elkaisar.CurrentCity.City.id_city,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    Player_profile.getPlayerStateData();
                }
            }
        });

    };

    Elkaisar.BaseData.Items[`wood_7`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemUse/useWood`,
            type: 'POST',
            data: {
                Item: "wood_7",
                amount: amount,
                idCity: Elkaisar.CurrentCity.City.id_city,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    Player_profile.getPlayerStateData();
                }
            }
        });

    };

    Elkaisar.BaseData.Items[`metal_1`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemUse/useMetal`,
            type: 'POST',
            data: {
                Item: "metal_1",
                amount: amount,
                idCity: Elkaisar.CurrentCity.City.id_city,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    Player_profile.getPlayerStateData();
                }
            }
        });

    };

    Elkaisar.BaseData.Items[`metal_7`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemUse/useMetal`,
            type: 'POST',
            data: {
                Item: "metal_1",
                amount: amount,
                idCity: Elkaisar.CurrentCity.City.id_city,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    Player_profile.getPlayerStateData();
                }
            }
        });

    };

    Elkaisar.BaseData.Items[`coin_1`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemUse/useCoin`,
            type: 'POST',
            data: {
                Item: "coin_1",
                amount: amount,
                idCity: Elkaisar.CurrentCity.City.id_city,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    Player_profile.getPlayerStateData();
                }
            }
        });

    };

    Elkaisar.BaseData.Items[`coin_7`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemUse/useCoin`,
            type: 'POST',
            data: {
                Item: "coin_7",
                amount: amount,
                idCity: Elkaisar.CurrentCity.City.id_city,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    Player_profile.getPlayerStateData();
                }
            }
        });

    };


    if (Elkaisar['BaseData']['Items']['gold_5'])
        Elkaisar['BaseData']['Items']['gold_5']['UseFunc'] = function (_0x4813fb) {
            var _0x329520 = Elkaisar['CurrentCity']['City']['id_city'];
            return $.ajax({
                'url': Elkaisar.Config.NodeUrl + '/api/AItemUse/useGoldPack',
                'type': 'POST',
                'data': {
                    'Item': 'gold_5',
                    'amount': _0x4813fb,
                    'idCity': Elkaisar['CurrentCity']['idCity'],
                    token: Elkaisar['Config']['OuthToken'],
                    server: Elkaisar['Config']['idServer']
                },
                success: function (_0xf94588, _0x53adc7, _0xd22101) {
                    if (!Elkaisar['LBase']['isJson'](_0xf94588))
                        Elkaisar['LBase']['Error'](_0xf94588);
                    var _0x13126a = JSON['parse'](_0xf94588);
                    _0x13126a['state'] === 'ok' && Player_profile['getPlayerBaseData']();
                }
            });
        };


    if (Elkaisar['BaseData']['Items']['gold_1'])
        Elkaisar['BaseData']['Items']['gold_1']['UseFunc'] = function (_0x4813fb) {
            var _0x329520 = Elkaisar['CurrentCity']['City']['id_city'];
            return $.ajax({
                'url': Elkaisar.Config.NodeUrl + '/api/AItemUse/useGoldPack',
                'type': 'POST',
                'data': {
                    'Item': 'gold_1',
                    'amount': _0x4813fb,
                    'idCity': Elkaisar['CurrentCity']['idCity'],
                    token: Elkaisar['Config']['OuthToken'],
                    server: Elkaisar['Config']['idServer']
                },
                success: function (_0xf94588, _0x53adc7, _0xd22101) {
                    if (!Elkaisar['LBase']['isJson'](_0xf94588))
                        Elkaisar['LBase']['Error'](_0xf94588);
                    var _0x13126a = JSON['parse'](_0xf94588);
                    _0x13126a['state'] === 'ok' && Player_profile['getPlayerBaseData']();
                }
            });
        };
    if (Elkaisar['BaseData']['Items']['gold_10'])
        Elkaisar['BaseData']['Items']['gold_10']['UseFunc'] = function (_0x3fb720) {
            var _0x1f1a2e = Elkaisar['CurrentCity']['City']['id_city'];
            return $.ajax({
                'url': Elkaisar.Config.NodeUrl + '/api/AItemUse/useGoldPack',
                'type': 'POST',
                'data': {
                    'Item': 'gold_10',
                    'amount': _0x3fb720,
                    'idCity': Elkaisar['CurrentCity']['idCity'],
                    token: Elkaisar['Config']['OuthToken'],
                    server: Elkaisar['Config']['idServer']
                },
                success: function (_0x334d3d, _0x108d44, _0x23e97a) {
                    if (!Elkaisar['LBase']['isJson'](_0x334d3d))
                        Elkaisar['LBase']['Error'](_0x334d3d);
                    var _0x5dcd18 = JSON['parse'](_0x334d3d);
                    _0x5dcd18['state'] === 'ok' && Player_profile['getPlayerBaseData']();
                }
            });
        };
    if (Elkaisar['BaseData']['Items']['gold_25'])
        Elkaisar['BaseData']['Items']['gold_25']['UseFunc'] = function (_0x575893) {
            var _0x34c16d = Elkaisar['CurrentCity']['City']['id_city'];
            return $.ajax({
                'url': Elkaisar.Config.NodeUrl + '/api/AItemUse/useGoldPack',
                'type': 'POST',
                'data': {
                    'Item': 'gold_25',
                    'amount': _0x575893,
                    'idCity': Elkaisar['CurrentCity']['idCity'],
                    token: Elkaisar['Config']['OuthToken'],
                    server: Elkaisar['Config']['idServer']
                },
                success: function (_0x5b9d65, _0x4c2bb7, _0x2c385f) {
                    if (!Elkaisar['LBase']['isJson'](_0x5b9d65))
                        Elkaisar['LBase']['Error'](_0x5b9d65);
                    var _0x1c3177 = JSON['parse'](_0x5b9d65);
                    _0x1c3177['state'] === 'ok' && Player_profile['getPlayerBaseData']();
                }
            });
        };
    if (Elkaisar['BaseData']['Items']['gold_75'])
        Elkaisar['BaseData']['Items']['gold_75']['UseFunc'] = function (_0x147f7f) {
            var _0x5a71c2 = Elkaisar['CurrentCity']['City']['id_city'];
            return $.ajax({
                'url': Elkaisar.Config.NodeUrl + '/api/AItemUse/useGoldPack',
                'type': 'POST',
                'data': {
                    'Item': 'gold_75',
                    'amount': _0x147f7f,
                    'idCity': Elkaisar['CurrentCity']['idCity'],
                    token: Elkaisar['Config']['OuthToken'],
                    server: Elkaisar['Config']['idServer']
                },
                success: function (_0x78da2e, _0x297788, _0x5cd0f8) {
                    if (!Elkaisar['LBase']['isJson'](_0x78da2e))
                        Elkaisar['LBase']['Error'](_0x78da2e);
                    var _0x1aaf85 = JSON['parse'](_0x78da2e);
                    _0x1aaf85['state'] === 'ok' && Player_profile['getPlayerBaseData']();
                }
            });
        };
    if (Elkaisar['BaseData']['Items']['gold_100'])
        Elkaisar['BaseData']['Items']['gold_100']['UseFunc'] = function (_0x11914b) {
            var _0x291633 = Elkaisar['CurrentCity']['City']['id_city'];
            return $.ajax({
                'url': Elkaisar.Config.NodeUrl + '/api/AItemUse/useGoldPack',
                'type': 'POST',
                'data': {
                    'Item': 'gold_100',
                    'amount': _0x11914b,
                    'idCity': Elkaisar['CurrentCity']['idCity'],
                    token: Elkaisar['Config']['OuthToken'],
                    server: Elkaisar['Config']['idServer']
                },
                success: function (_0x3f1d5f, _0x1d71cb, _0x1498d4) {
                    if (!Elkaisar['LBase']['isJson'](_0x3f1d5f))
                        Elkaisar['LBase']['Error'](_0x3f1d5f);
                    var _0x4f2b43 = JSON['parse'](_0x3f1d5f);
                    _0x4f2b43['state'] === 'ok' && Player_profile['getPlayerBaseData']();
                }
            });
        };
    if (Elkaisar['BaseData']['Items']['gold_500'])
        Elkaisar['BaseData']['Items']['gold_500']['UseFunc'] = function (_0x197e5c) {
            var _0x10da0d = Elkaisar['CurrentCity']['City']['id_city'];
            return $.ajax({
                'url': Elkaisar.Config.NodeUrl + '/api/AItemUse/useGoldPack',
                'type': 'POST',
                'data': {
                    'Item': 'gold_500',
                    'amount': _0x197e5c,
                    'idCity': Elkaisar['CurrentCity']['idCity'],
                    token: Elkaisar['Config']['OuthToken'],
                    server: Elkaisar['Config']['idServer']
                },
                success: function (_0x4f6b0f, _0x543f59, _0x4dfda6) {
                    if (!Elkaisar['LBase']['isJson'](_0x4f6b0f))
                        Elkaisar['LBase']['Error'](_0x4f6b0f);
                    var _0x4c1ef8 = JSON['parse'](_0x4f6b0f);
                    _0x4c1ef8['state'] === 'ok' && Player_profile['getPlayerBaseData']();
                }
            });
        };
    if (Elkaisar['BaseData']['Items']['gold_1000'])
        Elkaisar['BaseData']['Items']['gold_1000']['UseFunc'] = function (_0x560420) {
            var _0x32a8fd = Elkaisar['CurrentCity']['City']['id_city'];
            return $.ajax({
                'url': Elkaisar.Config.NodeUrl + '/api/AItemUse/useGoldPack',
                'type': 'POST',
                'data': {
                    'Item': 'gold_1000',
                    'amount': _0x560420,
                    'idCity': Elkaisar['CurrentCity']['idCity'],
                    token: Elkaisar['Config']['OuthToken'],
                    server: Elkaisar['Config']['idServer']
                },
                success: function (_0x3ecc5d, _0x5eceef, _0x456d9b) {
                    if (!Elkaisar['LBase']['isJson'](_0x3ecc5d))
                        Elkaisar['LBase']['Error'](_0x3ecc5d);
                    var _0x1912f1 = JSON['parse'](_0x3ecc5d);
                    _0x1912f1['state'] === 'ok' && Player_profile['getPlayerBaseData']();
                }
            });
        };


        Elkaisar.BaseData.Items[`arena_attempt_1`][`UseFunc`] = function (amount) {
            return $.ajax({
                url: `${Elkaisar.Config.NodeUrl}/api/AItemUse/useArenaAttempt`,
                type: 'POST',
                data: {
                    Item: "arena_attempt_1",
                    amount: amount,
                    idCity: Elkaisar.CurrentCity.City.id_city,
                    token: Elkaisar.Config.OuthToken,
                    server: Elkaisar.Config.idServer
                },
                success: function (data, textStatus, jqXHR) {
                    if (!Elkaisar.LBase.isJson(data))
                        Elkaisar.LBase.Error(data);
                    var JsonObject = JSON.parse(data);
                    if (JsonObject.state === "ok") {
                        Elkaisar.ArenaChallange.getArenaData().done(function(){
                            $("#SArenaField").click();
                        });
                        $(".close-alert").click();
                        alert_box.succesMessage("تم إضافة 1 محاولة للميدان");
                    }
                }
            });
    
        };

        Elkaisar.BaseData.Items[`arena_attempt_5`][`UseFunc`] = function (amount) {
            return $.ajax({
                url: `${Elkaisar.Config.NodeUrl}/api/AItemUse/useArenaAttempt`,
                type: 'POST',
                data: {
                    Item: "arena_attempt_5",
                    amount: amount,
                    idCity: Elkaisar.CurrentCity.City.id_city,
                    token: Elkaisar.Config.OuthToken,
                    server: Elkaisar.Config.idServer
                },
                success: function (data, textStatus, jqXHR) {
                    if (!Elkaisar.LBase.isJson(data))
                        Elkaisar.LBase.Error(data);
                    var JsonObject = JSON.parse(data);
                    if (JsonObject.state === "ok") {
                        Elkaisar.ArenaChallange.getArenaData().done(function(){
                            $("#SArenaField").click();
                        });
                        $(".close-alert").click();
                        alert_box.succesMessage("تم إضافة 5 محاولة للميدان");
                    }
                }
            });
    
        };

        Elkaisar.BaseData.Items[`arena_attempt_10`][`UseFunc`] = function (amount) {
            return $.ajax({
                url: `${Elkaisar.Config.NodeUrl}/api/AItemUse/useArenaAttempt`,
                type: 'POST',
                data: {
                    Item: "arena_attempt_10",
                    amount: amount,
                    idCity: Elkaisar.CurrentCity.City.id_city,
                    token: Elkaisar.Config.OuthToken,
                    server: Elkaisar.Config.idServer
                },
                success: function (data, textStatus, jqXHR) {
                    if (!Elkaisar.LBase.isJson(data))
                        Elkaisar.LBase.Error(data);
                    var JsonObject = JSON.parse(data);
                    if (JsonObject.state === "ok") {
                        Elkaisar.ArenaChallange.getArenaData().done(function(){
                            $("#SArenaField").click();
                        });
                        $(".close-alert").click();
                        alert_box.succesMessage("تم إضافة 10 محاولة للميدان");
                    }
                }
            });
    
        };


        Elkaisar.BaseData.Items[`arena_exp_1`][`UseFunc`] = function (amount) {
            return $.ajax({
                url: `${Elkaisar.Config.NodeUrl}/api/AItemUse/useArenaExpPack`,
                type: 'POST',
                data: {
                    Item: "arena_exp_1",
                    amount: amount,
                    idCity: Elkaisar.CurrentCity.City.id_city,
                    token: Elkaisar.Config.OuthToken,
                    server: Elkaisar.Config.idServer
                },
                success: function (data, textStatus, jqXHR) {
                    if (!Elkaisar.LBase.isJson(data))
                        Elkaisar.LBase.Error(data);
                    var JsonObject = JSON.parse(data);
                    if (JsonObject.state === "ok") {
                        Elkaisar.ArenaChallange.getArenaData().done(function(){
                            $("#SArenaTroops").click();
                        });
                        $(".close-alert").click();
                        alert_box.succesMessage("تم إضافة 1 خبرة للميدان");
                        
                    }
                }
            });
    
        };

        Elkaisar.BaseData.Items[`arena_exp_5`][`UseFunc`] = function (amount) {
            return $.ajax({
                url: `${Elkaisar.Config.NodeUrl}/api/AItemUse/useArenaExpPack`,
                type: 'POST',
                data: {
                    Item: "arena_exp_5",
                    amount: amount,
                    idCity: Elkaisar.CurrentCity.City.id_city,
                    token: Elkaisar.Config.OuthToken,
                    server: Elkaisar.Config.idServer
                },
                success: function (data, textStatus, jqXHR) {
                    if (!Elkaisar.LBase.isJson(data))
                        Elkaisar.LBase.Error(data);
                    var JsonObject = JSON.parse(data);
                    if (JsonObject.state === "ok") {
                        Elkaisar.ArenaChallange.getArenaData().done(function(){
                            $("#SArenaTroops").click();
                        });
                        $(".close-alert").click();
                        alert_box.succesMessage("تم إضافة 5 خبرة للميدان");
                        
                    }
                }
            });
    
        };

        
        Elkaisar.BaseData.Items[`arena_exp_10`][`UseFunc`] = function (amount) {
            return $.ajax({
                url: `${Elkaisar.Config.NodeUrl}/api/AItemUse/useArenaExpPack`,
                type: 'POST',
                data: {
                    Item: "arena_exp_10",
                    amount: amount,
                    idCity: Elkaisar.CurrentCity.City.id_city,
                    token: Elkaisar.Config.OuthToken,
                    server: Elkaisar.Config.idServer
                },
                success: function (data, textStatus, jqXHR) {
                    if (!Elkaisar.LBase.isJson(data))
                        Elkaisar.LBase.Error(data);
                    var JsonObject = JSON.parse(data);
                    if (JsonObject.state === "ok") {
                        Elkaisar.ArenaChallange.getArenaData().done(function(){
                            $("#SArenaTroops").click();
                        });
                        $(".close-alert").click();
                        alert_box.succesMessage("تم إضافة 10 خبرة للميدان");
                    }
                }
            });
    
        };

        Elkaisar.BaseData.Items[`arena_exp_25`][`UseFunc`] = function (amount) {
            return $.ajax({
                url: `${Elkaisar.Config.NodeUrl}/api/AItemUse/useArenaExpPack`,
                type: 'POST',
                data: {
                    Item: "arena_exp_25",
                    amount: amount,
                    idCity: Elkaisar.CurrentCity.City.id_city,
                    token: Elkaisar.Config.OuthToken,
                    server: Elkaisar.Config.idServer
                },
                success: function (data, textStatus, jqXHR) {
                    if (!Elkaisar.LBase.isJson(data))
                        Elkaisar.LBase.Error(data);
                    var JsonObject = JSON.parse(data);
                    if (JsonObject.state === "ok") {
                        Elkaisar.ArenaChallange.getArenaData().done(function(){
                            $("#SArenaTroops").click();
                        });
                        $(".close-alert").click();
                        alert_box.succesMessage("تم إضافة 25 خبرة للميدان");
                    }
                }
            });
    
        };
};




Elkaisar.Item.useItemBoxFunc = function () {


    Elkaisar.BaseData.Items[`gift_box`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useGiftBox`,
            type: 'POST',
            data: {
                Item: "gift_box",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    showMatrialGiftList(JsonObject.Item);
                    for (var iii in JsonObject.Item) {
                        Matrial.givePlayer(JsonObject.Item[iii].Item, JsonObject.Item[iii].amount)
                    }
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`wood_box`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useWoodBox`,
            type: 'POST',
            data: {
                Item: "wood_box",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    showMatrialGiftList(JsonObject.Item);
                    for (var iii in JsonObject.Item) {
                        Matrial.givePlayer(JsonObject.Item[iii].Item, JsonObject.Item[iii].amount)
                    }
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`golden_box`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useGoldenBox`,
            type: 'POST',
            data: {
                Item: "golden_box",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    showMatrialGiftList(JsonObject.Item);
                    for (var iii in JsonObject.Item) {
                        Matrial.givePlayer(JsonObject.Item[iii].Item, JsonObject.Item[iii].amount)
                    }
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`beginner_back_1`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useBeginnerPack`,
            type: 'POST',
            data: {
                Item: "beginner_back_1",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    showMatrialGiftList(JsonObject.Item);
                    for (var iii in JsonObject.Item) {
                        Matrial.givePlayer(JsonObject.Item[iii].Item, JsonObject.Item[iii].amount)
                    }
                }
            }
        });
    };
    Elkaisar.BaseData.Items[`beginner_back_2`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useBeginnerPack`,
            type: 'POST',
            data: {
                Item: "beginner_back_2",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    showMatrialGiftList(JsonObject.Item);
                    for (var iii in JsonObject.Item) {
                        Matrial.givePlayer(JsonObject.Item[iii].Item, JsonObject.Item[iii].amount)
                    }
                }
            }
        });
    };
    Elkaisar.BaseData.Items[`beginner_back_3`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useBeginnerPack`,
            type: 'POST',
            data: {
                Item: "beginner_back_3",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    showMatrialGiftList(JsonObject.Item);
                    for (var iii in JsonObject.Item) {
                        Matrial.givePlayer(JsonObject.Item[iii].Item, JsonObject.Item[iii].amount)
                    }
                }
            }
        });
    };
    Elkaisar.BaseData.Items[`beginner_back_4`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useBeginnerPack`,
            type: 'POST',
            data: {
                Item: "beginner_back_4",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    showMatrialGiftList(JsonObject.Item);
                    for (var iii in JsonObject.Item) {
                        Matrial.givePlayer(JsonObject.Item[iii].Item, JsonObject.Item[iii].amount)
                    }
                }
            }
        });
    };
    Elkaisar.BaseData.Items[`beginner_back_5`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useBeginnerPack`,
            type: 'POST',
            data: {
                Item: "beginner_back_5",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    showMatrialGiftList(JsonObject.Item);
                    for (var iii in JsonObject.Item) {
                        Matrial.givePlayer(JsonObject.Item[iii].Item, JsonObject.Item[iii].amount)
                    }
                }
            }
        });
    };
    Elkaisar.BaseData.Items[`beginner_back_6`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useBeginnerPack`,
            type: 'POST',
            data: {
                Item: "beginner_back_6",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    showMatrialGiftList(JsonObject.Item);
                    for (var iii in JsonObject.Item) {
                        Matrial.givePlayer(JsonObject.Item[iii].Item, JsonObject.Item[iii].amount)
                    }
                }
            }
        });
    };
    Elkaisar.BaseData.Items[`beginner_back_7`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useBeginnerPack`,
            type: 'POST',
            data: {
                Item: "beginner_back_7",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    showMatrialGiftList(JsonObject.Item);
                    for (var iii in JsonObject.Item) {
                        Matrial.givePlayer(JsonObject.Item[iii].Item, JsonObject.Item[iii].amount)
                    }
                }
            }
        });
    };
    Elkaisar.BaseData.Items[`beginner_back_8`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useBeginnerPack`,
            type: 'POST',
            data: {
                Item: "beginner_back_8",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    showMatrialGiftList(JsonObject.Item);
                    for (var iii in JsonObject.Item) {
                        Matrial.givePlayer(JsonObject.Item[iii].Item, JsonObject.Item[iii].amount)
                    }
                }
            }
        });
    };
    Elkaisar.BaseData.Items[`beginner_back_9`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useBeginnerPack`,
            type: 'POST',
            data: {
                Item: "beginner_back_9",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    showMatrialGiftList(JsonObject.Item);
                    for (var iii in JsonObject.Item) {
                        Matrial.givePlayer(JsonObject.Item[iii].Item, JsonObject.Item[iii].amount)
                    }
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`beginner_back_10`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useBeginnerPack`,
            type: 'POST',
            data: {
                Item: "beginner_back_10",
                amount: amount,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    showMatrialGiftList(JsonObject.Item);
                    for (var iii in JsonObject.Item) {
                        Matrial.givePlayer(JsonObject.Item[iii].Item, JsonObject.Item[iii].amount)
                    }
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`army_box`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useArmyBox`,
            type: 'POST',
            data: {
                Item: "army_box",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_army_view();
                    city_profile.refresh_resource_view();
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`tagned_3p`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useHeroPacks`,
            type: 'POST',
            data: {
                Item: "tagned_3p",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {

                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCityHero(idCity);
                    Elkaisar.City.getCityHeroMedal(idCity);
                    Elkaisar.City.getCityBase(idCity);
                    Elkaisar.City.getCityHeroArmy(idCity);
                    alert_box.succesMessage("تم اضافة بطل بنجاح");
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`tagned_4p`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useHeroPacks`,
            type: 'POST',
            data: {
                Item: "tagned_4p",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCityHero(idCity);
                    Elkaisar.City.getCityHeroMedal(idCity);
                    Elkaisar.City.getCityBase(idCity);
                    Elkaisar.City.getCityHeroArmy(idCity);
                    alert_box.succesMessage("تم اضافة بطل بنجاح");
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`tagned_5p`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useHeroPacks`,
            type: 'POST',
            data: {
                Item: "tagned_5p",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCityHero(idCity);
                    Elkaisar.City.getCityHeroMedal(idCity);
                    Elkaisar.City.getCityBase(idCity);
                    Elkaisar.City.getCityHeroArmy(idCity);
                    alert_box.succesMessage("تم اضافة بطل بنجاح");
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`tagned_6p`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useHeroPacks`,
            type: 'POST',
            data: {
                Item: "tagned_6p",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCityHero(idCity);
                    Elkaisar.City.getCityHeroMedal(idCity);
                    Elkaisar.City.getCityBase(idCity);
                    Elkaisar.City.getCityHeroArmy(idCity);
                    alert_box.succesMessage("تم اضافة بطل بنجاح");
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`tagned_7p`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useHeroPacks`,
            type: 'POST',
            data: {
                Item: "tagned_7p",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCityHero(idCity);
                    Elkaisar.City.getCityHeroMedal(idCity);
                    Elkaisar.City.getCityBase(idCity);
                    Elkaisar.City.getCityHeroArmy(idCity);
                    alert_box.succesMessage("تم اضافة بطل بنجاح");
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`tagned_8p`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useHeroPacks`,
            type: 'POST',
            data: {
                Item: "tagned_8p",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCityHero(idCity);
                    Elkaisar.City.getCityHeroMedal(idCity);
                    Elkaisar.City.getCityBase(idCity);
                    Elkaisar.City.getCityHeroArmy(idCity);
                    alert_box.succesMessage("تم اضافة بطل بنجاح");
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`coin_a`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',
            data: {
                Item: "coin_a",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`coin_b`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',
            data: {
                Item: "coin_b",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`coin_c`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',
            data: {
                Item: "coin_c",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`coin_d`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',
            data: {
                Item: "coin_d",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`food_a`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',
            data: {
                Item: "food_a",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`food_b`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',
            data: {
                Item: "food_b",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`food_c`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',
            data: {
                Item: "food_c",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`food_d`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',
            data: {
                Item: "food_d",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`wood_a`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',
            data: {
                Item: "wood_a",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`wood_b`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',
            data: {
                Item: "wood_b",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`wood_c`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',
            data: {
                Item: "wood_c",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`wood_d`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',
            data: {
                Item: "wood_d",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`stone_a`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',
            data: {
                Item: "stone_a",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`stone_b`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',
            data: {
                Item: "stone_b",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`stone_c`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',
            data: {
                Item: "stone_c",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`stone_d`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',
            data: {
                Item: "stone_d",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`metal_a`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',
            data: {
                Item: "metal_a",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };



    Elkaisar.BaseData.Items[`metal_b`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',
            data: {
                Item: "metal_b",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`metal_c`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',
            data: {
                Item: "metal_c",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`metal_d`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemBoxUse/useResourcePacks`,
            type: 'POST',
            data: {
                Item: "metal_d",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                }
            }
        });
    };

};

Elkaisar.Item.useArmyBackFunc = function () {
    Elkaisar.BaseData.Items[`army_all_1`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemArmyPack/useArmyPackMini`,
            type: 'POST',
            data: {
                Item: "army_all_1",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    city_profile.refresh_army_view();
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`army_all_2`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemArmyPack/useArmyPackMedium`,
            type: 'POST',
            data: {
                Item: "army_all_2",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    city_profile.refresh_army_view();
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`army_all_3`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemArmyPack/useArmyPackLarge`,
            type: 'POST',
            data: {
                Item: "army_all_3",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    city_profile.refresh_army_view();
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`army_a_100`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemArmyPack/useArmyPackA100`,
            type: 'POST',
            data: {
                Item: "army_a_100",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    city_profile.refresh_army_view();
                }
            }
        });
    };
    Elkaisar.BaseData.Items[`army_b_100`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemArmyPack/useArmyPackB100`,
            type: 'POST',
            data: {
                Item: "army_b_100",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    city_profile.refresh_army_view();
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`army_c_100`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemArmyPack/useArmyPackC100`,
            type: 'POST',
            data: {
                Item: "army_c_100",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    city_profile.refresh_army_view();
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`army_d_100`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemArmyPack/useArmyPackD100`,
            type: 'POST',
            data: {
                Item: "army_d_100",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    city_profile.refresh_army_view();
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`army_e_100`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemArmyPack/useArmyPackE100`,
            type: 'POST',
            data: {
                Item: "army_e_100",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    city_profile.refresh_army_view();
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`army_f_100`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemArmyPack/useArmyPackF100`,
            type: 'POST',
            data: {
                Item: "army_f_100",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    city_profile.refresh_army_view();
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`army_a_1000`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemArmyPack/useArmyPackA1000`,
            type: 'POST',
            data: {
                Item: "army_a_1000",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    city_profile.refresh_army_view();
                }
            }
        });
    };
    Elkaisar.BaseData.Items[`army_b_1000`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemArmyPack/useArmyPackB1000`,
            type: 'POST',
            data: {
                Item: "army_b_1000",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    city_profile.refresh_army_view();
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`army_c_1000`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemArmyPack/useArmyPackC1000`,
            type: 'POST',
            data: {
                Item: "army_c_100",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    city_profile.refresh_army_view();
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`army_d_1000`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemArmyPack/useArmyPackD1000`,
            type: 'POST',
            data: {
                Item: "army_d_1000",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    city_profile.refresh_army_view();
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`army_e_1000`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemArmyPack/useArmyPackE1000`,
            type: 'POST',
            data: {
                Item: "army_e_1000",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    city_profile.refresh_army_view();
                }
            }
        });
    };

    Elkaisar.BaseData.Items[`army_f_1000`][`UseFunc`] = function (amount) {
        var idCity = Elkaisar.CurrentCity.City.id_city;

        return $.ajax({
            url: `${Elkaisar.Config.NodeUrl}/api/AItemArmyPack/useArmyPackF1000`,
            type: 'POST',
            data: {
                Item: "army_f_1000",
                amount: amount,
                idCity: idCity,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    Elkaisar.LBase.Error(data);
                var JsonObject = JSON.parse(data);
                if (JsonObject.state === "ok") {
                    Elkaisar.City.getCity(idCity).City = JsonObject.City;
                    city_profile.refresh_resource_view();
                    city_profile.refresh_army_view();
                }
            }
        });
    };
};