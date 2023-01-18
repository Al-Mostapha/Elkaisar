(async function () {
  const ServerData = (await Elkaisar.DB.ASelectFrom("*", "server_data", "id = 1"))[0];
  Elkaisar.Base.ServerData = ServerData;
  console.log(ServerData);
  if (parseInt(ServerData.open_status) === 0) {
    console.log("Server is Closed So You cant start");
    process.exit(0);
  }


  if (parseInt(ServerData.under_main) === 1) {
    console.log("Server is Under maintain So You cant start")
    process.exit(0);
  }

  await Elkaisar.DB.AUpdate("`online` = 0", "player", "1");
})();