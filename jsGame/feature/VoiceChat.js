/*
Elkaisar.Peer = {};
Elkaisar.Peer.Conns = {};

Elkaisar.Peer.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
Elkaisar.Peer.Peer = new Peer(undefined, {
    host: 'localhost',
    port: 8080,
    path: '/VoiceChat'
});


Elkaisar.Peer.Peer.on("open", function (idPeer) {
    $.ajax({
        url: `${Elkaisar.Config.NodeUrl}/api/ATeam/playerOnline`,
        data: {
            token: Elkaisar.Config.OuthToken,
            idPeer : idPeer
        },
        type: 'POST',
        beforeSend: function (xhr) {
            
        },
        success: function (data, textStatus, jqXHR) {
            if(!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            
            var JsonObject = JSON.parse(data);
            
            if(JsonObject.state == "ok"){
                JsonObject.TeamPeers.forEach(function (onePeer){
                    Elkaisar.Peer.Call(onePeer.id_peer);
                });
            }
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
            
        }
    });
});



Elkaisar.Peer.RecievConn = function (conn) {
    conn.on("data", function (data) {
        console.log(data);
        var JsonObject = JSON.parse(data);
        if (JsonObject.classPath == "Player.newConn") {
            Elkaisar.Peer.Conns[JsonObject.idPlayer] = conn;
        }
    });
};


Elkaisar.Peer.Peer.on('connection', Elkaisar.Peer.RecievConn);

Elkaisar.Peer.Call = function (PeerId) {
    Elkaisar.Peer.getUserMedia({video: false, audio: true}, function (stream) {
        var call = Elkaisar.Peer.Peer.call(PeerId, stream);
        const video = document.createElement('video');
        call.on('stream', function (remoteStream) {
            addVideoStream(video, remoteStream);
        });
    }, function (err) {
        console.log('Failed to get local stream', err);
    });
};

Elkaisar.Peer.Peer.on('call', function (call) {
    Elkaisar.Peer.getUserMedia({video: false, audio: true}, function (stream) {
        call.answer(stream); // Answer the call with an A/V stream.
        const video = document.createElement('video');
        call.on('stream', function (remoteStream) {
            console.log(remoteStream)
            addVideoStream(video, remoteStream);
        });
    }, function (err) {
        console.log('Failed to get local stream', err);
    });
});

function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });

    document.getElementById("dialg_box").append(video);
}
*/


